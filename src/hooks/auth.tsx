/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../models/user";
import { api } from "../services/api";
import { getQuery } from "../services/hooks/getQuery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";

interface AuthState {
  token: string;
  user: UserType;
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UserType;
  token: string;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
  updateProfile(user: Partial<UserType>): void;
  refreshProfile(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: any) => {
  const toast = useToast();

  const [data, setData] = useState<AuthState>();

  const [loading, setLoading] = useState(false);

  const isSigned = async () => {
    try {
      const token = await AsyncStorage.getItem("workoutapp/token");
      const user: UserType = JSON.parse(
        await AsyncStorage.getItem("workoutapp/user")
      );

      if (user && token) {
        (api as any).defaults.headers.Authorization = `Bearer ${token}`;
        setData({ token, user });
        return;
      }

      setData({} as AuthState);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isSigned();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);

      const response = await api.post("/user/login", {
        username,
        password,
      });

      if (response) {
        setLoading(false);
        const { user, token } = response.data;

        AsyncStorage.setItem("workoutapp/token", token);
        AsyncStorage.setItem("workoutapp/user", JSON.stringify(user));
        (api as any).defaults.headers.Authorization = `Bearer ${token}`;
        setData(response.data);
        return response.data;
      }
    } catch (error: any) {
      setLoading(false);
      toast.show({
        description: "Não foi possível efetuar o login",
      });

      return { status: 500, message: "Usuário ou Senha Inválido" };
    }
  };

  const signOut = () => {
    AsyncStorage.removeItem("workoutapp/token");
    AsyncStorage.removeItem("workoutapp/user");
    delete (api as any).defaults.headers.Authorization;
    if (!data?.user || !data?.token) return;
    setData({} as AuthState);
  };

  const updateProfile = (user: Partial<UserType>) => {
    const newUserData = { ...data.user, ...user };
    setData((oldData) => ({ ...oldData, user: newUserData }));
  };

  const { data: profileData, refetch } = getQuery(
    `user/${data?.user?._id}`,
    ["user", data?.user?._id],
    {
      enabled: false,
    }
  );

  const refreshProfile = () => {
    refetch();
    if (profileData) {
      setData((old) => ({ ...old, user: profileData }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!data?.user,
        loading,
        user: data?.user,
        token: data?.token,
        signIn,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

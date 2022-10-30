import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@rneui/themed";
import InputComponent from "../../components/input";
import { useAuth } from "../../hooks/auth";
import { Container, ContainerHeading, Main } from "./styles";
import { View, Text, useToast } from "native-base";

interface inputProp {
  username: string;
  password: string;
}

const LoginPage = ({ navigation }) => {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<inputProp>();
  const { signIn, loading } = useAuth();

  const onSubmit = async (data: inputProp) => {
    await signIn(data.username, data.password).then((res: any) => {
      if (res.status === 500) {
        setError("username", {
          message: "Usúario ou senha incorretos",
        });

        toast.show({
          render: () => {
            return (
              <Text
                style={{
                  paddingBottom: 6,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 6,
                  backgroundColor: "#E5383B",
                  color: "white",
                  borderRadius: 99,
                }}
              >
                {res?.message || "Não foi possível efetuar o login"}
              </Text>
            );
          },
        });
      }
    });
  };
  return (
    <Main>
      <Container>
        <ContainerHeading>Login</ContainerHeading>
        <InputComponent
          control={control}
          name="username"
          label="Nome"
          error={errors.username?.message}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          label="Senha"
          control={control}
          name="password"
          secureTextEntry={true}
          error={errors.password?.message}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          buttonStyle={{ marginTop: 30, borderRadius: 8 }}
        >
          Entrar
        </Button>
        <Button
          onPress={() => navigation.navigate("Register")}
          buttonStyle={{
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <Text style={{ color: "#D3D3D3" }}>Criar Conta</Text>
        </Button>
      </Container>
    </Main>
  );
};

export default LoginPage;

import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";
import InputComponent from "../../components/input";
import { useAuth } from "../../hooks/auth";
import { View, useToast } from "native-base";
import { useMutationQuery } from "../../services/hooks/useMutationQuery";
import { Header, Main } from "../home/styles";
import { Container, ContainerHeading } from "./styles";

interface inputProp {
  name: string;
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("O Nome é obrigatório"),
  username: Yup.string(),
});

const RegisterPage = ({ navigation }) => {
  const toast = useToast();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<inputProp>({
    resolver: yupResolver(schema),
  });
  const { signIn } = useAuth();

  const { mutate: onRegister, isLoading } = useMutationQuery("/user/register");

  const onSubmit = (data: inputProp) => {
    onRegister(data, {
      onSuccess: () => {
        toast.show({ description: "Conta Criada com sucesso!" });
        setTimeout(() => {
          toast.show({ description: "Redirecionando..." });
        }, 500);
        delete data.name;
        signIn(data.username, data.password);
      },
      onError: (err: any) => {
        if (err.response.data.code === 11000) {
          setError("username", { message: "Username já cadastrado" });
        }
      },
    });
  };
  return (
    <Main>
      <Header>
        <Button
          buttonStyle={{ ...styles.button, height: "auto" }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={18} color="white" />
        </Button>
      </Header>

      <Container>
        <ContainerHeading>Criar uma Conta</ContainerHeading>
        <InputComponent
          control={control}
          name="name"
          label="Nome Sobrenome"
          error={errors.name?.message}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent control={control} name="username" label="UserName" />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          label="Senha"
          control={control}
          name="password"
          secureTextEntry={true}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          buttonStyle={{ marginTop: 30, borderRadius: 8 }}
        >
          Criar Conta
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          buttonStyle={{
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <Text style={{ color: "#D3D3D3" }}>Voltar</Text>
        </Button>
      </Container>
    </Main>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
  },
});

export default RegisterPage;

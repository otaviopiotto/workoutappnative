import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { useAuth } from "../../../../hooks/auth";
import InputComponent from "../../../../components/input";
import { Button } from "@rneui/themed";
import { Form } from "./styles";

interface inputProp {
  title: string;
}

interface saveGroupProps {
  onClose(): void;
  id: string | number;
  data: any;
  navigation: any;
}

const SaveGroup = ({ id, data, onClose, navigation }: saveGroupProps) => {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<inputProp>();

  const { mutate: onAddGroup, isLoading } = useMutationQuery(
    `user/group/${id || user._id}`,
    id ? "put" : "post"
  );

  useEffect(() => {
    if (id) {
      setValue("title", data.title);
    }
  }, [id]);

  const onSubmit = ({ title }: any) => {
    //PUT
    if (id) {
      onAddGroup(
        {
          ...data,
          title,
        },
        {
          onSuccess: () => {
            navigation.goBack();
          },
          onError: (err) => console.log(err),
        }
      );
      //POST
    } else {
      onAddGroup(
        {
          ...data,
          title,
        },
        {
          onSuccess: () => {
            navigation.goBack();
          },
          onError: (err) => console.log(err),
        }
      );
    }
  };

  return (
    <Form>
      <InputComponent control={control} name="title" label="Título do Treino" />

      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        buttonStyle={{
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        Salvar
      </Button>

      <Button
        onPress={onClose}
        buttonStyle={{
          marginTop: 10,
          borderRadius: 20,
          backgroundColor: "transparent",
        }}
      >
        Cancelar
      </Button>
    </Form>
  );
};
export default SaveGroup;

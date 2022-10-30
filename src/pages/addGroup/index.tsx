import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "@rneui/themed";
import Icon from "react-native-vector-icons/Octicons";
import { StyleSheet, Text, View } from "react-native";
import { useFieldArray, useForm } from "react-hook-form";
import InputComponent from "../../components/input";
import { dayType } from "../../models/exercise";
import { Footer, Main } from "../home/styles";
import { BodyContainer, Header, HeaderText } from "./styles";
import DaysContainer from "./components/addNewContainer";
import { Actionsheet } from "native-base";
import SaveGroup from "./components/saveGroup";
import { getQuery } from "../../services/hooks/getQuery";
import { useKeyboardBottomInset } from "./components/addNewWorkout/addNewWorkout";

export interface inputProp {
  title?: string;
  description?: string;
  days?: dayType[];
}

const AddGroup = ({ navigation, route }) => {
  const { id } = route?.params;
  const bottomInset = useKeyboardBottomInset();

  const { data } = getQuery(`user/group/${id}`, ["group", id], {
    enabled: !!id,
  });

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState();

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<inputProp>({
      defaultValues: data,
    });

  const { fields, append, remove } = useFieldArray({
    name: "days",
    control,
  });

  const onSubmit = (data: any) => {
    const format = {
      ...data,
      days: data?.days?.map((e: any, i: number) => ({ ...e, number: i + 1 })),
    };

    setFormData(format);
    setOpen(true);
  };

  const createDay = () => {
    append({
      muscle_group: "",
    });
  };

  const duplicateDay = (data: any) => {
    append(data);
  };

  return (
    <>
      <Actionsheet isOpen={open} onClose={() => setOpen(!open)}>
        <Actionsheet.Content bg="#161A1D" bottom={bottomInset}>
          <SaveGroup
            data={formData}
            id={id}
            navigation={navigation}
            onClose={() => setOpen(false)}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <Main>
        <Header>
          <ReactButton
            buttonStyle={{
              ...styles.button,
              height: "auto",
              backgroundColor: "transparent",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="arrow-left" size={18} color="white" />
          </ReactButton>

          <HeaderText>Crie seu Treino</HeaderText>
          <View />
        </Header>
        <BodyContainer>
          <InputComponent
            placeholder="Descrição"
            name="description"
            control={control}
            multiline
            numberOfLines={3}
            style={{
              marginTop: 20,
            }}
          />

          <View>
            {fields.map((e: dayType | any, index: number) => (
              <DaysContainer
                duplicateDay={duplicateDay}
                remove={remove}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                control={control}
                key={index}
                index={index}
                data={e}
                navigation={navigation}
              />
            ))}
          </View>
          <ReactButton buttonStyle={styles.button} onPress={() => createDay()}>
            <Icon name="plus" size={22} color="white" />
          </ReactButton>
        </BodyContainer>

        <Footer>
          <ReactButton
            buttonStyle={styles.footer_button}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={22} color="white" />
          </ReactButton>
          <ReactButton
            buttonStyle={styles.footer_button}
            onPress={() => createDay()}
          >
            <Icon name="plus" size={22} color="white" />
          </ReactButton>
          <ReactButton
            buttonStyle={styles.footer_button}
            onPress={handleSubmit(onSubmit)}
          >
            <Icon name="check" size={22} color="white" />
          </ReactButton>
        </Footer>
      </Main>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "rgba(155,155,155,0.3)",
    borderRadius: 8,
    color: "white",
    marginTop: 10,
  },
  footer_button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
  },
});

export default AddGroup;

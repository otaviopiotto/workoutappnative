import React, { useEffect } from "react";
import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Button as ReactButton } from "@rneui/themed";
import Icon from "react-native-vector-icons/Octicons";
import { View, LogBox } from "react-native";
import { inputProp } from "../..";
import { dayType, exerciseType } from "../../../../models/exercise";
import InputComponent from "../../../../components/input";
import { Footer } from "../../../home/styles";
import AddNewWorkOut from "../addNewWorkout/addNewWorkout";

import {
  buttonStyle,
  Container,
  ContainerCenterListHeader,
  ContainerCenterListItem,
  ContainerCenterName,
  ContainerCenterSide,
  ContainerLeftSide,
  ContainerLeftSideText,
  ContainerRightSide,
  ExerciseContainer,
} from "./styles";
import { ScrollView } from "native-base";
import { dayViewButton } from "../addNewWorkout/styles";

interface DaysProp {
  data?: dayType;
  duplicateDay(data: any): void;
  remove: UseFieldArrayRemove;
  watch: UseFormWatch<inputProp>;
  index: number;
  getValues: UseFormGetValues<inputProp>;
  setValue: UseFormSetValue<inputProp>;
  control: Control<inputProp, any>;
  navigation: any;
}

const defaultList = ["Exercícios", "Séries", "Reps", "Desc"];
const offList = ["Off", "Off", "Off", "Off"];

const DaysContainer = ({
  data,
  duplicateDay,
  watch,
  index,
  remove,
  control,
  setValue,
  getValues,
  navigation,
}: DaysProp) => {
  const handleOpenChange = () => {
    if (!getValues(`days.${index}.muscle_group`)) {
      setValue(`days.${index}.muscle_group`, "OFF");
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (!getValues(`days.${index}.muscle_group`))
      navigation.navigate("ExerciseModal", {
        control,
        nestedIndex: index,
        getValues,
        setValue,
        watch,
        onClose: handleOpenChange,
      });
  }, []);

  return (
    <>
      <ReactButton
        onPress={() =>
          navigation.navigate("ExerciseModal", {
            control,
            nestedIndex: index,
            getValues,
            setValue,
            watch,
            onClose: handleOpenChange,
          })
        }
        buttonStyle={dayViewButton.button}
      >
        <Container>
          <ContainerLeftSide>
            <ContainerLeftSideText>
              {(index + 1).toString().padStart(2, "0")}
            </ContainerLeftSideText>
          </ContainerLeftSide>
          <ContainerCenterSide>
            <ContainerCenterName>
              {watch(`days.${index}.muscle_group`)}
            </ContainerCenterName>

            <View style={{ flexDirection: "row" }}>
              {(watch(`days.${index}.muscle_group`)
                ?.toLowerCase()
                .includes("off")
                ? offList
                : defaultList
              ).map((e, i) => (
                <ContainerCenterListHeader
                  key={i}
                  style={i == 0 ? { flex: 0.8 } : { flex: 0.3 }}
                >
                  {e}
                </ContainerCenterListHeader>
              ))}
            </View>

            {watch(`days.${index}.workout`)?.map(
              (e: exerciseType, i: number) => (
                <View key={i} style={{ flexDirection: "row" }}>
                  <ContainerCenterListItem style={{ flex: 0.8 }}>
                    {e.exercise}
                  </ContainerCenterListItem>
                  <ContainerCenterListItem style={{ flex: 0.3 }}>
                    {e.sets}x
                  </ContainerCenterListItem>
                  <ContainerCenterListItem style={{ flex: 0.3 }}>
                    {e.repetition}
                  </ContainerCenterListItem>
                  <ContainerCenterListItem style={{ flex: 0.3 }}>
                    {e.time}s
                  </ContainerCenterListItem>
                </View>
              )
            )}
          </ContainerCenterSide>
          <ContainerRightSide>
            <ReactButton
              onPress={() => remove(index)}
              buttonStyle={{ ...buttonStyle.button, height: 30 }}
            >
              <Icon name="x" size={26} color={buttonStyle.svg.color} />
            </ReactButton>
            <ReactButton
              buttonStyle={{ ...buttonStyle.button, height: 30 }}
              onPress={() => duplicateDay(watch(`days.${index}`))}
            >
              <Icon name="copy" size={20} color={buttonStyle.svg.color} />
            </ReactButton>
          </ContainerRightSide>
        </Container>
      </ReactButton>
    </>
  );
};

interface addProps {
  onClose: () => void;
  watch: UseFormWatch<inputProp>;
  setValue: UseFormSetValue<inputProp>;
  nestedIndex: number;
  getValues: UseFormGetValues<inputProp>;
  control: Control<inputProp, any>;
  route?: any;
  navigation?: any;
}

export const AddExercises = ({ route, navigation }: addProps) => {
  const { onClose, nestedIndex, control, setValue, watch, getValues } =
    route.params;

  const { fields, append, remove } = useFieldArray({
    name: `days.${nestedIndex}.workout`,
    control,
  });

  const createExercise = () => {
    append({
      sets:
        getValues(
          `days.${nestedIndex}.workout[${fields.length - 1}].sets` as any
        ) || 0,
      repetition:
        getValues(
          `days.${nestedIndex}.workout[${fields.length - 1}].repetition` as any
        ) || 0,
      time:
        getValues(
          `days.${nestedIndex}.workout[${fields.length - 1}].time` as any
        ) || 0,
    });
  };

  return (
    <ExerciseContainer>
      <InputComponent
        label="Dia de:"
        control={control}
        name={`days.${nestedIndex}.muscle_group`}
      />

      <ScrollView>
        {fields.map((e: exerciseType | any, i: number) => (
          <AddNewWorkOut
            key={i}
            {...{
              control,
              index: i,
              parent: nestedIndex,
              watch,
              setValue,
              getValues,
              onDelete: remove,
            }}
          />
        ))}

        <ReactButton buttonStyle={buttonStyle.button} onPress={createExercise}>
          <Icon name="plus" size={22} color="white" />
        </ReactButton>
      </ScrollView>
      <Footer>
        <ReactButton
          buttonStyle={buttonStyle.button}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={22} color="white" />
        </ReactButton>
        <ReactButton buttonStyle={buttonStyle.button} onPress={createExercise}>
          <Icon name="plus" size={22} color="white" />
        </ReactButton>
        <ReactButton buttonStyle={buttonStyle.button} onPress={onClose}>
          <Icon name="check" size={22} color="white" />
        </ReactButton>
      </Footer>
    </ExerciseContainer>
  );
};

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default DaysContainer;

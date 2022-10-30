import React, { useState, useEffect } from "react";
import { Button as ReactButton } from "@rneui/themed";
import {
  Control,
  UseFieldArrayRemove,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, Keyboard, Platform } from "react-native";
import { inputProp } from "../..";
import InputComponent from "../../../../components/input";
import { buttonStyle } from "../addNewContainer/styles";
import { Actionsheet } from "native-base";
import { Footer } from "../../../home/styles";
import { exerciseType } from "../../../../models/exercise";
import {
  DayView,
  DayViewBottom,
  DayViewHeading,
  DayViewTop,
  DayViewBottomContainer,
  DayViewBottomContent,
  DayViewBottomText,
  DayViewLeft,
  DayViewRight,
  WorkoutFormView,
  WorkoutFormBottom,
  WorkoutFormNumberTitle,
  WorkoutFormNumberContainer,
  inputButtonStyle,
  dayViewButton,
  WorkoutInputNumberContainer,
} from "./styles";

interface addNewProp {
  onDelete: UseFieldArrayRemove;
  index: number;
  control: Control<inputProp, any>;
  watch: UseFormWatch<inputProp>;
  getValues: UseFormGetValues<inputProp>;
  parent: number;
  setValue: UseFormSetValue<inputProp>;
}

export const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef([]);

  useEffect(() => {
    subscriptions.current = [
      Keyboard.addListener("keyboardDidHide", (e) => setBottom(0)),
      Keyboard.addListener("keyboardDidShow", (e) => {
        if (Platform.OS === "android") {
          setBottom(e.endCoordinates.height);
        } else {
          setBottom(
            Math.max(e.startCoordinates.height, e.endCoordinates.height)
          );
        }
      }),
    ];

    return () => {
      subscriptions.current.forEach((subscription) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};

const AddNewWorkOut = ({ parent, ...props }: addNewProp) => {
  const [open, setOpen] = useState(
    props.watch(`days.${parent}.workout.${props.index}.exercise`) ? false : true
  );
  const bottomInset = useKeyboardBottomInset();
  return (
    <>
      <Actionsheet isOpen={open} onClose={() => setOpen(!open)}>
        <Actionsheet.Content bg="#161A1D" bottom={bottomInset}>
          <WorkoutForm
            {...{ ...props, parent, onDelete: () => setOpen(false) }}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <ReactButton
        onPress={() => setOpen(true)}
        buttonStyle={dayViewButton.button}
      >
        <DayView>
          <DayViewLeft>
            <DayViewTop>
              <DayViewHeading>
                {props.getValues(
                  `days.${parent}.workout.${props.index}.exercise`
                )}
              </DayViewHeading>
            </DayViewTop>
            <DayViewBottom>
              <DayViewBottomContainer>
                <DayViewBottomContent>
                  <Icon name="play-forward-outline" size={14} />
                </DayViewBottomContent>
                <DayViewBottomText style={{ marginLeft: 6 }}>
                  {props.getValues(
                    `days.${parent}.workout.${props.index}.sets`
                  )}
                  x
                </DayViewBottomText>
              </DayViewBottomContainer>

              <DayViewBottomContainer>
                <DayViewBottomContent>
                  <Icon name="swap-horizontal-outline" size={14} />
                </DayViewBottomContent>
                <DayViewBottomText style={{ marginLeft: 6 }}>
                  {props.getValues(
                    `days.${parent}.workout.${props.index}.repetition`
                  )}
                  x
                </DayViewBottomText>
              </DayViewBottomContainer>

              <DayViewBottomContainer>
                <DayViewBottomContent>
                  <Icon name="timer-outline" size={14} />
                </DayViewBottomContent>
                <DayViewBottomText style={{ marginLeft: 6 }}>
                  {props.getValues(
                    `days.${parent}.workout.${props.index}.time`
                  )}
                  s
                </DayViewBottomText>
              </DayViewBottomContainer>
            </DayViewBottom>
          </DayViewLeft>

          <DayViewRight>
            <ReactButton
              onPress={() => props.onDelete(props.index)}
              buttonStyle={buttonStyle.button}
            >
              <Icon
                name="trash-outline"
                size={20}
                color={buttonStyle.svg.color}
              />
            </ReactButton>
          </DayViewRight>
        </DayView>
      </ReactButton>
    </>
  );
};

const WorkoutForm = ({
  control,
  parent,
  index,
  setValue: setValueParent,
  getValues,
  watch: watchParent,
  onDelete,
}: addNewProp) => {
  const { setValue, watch } = useForm<exerciseType>({
    defaultValues: {
      sets: watchParent(`days.${parent}.workout.${index}.sets`),
      time: watchParent(`days.${parent}.workout.${index}.time`),
    },
  });

  const handleSets = (value: boolean) => {
    const currentValue = Number(
      getValues(`days.${parent}.workout.${index}.sets`) || 0
    );

    if (value) {
      setValue("sets", currentValue + 1);
      setValueParent(`days.${parent}.workout.${index}.sets`, currentValue + 1);
    } else {
      setValue("sets", currentValue - 1);
      setValueParent(
        `days.${parent}.workout.${index}.sets`,
        currentValue === 0 ? 0 : currentValue - 1
      );
    }
  };

  const handleRest = (value: boolean) => {
    const currentValue = Number(
      getValues(`days.${parent}.workout.${index}.time`) || 5
    );

    if (value) {
      setValue("time", currentValue + 5);
      setValueParent(`days.${parent}.workout.${index}.time`, currentValue + 5);
    } else {
      setValue("time", currentValue - 5);
      setValueParent(
        `days.${parent}.workout.${index}.time`,
        currentValue === 0 ? 0 : currentValue - 5
      );
    }
  };

  return (
    <WorkoutFormView>
      <View>
        <InputComponent
          label="Exercício"
          control={control}
          name={`days.${parent}.workout.${index}.exercise`}
        />
      </View>
      <WorkoutFormBottom>
        <View>
          <WorkoutFormNumberTitle> Séries</WorkoutFormNumberTitle>

          <WorkoutFormNumberContainer>
            <ReactButton
              buttonStyle={inputButtonStyle.button}
              onPress={() => handleSets(false)}
            >
              <Icon name="remove-outline" size={22} color="white" />
            </ReactButton>
            <WorkoutInputNumberContainer>
              <Text style={{ color: "#B1A7A6" }}>{watch("sets")}</Text>
            </WorkoutInputNumberContainer>

            <ReactButton
              buttonStyle={inputButtonStyle.button}
              onPress={() => handleSets(true)}
            >
              <Icon name="add-outline" size={22} color="white" />
            </ReactButton>
          </WorkoutFormNumberContainer>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <InputComponent
            label="Repetição"
            control={control}
            name={`days.${parent}.workout.${index}.repetition`}
          />
        </View>

        <View>
          <WorkoutFormNumberTitle> Descanso (s)</WorkoutFormNumberTitle>

          <WorkoutFormNumberContainer>
            <ReactButton
              buttonStyle={inputButtonStyle.button}
              onPress={() => handleRest(false)}
            >
              <Icon name="remove-outline" size={22} color="white" />
            </ReactButton>

            <WorkoutInputNumberContainer>
              <Text style={{ color: "#B1A7A6" }}>{watch("time")}</Text>
            </WorkoutInputNumberContainer>

            <ReactButton
              buttonStyle={inputButtonStyle.button}
              onPress={() => handleRest(true)}
            >
              <Icon name="add-outline" size={22} color="white" />
            </ReactButton>
          </WorkoutFormNumberContainer>
        </View>
      </WorkoutFormBottom>
      <Footer>
        <ReactButton
          buttonStyle={buttonStyle.button}
          onPress={() => onDelete()}
        >
          <Icon name="chevron-back-outline" size={22} color="white" />
        </ReactButton>

        <ReactButton
          buttonStyle={buttonStyle.button}
          onPress={() => onDelete()}
        >
          <Icon name="checkmark-outline" size={22} color="white" />
        </ReactButton>
      </Footer>
    </WorkoutFormView>
  );
};

export default AddNewWorkOut;

import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "@rneui/themed";
import Icon from "react-native-vector-icons/Octicons";
import { TouchableHighlight, StyleSheet, Animated } from "react-native";
import Button from "../../components/button";
import { Footer, Header, Main } from "../home/styles";
import { getQuery } from "../../services/hooks/getQuery";
import { dayType, exerciseType } from "../../models/exercise";
import {
  Body,
  DayViewBottom,
  DayViewBottomContainer,
  DayViewBottomContent,
  DayViewBottomText,
  DayViewHeading,
  DayViewObs,
  DayViewTop,
  Hero,
  HeroBody,
  HeroHeading,
} from "./styles";

const ExercisePage = ({ route, navigation }) => {
  const [workOutData, setWorkOutData] = useState<dayType>(null as any);

  const { id, groupId } = route?.params;

  const { data } = getQuery(`user/group/${groupId}`, ["group", groupId]);

  useEffect(() => {
    if (data) {
      const filterDay = data.days.filter((e: any) => e._id === id);
      setWorkOutData(filterDay[0]);
    }
  }, [data, id]);

  return (
    <Main>
      <Header>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Button buttonStyle="Text">
            <Icon name="arrow-left" size={18} />
          </Button>
        </TouchableHighlight>
      </Header>
      <Hero>
        <HeroBody>
          Dia {workOutData?.number?.toString().padStart(2, "0")}
        </HeroBody>
        <HeroHeading>{workOutData?.muscle_group}</HeroHeading>
      </Hero>
      <Body>
        {workOutData?.workout?.map((e: exerciseType, i: number) => (
          <ExerciseCard data={e} key={i} />
        ))}
      </Body>
      <Footer>
        <ReactButton
          buttonStyle={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={18} color="white" />
        </ReactButton>
      </Footer>
    </Main>
  );
};

interface prop {
  data: exerciseType;
}

const ExerciseCard = ({ data }: prop) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [focus, setFocus] = useState(false);

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: focus ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#101212"],
  });
  const sizeInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["94%", "96%"],
  });
  const animatedStyle = {
    width: sizeInterpolation,
    backgroundColor: boxInterpolation,
  };

  return (
    <ReactButton
      buttonStyle={{
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
        borderWidth: 0,
      }}
      useForeground={false}
      onPress={() => {
        setFocus(!focus), handleAnimation();
      }}
    >
      <Animated.View style={{ ...styles.view, ...animatedStyle }}>
        <DayViewTop>
          <DayViewHeading>{data.exercise}</DayViewHeading>
          {data.observation && <DayViewObs>{data.observation}</DayViewObs>}
        </DayViewTop>
        <DayViewBottom focus={focus}>
          <DayViewBottomContainer>
            <DayViewBottomContent>
              <Icon name="sort-asc" size={14} />
            </DayViewBottomContent>
            <DayViewBottomText>
              {data.sets}x{" "}
              {focus && <DayViewBottomText>Séries</DayViewBottomText>}
            </DayViewBottomText>
          </DayViewBottomContainer>

          <DayViewBottomContainer
            style={{ marginLeft: focus ? 0 : 22, marginTop: focus ? 10 : 4 }}
          >
            <DayViewBottomContent>
              <Icon name="arrow-switch" size={14} />
            </DayViewBottomContent>
            <DayViewBottomText>
              {data.repetition}x{" "}
              {focus && <DayViewBottomText>Repetições</DayViewBottomText>}
            </DayViewBottomText>
          </DayViewBottomContainer>

          <DayViewBottomContainer
            style={{ marginLeft: focus ? 0 : 22, marginTop: focus ? 10 : 4 }}
          >
            <DayViewBottomContent>
              <Icon name="clock" size={14} />
            </DayViewBottomContent>
            <DayViewBottomText>
              {data.time || 0}s{" "}
              {focus && <DayViewBottomText>Descanso</DayViewBottomText>}
            </DayViewBottomText>
          </DayViewBottomContainer>
        </DayViewBottom>
      </Animated.View>
    </ReactButton>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
  },
  view: {
    width: "96%",
    backgroundColor: "transparent",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
export default ExercisePage;

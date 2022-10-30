import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Octicons";
import { TouchableHighlight, StyleSheet } from "react-native";
import { Footer, Main } from "../home/styles";
import { dayType, GroupType } from "../../models/exercise";
import { getQuery } from "../../services/hooks/getQuery";
import { useMutationQuery } from "../../services/hooks/useMutationQuery";
import { Actionsheet, Skeleton, View } from "native-base";
import { Button } from "@rneui/themed";
import {
  Body,
  BodyHeader,
  DayView,
  DayViewBottom,
  DayViewBottomContent,
  DayViewHeading,
  DayViewLeft,
  DayViewTopContent,
  DayViewTopView,
  Hero,
  HeroBody,
  HeroDescriptionText,
  HeroHeading,
} from "./styles";
import { Header, HeaderText } from "../addGroup/styles";

const GroupPage = ({ route, navigation }) => {
  const { id } = route?.params;
  const [open, setOpen] = useState(false);
  const [workOutData, setWorkOutData] = useState<GroupType>(null as any);

  const { data, isLoading } = getQuery(`user/group/${id}`, ["group", id], {
    enabled: !!id,
  });

  useEffect(() => {
    console.log(!id);
    if (data) {
      setWorkOutData(data);
    }
  }, [data, id]);
  return (
    <>
      <Actionsheet isOpen={open} onClose={() => setOpen(!open)}>
        <Actionsheet.Content bg="#161A1D">
          <DeleteModal
            id={id}
            navigation={navigation}
            onClose={() => setOpen(false)}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <Main>
        <Header>
          <Button
            buttonStyle={{ ...styles.button, height: "auto" }}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="arrow-left" size={18} color="white" />
          </Button>
          <HeaderText>{workOutData?.title}</HeaderText>
          <View />
        </Header>
        {isLoading ? (
          <Skeleton.Text
            mt="4"
            w="100%"
            lines={2}
            startColor="#0B090A"
            px="0"
          />
        ) : (
          <Hero>
            <HeroHeading>{workOutData?.title}</HeroHeading>
            <HeroDescriptionText>Descrição</HeroDescriptionText>
            <HeroBody>{workOutData?.description}</HeroBody>
          </Hero>
        )}

        <BodyHeader>Exercícios</BodyHeader>
        <Body>
          {isLoading
            ? [1, 2, 3, 4, 5].map((_, i) => (
                <Skeleton
                  h="20"
                  w="100%"
                  borderRadius={20}
                  key={i}
                  mt="4"
                  startColor="#0B090A"
                />
              ))
            : workOutData?.days?.map((e, i: number) => (
                <DayCard
                  data={e}
                  navigation={navigation}
                  key={i}
                  groupId={id}
                />
              ))}
        </Body>
        <Footer>
          <Button
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="arrow-left" size={18} color="white" />
          </Button>
          <Button
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("AddGroup", { id: id })}
          >
            <Icon name="pencil" size={22} color="white" />
          </Button>
          <Button buttonStyle={styles.button} onPress={() => setOpen(true)}>
            <Icon name="trash" size={22} color="white" />
          </Button>
        </Footer>
      </Main>
    </>
  );
};

interface dayCardProps {
  navigation: any;
  data: dayType;
  groupId: string;
}

const DayCard = ({ data, navigation, groupId }: dayCardProps) => {
  const hasWorkout = data?.muscle_group.toLowerCase().includes("off");

  const handleClickCard = () => {
    if (hasWorkout) return;

    navigation.navigate("Exercise", {
      id: data._id,
      groupId,
    });
  };

  return (
    <TouchableHighlight onPress={handleClickCard}>
      <DayView>
        <DayViewLeft>
          <DayViewHeading dayOff={hasWorkout}>
            {data?.number?.toString().padStart(2, "0")}
          </DayViewHeading>
        </DayViewLeft>
        <DayViewBottom>
          <DayViewBottomContent dayOff={hasWorkout}>
            {data?.muscle_group}
          </DayViewBottomContent>
          {!hasWorkout && (
            <DayViewTopView>
              <DayViewTopContent dayOff={hasWorkout}>
                <Icon name="list-unordered" size={10} />
              </DayViewTopContent>
              <DayViewTopContent style={{ marginLeft: 4 }}>
                {data?.workout?.length || 0}{" "}
                {(data?.workout?.length as number) > 1 ? "Treinos" : "Treino"}
              </DayViewTopContent>
            </DayViewTopView>
          )}
        </DayViewBottom>
      </DayView>
    </TouchableHighlight>
  );
};

interface deleteProps {
  onClose(): void;
  navigation: any;
  id: string | number;
}

const DeleteModal = ({ onClose, id, navigation }: deleteProps) => {
  const { mutate: onAddGroup, isLoading } = useMutationQuery(
    `user/group/${id}`,
    "delete"
  );

  const handleDelete = () => {
    onAddGroup("", {
      onSuccess: () => {
        navigation.navigate("Home");
      },
    });
  };
  return (
    <View
      style={{
        width: "100%",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        paddingBottom: 40,
      }}
    >
      <Button
        buttonStyle={styles.deleteButtons}
        loading={isLoading}
        onPress={handleDelete}
      >
        Deletar
      </Button>
      <Button
        buttonStyle={{
          ...styles.button,
          height: "auto",
          marginTop: 20,
        }}
        onPress={onClose}
      >
        Cancelar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
  },
  deleteButtons: {
    borderRadius: 20,
    backgroundColor: "#E5383B",
  },
});

export default GroupPage;

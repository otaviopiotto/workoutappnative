import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "@rneui/themed";
import OctIcon from "react-native-vector-icons/Octicons";
import GroupCard from "../../components/exerciseGroupCard";
import { Skeleton, View } from "native-base";
import { TouchableHighlight, StyleSheet, RefreshControl } from "react-native";
import { useAuth } from "../../hooks/auth";
import { getQuery } from "../../services/hooks/getQuery";
import {
  Footer,
  GroupList,
  GroupText,
  GroupView,
  GroupViewSpan,
  Header,
  HeaderContainer,
  HeaderHeading,
  HeaderSpan,
  Heading,
  Img,
  Main,
  ScrollMain,
  WithoutGroupView,
} from "./styles";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const defualtImg =
  "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

const HomeHeader = () => {
  const { user } = useAuth();
  const today = new Date().getHours();

  return (
    <HeaderContainer>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Img
          source={{
            uri: user?.profile_picture?.url || defualtImg,
          }}
        />
      </View>
      <View style={{ marginLeft: 10, alignSelf: "center" }}>
        <HeaderSpan>
          {today > 5 && today < 11
            ? "Bom Dia"
            : today > 11 && today < 18
            ? "Boa Tarde"
            : "Boa Noite"}
        </HeaderSpan>

        <HeaderHeading>{user.name}</HeaderHeading>
      </View>
    </HeaderContainer>
  );
};

const Home = ({ navigation, route }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState([]);

  const { data, refetch, isFetching, isLoading } = getQuery(
    `user/${user._id}`,
    ["user", user._id]
  );

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      setGroup(data.group);
      refetch();
    }
  }, [data]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Main>
      <ScrollMain
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <ReactButton
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <HomeHeader />
          </ReactButton>
        </Header>

        <Heading>Meus Treinos</Heading>
        <GroupView>
          <GroupViewSpan>Treinos</GroupViewSpan>

          <TouchableHighlight>
            <ReactButton
              onPress={() => navigation.navigate("AddGroup", { id: null })}
              buttonStyle={{
                backgroundColor: "transparent",
                paddingLeft: 0,
                paddingRight: 0,
                padding: 0,
              }}
            >
              <OctIcon name="plus" size={16} color="#B1A7A6" />
            </ReactButton>
          </TouchableHighlight>
        </GroupView>
        <GroupList>
          {!group.length && (!loading || !isLoading) && (
            <WithoutGroupView>
              <GroupText>
                Você ainda não tem treinos, comece um agora!
              </GroupText>
              <ReactButton
                onPress={() => navigation.navigate("AddGroup", { id: null })}
                buttonStyle={{
                  width: 90,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 99,
                  paddingTop: 26,
                  paddingBottom: 26,
                }}
              >
                <OctIcon name="plus" size={30} color="white" />
              </ReactButton>
            </WithoutGroupView>
          )}

          {loading || isLoading
            ? [1, 2, 3, 4, 5].map((_, i) => (
                <Skeleton
                  h="20"
                  borderRadius={20}
                  key={i}
                  mt="4"
                  startColor="#0B090A"
                />
              ))
            : group.map((e: any, i) => (
                <GroupCard group_data={e} navigation={navigation} key={i} />
              ))}
        </GroupList>
      </ScrollMain>
      <Footer>
        <ReactButton
          buttonStyle={{ ...styles.button, paddingLeft: 10, paddingRight: 10 }}
        >
          <OctIcon name="home" size={22} color="white" />
        </ReactButton>
        <ReactButton
          buttonStyle={{ ...styles.button, paddingLeft: 10, paddingRight: 10 }}
          onPress={() => navigation.navigate("AddGroup", { id: null })}
        >
          <OctIcon name="plus" size={22} color="white" />
        </ReactButton>
        <ReactButton
          buttonStyle={{ ...styles.button, paddingLeft: 10, paddingRight: 10 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <OctIcon name="person" size={22} color="white" />
        </ReactButton>
      </Footer>
    </Main>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
    paddingLeft: 0,
  },
});

export default Home;

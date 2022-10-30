import React from "react";
import { useAuth } from "../../hooks/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { Button } from "@rneui/themed";
import { Footer, Main } from "../home/styles";
import {
  Heading,
  Hero,
  ProfileIMG,
  Span,
  UserContainer,
  Header,
} from "./styles";

const defualtImg =
  "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

const Profile = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const handleChoosePhoto = async () => {
    await launchImageLibrary({ mediaType: "mixed" }, (response) =>
      console.log(response)
    );
  };

  return (
    <Main>
      <Header>
        <Button buttonStyle={styles.button} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="white" />
        </Button>
        <Button buttonStyle={styles.button} onPress={() => signOut()}>
          <Icon name="sign-out" size={18} color="white" />
        </Button>
      </Header>

      <Hero>
        <ProfileIMG
          source={{
            uri: user?.profile_picture?.url || defualtImg,
          }}
          style={[styles.shadowProp]}
        />
        {/* <Button buttonStyle={styles.button} onPress={() => handleChoosePhoto()}>
          <Icon name="image" size={18} color="white" />
        </Button> */}
      </Hero>

      <UserContainer style={[styles.shadowProp]}>
        <Heading>{user.name}</Heading>
        <Span>{user.username}</Span>
      </UserContainer>

      <Footer>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={22} color="white" />
        </Button>
      </Footer>
    </Main>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "transparent",
    color: "white",
  },
  shadowProp: {
    shadowColor: "red",
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});

export default Profile;

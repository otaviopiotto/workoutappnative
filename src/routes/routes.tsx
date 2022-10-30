import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupPage from "../pages/group";
import Home from "../pages/home";
import ExercisePage from "../pages/exercise";
import AddGroup from "../pages/addGroup";
import { AddExercises } from "../pages/addGroup/components/addNewContainer";
import LoginPage from "../pages/login";
import { useAuth } from "../hooks/auth";
import Profile from "../pages/profile";
import RegisterPage from "../pages/register";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { signed } = useAuth();

  if (signed)
    return (
      <NavigationContainer>
        <UserRoute />
      </NavigationContainer>
    );

  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
};

const UserRoute = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="AddGroup" component={AddGroup} />
    <Stack.Screen name="Group" component={GroupPage} />
    <Stack.Screen name="Exercise" component={ExercisePage} />
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="ExerciseModal" component={AddExercises} />
    </Stack.Group>
  </Stack.Navigator>
);

const AuthRoute = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Register" component={RegisterPage} />
  </Stack.Navigator>
);

export default Routes;

import React from "react";
import { theme } from "./src/style/globalStyles";
import { ThemeProvider } from "styled-components";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes/routes";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NativeBaseProvider>
            <Routes />
          </NativeBaseProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

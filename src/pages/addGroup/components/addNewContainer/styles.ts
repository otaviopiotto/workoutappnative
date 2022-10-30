import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const Container = styled.View`
  flex-direction: row;
  margin: 10px 0px;
  background-color: #0a1111;
  padding: 16px 20px;
  border-radius: 20px;
`;

export const ContainerLeftSide = styled.View``;

export const ContainerLeftSideText = styled.Text`
  font: 36px "Poppins";
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerCenterSide = styled.View`
  flex: 1;
  padding: 0 12px;
`;

export const ContainerCenterName = styled.Text`
  ${({ theme }) => theme.fonts.h4};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerCenterListHeader = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: rgba(255, 255, 255, 0.3);
  margin-left: 4px;
`;

export const ContainerCenterListItem = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: ${({ theme }) => theme.colors.pallete[300]};
  margin-left: 4px;
`;

export const ContainerRightSide = styled.View`
  padding: 0;
  justify-content: space-around;
`;

export const buttonStyle = StyleSheet.create({
  button: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 60,
    backgroundColor: "transparent",
  },
  svg: {
    color: "#B1A7A6",
  },
});

export const ExerciseContainer = styled.View`
  height: 100%;
  padding: 80px 20px 50px;
  background: #161a1d;
  position: relative;
`;

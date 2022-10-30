import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const DayView = styled.View`
  flex-direction: row;
  padding: 20px 10px;
  background: rgba(155, 155, 155, 0.09);
  border: 0.5px solid rgba(255, 255, 255, 0.03);
  border-radius: 22px;
`;

export const dayViewButton = StyleSheet.create({
  button: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "transparent",
    marginTop: 20,
    borderRadius: 22,
  },
});

export const DayViewLeft = styled.View`
  flex: 1;
`;
export const DayViewRight = styled.View`
  align-items: center;
  justify-content: center;
`;

export const DayViewTop = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const DayViewHeading = styled.Text`
  font-weight: 900;
  line-height: 20px;
  margin-right: 10px;
  ${({ theme }: any) => theme.fonts.h3_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
`;

export const DayViewBottom = styled.View`
  margin-top: 4px;
  flex-direction: row;
`;

export const DayViewBottomContainer = styled.View`
  margin-top: 4px;
  flex-direction: row;
`;
export const DayViewBottomContent = styled.Text`
  ${({ theme }: any) => theme.fonts.small_regular};
  font-weight: 800;
  color: ${({ theme }: any) => theme.colors.pallete[300]};
  margin-left: 6px;
`;

export const DayViewBottomText = styled.Text`
  ${({ theme }: any) => theme.fonts.small_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
  margin-left: 6px;
`;

export const WorkoutFormView = styled.View`
  width: 100%;
  padding: 20px 10px 110px;
`;

export const WorkoutFormBottom = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 26px;
`;

export const WorkoutFormNumberContainer = styled.View`
  flex-direction: row;
  border: solid 1px rgba(155, 155, 155, 0.09);
  border-radius: 12px;
`;

export const WorkoutInputNumberContainer = styled.View`
  width: 54px;
  height: 46px;
  display: flex;
  border: solid 1px rgba(155, 155, 155, 0.06);
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.pallete[300]};
`;

export const WorkoutFormNumberTitle = styled.Text`
  color: ${({ theme }) => theme.colors.pallete[300]};
  margin-bottom: 8px;
`;

export const inputButtonStyle = StyleSheet.create({
  button: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  input: {
    paddingLeft: 2,
    paddingRight: 2,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(155, 155, 155, 0.09)",
    borderRadius: 0,
    width: 54,
    color: "white",
    textAlign: "center",
    backgroundColor: "transparent",
  },
});

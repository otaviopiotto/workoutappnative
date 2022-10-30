import styled, { css } from "styled-components/native";

export const Hero = styled.View``;

export const HeroHeading = styled.Text`
  ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }: any) => theme.colors.pallete[200]};
  margin-top: 2px;
`;

export const HeroBody = styled.Text`
  ${({ theme }: any) => theme.fonts.small_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
  margin-top: 20px;
`;

export const Body = styled.ScrollView`
  margin: 30px -26px 56px;
`;

interface containerProps {
  focus: boolean;
}

export const DayViewTop = styled.View``;

export const DayViewHeading = styled.Text`
  ${({ theme }) => theme.fonts.h5_regular};
  margin-right: 10px;
  color: ${({ theme }: any) => theme.colors.pallete[100]};
`;

export const DayViewObs = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
`;

export const DayViewBottom = styled.View<containerProps>`
  margin-top: 4px;
  ${(prop) => {
    if (prop.focus) {
      return css``;
    }
    return css`
      flex-direction: row;
    `;
  }}
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

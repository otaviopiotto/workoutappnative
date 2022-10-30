import styled from "styled-components/native";

export const Hero = styled.View``;

export const HeroHeading = styled.Text`
  ${({ theme }: any) => theme.fonts.h3_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
  margin-top: 20px;
`;

export const HeroDescriptionText = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: rgba(155, 155, 155, 0.7);
  margin-top: 30px;
`;
export const HeroBody = styled.Text`
  ${({ theme }: any) => theme.fonts.body_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
  margin-top: 2px;
`;

export const BodyHeader = styled.Text`
  width: 100%;
  margin-top: 30px;
  ${({ theme }) => theme.fonts.small_regular};
  color: rgba(155, 155, 155, 0.7);
`;

export const Body = styled.ScrollView`
  width: 100%;
`;

interface dayProp {
  dayOff: boolean;
}

export const DayView = styled.View`
  width: 100%;
  padding: 12px 10px;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 4px;
`;

export const DayViewLeft = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const DayViewHeading = styled.Text<dayProp>`
  ${({ theme }: any) => theme.fonts.h1};
  color: ${(prop) =>
    prop.dayOff
      ? "rgba(255,255,255,0.05)"
      : ({ theme }) => theme.colors.pallete[300]};
  font-weight: 900;
  line-height: 24px;
  margin-right: 10px;
  align-self: center;
`;

export const DayViewTopView = styled.View`
  flex-direction: row;
  justify-items: center;
`;
export const DayViewTopContent = styled.Text<dayProp>`
  ${({ theme }: any) => theme.fonts.small_regular};
  color: ${(prop) =>
    prop.dayOff
      ? "rgba(255,255,255,0.05)"
      : ({ theme }) => theme.colors.pallete[300]};
  margin-top: 4px;
  align-self: center;
`;

export const DayViewBottom = styled.View`
  flex: 1;
  margin-top: 4px;
`;
export const DayViewBottomContent = styled.Text<dayProp>`
  ${({ theme }) => theme.fonts.h5_bold};
  color: ${(prop) =>
    prop.dayOff
      ? "rgba(255,255,255,0.05)"
      : ({ theme }) => theme.colors.pallete[300]};
`;

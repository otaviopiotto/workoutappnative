import styled, { css } from "styled-components/native";
import { StyleSheet } from "react-native";

export const Main = styled.View`
  padding: 20px 16px;
  height: 100%;
  position: relative;
  background: #161a1a;
`;

export const ScrollMain = styled.ScrollView`
  height: 100%;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Img = styled.Image`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 99px;
  margin-right: 4px;
  z-index: 2;
`;

export const Heading = styled.Text`
  margin-top: 30px;
  word-break: keep-all;
  ${({ theme }) => theme.fonts.h5_bold};
  font: 400 26px "Montserrat";
  color: ${({ theme }) => theme.colors.pallete[200]};
`;

export const GroupView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const WithoutGroupView = styled.View``;

export const GroupText = styled.Text`
  color: ${({ theme }) => theme.colors.pallete[300]};
  text-align: center;
  ${({ theme }) => theme.fonts.h3_regular};
`;

export const GroupList = styled.View`
  padding: 0px 4px;
  margin-top: 20px;
  border-radius: 20px;
`;

export const GroupViewSpan = styled.Text`
  color: ${({ theme }) => theme.colors.pallete[300]};

  ${({ theme }) => theme.fonts.body_semibold};
`;

export const Footer = styled.View`
  padding: 0 30px;
  left: 10px;
  right: 10px;
  position: absolute;
  justify-content: space-between;
  bottom: 10px;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 99px;
  overflow: hidden;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
`;

export const HeaderHeading = styled.Text`
  ${({ theme }) => theme.fonts.body_regular};
  color: ${({ theme }) => theme.colors.pallete[100]};
`;

export const HeaderSpan = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: ${({ theme }) => theme.colors.pallete[300]};
`;

export const imgStyle = StyleSheet.create({
  img: {
    borderColor: "#B1A7A6",
    borderWidth: 3,
  },
});

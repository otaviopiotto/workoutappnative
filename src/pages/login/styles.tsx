import styled from "styled-components/native";

export const Main = styled.View`
  height: 100%;
  padding: 20px 16px;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #161a1d;
`;

export const Container = styled.View`
  width: 100%;
`;

export const ContainerHeading = styled.Text`
  ${({ theme }) => theme.fonts.h5_bold};
  font: 400 26px "Montserrat";
  text-align: center;
  color: ${({ theme }) => theme.colors.pallete[200]};
  margin-bottom: 20px;
`;

import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: auto 0;
`;

export const ContainerHeading = styled.Text`
  ${({ theme }) => theme.fonts.h5_bold};
  font: 400 26px "Montserrat";
  text-align: center;
  color: ${({ theme }) => theme.colors.pallete[200]};
  margin-bottom: 20px;
`;

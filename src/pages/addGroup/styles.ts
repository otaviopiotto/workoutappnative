import styled from "styled-components/native";

export const BodyContainer = styled.ScrollView`
  margin: 0px 0px 60px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const HeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.pallete[300]};
  ${({ theme }) => theme.fonts.small_regular};
  margin: 8px 0 0 -26px;
`;

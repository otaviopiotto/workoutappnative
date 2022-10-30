import styled from "styled-components/native";

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Hero = styled.View`
  padding: 20px 20px 0;
  align-items: center;
  justify-content: center;
`;

export const ProfileIMG = styled.Image`
  width: 135px;
  height: 135px;
  object-fit: cover;
  border-radius: 99px;
`;

export const UserContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.Text`
  ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.pallete[200]};
`;

export const Span = styled.Text`
  ${({ theme }) => theme.fonts.h5_regular};
  color: ${({ theme }) => theme.colors.pallete[300]};
`;

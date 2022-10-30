import styled from "styled-components/native";

export const Card = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 4px;
  border-radius: 12px;
`;

export const LeftView = styled.View`
  padding: 1px 13px 2px;
  border-radius: 8px;
  justify-content: center;
  align-content: center;
  margin-right: 14px;
  background-color: ${({ theme }) => theme.colors.pallete[300]};
`;

export const LeftHeading = styled.Text`
  ${({ theme }) => theme.fonts.h3_bold};
  text-align: center;
  color: ${({ theme }: any) => theme.colors.pallete[900]};
`;

export const LeftSpan = styled.Text`
  font: 8px "Raleway";
  text-align: center;
  color: ${({ theme }: any) => theme.colors.pallete[900]};
`;

export const RightView = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const RightContent = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

export const CardTitle = styled.Text`
  ${({ theme }) => theme.fonts.h5_regular};
  color: ${({ theme }: any) => theme.colors.pallete[100]};
`;

export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const CardContentText = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: ${({ theme }: any) => theme.colors.pallete[300]};
`;

export const CardArrow = styled.Text`
  color: ${({ theme }: any) => theme.colors.pallete[300]};
`;

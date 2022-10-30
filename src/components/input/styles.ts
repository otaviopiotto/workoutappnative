import styled from "styled-components/native";

export const Container = styled.View`
  gap: 4px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.pallete[300]};
  margin-bottom: 8px;
`;
export const ErrorSpan = styled.Text`
  ${({ theme }) => theme.fonts.small_regular};
  color: ${({ theme }) => theme.colors.pallete[400]};
  margin-top: 8px;
`;

export const Input = styled.TextInput`
  padding: 10px 20px;
  background-color: rgba(155, 155, 155, 0.09);
  border-radius: 8px;
  color: white;
`;

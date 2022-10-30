import styled, { css } from "styled-components/native";
import { ButtonProps } from ".";

const linkButton = css<ButtonProps>`
  color: white;
  background-color: transparent;
`;

const buttonSizes = {
  Large: "8px 4px",
  Medium: "5px 2px",
  Small: "1px ",
};

const buttonStyles = {
  Text: linkButton,
};

export const ButtonContainer = styled.Text<ButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: 0.3s;
  position: relative;
  border-radius: 8px;
  color: white;
  padding: ${(props) => buttonSizes[props.size || "Medium"]};

  ${(props) => buttonStyles[props.buttonStyle]};
`;

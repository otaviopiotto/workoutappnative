import React from "react";
import { ButtonContainer } from "./styles";

export interface ButtonProps {
  children: any;
  buttonStyle: "Primary" | "Secondary" | "Dashed" | "Link" | "Text";
  size?: "Large" | "Medium" | "Small";
  disabled?: boolean;
  dangerous?: boolean;
  ghost?: boolean;
  style?: any;
  animation?: boolean;
  loading?: boolean;
}

const Button = ({ children, size = "Medium", ...props }: ButtonProps) => {
  return <ButtonContainer {...{ ...props, size }}>{children}</ButtonContainer>;
};

export default Button;

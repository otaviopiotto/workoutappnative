import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Container, ErrorSpan, Input, Label } from "./styles";

interface InputProps extends Partial<TextInputProps> {
  name: any;
  control: any;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
  id?: string;
  disabled?: boolean;
  affix?: {
    prefix?: any;
    suffix?: any;
  };
  error?: string;
  register?: any;
  required?: boolean;
  isLoading?: boolean;
  style?: any;
}

const InputComponent = ({
  label,
  name,
  control,
  rules,
  error,
  ...props
}: InputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#B1A7A6"
            {...props}
          />
        )}
      />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </Container>
  );
};

export default InputComponent;

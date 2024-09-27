import { Button as ChakraButton } from "@chakra-ui/react";
import { MouseEventHandler, ReactElement } from "react";

export interface ButtonTypes {
  type?: "submit" | "reset" | "button";
  colorScheme: string;
  text: string;
  click?: MouseEventHandler<HTMLButtonElement>;
  size?: string;
  loadingText?: string;
  isLoading?: boolean;
  rightIcon?: ReactElement;
  width?: string;
}
const Button = ({ type = "submit", colorScheme = "primary", text, click, size = "md", loadingText, isLoading, rightIcon, ...rest }: ButtonTypes) => {
  return (
    <ChakraButton
      type={type}
      colorScheme={colorScheme}
      size={size}
      onClick={click}
      p='16px'
      rightIcon={rightIcon}
      loadingText={loadingText}
      isLoading={isLoading}
      fontSize={"sm"}
      {...rest}>
      {text}
    </ChakraButton>
  );
};

export default Button;

import { Input as ChakraInput, FormControl, FormLabel, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Fragment, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getNestedErrorByPath } from "../utils/getNestedError";
import InputErrorMessage from "./InputErrorMessage";

interface InputTypes {
  name: string;
  label: string;
  type: "text" | "file" | "email" | "password" | "number";
  disabled?: boolean;
  onChange?: (payload: string) => void;
  inputIcon?: ReactNode;
}

const Input = ({ name, label, type, disabled, onChange, inputIcon, ...rest }: InputTypes) => {
  const { control, formState } = useFormContext();
  const fieldErrors = getNestedErrorByPath(formState.errors, name);

  return (
    <Fragment>
      <FormControl isInvalid={!!fieldErrors}>
        {label && (
          <FormLabel ml={"5px"} fontSize={"sm"} fontFamily={"poppins"}>
            {label}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <InputGroup>
              {inputIcon && <InputLeftElement h={"45px"}>{inputIcon}</InputLeftElement>}
              <ChakraInput
                {...field}
                h={"45px"}
                w={"400px"}
                type={type}
                placeholder={label}
                fontFamily={"poppins"}
                fontSize={"sm"}
                disabled={disabled}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  onChange?.(event.target.value);
                }}
                onBlur={() => {
                  field.onBlur();
                  if (onChange) {
                    onChange(field.value);
                  }
                }}
                value={field.value || ""}
                {...rest}
              />
            </InputGroup>
          )}
        />
        <InputErrorMessage message={fieldErrors?.message} />
      </FormControl>
    </Fragment>
  );
};

export default Input;

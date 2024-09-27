import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getNestedErrorByPath } from "../utils/getNestedError";
import InputErrorMessage from "./InputErrorMessage";

export interface SelectTypes {
  onChange?: (payload: string) => string;
  name: string;
  options: {
    value: string;
    text: string;
  }[];
  placeholder: string;
  label?: string;
}

const SelectComponent = ({ onChange, name, options, placeholder, label }: SelectTypes) => {
  const { control, formState } = useFormContext();
  const fieldErrors = getNestedErrorByPath(formState.errors, name);

  return (
    <Fragment>
      <FormControl isInvalid={!!fieldErrors}>
        {label && (
          <FormLabel ml={"2px"} color={"black"}>
            {label}
          </FormLabel>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Fragment>
              <Select
                {...field}
                w={"400px"}
                height={"48px"}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  onChange?.(event.target.value);
                }}
                placeholder={placeholder}
                value={field.value}>
                {options?.map((option: { value: string; text: string }, index: number) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Select>
            </Fragment>
          )}
        />
        <InputErrorMessage message={fieldErrors?.message} />
      </FormControl>
    </Fragment>
  );
};

export default SelectComponent;

import { FormErrorMessage, Text } from "@chakra-ui/react";
import { PiWarningCircle } from "react-icons/pi";

const InputErrorMessage = ({ message }: { message: string }) => {
  return message ? (
    <FormErrorMessage fontSize={"12px"}>
      <PiWarningCircle />
      <Text ml={1}>{message}</Text>
    </FormErrorMessage>
  ) : null;
};

export default InputErrorMessage;

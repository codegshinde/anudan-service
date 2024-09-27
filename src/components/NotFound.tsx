import { Box, Center, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { NotFoundSvg } from "./NotFoundSvG";

export default function NotFound() {
  return (
    <Fragment>
      <Center height='100vh'>
        <Box textAlign='center'>
          <NotFoundSvg width={"300px"} height={"200px"} />
          <Text fontSize='2xl' mt={4} fontWeight='bold' mb={2}>
            पेज सापडले नाही
          </Text>
          <Text fontSize='lg' color='gray.500'>
            तुम्हाला जे पेज पाहिजे ते या वेळी उपलब्ध नाही
          </Text>
          <ChakraLink as={Link} to='/' color='blue.500' mt={4}>
            होम पेज वर परत जा
          </ChakraLink>
        </Box>
      </Center>
    </Fragment>
  );
}

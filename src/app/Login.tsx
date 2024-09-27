import { Avatar, Box, Heading, Icon, Spacer, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";
import farmer from "../assets/farmer-1.png";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import useRouting from "../hooks/useRouting";
import { authSchema } from "../schema/loginSchema";
import { authService } from "../services/apiService";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useRouting();
  const toast = useToast(); // Use toast from Chakra UI

  const handleLogin = async (formData: any) => {
    console.log();
    try {
      setIsLoading(true);
      const response = await authService(formData);

      if (!response) {
        toast({
          title: "लॉगईन करता आले नाही कृपया परत लॉगईन करा",
          position: "bottom-right",
          status: "error",
          variant: "left-accent",
        });
      }

      toast({
        title: "लॉगईन झाले आहे, मुख्य पेज वर नेत आहे",
        position: "bottom-right",
        status: "success",
        variant: "left-accent",
      });

      setIsLoading(false);

      navigateTo("/");
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: error.message,
        position: "bottom-right",
        status: "error",
        variant: "left-accent",
      });
    }
  };

  return (
    <Fragment>
      <Box
        bg='#fff'
        borderRadius='md'
        p='6'
        width='500px'
        height='620px'
        boxShadow='lg'
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}>
        <VStack spacing='8' p={8}>
          <Avatar size='2xl' name='Segun Adebayo' src={farmer} />

          <Heading size={"md"} fontFamily={"poppins"} textAlign={"center"} w={"400px"}>
            लॉगईन करा
          </Heading>

          <Form formSchema={authSchema} onSubmit={handleLogin}>
            <VStack spacing={4}>
              <Input inputIcon={<FaPhone />} name={"mobile"} label={"मोबईल"} type={"text"} />
              <Input inputIcon={<FaLock />} name={"password"} label={"पासवर्ड"} type={"password"} />
              <Spacer />

              <Button
                colorScheme={"green.800"}
                text={"लॉगईन करा"}
                rightIcon={<Icon as={MdLogin} />}
                width='400px'
                loadingText='लॉगईन होत आहे'
                isLoading={isLoading}
              />
            </VStack>
          </Form>
        </VStack>
      </Box>
    </Fragment>
  );
}

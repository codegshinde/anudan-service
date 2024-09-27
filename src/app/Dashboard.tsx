import { Avatar, Box, Heading, Icon, Spacer, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { PiIdentificationCardThin } from "react-icons/pi";
import { Fragment } from "react/jsx-runtime";
import farmer from "../assets/farmer-1.png";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { vkNumberSearchSchema } from "../schema/vkNumberSearchSchema";
import { vkNumberSearchService } from "../services/apiService";
import { IFarmer } from "../types";
import { FarmerVkNumberList } from "./components/Model";

export default function Dashboard() {
  const toast = useToast();
  const [isOpen, SetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [farmers, setFarmers] = useState<IFarmer[]>([]);


  const handleSearching = async (formData: any) => {
    try {
      setIsLoading(true);
      const response = await vkNumberSearchService(formData);

      if (!response) {
        toast({
          title: "vk number not found please try again later!",
          position: "bottom-right",
          status: "error",
          variant: "left-accent",
        });
      }

      toast({
        title: "तुमचा विशिष्ट क्रमांक मिळाला आहे",
        position: "bottom-right",
        status: "success",
        variant: "left-accent",
      });

      setIsLoading(false);
      setFarmers(response);
      SetOpen(true);
      
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

  const onClose = () => {
    SetOpen(false);
  };
  return (
    <Fragment>
      <Box
        bg='#fff'
        borderRadius='md'
        p='6'
        width='500px'
        height='600px'
        boxShadow='lg'
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}>
        <VStack spacing='8' p={8}>
          <Avatar size='2xl' name='Segun Adebayo' src={farmer} />

          <Heading size={"sm"} fontFamily={"poppins"} textAlign={"center"} w={"400px"} lineHeight={8}>
            <Icon as={MdInfo} boxSize={4} /> आपल्या आधार कार्ड द्वारे विशिष्ट क्रमांक मिळवा
          </Heading>

          <Form formSchema={vkNumberSearchSchema} onSubmit={handleSearching}>
            <VStack spacing={4}>
              <Input inputIcon={<PiIdentificationCardThin />} name={"aadhaarNumber"} label={"आधार कार्ड नंबर"} type={"number"} />
              <Spacer />
              <Button
                colorScheme={"Orange.300"}
                text={"विशिष्ट क्रमांक शोधा"}
                rightIcon={<Icon as={FaSearch} />}
                width='400px'
                type='submit'
                loadingText='विशिष्ट क्रमांक शोधत आहे'
                isLoading={isLoading}
              />
            </VStack>
          </Form>
        </VStack>
      </Box>
      <FarmerVkNumberList isOpen={isOpen} onClose={onClose} farmers={farmers} setFarmers={setFarmers} />
    </Fragment>
  );
}

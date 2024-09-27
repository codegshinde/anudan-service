import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import aapleSarkar from "../assets/aaple-sarkar.png";
import bg from "../assets/bg.png";
import tehsilMitra from "../assets/logo.png";

const Layout = () => {
  return (
    <Box width='100vw' height='100vh' position='relative'>
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        backgroundImage={bg}
        backgroundSize='cover'
        backgroundPosition='center'
        zIndex='-1'
      />

      <Flex justifyContent='space-around' pt={100}>
        <VStack spacing='4' direction={"row"}>
          <HStack spacing='10' mt='12'>
            <Image src={tehsilMitra} w={115} />
            <Image src={aapleSarkar} w={115} />
          </HStack>
        </VStack>

        <Outlet />
      </Flex>
      {/* <HStack p={4} background={"#fff"} justifyContent={"center"} w={"100%"} position={"absolute"} bottom={10} textAlign={"center"}>
        <Text color={"red.500"}>
          कॉपीराइट © २०२४ तहसिलमित्र, हे लक्षात ठेवा: हा उपक्रम सरकारी अधिकृत वेबसाइट नाही. आम्ही लोकांना त्यांच्या KYC प्रक्रियेत सुलभता प्रदान
          करण्याच्या हेतूने कार्यरत आहोत. आमचा उद्देश सर्वांना सोयीस्कर सेवा प्रदान करणे आहे.
        </Text>
      </HStack> */}
    </Box>
  );
};

export default Layout;

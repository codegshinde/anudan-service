import {
  Avatar,
  Box,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbCopy } from "react-icons/tb";
import farmerLogo from "../../assets/farmer-2.png";
import { processTransaction } from "../../services/apiService";
import { IFarmer } from "../../types";

interface FarmerVkNumberModalProps {
  farmers: IFarmer[];
  onClose: () => void;
  size?: string;
  isOpen: boolean;
  setFarmers: Function;
}

export function FarmerVkNumberList({ farmers, onClose, isOpen, setFarmers }: FarmerVkNumberModalProps) {
  const toast = useToast(); // Ensure this is called at the top level of the component
  const [loadingId, setLoadingId] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headerBgColor = useColorModeValue("orange.300", "orange.500");
  const headerTextColor = useColorModeValue("black", "gray.800");

  // Function to copy the VK number
  const handleTransaction = async (farmerId: string) => {
    try {
      setLoadingId(farmerId);
      // Call the API to process the transaction
      const response = await processTransaction(farmerId);

      if (response.status === "success") {
        // Update the farmers array with the actual VK number
        const updatedFarmers = farmers.map((farmer) => {
          if (farmer.farmerId === farmerId) {
            return { ...farmer, vkNumber: response.vkNumber }; // Update the VK number
          }
          return farmer;
        });

        setFarmers(updatedFarmers); // Update the state with the new farmers array

        // Copy the actual VK number to the clipboard
        navigator.clipboard.writeText(response.vkNumber);

        // Show success toast
        toast({
          position: "bottom-right",
          title: "विशिष्ट क्रमांक कॉपी केला!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setLoadingId("");
      } else {
        setLoadingId("");
        // Handle API failure
        toast({
          position: "bottom-right",
          title: "Failed to retrieve VK Number. Try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoadingId("");
      // Handle any errors during the API call
      toast({
        position: "bottom-right",
        title: "An error occurred. Please try again.",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg={bgColor} borderRadius='lg' overflow='hidden'>
        <ModalHeader textAlign='center' bg={headerBgColor} color={headerTextColor} p={8} fontSize='2xl' fontWeight='bold'>
          आपला विशिष्ट क्रमांक खालील प्रमाणे
        </ModalHeader>
        <ModalCloseButton color={headerTextColor} />
        <ModalBody p={6}>
          <VStack spacing={6} align='stretch'>
            <Box textAlign='center'>
              <Avatar size='xl' mb={4} src={farmerLogo} />
              <Heading size={"md"} mb={3}>
                {farmers && farmers[0]?.farmerName?.toLocaleUpperCase()}
              </Heading>
              <Heading size={"sm"}>विशिष्ट क्रमांक आणि शेताचे शिवार</Heading>
            </Box>

            <Box overflowX='auto' height={"300px"}>
              <Table variant='simple' size='md' width='100%'>
                <Thead>
                  <Tr bg={useColorModeValue("gray.100", "gray.700")}>
                    <Th> विशिष्ट क्रमांक </Th>
                    <Th> शिवार </Th>
                    <Th> कॉपी करा </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {farmers.map((farmer) => (
                    <Tr key={farmer.farmerId} _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}>
                      <Td>{farmer.vkNumber}</Td>
                      <Td>{farmer.village.toUpperCase()}</Td>
                      <Td>
                        <IconButton
                          key={farmer.farmerId}
                          aria-label='Copy VK Number'
                          icon={<TbCopy />}
                          onClick={() => handleTransaction(farmer.farmerId)}
                          size='sm'
                          colorScheme='blue'
                          variant='ghost'
                          isLoading={loadingId === farmer.farmerId}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter bg={useColorModeValue("gray.50", "gray.700")} borderTop='1px' borderColor={useColorModeValue("gray.200", "gray.600")}>
          <Text fontSize='sm' color={textColor}>
            कृपया लक्षात ठेवा: विशिष्ट क्रमांक गोपनीयतेसाठी आणि पेमेंट प्रक्रियेसाठी लपवलेले आहेत. "कॉपी" बटणावर क्लिक केल्यास, तुमच्या वॉलेटमधून
            रक्कम वजा होईल आणि विशिष्ट क्रमांक दर्शविला जाईल.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

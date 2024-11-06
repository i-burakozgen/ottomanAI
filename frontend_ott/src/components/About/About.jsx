import {
  Box,
  Heading,
  Link as ChakraLink,
  Text,
  Button,
  VStack,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import {aboutData } from "../../assets/homeData";
import { Link } from "react-router-dom";


const About = () => {
  const aboutBgColor = useColorModeValue("blue.300", "blue.900");
  return (
    <Box py={16} px={8} bg={aboutBgColor} color="white" textAlign="center">
      <Heading as="h2" size="2xl" mb={6}>
        About Us
      </Heading>
      <Text fontSize="xl" mb={8}>
        {aboutData[0].text}
         <ChakraLink as={Link} to="/contact" color="red.200" ml={1}>
          contact me
        </ChakraLink> 
      </Text>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
        <VStack>
          <Image
            src={aboutData[0].linkdinData.image}
            alt={aboutData[0].linkdinData.alt}
            borderRadius="full"
            boxSize={"150px"}
            objectFit="cover"
          />
          <Text fontWeight="bold" fontSize="lg">
            İsmail Burak Özgen
          </Text>
          
        </VStack>
        
      </SimpleGrid>
    </Box>
  );
};

export default About;

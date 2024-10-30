import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { featuersData } from "../../assets/homeData";

const Features = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const aiImage =
    colorMode === "light"
      ? featuersData[0].aiData.imageDark
      : featuersData[0].aiData.imageLight;
  const dictImage =
    colorMode === "light"
      ? featuersData[0].dictionaryData.imageDark
      : featuersData[0].dictionaryData.imageLight;

  // Access the color mode
  const sectionBgColor = useColorModeValue("gray.200", "gray.900");

  return (
    <Box py={16} px={8} bg={sectionBgColor} textAlign="center">
      <Heading as="h2" size="2xl" mb={6}>
        Features
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <VStack>
          <Link onClick={() => navigate("/ai")} style={{ cursor: "pointer" }}>
            <Heading as="h3" size="lg">
              {featuersData[0].aiData.aiHeading}
            </Heading>
          </Link>
          <Text textAlign="center">{featuersData[0].aiData.aiText}</Text>
        </VStack>
        <VStack>
          <Link onClick={() => navigate("/dictionary")} style={{ cursor: "pointer" }}>
            <Heading as="h3" size="lg">
              {featuersData[0].dictionaryData.dictHeading}
            </Heading>
          </Link>
          <Text textAlign="center">{featuersData[0].dictionaryData.dictText}</Text>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Features;

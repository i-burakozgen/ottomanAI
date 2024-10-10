import React from "react";
import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";

const DictionaryCard = ({ word, meanings, transliterations }) => {
    const { colorMode } = useColorMode();
    
    return (
      <Box
        id="box"
        borderWidth="1px"
        borderRadius="lg"
        p={6}  // Increase padding
        shadow="md"
        bg={colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.800"}
        borderColor={colorMode === "dark" ? "whiteAlpha.400" : "gray.300"}
        maxW="full"  // Set a maximum width
        width="100%"   // Ensure it takes full width of the container
      >
        <Heading as="h3" size="md" mb={2}>
          {word}
        </Heading>
  
        {/* Render meanings */}
        {meanings.map((meaning, index) => (
          <Text key={index} fontSize="sm" mb={1}>
            <strong>Meaning {index + 1 }.</strong> {meaning}
          </Text>
        ))}
  
        {transliterations.map((transliteration, index) => (
          <Text key={index} fontSize="sm" color={colorMode === "dark" ? "whiteAlpha.700" : "gray.600"}>
            <strong>Transliteration:</strong> {transliteration.persiantransliterationName}
          </Text>
        ))}
      </Box>
    );
  };
  
  export default DictionaryCard;
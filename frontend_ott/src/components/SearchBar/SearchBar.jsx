import React from "react";
import { Box, Input, Text, Button, HStack, useColorMode } from "@chakra-ui/react";

const SearchBar = ({ query, setQuery, placeholder, onSearch }) => {
  const { colorMode } = useColorMode();

  // Trigger search on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Box mb={4}>
      <Text mb={2} fontSize="lg">
        Enter the word you want to search for (in Ottoman or Turkish):
      </Text>
      <HStack>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          bg={colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.800"}
          borderColor={colorMode === "dark" ? "whiteAlpha.400" : "gray.300"}
          color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
          _placeholder={{ color: colorMode === "dark" ? "whiteAlpha.600" : "gray.500" }}
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <Button colorScheme="teal" onClick={onSearch}>
          Search
        </Button>
      </HStack>
    </Box>
  );
};

export default SearchBar;

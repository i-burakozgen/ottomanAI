import React, { useState } from "react";
import { Input, Button, Box, Text, List, ListItem, Heading, Divider, Select } from "@chakra-ui/react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("latin"); // Default to Latin search
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const endpoint = searchType === "latin"
      ? `/dictionary/dictionary_ns/words/${searchTerm}`
      : `/dictionary/dictionary_ns/transliteration_ottoman/${searchTerm}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setSearchResults(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      console.error("Search error:", err);
    }
  };

  return (
    <Box width="400px" mx="auto">
      <Heading size="lg" mb={4} textAlign="center">
        Search the Dictionary
      </Heading>

      {/* Dropdown for selecting search type */}
      <Select
        mb={4}
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="latin">Latin Written Word</option>
        <option value="ottoman">Ottoman Written Word</option>
      </Select>

      <Input
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <Button onClick={handleSearch} colorScheme="blue" width="full" mb={4}>
        Search
      </Button>

      {error && (
        <Text color="red.500" fontSize="sm" textAlign="center" mb={4}>
          {error}
        </Text>
      )}

      {searchResults && (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg="gray.50"
          mt={4}
        >
          <Heading size="md" mb={4} textAlign="center">
            Search Results
          </Heading>

          <Divider mb={4} />

          <Box>
            <Text fontWeight="bold">Word Name:</Text>
            <Text mb={4}>{searchResults.WordName}</Text>

            {searchResults.Meanings && (
              <>
                <Text fontWeight="bold">Meanings:</Text>
                <List spacing={2} mb={4}>
                  {searchResults.Meanings.map((meaning, index) => (
                    <ListItem key={index} ml={4} fontSize="sm">
                      - {meaning}
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {searchResults.PersianTransliterations && (
              <>
                <Text fontWeight="bold">Persian Transliteration:</Text>
                <List spacing={2} mb={4}>
                  {searchResults.PersianTransliterations.map((transliteration, index) => (
                    <ListItem key={index} ml={4} fontSize="sm">
                      - {transliteration}
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {searchResults.Variations && searchResults.Variations.length > 0 && (
              <>
                <Text fontWeight="bold">Variations:</Text>
                <List spacing={2} mb={4}>
                  {searchResults.Variations.map((variation, index) => (
                    <ListItem key={index} ml={4} fontSize="sm">
                      - {variation}
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;

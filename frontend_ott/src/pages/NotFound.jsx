import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bgGradient="linear(to-r, teal.800, blue.900)" // Updated to darker colors
      color="white"
      textAlign="center"
      p={4}
    >
      <VStack spacing={4}>
        <Heading as="h1" size="4xl">
          404
        </Heading>
        <Text fontSize="xl">
          Oops! The page you are looking for does not exist.
        </Text>
        <Button 
          colorScheme="teal" 
          size="lg" 
          onClick={() => navigate('/')}
        >
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;

import { 
  Box, Heading, Text, Button, VStack, HStack, useColorMode, useColorModeValue 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { heroData } from '../../assets/homeData';

const Hero = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const heroBgGradient = useColorModeValue(
    "linear(to-r, teal.400, blue.500)",
    "linear(to-r, teal.800, blue.900)"
  );
  const heroTextColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      minHeight="100vh"
      bgGradient={heroBgGradient}
      color={heroTextColor}
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={8}
      py={{ base: 20, md: 24 }}
    >
      <VStack spacing={6} maxW="container.md">
        <Heading 
          as="h1" 
          size="2xl" 
          fontWeight="bold" 
          mb={2} 
          lineHeight="shorter"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          {heroData[0].heading}
        </Heading>
        
        <Text fontSize="lg" fontWeight="medium" mb={4} maxW="md">
          {heroData[0].text}
        </Text>
        
        <HStack spacing={4}>
          <Button
            size="lg"
            bgGradient="linear(to-r, teal.300, teal.500)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, teal.400, teal.600)" }}
            onClick={() => navigate('/ai-translate')}
            shadow="md"
          >
            {heroData[0].buttonTextAi}
          </Button>
          <Button
            size="lg"
            bgGradient="linear(to-r, blue.300, blue.500)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, blue.400, blue.600)" }}
            onClick={() => navigate('/dictionary')}
            shadow="md"
          >
            {heroData[0].buttonTextDict}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Hero;

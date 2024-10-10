import { 
    Box, Heading, Text, Button, VStack, HStack, Link, Image, SimpleGrid, useColorMode, useColorModeValue 
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { heroData } from '../../assets/homeData';
const Hero = () => {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const heroBgGradient = useColorModeValue("linear(to-r, teal.400, blue.800)", "linear(to-r, teal.800, blue.900)");
    const heroTextColor = useColorModeValue("gray.800", "white");
  return (
    <Box
        bgGradient={heroBgGradient}
        color={heroTextColor}
        textAlign="center"
        py={16}
        px={8}
      >
        <Heading as="h1" size="3xl" mb={4}>
          {heroData[0].heading}
        </Heading>
        <Text fontSize="xl" mb={8}>
        {heroData[0].text}
        </Text>
        <HStack spacing={4} justify="center">
          <Button colorScheme="teal" size="lg" onClick={() => navigate('/ai-translate')}>
          {heroData[0].buttonTextAi}
          </Button>
          <Button colorScheme="blue" size="lg" onClick={() => navigate('/dictionary')}>
          {heroData[0].buttonTextDict}
          </Button>
        </HStack>
      </Box>
  )
}

export default Hero

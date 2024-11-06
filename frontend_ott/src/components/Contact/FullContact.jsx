import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const FullContact = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = inputs;
    
        const mailtoLink = `mailto:iburak.ozdev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
    
        window.location.href = mailtoLink;
        setInputs({ name: "", email: "", subject: "", message: "" });
      };
    
      // Define background and text color based on light or dark mode
      const bg = useColorModeValue("white", "gray.700");
      const color = useColorModeValue("gray.800", "white");
      const inputBg = useColorModeValue("gray.100", "gray.600");
    
      return (
        <Flex
          direction="column"
          alignItems="center"
          minH="100vh"
          bg={useColorModeValue("gray.50", "gray.800")}
          p={4}
        >
          <Box
            width={{ base: "90%", md: "50%", lg: "40%" }}
            p={8}
            bg={bg}
            color={color}
            borderRadius="lg"
            boxShadow="md"
          >
            <VStack spacing={6} align="stretch">
              <Heading as="h1" size="xl" color="teal.400" textAlign="center">
                Contact Me
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")} textAlign="center">
                Fill out the form below and get in touch with me
              </Text>
              
              <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Input
                    placeholder="Name"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    required
                    bg={inputBg}
                    color={color}
                    variant="filled"
                    focusBorderColor="teal.400"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                    bg={inputBg}
                    color={color}
                    variant="filled"
                    focusBorderColor="teal.400"
                  />
                  <Input
                    placeholder="Subject"
                    name="subject"
                    value={inputs.subject}
                    onChange={handleChange}
                    bg={inputBg}
                    color={color}
                    variant="filled"
                    focusBorderColor="teal.400"
                  />
                  <Textarea
                    placeholder="Message"
                    name="message"
                    value={inputs.message}
                    onChange={handleChange}
                    required
                    bg={inputBg}
                    color={color}
                    variant="filled"
                    focusBorderColor="teal.400"
                  />
                  <Button type="submit" colorScheme="teal" width="full" size="lg">
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Flex>
      );
};

export default FullContact;

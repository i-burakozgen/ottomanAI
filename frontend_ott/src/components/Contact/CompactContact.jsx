import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, useColorModeValue } from "@chakra-ui/react";

const CompactContact = () => {
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

  const bg = useColorModeValue("gray.200", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const inputBg = useColorModeValue("gray.200", "gray.800"); 
  const inputTextColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      width="100%"
      maxWidth="600px"
      p={8} 
      bg={bg}
      color={color}
      borderRadius="lg"
      boxShadow="lg"
      m="auto"
      mt={12} 
      mb={12} 
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg" color="teal.500" textAlign="center">
          Contact Me
        </Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Input
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              bg={inputBg}
              color={inputTextColor}
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
              color={inputTextColor}
              variant="filled"
              focusBorderColor="teal.400"
            />
            <Input
              placeholder="Subject"
              name="subject"
              value={inputs.subject}
              onChange={handleChange}
              bg={inputBg}
              color={inputTextColor}
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
              color={inputTextColor}
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
  );
};

export default CompactContact;

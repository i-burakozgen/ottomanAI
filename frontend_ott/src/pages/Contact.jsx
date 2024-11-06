import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Flex } from "@chakra-ui/react";

const Contact = () => {
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

    // Construct the mailto link
    const mailtoLink = `mailto:iburak.ozdev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open the user's email client
    window.location.href = mailtoLink;

    // Optionally, reset the form
    setInputs({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Flex
      direction={"column"}
      margin={"auto"}
      border={"1px solid gray"}
      borderRadius={4}
      justifyContent={"center"}
      minH={"100vh"}
    >
      <Box as="form" p={4} onSubmit={handleSubmit} borderRadius="lg">
        <VStack spacing={4}>
          <Input
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Subject"
            name="subject"
            value={inputs.subject}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Message"
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" colorScheme="teal">
            Contact Me
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Contact;

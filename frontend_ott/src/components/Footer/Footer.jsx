import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { footerData } from "../../assets/homeData";
const Footer = () => {
  const footerBgColor = useColorModeValue("gray.200", "gray.900");
  const footerTextColor = useColorModeValue("gray.700", "white");

  return (
    <Box
      py={8}
      px={8}
      bg={footerBgColor}
      color={footerTextColor}
      textAlign="center"
    >
      {/* Mapping through the footer data to display text and links */}
      {footerData.map((item, index) => (
        <Box key={index} mb={4}>
          <Text fontSize="sm" mb={2}>
            {item.text}
          </Text>
          <HStack justify="center" spacing={6}>
            {item.githubLink && (
              <Link href={item.githubLink} isExternal>
                <HStack>
                  <Icon as={FaGithub} boxSize={5} />
                  <Text>GitHub</Text>
                </HStack>
              </Link>
            )}
            {item.linkdinLink && (
              <Link href={item.linkdinLink} isExternal>
                <HStack>
                  <Icon as={FaLinkedin} boxSize={5} />
                  <Text>LinkedIn</Text>
                </HStack>
              </Link>
            )}
          </HStack>
        </Box>
      ))}

      <Text fontSize="sm" mt={8}>
        © 2024 Ottoman AI Transliteration. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;

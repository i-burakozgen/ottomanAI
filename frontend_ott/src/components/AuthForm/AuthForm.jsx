import React, { useState } from "react";
import { Box, VStack, Button, Flex, Text, Image } from "@chakra-ui/react";
import { HStack, Input } from "@chakra-ui/react";
import { authData } from "../../assets/authData";
import Login from "./Login";
import Signup from "./Signup";
import { ArrowBackIcon } from "@chakra-ui/icons"; 
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/"); // Redirect to home page
  };
  

  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
      <Flex justifyContent="flex-start" width="full">
            <Button onClick={handleBack} colorScheme="blue" h={"10"}>
              <ArrowBackIcon />
            </Button>
          </Flex>
        <Image src={authData[0].logo} h={24} cursor={"pointer"} alt="logo"/>
       {!isLogin ? <Login/> : <Signup/>}
        {/* ---or-----*/}
        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
                <Text color={"white"} mx={1}>
                    OR
                </Text>
            
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
            <Image w={5}	src={authData[0].googleLogo} />
            <Text mx="2" color={"blue.500"}>Log in with Google</Text>
        </Flex>
      </VStack>
    </Box>
    <Box border={"1px solid gray"} borderRadius={4} padding={4} >
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
                {!isLogin ? "Don't have an account" : "Already have an account"}
            </Box>
            <Box onClick={ () => setLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                {!isLogin ? "Sign Up": "Log in"}
            </Box>
        </Flex>
    </Box>

    </>
  );
};

export default AuthForm;

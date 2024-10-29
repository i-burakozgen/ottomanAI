import React, { useState } from "react";
import { Box, VStack, Button, Flex, Text, Image } from "@chakra-ui/react";
import { HStack, Input } from "@chakra-ui/react";
import { authData } from "../../assets/authData";
const AuthForm = () => {
  const [isLogin, setLogin] = useState(false);
  const [inputs, setInputs] = useState({
    email:"",
    password:"",
    username:"",
    confirmPassword:"",
  })
  const handleAuth = () => {
    // Only check password matching in signup mode
    if (!isLogin) {
      if (inputs.password !== inputs.confirmPassword) {
        console.log("Passwords do not match.");
        return;
      }
      console.log("Signing up with:", {
        email: inputs.email,
        password: inputs.password,
        username: inputs.username,
      });
    } else {
      console.log("Logging in with:", {
        email: inputs.email,
        password: inputs.password,
      });
    }
  };

  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src={authData[0].logo} h={24} cursor={"pointer"} alt="logo"/>
        <Input placeholder="user@example.com" fontSize={14} type="email" value={inputs.email} onChange={(e) => setInputs({...inputs, email:e.target.value})} />
        <Input fontSize={14} type="password" placeholder="password" value={inputs.password}  onChange={(e) => setInputs({...inputs, password:e.target.value})} />
        {isLogin ? (
          <>
            <Input placeholder="Username" type="username" value={inputs.username}  onChange={(e) => setInputs({...inputs, username:e.target.value})} />
            <Input placeholder="confirm password" type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})} />
          </>
        ) : null}
        <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={"14"} onClick={handleAuth}>
            {isLogin ? "Log in" : "Sign Up"}
        </Button>
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
                {isLogin ? "Don't have an account" : "Already have an account"}
            </Box>
            <Box onClick={ () => setLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                {isLogin ? "Sign Up": "Log in"}
            </Box>
        </Flex>
    </Box>

    </>
  );
};

export default AuthForm;

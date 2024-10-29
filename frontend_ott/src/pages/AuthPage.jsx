import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm/AuthForm";
import { authData } from "../assets/authData";
const AuthPage = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					<Box display={{ base: "none", md: "block" }}>
						{/* app image */}
					</Box>

					{/* Right hand-side */}
					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
						<Box textAlign={"center"}>Coming Soon.</Box>
						<Flex gap={5} justifyContent={"center"}>
            <Image 
								src={authData[0].googlePlayImage} 
								alt="Playstore logo"
                h="40px"
                w="100px"
                objectFit="contain" 

							/>
							<Image 
								src={authData[0].appStoreImage} 
								alt="App Store logo" 
								h="40px"
                w="100px"
                objectFit="contain" 
                />
						</Flex>
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
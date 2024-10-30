import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <Input
        placeholder="user@example.com"
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="username"
        fontSize={14}
        type="text"
        size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <InputGroup>
        <Input
          fontSize={14}
          type={showPassword ? "text" : "password"}
          size={"sm"}
          placeholder="password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <Input
          placeholder="confirm password"
          type={showPassword ? "text" : "password"}
          size={"sm"}
          value={inputs.confirmPassword}
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
        />
        <InputRightElement h="full">
        <Button variant={"ghost"} size={"sm"} onClick={ () => setShowPassword(!showPassword)} >
            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}

        </Button>

        </InputRightElement>
      </InputGroup>
      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={"14"} >
            Sign Up
    </Button>
    </>
  );
};

export default Signup;

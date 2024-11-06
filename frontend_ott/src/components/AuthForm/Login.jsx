import { useState } from "react";
import { Input, Button, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
const Login = ({ onSuccessLogin }) => {
  const { register, handleSubmit,reset, formState: { errors }, trigger } = useForm();

  const onSubmit = async (data) => 
    {
    const body = {
      username: data.username,
      password: data.password,
    };

    
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
      fetch("/auth/login", requestOptions)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        
      })
      

      

      reset()
    
  };

  return (
    <Box width="300px" mx="auto"> {/* Center the form */}
      {loginError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {loginError}
        </Alert>
      )}

      <Box mb={4}>
        <Input
          placeholder="username"
          fontSize={14}
          type="text"
          {...register("username", {
            required: "Username is required",
            maxLength: {
              value: 25,
              message: "Username cannot exceed 25 characters",
            },
          })}
          onBlur={() => trigger("username")}
        />
        {errors.username && (
          <Alert status="error" size="sm" mt={1} fontSize={12}>
            <AlertIcon />
            {errors.username.message}
          </Alert>
        )}
      </Box>

      <Box mb={4}>
        <Input
          fontSize={14}
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          onBlur={() => trigger("password")}
        />
        {errors.password && (
          <Alert status="error" size="sm" mt={1} fontSize={12}>
            <AlertIcon />
            {errors.password.message}
          </Alert>
        )}
      </Box>

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={"14"}
        onClick={handleSubmit(onSubmit)}
      >
        Log in
      </Button>
    </Box>
  );
};

export default Login;

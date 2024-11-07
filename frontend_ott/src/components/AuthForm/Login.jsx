import React, { useState } from "react";
import { Input, Button, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthContext"; 
import { useNavigate } from "react-router-dom";

const Login = ({ onSuccessLogin }) => {
  const { register, handleSubmit, reset, formState: { errors }, trigger } = useForm();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const result = await login(data.username, data.password);
    if (result.success) {
      navigate("/")
      reset();
      if (onSuccessLogin) onSuccessLogin();
    } else {
      setLoginError(result.message || "Login failed");
    }
  };

  return (
    <Box width="300px" mx="auto">
      {loginError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {loginError}
        </Alert>
      )}

      <Box mb={4}>
        <Input
          placeholder="Username"
          fontSize={14}
          type="text"
          {...register("username", {
            required: "Username is required",
            maxLength: { value: 25, message: "Username cannot exceed 25 characters" },
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
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
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

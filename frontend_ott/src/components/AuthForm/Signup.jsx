import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Signup = ({ onSuccessSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      try {
        const response = await fetch("/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (response.status === 201) {
          alert("Signup successful! Please log in.");
          reset();
          onSuccessSignUp();
        } else {
          alert(`Signup failed: ${result.message || "Unknown error"}`);
        }
      } catch (error) {
        alert("Signup failed. Please try again.");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <Box width="300px" mx="auto"> {/* Center the form */}
      <Box mb={4}>
        <Input
          placeholder="user@example.com"
          type="email"
          size={"sm"}
          {...register("email", {
            required: "Email is required",
            maxLength: {
              value: 100,
              message: "Email cannot exceed 100 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          onBlur={() => trigger("email")}
        />
        {errors.email && (
          <Alert status="error" size="sm" mt={1} fontSize={12}>
            <AlertIcon />
            {errors.email.message}
          </Alert>
        )}
      </Box>

      <Box mb={4}>
        <Input
          placeholder="username"
          fontSize={14}
          type="text"
          size={"sm"}
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
        <InputGroup>
          <Input
            fontSize={14}
            type={showPassword ? "text" : "password"}
            size={"sm"}
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
          <InputRightElement h="full">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Alert status="error" size="sm" mt={1} fontSize={12}>
            <AlertIcon />
            {errors.password.message}
          </Alert>
        )}
      </Box>

      <Box mb={4}>
        <Input
          placeholder="confirm password"
          type={showPassword ? "text" : "password"}
          size={"sm"}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          onBlur={() => trigger("confirmPassword")}
        />
        {errors.confirmPassword && (
          <Alert status="error" size="sm" mt={1} fontSize={12}>
            <AlertIcon />
            {errors.confirmPassword.message}
          </Alert>
        )}
      </Box>

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;

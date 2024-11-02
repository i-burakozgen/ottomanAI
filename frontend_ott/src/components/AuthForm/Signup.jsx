import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert"

const Signup = ({onSuccessSignUp}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
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
        console.log("Response data:", result);
        console.log("status code:", response.status);
        if (response.status === 201) {
          alert("Signup successful! Please log in.");
          reset();
          onSuccessSignUp();
        } else {
          console.error("Signup failed:", result);
          alert(`Signup failed: ${result.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Signup failed. Please try again.");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <>
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
        <Alert status="error" title="mail" size="sm">
          {errors.mail.message}
        </Alert>
      )}
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
        <Text color="red.500" fontSize="sm">
          {errors.username.message}
        </Text>
      )}

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
              message: "Password must be at least 8 characters long",
            },
          })}
          onBlur={() => trigger("password")}
        />
        {errors.password && (
          <Text color="red.500" fontSize="sm">
            {errors.password.message}
          </Text>
        )}

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
          <Text color="red.500" fontSize="sm">
            {errors.confirmPassword.message}
          </Text>
        )}

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
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={"14"}
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;

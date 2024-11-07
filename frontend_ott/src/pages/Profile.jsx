import React, { useEffect, useState } from "react";
import { Box, Text, Button, Alert, AlertIcon, Spinner, Avatar, Heading } from "@chakra-ui/react";
import { useAuth } from ".././AuthContext"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai"; // Import a user icon

const Profile = () => {
  const { token, logout } = useAuth(); // Access token and logout function from AuthContext
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/user/profile_view", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user info");

        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError("Could not load user information.");
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  // Handle user deletion
  const handleDeleteUser = async () => {
    try {
      const response = await fetch("/user/delete_user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      logout(); 
      navigate("/auth"); 
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box
      width="400px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
    >
      <Avatar size="xl" icon={<AiOutlineUser fontSize="2rem" />} mb={4} />
      <Heading as="h2" size="lg" mb={2}>
        Welcome, {userInfo?.name || "User"}!
      </Heading>
      <Text fontSize="md" color="gray.600" mb={6}>
        Here is your profile information
      </Text>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {userInfo && (
        <>
          <Text fontSize="lg" fontWeight="bold" mb={2}>Name:</Text>
          <Text fontSize="md" mb={4}>{userInfo.username}</Text>

          <Text fontSize="lg" fontWeight="bold" mb={2}>Email:</Text>
          <Text fontSize="md" mb={4}>{userInfo.email}</Text>

          <Button colorScheme="red" mt={4} onClick={handleDeleteUser}>
            Delete Account
          </Button>
        </>
      )}
    </Box>
  );
};

export default Profile;

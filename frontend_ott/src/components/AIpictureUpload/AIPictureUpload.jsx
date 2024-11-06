import React, { useState, useRef } from "react";
import { Box, VStack, Button, Text, Icon, useColorModeValue, Image, useToast } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";

const AIPictureUpload = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); 
  };

  const removeImage = () => {
    setImage(null);
    setFile(null);
  };

 

  const dropBgColor = useColorModeValue("gray.100", "gray.600");
  const uploadIconColor = useColorModeValue("gray.500", "gray.300");

  const uploadToBackend = async () => {
    if (!file) {
      toast({
        title: "No file selected.",
        description: "Please upload an image before processing.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("photo", file); // 'photo' key must match backend
  
    try {
      const token = localStorage.getItem("token"); // Ensure token is stored locally
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Image uploaded successfully!",
          description: "Your image was sent to the server for processing.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Image path:", data.image_path);
      } else {
        const errorData = await response.json();
        toast({
          title: "Upload failed.",
          description: errorData.message || "There was an error uploading your image.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "There was an error uploading the image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <VStack spacing={6} mt={8} mx="auto" maxW="lg" align="center">
      <Text fontSize="2xl" fontWeight="bold" color="teal.500" mb={4}>
        Upload Image for Transliteration
      </Text>
      <Box
        border="2px dashed"
        borderColor="teal.400"
        borderRadius="md"
        p={6}
        w="100%"
        bg={dropBgColor}
        textAlign="center"
      >
        {image ? (
          <Image src={image} alt="Uploaded Preview" maxH="200px" objectFit="cover" borderRadius="md" mb={4} />
        ) : (
          <>
            <Icon as={FaCloudUploadAlt} w={12} h={12} color={uploadIconColor} mb={4} />
            <Text fontSize="lg" color="gray.500">
              Drag & drop an image here, or click the button below to upload one
            </Text>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button mt={4} colorScheme="teal" onClick={handleUploadClick}>
          Upload Image
        </Button>
      </Box>

      {image && (
        <Button colorScheme="red" onClick={removeImage}>
          Remove Image
        </Button>
      )}

      <Button colorScheme="teal" size="lg" onClick={uploadToBackend} isDisabled={!file}>
        Process Image
      </Button>
    </VStack>
  );
};

export default AIPictureUpload;

import {
  Box,
  Heading,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideableGallery = ({ images = [] }) => {
  const navigate = useNavigate();

  // Access the color mode
  const { colorMode } = useColorMode();
  
  // Update the gallery background color to match the hero section
  const galleryBgColor = useColorModeValue(
    "linear(gray.200)", // Light mode
    "linear(to-r, teal.800, blue.900)"  // Dark mode
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
  };

  return (
    <Box
      bg={galleryBgColor}
      py={16}
      px={8}
      textAlign="center"
      display="flex"
      alignItems="center"  // Vertically center
      justifyContent="center" // Horizontally center
      minHeight="100vh" // Full height for centering
    >
      <Box maxW="container.lg" mx="auto">
        <Heading as="h2" size="2xl" mb={6}>
          Features Showcase
        </Heading>
        {images.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <Box key={index} px={4}>
                <Image
                  src={image}
                  alt={`Ottoman Prop ${index + 1}`}
                  borderRadius="lg"
                  boxShadow="lg"
                  maxH="500px" // Set maximum height to control image size
                  objectFit="cover" // Ensures the image covers the box without distortion
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "0.3s ease-in-out",
                  }}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Heading as="h3" size="lg" color="red.500">
            No images available
          </Heading>
        )}
      </Box>
    </Box>
  );
};

export default SlideableGallery;

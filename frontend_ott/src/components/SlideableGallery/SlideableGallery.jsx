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
  const { colorMode } = useColorMode();

  const galleryBgColor = useColorModeValue(
    "gray.200", // Light mode
    "linear(to-r, teal.800, blue.900)" // Dark mode
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // Ensure autoplay is enabled
    autoplaySpeed: 3000,  // Set desired autoplay interval
    pauseOnHover: false,  // Ensure it doesn't stop on hover
  };

  const handleImageClick = (index) => {
    if (index === 0) {
      navigate("/dictionary");
    } else if (index === 1) {
      navigate("/ai-translate");
    }
  };

  return (
    <Box
      bg={galleryBgColor}
      py={16}
      px={8}
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box maxW={["90%", "80%", "container.lg"]} mx="auto" w="100%">
        <Heading as="h2" size="2xl" mb={6}>
          Tryout Now
        </Heading>
        {images.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <Box
                key={index}
                px={[2, 4]} // Smaller padding on smaller screens
                onClick={() => handleImageClick(index)}
                cursor="pointer"
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  borderRadius="lg"
                  boxShadow="lg"
                  maxH={["300px", "400px", "500px"]} // Adjust height for smaller screens
                  objectFit="cover"
                  width="100%" // Ensures it spans the available width
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

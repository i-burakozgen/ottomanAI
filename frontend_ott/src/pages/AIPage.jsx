import { useNavigate } from "react-router-dom"; // This is not being used in your code
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Link as ChakraLink } from "@chakra-ui/react";
import AIPictureUpload from "../components/AIpictureUpload/AIPictureUpload";

const AIPage = () => {
  const navigate = useNavigate(); // This is not currently used, consider removing if not needed

  return (
    <>
      <AIPictureUpload/>
    </>
  );
};

export default AIPage;
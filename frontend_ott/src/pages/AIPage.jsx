import { useNavigate } from "react-router-dom"; // This is not being used in your code
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Link as ChakraLink } from "@chakra-ui/react";

const AIPage = () => {
  const navigate = useNavigate(); // This is not currently used, consider removing if not needed

  return (
    <>
      <div>
        Transliteration part is under construction. If you're interested in this project, you can
        <ChakraLink as={Link} to="/contact" color="red.200" ml={1}>
          contact me
        </ChakraLink>.
      </div>
    </>
  );
};

export default AIPage;
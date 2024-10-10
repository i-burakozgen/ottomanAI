import { Flex, Box } from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";

const PageLayout = ({ chidren }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex>
      {pathname !== "/auth" ? (
        <Box w={{base: "70px", md:"150px"}}>
          <SideBar />
        </Box>
      ) : null}

      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 150px)" }}>
        <Outlet/> {/* mainContent */}
      </Box>
    </Flex>
  );
};

export default PageLayout;

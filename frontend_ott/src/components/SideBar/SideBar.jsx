import {
  Box,
  Flex,
  useColorMode,
  Image,
  Input,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { sideBarItems } from "./sideBarItems.js";
import {
  BrandLogoDark,
  BrandLogoLight,
  MobileBrandLogoDark,
  MobileBrandLogoLight,
} from "../../assets/index";

const SideBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} width="full" height={"full"}>
        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            {colorMode === "dark" ? (
              <MdDarkMode
                style={{ width: "24px", height: "28px" }}
                onClick={toggleColorMode}
              ></MdDarkMode>
            ) : (
              <MdOutlineWbSunny
                style={{ width: "24px", height: "28px" }}
                onClick={toggleColorMode}
              ></MdOutlineWbSunny>
            )}
          </Box>

          <Box style={{ marginTop: "5px", marginBottom: "10px" }}>
            <Link
              to={"/"}
              as={RouterLink}
              display={{ base: "none", md: "block" }} 
              cursor="pointer"
            >
              {colorMode === "dark" ? <BrandLogoLight /> : <BrandLogoDark />}
            </Link>

            <Link
              to={"/"}
              as={RouterLink}
              display={{ base: "block", md: "none" }}
              cursor="pointer"
            >
              {colorMode === "dark" ? (
                <MobileBrandLogoLight />
              ) : (
                <MobileBrandLogoDark />
              )}
            </Link>
          </Box>

          <Flex display={"column"} gap={5} cursor={"pointer"}>
            {sideBarItems().map((item, index) => {
              const IconComponent =
                colorMode === "dark" ? item.iconLight : item.iconDark;
              return (
                <Tooltip
                  key={index}
                  label={item.text}
                  placement="right"
                  hasArrow
                  ml={1}
                  openDelay={500}
                  display={{ base: "none", md: "block" }}
                >
                  <Link
                    to={item.link}
                    display={"flex"}
                    as={RouterLink}
                    alignItems={"center"}
                    _hover={{
                      bg: colorMode === "dark" ? "whiteAlpha.200" : "gray.200",
                    }}
                    borderRadius={6}
                    p={2}
                  >
                  <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap={2}>
                  <IconComponent
                      style={{
                        color:
                          colorMode === "dark"
                            ? item.colorLight
                            : item.colorDark,
                        width: "24px",
                        height: "28px",
                      }}
                    />
                    
                      <Box display={{base:"none", md:"block"}}>{item.text}</Box>

                    

                  </Box>
                   
                  </Link>
                </Tooltip>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;

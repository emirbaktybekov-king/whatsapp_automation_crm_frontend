"use client";

import {
  Box,
  VStack,
  Image,
  Button,
  HStack,
  Flex,
  Link,
} from "@chakra-ui/react";
import { IconChevronsRight, IconChevronsLeft } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { FaRobot } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  return (
    <>
      <Box
        position={{ base: "fixed", lg: "sticky" }}
        top="0"
        left="0"
        zIndex="1000"
        display={{ lg: "block" }}
        transition="opacity 0.3s ease 0.1s, transform 0.3s ease"
        opacity={{ base: isOpen ? 1 : 0, lg: 1 }}
        transform={{
          base: isOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
      >
        <Button
          onClick={onToggle}
          justifyContent="center"
          className={styles.toggleButton}
          minW="unset"
          w="30px"
          h="30px"
          p="0"
          bg="white"
          _hover={{ bg: "#e2e8f0" }}
          display={{ base: "none", lg: "flex" }}
          position="absolute"
          top="25px"
          right="-15px"
          zIndex="1001"
        >
          {isOpen ? (
            <IconChevronsLeft size={20} color="#98A1B7" />
          ) : (
            <IconChevronsRight size={20} color="#98A1B7" />
          )}
        </Button>

        <Box
          className={styles.sidebar}
          w={{ base: "225px", lg: isOpen ? "265px" : "75px" }}
          h="100vh"
          transition="width 0.3s ease"
        >
          <VStack align="start" h="100%" gap={0}>
            <Box
              className={
                isOpen ? styles.logoContainer : styles.logoContainerCollapsed
              }
              height="75px"
              width="100%"
              display={{ base: "none", lg: "flex" }}
              alignItems="center"
              justifyContent={isOpen ? "flex-start" : "center"}
              px={isOpen ? "20px" : "0"}
            >
              <Image
                src={
                  isOpen
                    ? "/images/default-dark.svg"
                    : "/images/idos-small-vector.svg"
                }
                alt="Logo"
                w={isOpen ? "150px" : "60px"}
                h={isOpen ? "60px" : "60px"}
                objectFit="cover"
              />
            </Box>
            <VStack align="start" flex={1} w="100%" p="16px 10px" gap={0}>
              <Link
                href="/whatsapp_bot"
                _hover={{ textDecoration: "none" }}
                w="100%"
              >
                <HStack
                  className={`${styles.navLink} ${
                    pathname === "/whatsapp_bot" ? styles.active : ""
                  } ${isOpen ? styles.expanded : styles.collapsed}`}
                >
                  <FaRobot size={20} color="white" />
                  {isOpen && (
                    <span
                      className={styles.navText}
                      style={
                        pathname === "/whatsapp_bot" ? { color: "white" } : {}
                      }
                    >
                      Whatsapp Bot AI
                    </span>
                  )}
                </HStack>
              </Link>
            </VStack>
            <Flex
              align="center"
              justify="center"
              w="100%"
              pt="6.5px"
              px="19.5px"
              pb="19.5px"
            >
              <Link href="/docs" _hover={{ textDecoration: "none" }} w="100%">
                <Button
                  variant="ghost"
                  w="100%"
                  h="40px"
                  className={styles.docButton}
                >
                  <HStack gap={0}>
                    {isOpen && (
                      <span
                        className={styles.navText}
                        style={{ color: "#B5B5C3" }}
                      >
                        Documentation
                      </span>
                    )}
                    <Image
                      src="/images/icons/dock-icons.svg"
                      alt="DocCoin"
                      w="20px"
                      h="20px"
                      objectFit="contain"
                    />
                  </HStack>
                </Button>
              </Link>
            </Flex>
          </VStack>
        </Box>
      </Box>
      {isOpen && (
        <Box
          className={styles.backdrop}
          onClick={onToggle}
          display={{ base: "block", lg: "none" }}
        />
      )}
    </>
  );
};

export default Sidebar;

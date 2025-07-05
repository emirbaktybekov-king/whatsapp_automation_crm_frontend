"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Image,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { IconMenu2 } from "@tabler/icons-react";
import styles from "./navbar.module.css";
import { useAuth } from "@/src/api/hooks/useAuth";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [email] = useState("emirbaktybekov02@gmail.com"); // Replace with dynamic user email in production

  return (
    <Flex
      h="75px"
      bg="white"
      boxShadow="0px 10px 30px 0px rgba(82, 63, 105, 0.05)"
      zIndex="900"
      className={styles.navbarContainer}
      align="center"
      w="100%"
    >
      <HStack justify="space-between" align="center" display="flex" w="100%">
        <HStack>
          <Button
            aria-label="Toggle Sidebar"
            onClick={onToggleSidebar}
            display={{ base: "flex", lg: "none" }}
            bg="transparent"
            color="black"
            _hover={{ bg: "blue.700" }}
            _active={{ bg: "blue.800" }}
          >
            <IconMenu2 size={24} />
          </Button>
        </HStack>
        <HStack gap={4} align="center">
          <Flex flexDirection="column" justify="center" align="center">
            <Text
              fontStyle="normal"
              fontWeight="400"
              fontSize="13px"
              lineHeight="20px"
              color="rgb(7, 20, 55)"
            >
              Balance
            </Text>
            <Flex bgColor="#DFFFEA">
              <Text
                fontWeight="600"
                color="rgb(23, 198, 83)"
                fontSize="18px"
                lineHeight="18px"
                padding="4.2px 6.5px"
                borderRadius="4px"
              >
                $0.00
              </Text>
            </Flex>
          </Flex>
          {/* Comment out theme switching per request
          <Menu.Root>
            <Menu.Trigger asChild outline="none">
              <Button
                variant="ghost"
                style={{ width: "40px", height: "40px", padding: "0" }}
              >
                <Image
                  src="/images/themeIcons/Light-theme.svg"
                  alt="Light Mode icon"
                  style={{ width: "24px", height: "24px" }}
                />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content style={{ width: "175px" }} py="4px" px={0}>
                  <Menu.Item
                    value="light"
                    style={{ padding: "2px 9.7px" }}
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/themeIcons/Light-theme.svg"
                        alt="Light Mode Icon"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>Light</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="dark"
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/themeIcons/Dark-theme.svg"
                        alt="Dark Mode Icon"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>Dark</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="system"
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/themeIcons/System-theme.svg"
                        alt="System Mode Icon"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>System</Text>
                    </Flex>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          */}
          <Menu.Root>
            <Menu.Trigger asChild outline="none">
              <Button
                variant="ghost"
                style={{ width: "40px", height: "40px", padding: "0" }}
              >
                <Image
                  src="/images/flags/united-states-flag.svg"
                  alt="United States Flag"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "5.5px",
                  }}
                />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content style={{ width: "175px" }} py="4px" px={0}>
                  <Menu.Item
                    value="en"
                    style={{ padding: "2px 9.7px" }}
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/flags/united-states-flag.svg"
                        alt="English Flag"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>English</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="ru"
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/flags/russia-flag.svg"
                        alt="Russian Flag"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>Russian</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="kk"
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Image
                        src="/images/flags/kazakhstan.svg"
                        alt="Kazakh Flag"
                        style={{
                          width: "17.5px",
                          height: "17.5px",
                          marginRight: "6.5px",
                        }}
                      />
                      <Text>Kazakh</Text>
                    </Flex>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Root>
            <Menu.Trigger asChild outline="none">
              <Button
                variant="ghost"
                style={{ width: "40px", height: "40px", padding: "0" }}
              >
                <Image
                  src="/images/avatar/avatar.png"
                  alt="Account Logo"
                  style={{ width: "40px", height: "40px", borderRadius: "6px" }}
                />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content style={{ width: "175px" }} py="4px" px={0}>
                  <Menu.Item
                    value="email"
                    style={{ padding: "2px 9.7px" }}
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Text>{email}</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="signout"
                    _hover={{ backgroundColor: "#f0f0f0" }}
                    className={styles.menuItem}
                    onClick={() => {
                      logout();
                      router.push("/auth/login");
                    }}
                  >
                    <Flex style={{ padding: "6.5px 9.7px", width: "100%" }}>
                      <Text>Sign Out</Text>
                    </Flex>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import { Sidebar, Navbar } from "@/src/components/custom";
import Cookies from "js-cookie";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // default to closed
  const router = useRouter();

  // Detect screen size to set sidebar visibility on first render
  const defaultSidebarState = useBreakpointValue({
    base: false, // Mobile
    lg: true, // Desktop
  });

  useEffect(() => {
    // Set initial sidebar state based on screen size
    setIsSidebarOpen(defaultSidebarState ?? false);
  }, [defaultSidebarState]);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex h="100vh">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Box flex={1} display="flex" flexDirection="column">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Box flex={1} p={4} bg="gray.50" overflow="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;

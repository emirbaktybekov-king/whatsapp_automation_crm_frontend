"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Box } from "@chakra-ui/react";
import { Sidebar, Navbar } from "@/src/components/custom";
import Cookies from "js-cookie";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
  const router = useRouter();

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

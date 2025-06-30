"use client";

import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar, Navbar } from "@/src/components/custom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseEnter = () => {
    if (!isSidebarOpen) {
      setIsSidebarHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsSidebarHovered(false);
  };

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isHovered={isSidebarHovered}
        onToggle={toggleSidebar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {/* Main Content */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {/* Main Section */}
        <Box flex={1} p={4} bg="gray.50" overflow="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
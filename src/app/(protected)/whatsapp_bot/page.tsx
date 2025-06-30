"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAuth } from "@/src/api/hooks/useAuth";

export default function WhatsappBotPage() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      minH="100vh"
      display="grid"
      gridTemplateColumns="260px 1fr"
      gridTemplateRows="70px 1fr"
    >
      {/* Sidebar */}
      <Box gridColumn="1" gridRow="1 / 3" bg="gray.800" color="white" p={4}>
        <Heading as="h2" size="md" mb={4}>
          Navigation
        </Heading>
        <VStack align="start" gap={2}>
          <Link
            as={NextLink}
            href="/whatsapp_bot"
            color="white"
            _hover={{ bg: "gray.700", px: 2, rounded: "md" }}
          >
            WhatsApp Bot
          </Link>
        </VStack>
        <Button colorScheme="red" width="full" mt={4} onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* Navbar */}
      <Box
        gridColumn="2"
        gridRow="1"
        bg="blue.500"
        color="white"
        p={4}
        display="flex"
        alignItems="center"
      >
        <Heading as="h1" size="lg">
          WhatsApp Bot Dashboard
        </Heading>
      </Box>

      {/* Main Content */}
      <Box gridColumn="2" gridRow="2" p={4}>
        <VStack align="start" gap={6}>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Active WhatsApp Bot Sessions
            </Heading>
            <Text color="gray.600">
              No active sessions. (Placeholder: Fetch sessions from
              /api/v1/whatsappSessions when implemented)
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Bot Performance
            </Heading>
            <Text color="gray.600">
              Performance metrics will be displayed here. (Placeholder: Add
              charts or data when backend is ready)
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

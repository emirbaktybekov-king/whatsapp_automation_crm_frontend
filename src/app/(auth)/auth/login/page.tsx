"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/src/api/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box bg="white" p={8} rounded="md" shadow="md" w="full" maxW="md">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

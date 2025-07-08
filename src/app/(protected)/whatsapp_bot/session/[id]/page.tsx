"use client";

import { useState, useEffect } from "react";
import { Flex, Text, Alert } from "@chakra-ui/react";
import { ChatList, ChatMessages } from "@/src/components/custom";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useWhatsAppApi } from "@/src/api/hooks/useWhatsAppApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SessionPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    selectedChat,
    handleChatSelect,
    chats,
    setChats,
    connectionStatus,
    setConnectionStatus,
    error,
    setError,
    messages,
    setMessages,
    sessionId,
  } = useWhatsAppApi();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/session/${id}`, {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1]
            }`,
          },
        });
        setChats(response.data.chats || []);
        setConnectionStatus("Connected");
        setLoading(false);
        setError(null); // Clear error on successful fetch
      } catch (err: any) {
        console.error("Session fetch error:", err);
        setError(err.response?.data?.error || "Failed to fetch session");
        setConnectionStatus("Disconnected");
        setLoading(false);
      }
    };

    // Redirect to create page if sessionId doesn't match
    if (id && sessionId && id !== sessionId) {
      console.log(
        `Session ID mismatch: URL id=${id}, state id=${sessionId}. Redirecting to create page.`
      );
      router.push("/whatsapp_bot/create");
      return;
    }

    // Fetch chats if not loaded or sessionId matches
    if (id && chats.length === 0) {
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [id, sessionId, chats, setChats, setConnectionStatus, setError, router]);

  return (
    <Flex w="100%" h="100vh" p="4">
      <Flex w="100%" h="100%" flexDirection="column">
        <Flex w="100%" align="center" justify="space-between" mb={4}>
          <Flex flexDirection="column">
            <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
              WhatsApp Bot Session
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="#4B5563">
              Select a chat to start messaging
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            align="center"
            justifyContent="center"
            backgroundColor={
              connectionStatus === "Connected" ? "green.200" : "red.200"
            }
            borderRadius="30px"
            height="35px"
            px="10px"
          >
            <Flex
              w="15px"
              h="15px"
              borderRadius="50%"
              backgroundColor={
                connectionStatus === "Connected" ? "green.400" : "red.400"
              }
              mr="5px"
            />
            <Text
              fontSize="md"
              color={connectionStatus === "Connected" ? "green.600" : "red.600"}
            >
              {connectionStatus}
            </Text>
          </Flex>
        </Flex>
        {error && (
          <Alert.Root status="error" mb={4}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Connection Error</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        <Flex height="650px" w="100%" flexDirection="row" gap={4}>
          <Flex
            w="50%"
            h="100%"
            boxShadow="xl"
            borderRadius="20px"
            p="4"
            justifyContent="center"
            alignItems="center"
          >
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              handleChatSelect={handleChatSelect}
              scanStatus={loading ? "Fetching chats..." : "Chats loaded"}
            />
          </Flex>
          <Flex
            w="50%"
            h="100%"
            boxShadow="xl"
            borderRadius="20px"
            overflow="hidden"
          >
            <ChatMessages
              messages={messages}
              selectedChat={selectedChat}
              scanStatus={loading ? "Fetching chats..." : "Chats loaded"}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SessionPage;

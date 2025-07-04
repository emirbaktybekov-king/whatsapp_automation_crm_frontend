"use client";
import { Flex, Text } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import React from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
}

interface Chat {
  id: string;
  name: string;
  image: string;
}

interface ChatMessagesProps {
  messages: Message[];
  selectedChat: Chat | null;
  scanStatus: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, selectedChat, scanStatus }) => {
  return (
    <Flex w="100%" h="100%" flexDirection="column">
      <Flex w="100%" h="60px" bg="#24D366" p="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="2">
          <FaRobot size="24px" color="white" />
          <Text fontSize="lg" fontWeight="bold" color="white">
            {selectedChat ? selectedChat.name : "Bot Chat Monitor"}
          </Text>
        </Flex>
        <Flex alignItems="center" gap="2">
          <Flex
            w="10px"
            h="10px"
            bg={scanStatus === "QR code scanned successfully" || scanStatus === "Messages loaded" ? "#24D366" : "#FDA5A5"}
            borderRadius="50%"
          />
          <Text fontSize="md" color="white">
            {scanStatus === "QR code scanned successfully" || scanStatus === "Messages loaded" ? "Online" : "Offline"}
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" h="100%" p="4" flexDirection="column" gap="4" overflowY="auto" bg="#ECE5DD">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Flex
              key={msg.id || index}
              maxW="70%"
              bg={msg.direction === "outgoing" ? "#DCF8C6" : "white"}
              p="2"
              borderRadius="10px"
              alignSelf={msg.direction === "outgoing" ? "flex-end" : "flex-start"}
              flexDirection="column"
              boxShadow="sm"
            >
              <Text fontSize="sm" color="#4B5563">
                {msg.sender}
              </Text>
              <Text fontSize="md" color="black">
                {msg.content}
              </Text>
              <Text fontSize="xs" color="#4B5563" alignSelf="flex-end">
                {msg.timestamp}
              </Text>
            </Flex>
          ))
        ) : (
          <Text color="#4B5563">
            {selectedChat ? "No messages loaded" : "Select a chat to view messages"}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatMessages;
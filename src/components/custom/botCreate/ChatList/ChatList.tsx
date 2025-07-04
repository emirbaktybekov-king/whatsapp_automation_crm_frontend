"use client";
import {
  Flex,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

interface Chat {
  id: string;
  name: string;
  image: string;
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  handleChatSelect: (chat: Chat) => void;
  scanStatus: string;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  handleChatSelect,
  scanStatus,
}) => {
  return (
    <Flex w="100%" h="100%" flexDirection="column">
      <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
        Chats
      </Text>
      <Text fontSize="md" color="#4B5563" mb="20px">
        {scanStatus}
      </Text>
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        bg="#F0F2F5"
        overflowY="auto"
      >
        {scanStatus === "Loading chats" ? (
          // Show skeleton loader when chats are loading
          Array(5)
            .fill(0)
            .map((_, index) => (
              <Flex
                key={index}
                w="100%"
                p="2"
                alignItems="center"
                gap="2"
                h="76px"
              >
                <SkeletonCircle size="49px" />
                <Flex flexDirection="column" flex="1">
                  <Skeleton height="20px" width="60%" mb="8px" />
                  <Skeleton height="16px" width="40%" />
                </Flex>
              </Flex>
            ))
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <Flex
              key={chat.id}
              w="100%"
              p="2"
              bg={
                selectedChat && selectedChat.id === chat.id
                  ? "#E2E8F0"
                  : "white"
              }
              _hover={{ bg: "#E2E8F0" }}
              cursor="pointer"
              onClick={() => handleChatSelect(chat)}
              alignItems="center"
              gap="2"
              h="76px"
            >
              <Image
                w="49px"
                height="49px"
                src={chat.image || "https://placehold.jp/150x150.png"}
                alt={chat.name}
                borderRadius="full"
              />
              <Flex flexDirection="column">
                <Text fontWeight="bold" fontSize="md">
                  {chat.name}
                </Text>
                <Text fontSize="sm" color="#4B5563">
                  ID: {chat.id}
                </Text>
              </Flex>
            </Flex>
          ))
        ) : (
          <Text p="2" color="#4B5563">
            No chats available
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatList;

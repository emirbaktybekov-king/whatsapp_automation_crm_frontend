import { Box, Flex, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
  media_type: string | null;
}

interface ChatMessagesProps {
  messages: Message[];
  selectedChat: { id: string; name: string; image: string } | null;
  scanStatus: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  selectedChat,
  scanStatus,
}) => {
  return (
    <Box w="100%" h="100%" p={4} bg="white" overflowY="auto">
      {selectedChat ? (
        <VStack gap={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold">
            {selectedChat.name}
          </Text>
          {messages.length > 0 ? (
            <VStack gap={2} align="stretch">
              {messages.map((message) => (
                <HStack
                  key={message.id}
                  justify={
                    message.direction === "outgoing" ? "flex-end" : "flex-start"
                  }
                  p={2}
                  bg={
                    message.direction === "outgoing" ? "green.100" : "gray.100"
                  }
                  borderRadius="md"
                  maxW="70%"
                  alignSelf={
                    message.direction === "outgoing" ? "flex-end" : "flex-start"
                  }
                >
                  <VStack align="start" gap={1}>
                    <Text fontSize="sm" fontWeight="bold">
                      {message.sender}
                    </Text>
                    {message.media_type === "voice" ? (
                      <HStack>
                        <Button
                          size="sm"
                          onClick={() =>
                            console.log(`Playing voice message: ${message.id}`)
                          }
                        >
                          <FaPlay />
                          {message.content}
                        </Button>
                      </HStack>
                    ) : (
                      <Text>{message.content}</Text>
                    )}
                    <Text fontSize="xs" color="gray.500">
                      {message.timestamp}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text color="gray.500">
              {scanStatus === "Chats loaded"
                ? "No messages available"
                : scanStatus}
            </Text>
          )}
        </VStack>
      ) : (
        <Text color="gray.500">Select a chat to view messages</Text>
      )}
    </Box>
  );
};

export default ChatMessages;

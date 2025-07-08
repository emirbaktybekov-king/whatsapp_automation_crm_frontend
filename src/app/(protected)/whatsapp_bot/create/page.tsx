"use client";

import { Flex, Text, Alert } from "@chakra-ui/react";
import { QRCode, ChatMessages } from "@/src/components/custom";
import { useWhatsAppApi } from "@/src/api/hooks/useWhatsAppApi";

const Page = () => {
  const {
    qrCode,
    connectionStatus,
    scanStatus,
    selectedChat,
    messages,
    error,
    triggerQRCode,
    handleChatSelect,
    createSession,
  } = useWhatsAppApi();

  console.log(
    "QR code state:",
    qrCode ? qrCode.substring(0, 50) + "..." : "null"
  ); // Debug log
  console.log("Scan status:", scanStatus); // Debug log

  return (
    <Flex w="100%" h="100vh" p="4">
      <Flex w="100%" h="100%" flexDirection="column">
        <Flex w="100%" align="center" justify="space-between" mb={4}>
          <Flex flexDirection="column">
            <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
              Create New WhatsApp Bot
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="#4B5563">
              Scan the QR code with your WhatsApp to connect your bot
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
            <QRCode
              qrCode={qrCode}
              scanStatus={scanStatus}
              triggerQRCode={triggerQRCode}
              createSession={createSession}
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
              scanStatus={scanStatus}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Page;

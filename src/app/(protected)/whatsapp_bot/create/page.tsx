"use client";
import { Flex, Text } from "@chakra-ui/react";
import { QRCode, ChatList, ChatMessages } from "@/src/components/custom";
import React from "react";
import { useWhatsAppApi } from "@/src/api/botServices/whatsapp";

const Page = () => {
  const { qrCode, connectionStatus, scanStatus, chats, selectedChat, messages, triggerQRCode, handleChatSelect } = useWhatsAppApi();

  // Show QRCode when qrCode is non-null or scanStatus indicates QR-related state
  const showQRCode = qrCode || scanStatus === "QR Code Loading" || scanStatus.includes("QR code loaded");

  return (
    <Flex w="100%" h="100vh" p="4">
      <Flex w="100%" h="100%" flexDirection="column">
        <Flex flexDirection="column" gap={4} w="100%" height="100%">
          {/* Header Section */}
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
              backgroundColor={connectionStatus === "Connected" ? "green.200" : "red.200"}
              borderRadius="30px"
              height="35px"
              px="10px"
            >
              <Flex
                w="15px"
                height="15px"
                borderRadius="50%"
                backgroundColor={connectionStatus === "Connected" ? "green.400" : "red.400"}
                mr="5px"
              />
              <Text fontSize="md" color={connectionStatus === "Connected" ? "green.600" : "red.600"}>
                {connectionStatus}
              </Text>
            </Flex>
          </Flex>
          <Flex height="650px" w="100%" flexDirection="row" gap={4}>
            {/* Left Box (QR Code or Chats) */}
            <Flex w="50%" h="100%" boxShadow="xl" borderRadius="20px" p="4">
              {showQRCode ? (
                <QRCode qrCode={qrCode} scanStatus={scanStatus} triggerQRCode={triggerQRCode} />
              ) : (
                <ChatList
                  chats={chats}
                  selectedChat={selectedChat}
                  handleChatSelect={handleChatSelect}
                  scanStatus={scanStatus}
                />
              )}
            </Flex>
            {/* Right Box (Chat Messages) */}
            <Flex w="50%" h="100%" boxShadow="xl" borderRadius="20px" overflow="hidden">
              <ChatMessages messages={messages} selectedChat={selectedChat} scanStatus={scanStatus} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Page;
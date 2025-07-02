"use client";
import { Button, Flex, Text, Image, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { FaRobot } from "react-icons/fa";

const Page = () => {
  const [qrCode, setQrCode] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [scanStatus, setScanStatus] = useState("QR Code Loading");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ws, setWs] = useState(null);

  const triggerQRCode = () => {
    fetch("http://127.0.0.1:8000/whatsapp")
      .then((response) => response.json())
      .then((data) => console.log("QR code trigger:", data))
      .catch((error) => {
        console.error("Error triggering QR code:", error);
        setScanStatus("Error triggering QR code");
      });
  };

  useEffect(() => {
    // Initialize WebSocket connection
    const websocket = new WebSocket("ws://127.0.0.1:8000/ws/qr/");
    
    websocket.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("Connected");
      triggerQRCode();
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.qr_code) {
        setQrCode(data.qr_code);
        setScanStatus(data.message || "QR code loaded");
        setChats([]); // Clear chats when QR code is active
        console.log("Received QR code:", data.message);
      } else {
        setQrCode(null);
        setScanStatus(data.message || "Chats Loading");
        if (data.chats && data.chats.length > 0) {
          setChats(data.chats);
          setSelectedChat(data.chats[0]); // Select first chat
          console.log("Received chats:", data.chats);
        }
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Error");
      setScanStatus("WebSocket error");
    };

    websocket.onclose = () => {
      console.log("WebSocket closed");
      setConnectionStatus("Disconnected");
      setScanStatus("WebSocket disconnected");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

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
            {/* Right Box (QR Code or Chats) */}
            <Flex w="50%" h="100%" boxShadow="xl" borderRadius="20px" p="4">
              <Flex w="100%" h="100%" flexDirection="column">
                {qrCode ? (
                  <>
                    <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
                      WhatsApp Web QR Code
                    </Text>
                    <Text fontSize="md" color="#4B5563" mb="20px">
                      {scanStatus}
                    </Text>
                    <Flex
                      w="300px"
                      h="300px"
                      justifyContent="center"
                      alignItems="center"
                      border="2px dashed #CBD5E1"
                      borderRadius="20px"
                      p="4"
                    >
                      <Image src={qrCode} alt="WhatsApp QR Code" boxSize="100%" borderRadius="10px" />
                    </Flex>
                    <Flex
                      w="100%"
                      backgroundColor="gray.200"
                      height="250px"
                      borderRadius="15px"
                      mt="4"
                    >
                      <Flex
                        w="100%"
                        h="100%"
                        alignItems="center"
                        flexDirection="column"
                        padding="4"
                      >
                        <Text fontSize="lg" fontWeight="600" mb="10px">
                          How to connect:
                        </Text>
                        <Flex w="100%" flexDirection="column" gap="10px">
                          <Flex flexDirection="row" alignItems="center" gap="10px">
                            <Flex
                              w="25px"
                              h="25px"
                              borderRadius="50%"
                              bg="#24D366"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text fontSize="sm" color="white" fontWeight="bold">
                                1
                              </Text>
                            </Flex>
                            <Text fontWeight="600">
                              Open WhatsApp on your phone
                            </Text>
                          </Flex>
                          <Flex flexDirection="row" alignItems="center" gap="10px">
                            <Flex
                              w="25px"
                              h="25px"
                              borderRadius="50%"
                              bg="#24D366"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text fontSize="sm" color="white" fontWeight="bold">
                                2
                              </Text>
                            </Flex>
                            <Text fontWeight="600">
                              Go to Settings → Linked Devices
                            </Text>
                          </Flex>
                          <Flex flexDirection="row" alignItems="center" gap="10px">
                            <Flex
                              w="25px"
                              h="25px"
                              borderRadius="50%"
                              bg="#24D366"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text fontSize="sm" color="white" fontWeight="bold">
                                3
                              </Text>
                            </Flex>
                            <Text fontWeight="600">
                              Tap "Link a Device" and scan this QR code
                            </Text>
                          </Flex>
                        </Flex>
                        <Button
                          variant="ghost"
                          colorScheme="green"
                          mt="20px"
                          bg="#24D366"
                          color="white"
                          borderRadius="5px"
                          onClick={triggerQRCode}
                        >
                          <HiRefresh color="white" />
                          Refresh QR Code
                        </Button>
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
                      Chats
                    </Text>
                    <Text fontSize="md" color="#4B5563" mb="20px">
                      {scanStatus}
                    </Text>
                    <Flex w="100%" h="100%" flexDirection="column" bg="#F0F2F5" overflowY="auto">
                      {chats.length > 0 ? (
                        chats.map((chat) => (
                          <Flex
                            key={chat.id}
                            w="100%"
                            p="2"
                            bg={selectedChat && selectedChat.id === chat.id ? "#E2E8F0" : "white"}
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
                              src={chat.image}
                              alt={chat.name}
                              borderRadius="full"
                            />
                            <Flex flexDirection="column">
                              <Text fontWeight="bold" fontSize="md">
                                {chat.name}
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
                  </>
                )}
              </Flex>
            </Flex>
            {/* Left Box (Chat Messages) */}
            <Flex
              w="50%"
              h="100%"
              boxShadow="xl"
              borderRadius="20px"
              overflow="hidden"
            >
              <Flex w="100%" h="100%" flexDirection="column">
                <Flex w="100%" h="60px" bg="#24D366" p="2" alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap="2">
                    <FaRobot size="24px" color="white" />
                    <Text fontSize="lg" fontWeight="bold" color="white">
                      {selectedChat ? selectedChat.name : "Bot Chat Monitor"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="2">
                    <Flex w="10px" h="10px" bg={scanStatus === "QR code scanned successfully" ? "#24D366" : "#FDA5A5"} borderRadius="50%" />
                    <Text fontSize="md" color="white">
                      {scanStatus === "QR code scanned successfully" ? "Online" : "Offline"}
                    </Text>
                  </Flex>
                </Flex>
                <Flex w="100%" h="100%" p="4" flexDirection="column" gap="4" overflowY="auto" bg="#ECE5DD">
                  <Text color="#4B5563">Select a chat to view messages</Text>
                </Flex>
                <Flex w="100%" h="60px" bg="white" p="2" alignItems="center" justifyContent="space-around">
                  <Text fontSize="lg" fontWeight="bold" color="#4B5563">
                    {chats.length} Chats Loaded
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Page;
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HiRefresh } from "react-icons/hi";
import { FaRobot } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

const page = () => {
  return (
    <Flex w="100%" h="100%" p="4">
      <Flex w={"100%"} h="100%" flexDirection="column">
        <Flex flexDirection="column" gap={4} w="100%" height="100%">
          {/* Header Section */}
          <Flex w="100%" align="center" justify="space-between" mb={4}>
            <Flex flexDirection={"column"}>
              <Text fontSize="2xl" fontWeight="bold" color="black" mb={"5px"}>
                Create New WhatsApp Bot
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="#4B5563">
                Snan the QR code with your WhatsApp to connect your bot
              </Text>
            </Flex>
            <Flex
              flexDirection="row"
              align="center"
              justifyContent="center"
              backgroundColor="green.200"
              borderRadius="30px"
              height="35px"
              px="10px"
            >
              <Flex
                w="15px"
                height="15px"
                borderRadius="50%"
                backgroundColor="green.400"
                mr="5px"
              />
              <Text fontSize="md" color="green.600">
                Connected
              </Text>
            </Flex>
          </Flex>
          <Flex height="650px" w="100%" flexDirection="row" gap={4}>
            {/* Right Box */}
            <Flex w="100%" h="100%" boxShadow="xl" borderRadius="20px" p="4">
              <Flex w="100%" h="100%" flexDirection="column">
                <Flex
                  flexDirection="column"
                  align="center"
                  w="100%"
                  height="100%"
                >
                  <Text fontSize="2xl" fontWeight="bold" color="black" mb="5px">
                    WhatsApp Web QR Code
                  </Text>
                  <Text fontSize="md" color="#4B5563" mb="20px">
                    Open WhatsApp on your phone and scan this code
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
                    {/* Placeholder for QR Code */}
                    <Flex
                      w="100%"
                      height="100%"
                      backgroundColor="gray.200"
                      borderRadius="10px"
                    ></Flex>
                  </Flex>
                </Flex>
                <Flex
                  w="100%"
                  backgroundColor="gray.200"
                  height="250px"
                  borderRadius="15px"
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
                      variant={"ghost"}
                      colorScheme="green"
                      mt="20px"
                      bg="#24D366"
                      color="white"
                      borderRadius="5px"
                    >
                      <HiRefresh color="white" />
                      Refresh QR Code
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {/* Left Box */}
            <Flex
              w="100%"
              h="100%"
              boxShadow="xl"
              borderRadius="20px"
              overflow="hidden"
            >
              <Flex w="100%" h="100%" flexDirection="column">
                {/* Header Section */}
                <Flex w="100%" h="100px" bg="#24D366" p="4">
                  <Flex
                    w="100%"
                    h="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex flexDirection="row" alignItems="center" gap="4">
                      <FaRobot size="30px" color="white" />
                      <Flex flexDirection="column" justifyContent="center">
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          Bot Chat Monitor
                        </Text>
                        <Text fontSize="md" color="white" fontWeight="bold">
                          Real-time message tracking
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" gap="10px">
                      <Flex w="10px" h="10px" bg="#FDA5A5" borderRadius="50%" />
                      <Text fontSize="md" color="white" fontWeight="500">
                        Offline
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                {/* Chat Monitor Content */}
                <Flex
                  w="100%"
                  h="100%"
                  p="4"
                  flexDirection="column"
                  bg="#ECE5DD"
                  gap={5}
                >
                  {/* Custumer Message example */}
                  <Flex w="100%" flexDirection={"column"} gap="4" flexDir="row">
                    <Flex
                      w="50px"
                      h="50px"
                      borderRadius="50%"
                      bg="#D1FAE5"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IoPersonOutline />
                    </Flex>
                    <Flex p="3" bg="#FFFFFF" borderRadius="10px">
                      <Flex flexDirection="column" gap="2">
                        <Text> Hello! I need help with my order</Text>
                        <Text> 2:30 PM</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  {/* Bot Response example */}
                  <Flex
                    w="100%"
                    flexDirection={"column"}
                    gap="4"
                    flexDir="row"
                    justifyContent="flex-end"
                  >
                    <Flex p="3" bg="#24D366" borderRadius="10px">
                      <Flex flexDirection="column" gap="2">
                        <Text>
                          Hi! I'm here to help. Can you provide your order
                          number?
                        </Text>
                        <Text> 2:31 PM</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      w="50px"
                      h="50px"
                      borderRadius="50%"
                      bg="#24D366"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FaRobot color="white" size="20" />
                    </Flex>
                  </Flex>
                </Flex>
                {/* Footer Section */}
                <Flex w="100%" h="100px" bg="white" p="4">
                  <Flex
                    w="100%"
                    h="100%"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Flex flexDirection="column" align="center">
                      <Text fontSize="lg" color="#4B5563" fontWeight="bold">
                        0
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="black">
                        Messages
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" align="center">
                      <Text fontSize="lg" color="#4B5563" fontWeight="bold">
                        0
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="black">
                        Users
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" align="center">
                      <Text fontSize="lg" color="#4B5563" fontWeight="bold">
                        0
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="black">
                        Sessions
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default page;

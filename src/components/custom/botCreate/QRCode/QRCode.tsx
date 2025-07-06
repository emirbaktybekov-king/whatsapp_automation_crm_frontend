"use client";

import { Button, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import { HiRefresh } from "react-icons/hi";
import React from "react";

interface QRCodeProps {
  qrCode: string | null;
  scanStatus: string;
  triggerQRCode: () => void;
}

const QRCode: React.FC<QRCodeProps> = ({
  qrCode,
  scanStatus,
  triggerQRCode,
}) => {
  return (
    <Flex w="100%" h="100%" flexDirection="column" align="center">
      <Flex flexDirection="column">
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
          {scanStatus === "Waiting for QR code..." ||
          scanStatus === "Connecting to server..." ? (
            <Skeleton w="100%" h="100%" borderRadius="10px">
              <Text color="#4B5563" textAlign="center" mt="50%">
                QR code is loading
              </Text>
            </Skeleton>
          ) : (
            qrCode && (
              <Image
                src={qrCode}
                alt="WhatsApp QR Code"
                boxSize="100%"
                borderRadius="10px"
              />
            )
          )}
        </Flex>
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
              <Text fontWeight="600">Open WhatsApp on your phone</Text>
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
              <Text fontWeight="600">Go to Settings → Linked Devices</Text>
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
    </Flex>
  );
};

export default QRCode;

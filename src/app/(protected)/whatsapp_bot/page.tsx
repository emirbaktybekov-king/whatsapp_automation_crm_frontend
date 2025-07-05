"use client";

import { Flex, Text, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import SessionsTable from "@/src/components/SessionsTable/SessionsTable";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <Flex w="100%" h="100%">
      <Flex style={{ width: "100%", height: "100%", flexDirection: "column" }}>
        <Flex
          style={{
            width: "100%",
            height: "150px",
            backgroundColor: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <Flex
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Flex
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                WhatsApp Bot
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  color: "black",
                }}
              >
                Manage your WhatsApp bot sessions
              </Text>
            </Flex>
            <Button
              bg="#17A34A"
              color="white"
              variant="ghost"
              borderRadius="8px"
              fontSize="16px"
              onClick={() => {
                router.push("/whatsapp_bot/create");
              }}
            >
              <FaPlus size={10} /> Create New Whatsapp session
            </Button>
          </Flex>
        </Flex>
        <Flex py={4} flexDirection="column" gap={4} w="100%" height="100%">
          <Flex flexDirection="row" gap={4} w="100%">
            <Flex
              width={"100%"}
              height={"120px"}
              borderRadius={"10px"}
              boxShadow={"lg"}
              p="15px"
            >
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex flexDirection={"column"}>
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    color={"#4E5865"}
                    mb="4px"
                  >
                    Active Sessions
                  </Text>
                  <Text fontSize={"30px"} fontWeight={"bold"} color={"black"}>
                    12
                  </Text>
                </Flex>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="10px"
                  bg="#DCFCE7"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaPlay size={20} color={"#17A34A"} />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              width={"100%"}
              height={"120px"}
              borderRadius={"10px"}
              boxShadow={"lg"}
              p="15px"
            >
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex flexDirection={"column"}>
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    color={"#4E5865"}
                    mb="4px"
                  >
                    Messages Today
                  </Text>
                  <Text fontSize={"30px"} fontWeight={"bold"} color={"black"}>
                    1,247
                  </Text>
                </Flex>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="10px"
                  bg="#DBE9FE"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaCommentAlt size={20} color={"#2463EB"} />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              width={"100%"}
              height={"120px"}
              borderRadius={"10px"}
              boxShadow={"lg"}
              p="15px"
            >
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex flexDirection={"column"}>
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    color={"#4E5865"}
                    mb="4px"
                  >
                    Response Rate
                  </Text>
                  <Text fontSize={"30px"} fontWeight={"bold"} color={"black"}>
                    98.5%
                  </Text>
                </Flex>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="10px"
                  bg="#F3E8FF"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AiOutlineStock size={25} color={"#9334E9"} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <SessionsTable />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Page;

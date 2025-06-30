"use client";

import { ReactNode } from "react";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import styles from "./authLayout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex className={styles.container}>
      <Flex className={styles.children}>{children}</Flex>
      <Flex className={styles.company_poster_side}>
        <Image src="/images/custom-1.png" alt="Logo" height="75px" mb="20px" />
        <Image
          src="/images/auth-screens.png"
          alt="Poster Image"
          className={styles.poster_image}
        />
        <Flex color="white" textAlign="center" flexDirection="column" px={4}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            lineHeight="37px"
            mb={4}
          >
            Launch Your Cross-platform Game or App in a few minutes
          </Text>
          <VStack gap={2} fontSize="md">
            <Text fontWeight="normal" lineHeight="20px">
              Launch Your Cross-platform Game or App in a few minutes – we
              provide all the infrastructure!
            </Text>
            <Text>
              Build your ecosystem of games and apps linked by single currency
              and items.
            </Text>
            <Text>
              Enable users to use the same assets in different games and apps.
            </Text>
            <Text>
              And it all works out of the box, without requiring you to write a
              single line of code.
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
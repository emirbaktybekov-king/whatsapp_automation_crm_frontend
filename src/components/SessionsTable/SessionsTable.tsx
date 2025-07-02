import React from 'react';
import { Flex, Table, Text, Badge, Button } from '@chakra-ui/react';
import { FaEye, FaEdit, FaTrash, FaWhatsapp } from 'react-icons/fa';

const SessionsTable = () => {
  const sessions = [
    { name: 'Customer Support Bot', status: 'Active', phone: '+1 (555) 123-4567', lastActive: '2 minutes ago', actions: '' },
    { name: 'Sales Assistant', status: 'Active', phone: '+1 (555) 987-6543', lastActive: '15 minutes ago', actions: '' },
    { name: 'Marketing Bot', status: 'Inactive', phone: '+1 (555) 456-7890', lastActive: '2 hours ago', actions: '' },
  ];

  return (
    <Table.Root 
      size="lg"
      borderRadius="2xl"
      bg="white"
      boxShadow="lg"
      p={6}
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.200"
      w="full"
    >
      <Table.Header>
        <Table.Row>
          <Flex
            w="100%"
            h="64px"
            align="center"
            gap={3}
            px={'16px'}
            py={4}
            bgGradient="linear(to-r, blue.600, blue.500)"
          >
            <FaWhatsapp color="green.400" size="25" />
            <Text fontSize="xl" fontWeight="extrabold" color="black" letterSpacing="tight" whiteSpace={'nowrap'}>
              WhatsApp Sessions
            </Text>
          </Flex>
        </Table.Row>
        <Table.Row bg="gray.50" color="gray.700">
          <Table.ColumnHeader fontWeight="semibold" fontSize="sm" textTransform="uppercase" p={4}>
            Session Name
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" fontSize="sm" textTransform="uppercase" p={4}>
            Status
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" fontSize="sm" textTransform="uppercase" p={4}>
            Phone Number
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" fontSize="sm" textTransform="uppercase" p={4}>
            Last Active
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" fontSize="sm" textTransform="uppercase" p={4}>
            Actions
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sessions.map((session, index) => (
          <Table.Row
            key={index}
            h="64px"
            transition="all 0.3s ease"
            _hover={{
              bg: 'blue.50',
              transform: 'translateY(-2px)',
              boxShadow: 'sm',
            }}
          >
            <Table.Cell color="gray.900" fontWeight="medium">
              <Flex align="center" gap={3}>
                <FaWhatsapp color="green.500" size="18" />
                <Text>{session.name}</Text>
              </Flex>
            </Table.Cell>
            <Table.Cell>
              <Flex align="center" gap={2}>
                <Flex
                  w="10px"
                  h="10px"
                  borderRadius="full"
                  bg={session.status === 'Active' ? 'green.500' : 'red.500'}
                />
                <Badge
                  colorScheme={session.status === 'Active' ? 'green' : 'red'}
                  variant="subtle"
                  p={2}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {session.status}
                </Badge>
              </Flex>
            </Table.Cell>
            <Table.Cell color="gray.900" fontWeight="medium">
              {session.phone}
            </Table.Cell>      
            <Table.Cell color="gray.600" fontSize="sm">
              {session.lastActive.replace('minutes', 'min').replace('hours', 'hrs')}
            </Table.Cell>
            <Table.Cell>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  aria-label="View session"
                  transition="all 0.2s"
                  _hover={{ transform: 'scale(1.1)', bg: 'blue.100' }}
                >
                  <FaEye />
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="green"
                  size="sm"
                  aria-label="Edit session"
                  transition="all 0.2s"
                  _hover={{ transform: 'scale(1.1)', bg: 'green.100' }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  aria-label="Delete session"
                  transition="all 0.2s"
                  _hover={{ transform: 'scale(1.1)', bg: 'red.100' }}
                >
                  <FaTrash />
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default SessionsTable;
import React from 'react';
import { Flex, Table, Text, Tooltip } from '@chakra-ui/react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const SessionsTable = () => {
  const sessions = [
    { name: 'Customer Support Bot', status: 'Active', phone: '+1 (555) 123-4567', messages: 342, lastActive: '2 minutes ago', actions: '' },
    { name: 'Sales Assistant', status: 'Active', phone: '+1 (555) 987-6543', messages: 156, lastActive: '15 minutes ago', actions: '' },
    { name: 'Marketing Bot', status: 'Inactive', phone: '+1 (555) 456-7890', messages: 89, lastActive: '2 hours ago', actions: '' },
  ];

  return (
    <Table.Root 
      variant="line" 
      colorPalette="gray" 
      size="md" 
      borderRadius="xl" 
      bg="white" 
      boxShadow="md" 
      p={6} 
      overflow="hidden"
      className="w-full"
    >
      <Table.Header>
        <Table.Row w="100%">
          <Flex 
            w="100%" 
            height="80px" 
            align="center" 
            p="6" 
            borderBottom="1px solid #E2E8F0"
            className="bg-gray-50"
          >
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              WhatsApp Sessions
            </Text>
          </Flex>
        </Table.Row>
        <Table.Row px={6} className="bg-gray-100">
          <Table.ColumnHeader className="text-gray-700 font-semibold">Session Name</Table.ColumnHeader>
          <Table.ColumnHeader className="text-gray-700 font-semibold">Status</Table.ColumnHeader>
          <Table.ColumnHeader className="text-gray-700 font-semibold">Phone Number</Table.ColumnHeader>
          <Table.ColumnHeader className="text-gray-700 font-semibold">Last Active</Table.ColumnHeader>
          <Table.ColumnHeader className="text-gray-700 font-semibold">Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sessions.map((session, index) => (
          <Table.Row 
            key={index} 
            className="transition-colors duration-200 hover:bg-gray-50"
          >
            <Table.Cell className="text-gray-800">{session.name}</Table.Cell>
            <Table.Cell>
              <Flex align="center">
                <span 
                  style={{ 
                    display: 'inline-block', 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: session.status === 'Active' ? '#34A853' : '#D32F2F', 
                    marginRight: '10px' 
                  }}
                ></span>
                <Text className="text-gray-700">{session.status}</Text>
              </Flex>
            </Table.Cell>
            <Table.Cell className="text-gray-800">{session.phone}</Table.Cell>
            <Table.Cell className="text-gray-600">{session.lastActive}</Table.Cell>
            <Table.Cell>
              <Flex gap={3}>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200">
                    <FaEye size={16} />
                  </button>
                  <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200">
                    <FaEdit size={16} />
                  </button>
                  <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200">
                    <FaTrash size={16} />
                  </button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default SessionsTable;
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  VStack,
  HStack,
} from '@chakra-ui/react';

interface Props {}

const SurveyPage = (props: Props) => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Survey Page
      </Heading>
      <Text fontSize="lg" mb={4}>
        This is a simple survey page designed with Chakra UI and TypeScript.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="teal" size="lg">
          Start Survey
        </Button>
        <HStack spacing={2}>
          <Text>Already have an account?</Text>
          <Button variant="link">Login</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SurveyPage;

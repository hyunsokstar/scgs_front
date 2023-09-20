import React from "react";
import {
  Grid,
  Box,
  Checkbox,
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface Survey {
  id: number;
  title: string;
  description: string;
  writer: {
    pk: number;
    username: string;
    profile_image: string;
  } | null;
  created_at: string;
}

interface ListForSurveyProps {
  surveys: Survey[];
}

function ListForSurvey({ surveys }: ListForSurveyProps) {
  return (
    <Box width="90%"> {/* Set the width to 90% */}
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {surveys.map((survey) => (
          <Box key={survey.id} borderWidth="1px" borderRadius="md" p={3} mb={3}>
            <HStack justifyContent="space-between" alignItems="center">
              <Checkbox size="lg" />
              {survey.writer && (
                <Avatar
                  size="sm"
                  name={survey.writer.username}
                  src={survey.writer.profile_image}
                />
              )}
              <VStack align="start" spacing={0} flex="1">
                <Text fontSize="xl" fontWeight="bold" maxWidth="70%">
                  {survey.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Created at: {new Date(survey.created_at).toLocaleDateString()}
                </Text>
              </VStack>
              <HStack>
                <Button size="sm" colorScheme="blue">
                  <EditIcon />
                </Button>
                <Button size="sm" colorScheme="red">
                  <DeleteIcon />
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default ListForSurvey;

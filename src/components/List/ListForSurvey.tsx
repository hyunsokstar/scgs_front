import React, { useState } from "react";
import {
  Grid,
  Box,
  Checkbox,
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
  useDisclosure, // Import useDisclosure
  Modal, // Import Modal
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalForSurveyDetail from "../modal/ModalForSurveyDetail";

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
  const { isOpen, onOpen, onClose } = useDisclosure(); // Initialize modal state
  const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);

  // Function to handle title click
  const handleTitleClick = (surveyId: number) => {
    setSelectedSurveyId(surveyId);
    onOpen();
  };

  return (
    <Box width="90%">
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
                {/* Make the title clickable */}
                <Button
                  fontSize="xl"
                  fontWeight="bold"
                  maxWidth="70%"
                  variant="link" // Use variant="link" to make it look like a link
                  onClick={() => handleTitleClick(survey.id)} // Handle the click event
                >
                  {survey.title}
                </Button>
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

      {/* Chakra UI Modal */}
      <ModalForSurveyDetail
        isOpen={isOpen}
        onClose={onClose}
        selectedSurveyId={selectedSurveyId}
      />

    </Box>
  );
}

export default ListForSurvey;

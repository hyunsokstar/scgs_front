import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CardForStudyNote from "../components/Card/CardForStudyNote";

const StudyNotePage: React.FC = () => {
  const notes = [
    {
      title: "Note 1",
      description: "This is the description for note 1.",
      writer: "Writer A",
    },
    {
      title: "Note 2",
      description: "This is the description for note 2.",
      writer: "Writer B",
    },
    {
      title: "Note 3",
      description: "This is the description for note 3.",
      writer: "Writer C",
    },
    {
      title: "Note 4",
      description: "This is the description for note 4.",
      writer: "Writer D",
    },
    {
      title: "Note 5",
      description: "This is the description for note 5.",
      writer: "Writer E",
    },
    {
      title: "Note 6",
      description: "This is the description for note 6.",
      writer: "Writer F",
    },
    {
      title: "Note 7",
      description: "This is the description for note 7.",
      writer: "Writer G",
    },
    {
      title: "Note 8",
      description: "This is the description for note 8.",
      writer: "Writer H",
    },
    {
      title: "Note 9",
      description: "This is the description for note 9.",
      writer: "Writer I",
    },
    {
      title: "Note 10",
      description: "This is the description for note 10.",
      writer: "Writer J",
    },
  ];

  return (
    <Box>
      <Text align={"center"} fontSize={"5xl"}>Study Note For Library</Text>

      <Flex wrap="wrap">
        {notes.map((note) => (
          <CardForStudyNote
            key={note.title}
            title={note.title}
            description={note.description}
            writer={note.writer}
          />
        ))}
      </Flex>
      
    </Box>
  );
};

export default StudyNotePage;

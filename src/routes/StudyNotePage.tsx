import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import React from "react";
import { getStudyNoteList } from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import { type_for_study_note_list_row } from "../types/study_note_type";

const StudyNotePage = () => {
  const {
    isLoading: studyNoteLoading,
    data: studyNoteData,
    refetch: studyNoteRefatch,
  } = useQuery<type_for_study_note_list_row[]>(
    ["getUncompletedTaskList"],
    getStudyNoteList,
    {
      enabled: true,
    }
  );

  console.log("studyNoteData : ", studyNoteData);

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

  if (studyNoteLoading || !studyNoteData) {
    return <div>Loading study notes...</div>;
  }

  return (
    <Box>
      <Text align={"center"} fontSize={"5xl"}>
        Study Note For Library
      </Text>

      <Box display="flex" justifyContent="flex-end">
        <ModalButtonForAddStudyNote />
      </Box>

      <Flex wrap="wrap">
        {studyNoteData.map((note: type_for_study_note_list_row) => (
          <CardForStudyNote
            pk={note.pk}
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

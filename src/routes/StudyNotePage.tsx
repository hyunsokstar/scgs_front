import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { apiForGetStudyNoteList } from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import {
  TypeForNoteList,
  type_for_study_note_list_row,
} from "../types/study_note_type";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";

const StudyNotePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");

  const {
    isLoading: studyNoteLoading,
    data: studyNoteData,
    refetch: studyNoteRefatch,
  } = useQuery<TypeForNoteList>(
    ["getStudyNoteListForCopyMode", pageNum, selectedNoteWriter],
    apiForGetStudyNoteList,
    {
      enabled: true,
    }
  );

  console.log("studyNoteData : ", studyNoteData);

  if (studyNoteLoading || !studyNoteData) {
    return <div>Loading study notes...</div>;
  }

  return (
    <Box>
      <Text align={"center"} fontSize={"5xl"}>
        Tech Note !!
      </Text>

      <Box display="flex" justifyContent="space-between" p={2}>
        <Link to={`/study-note/table-mode-for-update-page`}>
          <Button
            variant="outline"
            size={"sm"}
            colorScheme="yellow"
            _hover={{ bg: "yellow.100" }}
            ml={2}
            style={{
              backgroundColor: "transparent",
              marginRight: "10px",
            }}
          >
            Table Mode For Note Copy
          </Button>
        </Link>
        <ModalButtonForAddStudyNote />
      </Box>

      <Box px={"40px"} border={"0px solid purple"}>
        <Flex
          wrap="wrap"
          justifyContent={"flex-start"}
          gap={10}
          border={"0px solid black"}
        >
          {studyNoteData.noteList.map((note: type_for_study_note_list_row) => (
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

      <Box mt={5}>
        {studyNoteData ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={studyNoteData?.totalPageCount}
            task_number_for_one_page={
              studyNoteData?.note_count_per_page
            }
          />
        ) : (
          "no data"
        )}
      </Box>
    </Box>
  );
};

export default StudyNotePage;

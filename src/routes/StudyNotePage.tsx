import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { apiForGetStudyNoteList } from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import { TypeForNote, TypeForNoteList } from "../types/study_note_type";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const StudyNotePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const {
    isLoading: studyNoteLoading,
    data: studyNoteData,
    refetch: studyNoteListRefatch,
  } = useQuery<TypeForNoteList>(
    ["apiForgetStudyNoteList", pageNum, selectedNoteWriter],
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
        Tech Note !! (노트 더블 클릭)
      </Text>

      <Box
        display={"flex"}
        alignItems={"center"}
        border={"1px solid green"}
        mx={"30px"}
      >
        <ModalButtonForAddStudyNote button_text={"add study note"} />
        {isLoggedIn ? (
          <Link to={`/study-note/table-mode-for-update-page`}>
            <Button
              variant="outline"
              size={"md"}
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
        ) : (
          ""
        )}
      </Box>

      <Box px={"20px"} border={"0px solid purple"}>
        <Flex
          wrap="wrap"
          justifyContent={"flex-start"}
          gap={5}
          border={"0px solid black"}
        >
          {studyNoteData.noteList.map((note: TypeForNote) => (
            <CardForStudyNote
              pk={note.pk}
              key={note.title}
              title={note.title}
              description={note.description}
              writer={note.writer}
              note_cowriters={note.note_cowriters}
              count_for_note_contents={note.count_for_note_contents}
              studyNoteListRefatch={studyNoteListRefatch}
            />
          ))}
        </Flex>
      </Box>

      <Box mt={5}>
        {studyNoteData.noteList ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={studyNoteData?.totalPageCount}
            task_number_for_one_page={studyNoteData?.note_count_per_page}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StudyNotePage;

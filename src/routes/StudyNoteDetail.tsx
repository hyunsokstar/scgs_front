import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataForStudyNoteContent,
  StudyNoteData,
} from "../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../apis/study_note_api";
import { Box, Input, VStack, HStack, Text, Button } from "@chakra-ui/react";
import CardForStudyNoteContent from "../components/Card/CardForStudyNoteContent";
import ButtonsForPageNumbersForStudyNoteContents from "../components/Buttons/ButtonsForPageNumbersForStudyNoteContents";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { initializeCurrentPage } from "../reducers/studyNoteSlice";

interface Props {}

const StudyNoteDetail = (props: Props) => {
  const dispatch = useDispatch();

  const selectedButtonsData = useSelector(
    (state: RootState) => state.studyNote.selectedButtons
  );

  const { study_note_pk } = useParams();

  const currentPage = useSelector(
    (state: RootState) => state.studyNote.currentPage
  );

  const [pageToMove, setPageToMove] = useState<any>();
  const {
    data: response_data_for_api,
    isLoading: logind_for_study_note_content_list,
    refetch: refetch_for_study_note_content_list,
  } = useQuery<StudyNoteData>(
    [
      "apiForGetStuyNoteContentList",
      study_note_pk,
      currentPage,
      "apiForGetStuyNoteContentList",
    ],
    apiForGetStuyNoteContentList
  );

  console.log("response_data_for_api : ", response_data_for_api);

  if (logind_for_study_note_content_list) {
    return <Box>"loading.."</Box>;
  }

  //   const inputHandlerForCurrentPage = (e: any) => {
  //     setCurrentPage(e.target.value);
  //   };

  const onChangeForInputHandlerForCurrentPage = (e: any) => {
    // if (e.target.value == "") {
    // }
    setPageToMove(e.target.value);
  };

  const handlerForPageMoveButton = (pageToMove: any) => {
    dispatch(initializeCurrentPage(currentPage));
  };

  return (
    <Box display={"flex"}>
      <Box flex={4}>
        <Box>Study Note Content</Box>
        <Box border={"1px solid green"} height={"600px"} overflowY={"scroll"}>
          {response_data_for_api
            ? response_data_for_api.data_for_study_note_contents.map(
                (row: DataForStudyNoteContent, i) => {
                  return (
                    <CardForStudyNoteContent
                      pk={row.pk}
                      title={row.title}
                      file_name={row.file_name}
                      content={row.content}
                      writer={row.writer}
                      created_at={row.created_at}
                      index={i}
                    />
                  );
                }
              )
            : "no data"}
        </Box>
      </Box>
      <Box flex={1} border={"1px solid green"} p={2}>
        <VStack>
          <Text width={"100%"}>현재: {currentPage}</Text>
          {response_data_for_api ? (
            <ButtonsForPageNumbersForStudyNoteContents
              exist_page_numbers={response_data_for_api.exist_page_numbers}
              currentPage={currentPage}
              selectedButtonsData={selectedButtonsData}
            />
          ) : (
            ""
          )}
        </VStack>
      </Box>
    </Box>

    // <Box>
    //   12
    // </Box>
  );
};

// description
// pk
// title
// writer

export default StudyNoteDetail;

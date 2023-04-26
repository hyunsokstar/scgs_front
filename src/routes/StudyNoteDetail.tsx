import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataForStudyNoteContent,
  StudyNoteData,
} from "../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../apis/study_note_api";
import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import CardForStudyNoteContent from "../components/Card/CardForStudyNoteContent";
import ButtonsForPageNumbersForStudyNoteContents from "../components/Buttons/ButtonsForPageNumbersForStudyNoteContents";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { initializeCurrentPage } from "../reducers/studyNoteSlice";
import { SearchIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaSort } from "react-icons/fa";
import ModalButtonForInsertStudyNoteContent from "../components/modal/ModalButtonForInsertStudyNoteContent";

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

  const handleCreateClick = () => {
    // Create 버튼 클릭 시 실행되는 함수
  };

  const handleDeleteClick = () => {
    // Delete 버튼 클릭 시 실행되는 함수
  };

  const handleDeleteCheckClick = () => {
    // Delete for check 버튼 클릭 시 실행되는 함수
  };

  const handleOrderingClick = () => {
    // Ordering 버튼 클릭 시 실행되는 함수
  };

  const handleSearchClick = () => {
    // Search 버튼 클릭 시 실행되는 함수
  };

  return (
    <Box display={"flex"}>
      <Box flex={4}>
        <Box>Study Note Content</Box>

        <Box display="flex" alignItems="center" my={2}>
          <Box flex="1" pr={2} justifyContent="flex-start">
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              _hover={{ backgroundColor: "red.50" }}
              onClick={handleDeleteCheckClick}
              leftIcon={<DeleteIcon />}
            >
              Delete for check
            </Button>
            <Button
              ml={2}
              size="sm"
              colorScheme="blue"
              variant="outline"
              _hover={{ backgroundColor: "blue.50" }}
              onClick={handleOrderingClick}
              leftIcon={<FaSort />}
            >
              Ordering
            </Button>
            <Button
              ml={2}
              size="sm"
              colorScheme="yellow"
              variant="outline"
              _hover={{ backgroundColor: "yellow.50" }}
              onClick={handleSearchClick}
              leftIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
          <Box display={"flex"} gap={2} mr={1}>
            {/* <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              _hover={{ backgroundColor: "red.50" }}
              onClick={handleCreateClick}
            >
              Create
            </Button> */}

            <ModalButtonForInsertStudyNoteContent
              buttonText={"create"}
              currentPage={currentPage}
              study_note_pk={study_note_pk}
            />

            <Button
              size="sm"
              colorScheme="purple"
              variant="outline"
              _hover={{ backgroundColor: "purple.50" }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Box
          border={"1px solid green"}
          height={"600px"}
          overflowY={"scroll"}
          mr={1}
        >
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
              study_note_pk={study_note_pk}
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type_for_study_note_content } from "../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../apis/study_note_api";
import { Box, Input, VStack, HStack, Text, Button } from "@chakra-ui/react";
import CardForStudyNoteContent from "../components/Card/CardForStudyNoteContent";
import ButtonsForPageNumbersForStudyNoteContents from "../components/Buttons/ButtonsForPageNumbersForStudyNoteContents";

interface Props {}

const StudyNoteDetail = (props: Props) => {
  const { study_note_pk } = useParams();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageToMove, setPageToMove] = useState<any>();
  const {
    data: data_for_study_note_content_list,
    isLoading: logind_for_study_note_content_list,
    refetch: refetch_for_study_note_content_list,
  } = useQuery<type_for_study_note_content[]>(
    [
      "apiForGetStuyNoteContentList",
      study_note_pk,
      "apiForGetStuyNoteContentList",
    ],
    apiForGetStuyNoteContentList
  );

  console.log(
    "data_for_study_note_content_list : ",
    data_for_study_note_content_list
  );

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

  const handlerForPageMoveButton = (pageToMove:any) => {
    // alert()
    setCurrentPage(pageToMove);
  };

  return (
    <Box display={"flex"}>
      <Box flex={4}>
        <Box>Study Note Content</Box>
        <Box border={"1px solid green"} height={"600px"} overflowY={"scroll"}>
          {data_for_study_note_content_list
            ? data_for_study_note_content_list.map(
                (row: type_for_study_note_content, i) => {
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
          {/* <HStack width={"100%"} p={2}>
            <Text>current page : </Text>
            <Input
              size="sm"
              maxWidth="80px"
              //   type="number"
              value={currentPage}
              onChange={(e) => inputHandlerForCurrentPage(e)}
            />
          </HStack> */}
          {/* <Box>{currentPage} hi</Box> */}
          <ButtonsForPageNumbersForStudyNoteContents
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </VStack>
        <Box>
          <Text>current Page:</Text>
          <Input
            width={20}
            value={pageToMove}
            onChange={(e) => onChangeForInputHandlerForCurrentPage(e)}
          />
        </Box>
        <Button onClick={() => handlerForPageMoveButton(pageToMove)}>click</Button>
      </Box>
    </Box>
  );
};

// description
// pk
// title
// writer

export default StudyNoteDetail;

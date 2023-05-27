import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataForStudyNoteContent,
  StudyNoteData,
} from "../types/study_note_type";
import {
  apiFordeleteStudyNoteContentsForChecked,
  apiForGetStuyNoteContentList,
} from "../apis/study_note_api";
import { Box, VStack, Text, Button, HStack, useToast } from "@chakra-ui/react";
import CardForStudyNoteContent from "../components/Card/CardForStudyNoteContent";
import ButtonsForPageNumbersForStudyNoteContents from "../components/Buttons/ButtonsForPageNumbersForStudyNoteContents";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { initializeCurrentPage } from "../reducers/studyNoteSlice";
import { SearchIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaSort, FaListUl } from "react-icons/fa";
import ModalButtonForInsertStudyNoteContent from "../components/modal/ModalButtonForInsertStudyNoteContent";
import ButtonsForFindToContentWithOrderNum from "../components/Button/ButtonsForFindToContentWithOrderNum";
import ModalButtonForSearchStudyNoteContent from "../components/Button/ModalButtonForSearchStudyNoteContent";
import ModalButtonForStudyNoteContentOrdering from "../components/modal/ModalButtonForStudyNoteContentOrdering";

interface Props {}

// 1122
const StudyNoteDetail = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkedValues, setCheckedValues] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const toast = useToast();

  const selectedButtonsData = useSelector(
    (state: RootState) => state.studyNote.selectedButtons
  );

  const { study_note_pk } = useParams();

  const currentPage = useSelector(
    (state: RootState) => state.studyNote.currentPage
  );

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
    apiForGetStuyNoteContentList,
    {
      cacheTime: 0, // cacheTime을 0으로 설정하여 캐싱을 해제
    }
  );
  // 2244 function area

  const mutationForDeleteContentsForChecked = useMutation(
    (selectedButtonsData: number[]) => {
      return apiFordeleteStudyNoteContentsForChecked(selectedButtonsData);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "delete note contnet for checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  // 체크한 노트 내용 삭제
  const deleteContentsForChecked = () => {
    if (checkedValues.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }

    mutationForDeleteContentsForChecked.mutate(checkedValues);
  };

  const handleMoveToClick = (order: number) => {
    console.log("order : ", order);
    const targetElement = document.getElementById(`card-${order}`);
    console.log("targetElement : ", targetElement);

    if (targetElement) {
      const targetOffsetTop = targetElement.offsetTop;
      document.getElementById("card-container")?.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    }
  };

  const listButtonHandler = () => {
    navigate(`/study-note`);
  };

  if (logind_for_study_note_content_list) {
    return <Box>"loading.."</Box>;
  }

  return (
    <Box display={"flex"}>
      <Box flex={4}>
        <Box>Study Note Content</Box>

        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          my={2}
        >
          <Box display={"flex"} border={"0px solid green"} gap={2}>
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              _hover={{ backgroundColor: "purple.50" }}
              leftIcon={<FaListUl />}
              onClick={() => listButtonHandler()}
            >
              목록
            </Button>

            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              _hover={{ backgroundColor: "red.50" }}
              onClick={deleteContentsForChecked}
              leftIcon={<DeleteIcon />}
            >
              Delete for check
            </Button>
            <Box>
              <ModalButtonForSearchStudyNoteContent
                study_note_pk={study_note_pk}
              />
            </Box>
            <Box>
              <ModalButtonForStudyNoteContentOrdering
                study_note_pk={study_note_pk}
                currentPage={currentPage}
                data_for_study_note_contents={
                  response_data_for_api
                    ? response_data_for_api?.data_for_study_note_contents
                    : []
                }
              />
            </Box>
          </Box>
          <Box>
            <ModalButtonForInsertStudyNoteContent
              buttonText={"create"}
              currentPage={currentPage}
              study_note_pk={study_note_pk}
            />
          </Box>
        </Box>

        <Box
          id="card-container"
          border={"1px solid green"}
          height={"600px"}
          overflowY={"scroll"}
          mr={1}
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box
            id={"navi-box"}
            top={"220"}
            left={"88"}
            width={"67%"}
            border={"0px solid green"}
            p={2}
            position={"fixed"}
            zIndex={1}
          >
            <ButtonsForFindToContentWithOrderNum
              numCards={
                response_data_for_api?.data_for_study_note_contents.length
              }
              handleMoveToClick={handleMoveToClick}
            />
          </Box>

          <Box
            position={"absolute"}
            top={"80px"}
            w={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            {response_data_for_api
              ? response_data_for_api.data_for_study_note_contents.map(
                  (row: DataForStudyNoteContent, i) => {
                    return (
                      <CardForStudyNoteContent
                        pk={row.pk}
                        card_width={"90%"}
                        title={row.title}
                        file_name={row.file_name}
                        content={row.content}
                        writer={row.writer}
                        created_at={row.created_at}
                        order={i + 1}
                        index={i}
                        currentPage={currentPage}
                        study_note_pk={study_note_pk}
                        refetch_for_study_note_content_list={
                          refetch_for_study_note_content_list
                        }
                        setCheckedValues={setCheckedValues}
                      />
                    );
                  }
                )
              : "no data"}
          </Box>
        </Box>
      </Box>
      <Box flex={1} border={"1px solid green"} px={"auto"}>
        <VStack>
          <Text width={"100%"}>page: {currentPage}</Text>
          <Text width={"100%"}>
            not empty: {response_data_for_api?.exist_page_numbers.join(", ")}
          </Text>
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

export default StudyNoteDetail;

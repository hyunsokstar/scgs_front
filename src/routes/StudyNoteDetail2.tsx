import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataForStudyNoteContent,
  StudyNoteData,
} from "../types/study_note_type";
import {
  apiFordeleteStudyNoteContentsForChecked,
  apiForGetStuyNoteContentList,
  apiForLoadSavedPageForThisNote,
  apiForRegisterClassRoomForStudyNote,
} from "../apis/study_note_api";
import { Box, Text, Button, useToast, Avatar } from "@chakra-ui/react";
import CardForStudyNoteContent from "../components/Card/CardForStudyNoteContent";
import ButtonsForPageNumbersForStudyNoteContents from "../components/Buttons/ButtonsForPageNumbersForStudyNoteContents";

import { DeleteIcon } from "@chakra-ui/icons";
import { FaListUl } from "react-icons/fa";
import ModalButtonForInsertStudyNoteContent from "../components/modal/ModalButtonForInsertStudyNoteContent";
import ButtonsForFindToContentWithOrderNum from "../components/Button/ButtonsForFindToContentWithOrderNum";
import ModalButtonForSearchStudyNoteContent from "../components/Button/ModalButtonForSearchStudyNoteContent";
import ModalButtonForStudyNoteContentOrdering from "../components/modal/ModalButtonForStudyNoteContentOrdering";
import { initializeCurrentPage } from "../reducers/studyNoteSlice";
import ClipboardButtonForCopyCurrentUrl from "../components/Button/ClipboardButtonForCopyCurrentUrl";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import ModalButtonForInsertSubtitleForPage from "../components/modal/ModalButtonForInsertSubtitleForPage";
import CardForNoteSubTitleForPage from "../components/Card/CardForNoteSubTitleForPage";
import ModalButtonForInsertYoutubeContentsForNote from "../components/modal/ModalButtonForInsertYoutubeContentsForNote";
import CardForYoutubeContentForPage from "../components/Card/CardForYoutubeContentForPage";
import ModalButtonForSubtiTitleListForNoteContent from "../components/modal/ModalButtonForSubtititleListForNoteContent";
import ModalButtonForQnAList from "../components/modal/ModalButtonForQnAList";
import ModalButtonForRegisterErrorReportForNote from "../components/modal/ModalButtonForRegisterErrorReportForNote";

interface Props {}

// 1122
const StudyNoteDetail2 = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();
  const dispatch = useDispatch();
  const [topValue, setTopValue] = useState(270);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const navigate = useNavigate();

  const [checkedValues, setCheckedValues] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const toast = useToast();

  const pageNumbersToEdit = useSelector(
    (state: RootState) => state.studyNote.pageNumbersToEdit
  );

  const pageNumbersToMove = useSelector(
    (state: RootState) => state.studyNote.pageNumbersToMove
  );

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

  useEffect(() => {
    if (note_page_num) {
      dispatch(initializeCurrentPage(parseInt(note_page_num)));
    }
  }, [note_page_num]);

  const mutationForDeleteContentsForChecked = useMutation(
    (pageNumbersToEdit: number[]) => {
      return apiFordeleteStudyNoteContentsForChecked(pageNumbersToEdit);
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

      // alert(targetOffsetTop)

      document.getElementById("card-container")?.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    }
  };

  const listButtonHandler = () => {
    navigate(`/study-note`);
  };

  const mutationForRegisterClassRoomForStudyNote = useMutation(
    apiForRegisterClassRoomForStudyNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data: ", data);

        toast({
          title: "Classroom registration success!",
          status: "success",
          description: data,
          duration: 2000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        console.log("error : ", error.response.data);

        console.log("error type: ", error.response.data.message_type);
        console.log("error message", error.response.data.message);

        const errorMessage = error.response.data.message; // Adjust the error message field based on your API response structure
        if (error.response.data.message_type === "warnning") {
          toast({
            title: "recored is already exists",
            description: errorMessage,
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error registering classroom",
            description: errorMessage,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      },
    }
  );

  const buttonHandlerForRegisterClassRoomForStudyNote = () => {
    // alert(study_note_pk);
    const current_page = note_page_num;
    mutationForRegisterClassRoomForStudyNote.mutate({
      study_note_pk,
      current_page,
    });
  };

  const mutationForLoadSavedPageForThisNote = useMutation(
    apiForLoadSavedPageForThisNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data: ", data);

        toast({
          title: "load save page success!",
          status: "success",
          description: data.current_page,
          duration: 2000,
          isClosable: true,
        });
        navigate(`/study-note/${study_note_pk}/${data.current_page}`);
      },
      onError: (error: any) => {
        console.log("error : ", error);
        console.log("error : ", error.response.data);

        // if(error.response.data)

        console.log("error type: ", error.response.data.message_type);
        console.log("error message", error.response.data.message);

        toast({
          title: "error",
          description: error.response.data,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  const buttonHandlerForLoadSavedPageForThisNote = () => {
    mutationForLoadSavedPageForThisNote.mutate({ study_note_pk });
  };

  // 2244
  const is_authority_for_note =
    response_data_for_api?.note_user_name === loginUser.username ||
    response_data_for_api?.co_writers_for_approved.includes(loginUser.username);

  const note_cowriters = response_data_for_api?.co_writers_for_approved.map(
    (row) => {
      return row.profile_image;
    }
  );

  if (logind_for_study_note_content_list) {
    return <Box>"loading.."</Box>;
  }

  // 컴포넌트 내에서 화면 사이즈에 따라 top 값을 동적으로 조절하는 방법

  return (
    <Box
      display={"flex"}
      border={"5px solid green"}
      height={"100%"}
      width={"100%"}
      flexDirection={["column", "column", "column", "column", "row"]}
    >
      {/* fix  */}
      <Box
        width={["100%", "100%", "100%", "100%", "80%"]}
        border={"1px solid black"}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          my={2}
        >
          <Box
            display={"flex"}
            border={"0px solid green"}
            gap={2}
            px={2}
            flexWrap={"wrap"}
          >
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
            <ModalButtonForSubtiTitleListForNoteContent
              modal_title={`Note Title: ${response_data_for_api?.note_title}`}
              button_text={"Subtitle List"}
              button_size={"sm"}
              study_note_pk={study_note_pk}
              // button_width={""}
            />

            <ModalButtonForSearchStudyNoteContent
              study_note_pk={study_note_pk}
            />

            {is_authority_for_note ? (
              <Box display={"flex"} gap={2}>
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
            ) : (
              ""
            )}
          </Box>
          <Box display={"flex"} gap={2} flexWrap={"wrap"} px={2}>
            <Box>
              <ModalButtonForQnAList
                button_text={"Q&A"}
                button_size={"md"}
                modal_title={`QA list for page ${note_page_num}`}
                modal_size={"6xl"}
                study_note_pk={study_note_pk}
                note_page_num={note_page_num}
                count_for_qna_boards={0}
              />
            </Box>

            <Box>
              <ClipboardButtonForCopyCurrentUrl />
            </Box>

            {is_authority_for_note ? (
              <Box display={"flex"} gap={2}>
                <ModalButtonForInsertYoutubeContentsForNote
                  study_note_pk={study_note_pk}
                  currentPage={currentPage}
                  button_text="youtube"
                />
                <ModalButtonForInsertSubtitleForPage
                  button_text={"subtitle for page"}
                  study_note_pk={study_note_pk}
                  currentPage={currentPage}
                />
                <ModalButtonForInsertStudyNoteContent
                  button_text={"note content"}
                  currentPage={currentPage}
                  study_note_pk={study_note_pk}
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>

        <Box
          backgroundColor="gray.200"
          p={4}
          fontWeight="bold"
          display={"flex"}
          justifyContent={"space-between"}
          mr={1}
          mb={2}
        >
          <Box>
            <Box>note subject:</Box>
            <Box>{response_data_for_api?.note_title}</Box>
          </Box>
          <Box>
            <Box>CoWriters: </Box>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              {response_data_for_api &&
              response_data_for_api.co_writers_for_approved.length
                ? response_data_for_api?.co_writers_for_approved.map((row) => {
                    return (
                      <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Box>
                          <Avatar
                            name={row.username}
                            src={row.profile_image}
                            size="sm"
                            ml={"2px"}
                          />
                        </Box>
                        <Box>{row.username}</Box>
                      </Box>
                    );
                  })
                : " no cowriters"}
            </Box>
          </Box>
          <Box>
            <Box>writer:{response_data_for_api?.note_user_name}</Box>
            <Box>page: {currentPage}</Box>
          </Box>
        </Box>

        <Box>
          <Box
            id={"navi-box"}
            width={"100%"}
            border={"0px solid pink"}
            my={2}
            mx={5}
            // bg={"lightblue"}
            zIndex={10}
            // position={"absolute"}
          >
            <ButtonsForFindToContentWithOrderNum
              numCards={
                response_data_for_api?.data_for_study_note_contents.length
              }
              handleMoveToClick={handleMoveToClick}
            />
          </Box>
        </Box>

        <Box
          pt={30}
          id="card-container"
          height={"68vh"}
          overflowY={"scroll"}
          mr={1}
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          border={"2px solid black"}
        >
          <Box
            position={"absolute"}
            top={"10px"}
            w={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            border={"0px solid black"}
            // pt={1824}
            // height={"100vh"}
          >
            {response_data_for_api &&
            response_data_for_api.data_for_study_note_contents.length ? (
              response_data_for_api.data_for_study_note_contents.map(
                (row: DataForStudyNoteContent, i) => {
                  if (row.content_option === "note_content") {
                    return (
                      <CardForStudyNoteContent
                        pk={row.pk}
                        card_width={"98%"}
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
                        is_authority_for_note={is_authority_for_note}
                      />
                    );
                  } else if (row.content_option === "subtitle_for_page") {
                    return (
                      <CardForNoteSubTitleForPage
                        pk={row.pk}
                        card_width={"98%"}
                        title={row.title}
                        content={row.content}
                        writer={row.writer}
                        order={i + 1}
                        setCheckedValues={setCheckedValues}
                        is_authority_for_note={is_authority_for_note}
                        ref_url1={row.ref_url1}
                        ref_url2={row.ref_url2}
                        youtube_url={row.youtube_url}
                      />
                    );
                  } else if (row.content_option === "youtube") {
                    return (
                      <CardForYoutubeContentForPage
                        order={i + 1}
                        setCheckedValues={setCheckedValues}
                        is_authority_for_note={is_authority_for_note}
                        card_width={"98%"}
                        pk={row.pk}
                        writer={row.writer}
                        title={row.title}
                        youtube_url={row.youtube_url}
                      />
                    );
                  }
                }
              )
            ) : (
              <Box>
                <Box
                  fontSize="5xl"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  bg="blue.50"
                  color="red.500"
                  p={3}
                >
                  No note content available yet for {currentPage} Page !
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* fix this */}
      <Box
        width={["100%", "100%", "100%", "100%", "20%"]}
        border={"2px solid black"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} gap={2} p={2}>
            <Button
              variant={"outline"}
              border={"1px solid black"}
              width={"50%"}
              size={"sm"}
              onClick={buttonHandlerForRegisterClassRoomForStudyNote}
            >
              save page
            </Button>
            <Button
              variant={"outline"}
              border={"1px solid black"}
              width={"50%"}
              size={"sm"}
              onClick={buttonHandlerForLoadSavedPageForThisNote}
            >
              load page
            </Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text width={"100%"}>
              page: {currentPage}
              &nbsp;
            </Text>
            <Box p={2}>
              <ModalButtonForRegisterErrorReportForNote
                button_text={"🚨"}
                button_size={"sm"}
                modal_title={`title: ${response_data_for_api?.note_title} page: ${currentPage} 에 대한 error report register`}
                modal_size={"7xl"}
                study_note_pk={study_note_pk}
                currentPage={currentPage}
              />
            </Box>
          </Box>
          <Box>
            not empty: {response_data_for_api?.exist_page_numbers.join(", ")}
          </Box>

          {response_data_for_api ? (
            <ButtonsForPageNumbersForStudyNoteContents
              exist_page_numbers={response_data_for_api.exist_page_numbers}
              currentPage={currentPage}
              pageNumbersToEdit={pageNumbersToEdit}
              pageNumbersToMove={pageNumbersToMove}
              study_note_pk={study_note_pk}
              is_authority_for_note={is_authority_for_note}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>

    // <Box>
    //   12
    // </Box>
  );
};

export default StudyNoteDetail2;

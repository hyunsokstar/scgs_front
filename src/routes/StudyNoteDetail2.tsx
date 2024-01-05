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
import {
  Box,
  Text,
  Button,
  useToast,
  Avatar,
  useBreakpointValue,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Checkbox,
  Grid,
} from "@chakra-ui/react";
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
import { EditIcon } from "@chakra-ui/icons";
import ModalButtonForUpdateCoworkerInfo from "../components/modal/ModalButtonForUpdateCoworkerInfo";
import MasterCheckBox from "../components/MasterCheckBox/MasterCheckBox";
import ModalButtonForFaqListForNote from "../components/modal/ModalButtonForFaqListForNote";

interface Props { }

// 1122
const StudyNoteDetail2 = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();
  const dispatch = useDispatch();
  const [topValue, setTopValue] = useState(270);
  const [savedPageNumForCurrentPage, setSavedPageNumForCurrentPage] =
    useState(0);

  const [tasking, setTasking] = useState(true); // Initialize the tasking state
  const [authorityForWritingNoteContents, setAuthorityForWritingNoteContents] =
    useState(false);

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
    ["apiForGetStuyNoteContentList", study_note_pk, currentPage],
    apiForGetStuyNoteContentList,
    {
      enabled: true,
    }
  );


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
          description: data.save_page_num,
          duration: 2000,
          isClosable: true,
        });
        setSavedPageNumForCurrentPage(data.save_page_num);
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

    if (isLoggedIn) {
      const current_page = note_page_num;
      mutationForRegisterClassRoomForStudyNote.mutate({
        study_note_pk,
        current_page,
      });
    } else {
      alert("현재 페이지를 저장 하려면 로그인이 필요 합니다.");
      return;
    }
  };

  const mutationForInitializeSavedPageNumForThisNote = useMutation(
    apiForLoadSavedPageForThisNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data2 : ", data);

        // toast({
        //   title: "load save page success!",
        //   status: "success",
        //   description: data.current_page,
        //   duration: 2000,
        //   isClosable: true,
        // });
        setSavedPageNumForCurrentPage(data.current_page);
        // navigate(`/study-note/${study_note_pk}/${data.current_page}`);
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

  const mutationForLoadSavedPageForThisNote = useMutation(
    apiForLoadSavedPageForThisNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data 11: ", data.current_page);

        toast({
          title: "load save page success!",
          status: "success",
          description: data.current_page,
          duration: 2000,
          isClosable: true,
        });
        // setSavedPageNumForCurrentPage(data.save_page_num);
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

  const direction_option_for_note_meta_info = useBreakpointValue<any>({
    base: "column",
    md: "row",
  });

  const is_authority_for_note =
    response_data_for_api?.note_user_name === loginUser.username ||
    response_data_for_api?.co_writers_for_approved.includes(loginUser.username);

  const note_cowriters = response_data_for_api?.co_writers_for_approved.map(
    (row) => {
      return row.profile_image;
    }
  );

  // useEffect(() => {
  //   if (response_data_for_api) {
  //     setAuthorityForWritingNoteContents(
  //       response_data_for_api?.authority_for_writing_note_contents
  //     );
  //   }
  // }, [response_data_for_api]);

  useEffect(() => {
    if (isLoggedIn) {
      mutationForInitializeSavedPageNumForThisNote.mutate({ study_note_pk });
    }
    if (note_page_num) {
      dispatch(initializeCurrentPage(parseInt(note_page_num)));
    }

    if (response_data_for_api) {
      setAuthorityForWritingNoteContents(
        response_data_for_api?.authority_for_writing_note_contents
      );
    }

    // alert("위치 확인")
  }, [note_page_num, response_data_for_api]);

  if (logind_for_study_note_content_list) {
    return <Box>"loading.."</Box>;
  }
  // 컴포넌트 내에서 화면 사이즈에 따라 top 값을 동적으로 조절하는 방법

  if (!response_data_for_api) {
    return <Box>loading..</Box>;
  }


  // 2244
  return (
    <Box
      display={"flex"}
      border={"2px solid gray"}
      height={"100%"}
      width={"100%"}
      flexDirection={["column", "column", "column", "column", "row"]}
    >
      <Box
        width={["100%", "100%", "100%", "100%", "80%"]}
        border={"1px solid black"}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          my={2}
        // border={"2px solid blue"}
        >
          <Box
            display={"flex"}
            gap={2}
            px={2}
            flexWrap={"wrap"}
            flexDirection={["column", "column", "column", "column", "row"]}
          >
            <Box>
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                _hover={{ backgroundColor: "purple.50" }}
                leftIcon={<FaListUl />}
                onClick={() => listButtonHandler()}
                width={"100%"}
              >
                목록
              </Button>
            </Box>
            <ModalButtonForSubtiTitleListForNoteContent
              modal_title={`Note Title: ${response_data_for_api?.note_title}`}
              button_text={"Subtitle List"}
              button_size={"sm"}
              button_width="100%"
              study_note_pk={study_note_pk}
            />

            <ModalButtonForSearchStudyNoteContent
              study_note_pk={study_note_pk}
            />

            {authorityForWritingNoteContents ? (
              <>
                <ModalButtonForStudyNoteContentOrdering
                  study_note_pk={study_note_pk}
                  currentPage={currentPage}
                  data_for_study_note_contents={
                    response_data_for_api
                      ? response_data_for_api?.data_for_study_note_contents
                      : []
                  }
                />
              </>
            ) : (
              ""
            )}
          </Box>
          <Box
            display={"flex"}
            gap={2}
            flexWrap={"wrap"}
            px={2}
            flexDirection={["column", "column", "column", "column", "row"]}
            // border={"5px solid red"}
            my={2}
          >
            <Box>
              <ModalButtonForQnAList
                button_text={"Q&A"}
                button_width={"100%"}
                button_size={"sm"}
                modal_title={`QA list for page ${note_page_num}`}
                modal_size={"6xl"}
                study_note_pk={study_note_pk}
                total_count_for_qna_board={
                  response_data_for_api?.question_count_for_current_page
                }
              />
            </Box>

            <Box>
              <ClipboardButtonForCopyCurrentUrl
                button_size={"sm"}
                button_width={"100%"}
              />
            </Box>

            {authorityForWritingNoteContents ? (
              <Box
                display={"flex"}
                gap={2}
                flexDirection={["column", "column", "column", "column", "row"]}
              >
                <ModalButtonForInsertYoutubeContentsForNote
                  study_note_pk={study_note_pk}
                  currentPage={currentPage}
                  button_text="youtube"
                  button_width={"100%"}
                  button_size={"sm"}
                />
                <ModalButtonForInsertSubtitleForPage
                  button_text={"Subtitle"}
                  study_note_pk={study_note_pk}
                  currentPage={currentPage}
                  button_size={"sm"}
                  button_width={"100%"}
                />
                <ModalButtonForInsertStudyNoteContent
                  button_text={"note content"}
                  currentPage={currentPage}
                  study_note_pk={study_note_pk}
                  button_size={"sm"}
                  button_width={"100%"}
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>

        {/* fix */}
        <Box
          backgroundColor="gray.200"
          p={4}
          fontWeight="bold"
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={direction_option_for_note_meta_info}
          gap={3}
          my={2}
        >
          {/* 헤더 인포 for left side */}
          <Box>
            <Text as="span" color="purple.500" fontWeight="bold">
              Writer:
              {response_data_for_api?.note_user_name}
            </Text>{" "}
            <Box>
              <Text as="span" color="blue.500" fontWeight="bold">
                Title:
              </Text>{" "}
              {response_data_for_api?.note_title}
            </Box>
            <Box>
              <Text as="span" color="green.500" fontStyle="italic">
                SubTitle:
              </Text>{" "}
              {response_data_for_api?.subtitle_for_page}
            </Box>
          </Box>{" "}
          {/* ceter side */}
          <Box>
            <Box>CoWriters: </Box>
            <Box display="flex" gap={2} alignItems="center">
              {response_data_for_api.co_writers_for_approved.length > 0 ? (
                <Table variant="simple" size={"sm"}>
                  <Thead>
                    <Tr>
                      <Th>Profile</Th>
                      <Th>is_tasking</Th>
                      <Th>Current Page</Th>
                      <Th>Task Description</Th>
                      <Th>Update</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {response_data_for_api.co_writers_for_approved.map(
                      (user) => (
                        <Tr key={user.id} textAlign={"center"}>
                          <Td>
                            {/* <Avatar
                              name={user.username}
                              src={user.profile_image || ""}
                              size="sm"
                            /> */}
                            {user.username}
                          </Td>
                          <Td> {user.is_tasking ? "yes" : "no"}</Td>
                          <Td>{user.current_page}</Td>
                          <Td>{user.task_description}</Td>
                          <Td>
                            {/* modal for cowriter */}
                            <ModalButtonForUpdateCoworkerInfo
                              studyNotePk={study_note_pk}
                              currentPage={currentPage}
                              setAuthorityForWritingNoteContents={
                                setAuthorityForWritingNoteContents
                              }
                              coWritersInfoData={
                                response_data_for_api
                                  ? response_data_for_api?.co_writers_for_approved
                                  : []
                              }
                            />
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              ) : (
                <Text>no cowriters</Text>
              )}
            </Box>
          </Box>
          {/* <Box>page: {currentPage}</Box> */}
          {/* <Box>right side</Box> */}
        </Box>

        <Box>
          <Box
            id={"navi-box"}
            width={"100%"}
            border={"0px solid pink"}
            my={2}
            zIndex={10}
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
          height={"100rem"}
          overflowY={"scroll"}
          // mr={1}
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          border={"5px solid red"}
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
          >
            {authorityForWritingNoteContents ? (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
                width={"98%"}
                px={2}
                border={"1px solid green"}
              >
                <MasterCheckBox
                  checkedIds={checkedValues}
                  setCheckedIds={setCheckedValues}
                  listData={response_data_for_api?.data_for_study_note_contents}
                />

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
              </Box>
            ) : (
              ""
            )}

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
                        checkedValues={checkedValues}
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
                        checkedValues={checkedValues}
                        setCheckedValues={setCheckedValues}
                        is_authority_for_note={is_authority_for_note}
                        ref_url1={row.ref_url1}
                        ref_url2={row.ref_url2}
                        youtube_url={row.youtube_url}
                        refetch_for_study_note_content_list={
                          refetch_for_study_note_content_list
                        }
                      />
                    );
                  } else if (row.content_option === "youtube") {
                    return (
                      <CardForYoutubeContentForPage
                        order={i + 1}
                        checkedValues={checkedValues}
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
        border={"0px solid black"}
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
              load page ({savedPageNumForCurrentPage})
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
        <Grid templateColumns="repeat(2, 1fr)" gap={2} p={2}>
          <ModalButtonForFaqListForNote
            button_text={"Faq Board"}
            button_size={"sm"}
            button_width={"100%"}
            modal_title={`${response_data_for_api?.note_title} 에 대한 faq`}
            study_note_pk={study_note_pk}
            modal_size={""}
          // total_count_for_faq_list={total_count_for_faq_list}
          />
          <Box>{/* 첫 번째 열에 들어갈 내용 */}</Box>
        </Grid>
      </Box>
    </Box>

    // <Box>
    //   12
    // </Box>
  );
};

export default StudyNoteDetail2;

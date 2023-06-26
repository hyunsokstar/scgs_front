import {
  Box,
  Button,
  IconButton,
  Grid,
  Text,
  useColorModeValue,
  useToast,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  NoteWriterType,
  TypeForNoteCoWriter,
} from "../../types/study_note_type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiForRegisterForCoWriterForOtherUserNote,
  apiFordeleteOneStudyNote,
} from "../../apis/study_note_api";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ClipboardButtonForCopyCurrentUrl from "../Button/ClipboardButtonForCopyCurrentUrl";
import TableForNoteCoworkers from "../Table/TableForNoteCoworkers";
import ModalButtonForSubtititleListForNoteContent from "../modal/ModalButtonForSubtititleListForNoteContent";
import ModalButtonForBriefingBoardForNote from "../modal/ModalButtonForBriefingBoardForNote";
import ModalButtonForUpdateStudyNote from "../modal/ModalButtonForUpdateStudyNote";
import ModalButtonForClassRoomListForStudyNote from "../modal/ModalButtonForClassRoomListForStudyNote";
import ModalButtonForQnAList from "../modal/ModalButtonForQnAList";
import { MdLocalPolice } from "react-icons/md";
import ModalButtonForErrorReportForNote from "../modal/ModalButtonForErrorReportForNote";

interface IProps {
  pk: any;
  title: string;
  description: string;
  writer: NoteWriterType;
  note_cowriters: TypeForNoteCoWriter[];
  studyNoteListRefatch: () => void;
  first_category: string;
  second_category: string;
  count_for_note_contents: number;
  count_for_note_comments: number;
  count_for_qna_boards: number;
  count_for_note_contents_for_subtitle: number;
  count_for_class_list: number;
}

// 1122
const CardForStudyNote: React.FC<IProps> = ({
  pk,
  title,
  description,
  writer,
  note_cowriters,
  first_category,
  second_category,
  count_for_note_contents,
  count_for_note_comments,
  count_for_qna_boards,
  count_for_note_contents_for_subtitle,
  count_for_class_list,
  studyNoteListRefatch,
}) => {
  const cardBgColor = useColorModeValue("gray.100", "gray.700");
  const bodyBgColor = useColorModeValue("gray.100", "gray.700");
  const footerBgColor = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  console.log("note_cowriters : ", note_cowriters);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const mutationForDeleteStudyNote = useMutation(
    (pk: number) => {
      return apiFordeleteOneStudyNote(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        if (studyNoteListRefatch) {
          studyNoteListRefatch();
        }
        queryClient.refetchQueries(["apiForgetStudyNoteList"]);

        toast({
          title: "delete api docu 성공!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  const deleteStudyNoteButtonHandler = (pk: any, wirter: any) => {
    console.log("wirter : ", wirter);
    console.log("loginUser.username : ", loginUser.username);

    const login_user_name = loginUser.username;
    const writer_name = writer.username;

    if (login_user_name === writer_name) {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        mutationForDeleteStudyNote.mutate(pk);
      }
      // alert("삭제 gogo");
    } else {
      alert(`작성자인 ${writer_name}님만 삭제 가능 합니다 !`);
    }
  };

  const goToStudyNoteDetail = (pk: any) => {
    navigate(`/study-note/${pk}/1`);
  };

  const mutationForRegisterForCoWriterForOtherUserNote = useMutation(
    apiForRegisterForCoWriterForOtherUserNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        toast({
          title: "register for CoWriter Scusses !!",
          status: "success",
        });
        queryClient.refetchQueries(["apiForgetStudyNoteList"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const buttonHandlerForRegisterCoWokerForNote = (notePk: number) => {
    mutationForRegisterForCoWriterForOtherUserNote.mutate({ notePk });
  };

  const buttonHandlerForMoveSlidePageForThisNote = (pk: any) => {
    // alert(pk);
    navigate(`/study-note/${pk}/1/slide`);
  };

  // 2244
  return (
    <Box border={"0px solid blue"} width={"49%"} px={"auto"} mx={"auto"}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="91vh"
        mx={"auto"}
        bg={cardBgColor}
        boxShadow="md"
        transition="box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out"
        _hover={{
          borderColor: borderColor,
          boxShadow: "xl",
          transform: "translateY(-2px)",
        }}
        border={"0px solid red"}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          bg={writer.username === loginUser.username ? "green.200" : "blue.200"}
          px="2"
          py="1"
        >
          <Box display={"flex"} gap={2}>
            <Text fontSize="xl" fontWeight="bold">
              {title} ({count_for_note_contents})
            </Text>
            <ClipboardButtonForCopyCurrentUrl
              button_size={"sm"}
              pk={pk}
              // width="100%" // 수정된 부분
              textAlign="center" // 수정된 부분
            />
          </Box>

          {writer.username === loginUser.username ? (
            <Box display={"flex"} gap={2}>
              <ModalButtonForUpdateStudyNote
                button_text={"update for study note"}
                button_size={"sm"}
                modal_title={"Modal For update for study note"}
                study_note_pk={pk}
                study_note_title={title}
                study_note_description={description}
                study_note_first_category={first_category}
                study_note_second_category={second_category}
              />

              <IconButton
                aria-label="Close"
                icon={
                  <CloseIcon
                    onClick={() => deleteStudyNoteButtonHandler(pk, writer)}
                  />
                }
                variant="outline"
                size="sm"
                colorScheme="pink"
              />
            </Box>
          ) : (
            ""
          )}
        </Box>

        <Box
          p="2"
          bg={bodyBgColor}
          display={"flex"}
          // justifyContent={"space-between"}
          width={"100%"}
          height={"300px"}
          _hover={{ bg: "blue.100" }}
          id={"note-content-card"}
          defaultValue={"note-content-card"}
          gap={2}
          border={"0px solid gray"}
        >
          <Box
            fontSize="sm"
            width={"70%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            border={"0px solid purple"}
          >
            <Box flex={1}>{description}</Box>
            <Box flex={2} border={"0px solid pink"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                mb={1}
                border={"0px solid blue"}
              >
                <Box>Co-Writer</Box>
                <Box>
                  {/* cowriter add */}
                  {isLoggedIn && loginUser.username !== writer.username ? (
                    <IconButton
                      aria-label="Add"
                      size={"xs"}
                      icon={<AddIcon />}
                      variant="outline"
                      borderColor="blue"
                      _hover={{ bgColor: "blue.100" }}
                      onClick={() => {
                        if (!isLoggedIn) {
                          toast({
                            title:
                              "로그인한 유저만 CoWriter 신청 할 수 있습니다. ",
                            status: "warning",
                            duration: 2000, // Automatically close after 2 seconds
                            isClosable: true, // Display close button
                            position: "top", // Display at the top of the screen
                          });
                          return;
                        }

                        const coWriterUserNames = note_cowriters.map((co) => {
                          return co.writer.username;
                        });

                        if (coWriterUserNames.includes(loginUser.username)) {
                          toast({
                            title: "이미 CoWriter 신청 했습니다.",
                            status: "warning",
                            duration: 2000, // Automatically close after 2 seconds
                            isClosable: true, // Display close button
                            position: "top", // Display at the top of the screen
                          });
                          return;
                        }

                        if (loginUser.username === writer.username) {
                          toast({
                            title:
                              "내가 작성한 노트에는 coWriter 신청을 할 수 없습니다",
                            status: "warning",
                            duration: 2000, // Automatically close after 2 seconds
                            isClosable: true, // Display close button
                            position: "top", // Display at the top of the screen
                          });
                          return;
                        } else {
                          const message = `${loginUser.username} 님 ${title}에 대해 co-writer 신청 하시겠습니까?`;
                          if (window.confirm(message)) {
                            buttonHandlerForRegisterCoWokerForNote(pk);
                          } else {
                            alert("취소 하셨습니다. ");
                          }
                        }
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
              <Box>
                <TableForNoteCoworkers
                  noteOwnerUserName={writer.username}
                  noteCowriters={note_cowriters}
                />
              </Box>
            </Box>
          </Box>
          <Box
            p={2}
            gap={2}
            bg={"gray.100"}
            border={"0px solid blue"}
            display={"flex"}
            justifyContent={"space-around"}
            width={"30%"}
          >
            <Grid
              templateColumns="repeat(2, 48%)"
              px={"auto"}
              border={"0px solid pink"}
              gap={2}
            >
              <Box>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  border={"1px solid black"}
                  onClick={(event) => {
                    console.log("event : ", event.target);
                    event.stopPropagation();
                    goToStudyNoteDetail(pk);
                  }}
                  _hover={{ bgColor: "yellow.100" }}
                  width="100%" // 수정된 부분
                  textAlign="center" // 수정된 부분
                >
                  Open
                </Button>
              </Box>

              <Box>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  border={"1px solid black"}
                  _hover={{ bgColor: "yellow.100" }}
                  onClick={() => buttonHandlerForMoveSlidePageForThisNote(pk)}
                  width="100%" // 수정된 부분
                  textAlign="center" // 수정된 부분
                >
                  Slide
                </Button>
              </Box>

              <Box>
                <ModalButtonForSubtititleListForNoteContent
                  modal_title={`${title}'s subtitle list`}
                  button_text={"SubTitle"}
                  study_note_pk={pk}
                  button_size={"sm"}
                  button_width="100%" // 수정된 부분
                  count_for_note_contents_for_subtitle={
                    count_for_note_contents_for_subtitle
                  }
                />
              </Box>

              <Box>
                {/* 0617 */}
                <ModalButtonForBriefingBoardForNote
                  note_owner_user_name={writer.username}
                  modal_title={`${title}'s Briefing Board`}
                  button_text={"Briefing"}
                  button_size={"sm"}
                  study_note_pk={pk}
                  count_for_note_comments={count_for_note_comments}
                  button_width="100%" // 수정된 부분
                />
              </Box>

              <Box>
                <ModalButtonForClassRoomListForStudyNote
                  button_text={"Class Room"}
                  button_width={"100%"}
                  button_size={"sm"}
                  modal_title={`${title} 에 대한 Class Room`}
                  study_note_pk={pk}
                  modal_size={"6xl"}
                  count_for_class_list={count_for_class_list}
                />
              </Box>

              <Box>
                <ModalButtonForQnAList
                  button_text={"Q & A"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={`${title} 에 대한 Q& A`}
                  study_note_pk={pk}
                  modal_size={"6xl"}
                  count_for_qna_boards={count_for_qna_boards}
                />
              </Box>

              <Box>
                <ModalButtonForErrorReportForNote
                  button_text={"🚨 error report"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={`${title} 에 대한 error report`}
                  study_note_pk={pk}
                  modal_size={""}
                />
              </Box>

              {/* <Box>
                <ModalButtonForErrorReportForNote
                  button_text={"제안(미정)"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={"modal for error report"}
                  modal_size={"6xl"}
                  study_note_pk={pk}
                />
              </Box>

              <Box>
                <ModalButtonForErrorReportForNote
                  button_text={"까페(미정)"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={"modal for error report"}
                  modal_size={"6xl"}
                />
              </Box>

              <Box>
                <ModalButtonForErrorReportForNote
                  button_text={"chat(미정)"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={"modal for error report"}
                  modal_size={"6xl"}
                  study_note_pk={pk}
                />
              </Box> */}
            </Grid>
          </Box>
        </Box>
        <Box
          // position={"absolute"}
          p="2"
          bg={footerBgColor}
          bottom={0}
          w={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Text>1st: {first_category}</Text>
            <Text>2nd: {second_category}</Text>
          </Box>

          <Box textAlign={"right"}>
            <Text fontSize="sm" textAlign="right">
              written by {writer ? writer.username : "no user"}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardForStudyNote;

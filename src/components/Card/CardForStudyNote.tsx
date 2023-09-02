import {
  Box,
  Button,
  IconButton,
  Icon,
  Grid,
  Text,
  useColorModeValue,
  useToast,
  useBreakpointValue,
  Avatar,
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
import ModalButtonForErrorReportForNote from "../modal/ModalButtonForErrorReportForNote";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import ModalButtonForFaqListForNote from "../modal/ModalButtonForFaqListForNote";

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

  const note_card_direction = useBreakpointValue({
    base: "column", // default value for all breakpoints
    md: "row", // for medium-sized screens and up
    lg: "row", // for small screens and up
  });

  const note_card_width = useBreakpointValue({
    base: "100%", // default value for all breakpoints
    md: "50%", // for medium-sized screens and up
    lg: "50%", // for small screens and up
  });

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const mutationForDeleteStudyNote = useMutation(
    (pk: number) => {
      return apiFordeleteOneStudyNote(pk);
    },
    {
      onSuccess: (data) => {
        console.log("data : ", data);
        // alert("삭제 성공")

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

  const note_header_direction = useBreakpointValue({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
  });

  // 2244
  return (
    <Box border={"1px solid blue"} width={"100%"}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="100%"
        bg={cardBgColor}
        boxShadow="md"
        transition="box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out"
        _hover={{
          borderColor: borderColor,
          boxShadow: "xl",
          transform: "translateY(-2px)",
        }}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          flexDirection={note_header_direction}
          bg={writer.username === loginUser.username ? "green.200" : "blue.200"}
          px="2"
          py="3"
          width={"100%"}
        >
          <Box display={"flex"} gap={2}>
            {writer.profile_image ? (
              <Avatar size="sm" src={writer.profile_image} />
            ) : (
              <Avatar size="sm" name={writer.username} />
            )}
            <Text fontSize="xl" fontWeight="bold">
              {title} ({count_for_note_contents})
            </Text>
          </Box>

          {writer.username === loginUser.username ? (
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
              <ClipboardButtonForCopyCurrentUrl
                button_size={"sm"}
                pk={pk}
                textAlign="center" // 수정된 부분
              />
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
          width={"100%"}
          _hover={{ bg: "blue.100" }}
          id={"note-content-card"}
          defaultValue={"note-content-card"}
          gap={2}
          height={"400px"}
          flexDirection={note_card_direction}
        >
          <Box
            fontSize="sm"
            width={note_card_width}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            border={"1px solid gray"}
          >
            <Box flex={1} p={2}>
              {description}
            </Box>
            <Box flex={2} border={"0px solid pink"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                mb={1}
                border={"0px solid blue"}
              >
                <Box px={2}>Co-Writer</Box>
                <Box>
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
            // p={2}
            gap={2}
            bg={"gray.100"}
            display={"flex"}
            justifyContent={"space-around"}
            width={note_card_width}
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={2}
              width={"100%"}
              p={2}
            >
              <Box width={"100%"}>
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
                <ModalButtonForFaqListForNote
                  button_text={"Faq"}
                  button_size={"sm"}
                  button_width={"100%"}
                  modal_title={`${title} 에 대한 faq`}
                  study_note_pk={pk}
                  modal_size={""}
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

            </Grid>
          </Box>
        </Box>
        <Box
          p="2"
          bg={footerBgColor}
          bottom={0}
          w={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          // border={"5px solid orange"}
          height={"80px"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Text>1st: {first_category}</Text>
            <Text>2nd: {second_category}</Text>
          </Box>
          <Box display={"flex"} gap={3}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton
                variant="outline"
                size={"sm"}
                colorScheme="blue"
                aria-label="View count"
                icon={<Icon as={AiOutlineEye} />}
                marginRight={2}
              />
              <Text>2</Text>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton
                variant="outline"
                size={"sm"}
                colorScheme="red"
                aria-label="Like count"
                icon={<Icon as={AiOutlineHeart} />}
                marginRight={2}
              />
              <Text>2</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardForStudyNote;

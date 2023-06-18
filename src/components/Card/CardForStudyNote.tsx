import {
  Box,
  Button,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
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

interface IProps {
  pk: any;
  title: string;
  description: string;
  writer: NoteWriterType;
  note_cowriters: TypeForNoteCoWriter[];
  count_for_note_contents: number;
  count_for_note_comments: number;
  studyNoteListRefatch: () => void;
  first_category: string;
  second_category: string;
}

// 1122
const CardForStudyNote: React.FC<IProps> = ({
  pk,
  title,
  description,
  writer,
  count_for_note_contents,
  note_cowriters,
  count_for_note_comments,
  first_category,
  second_category,
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
      // alert("삭제 gogo");
      mutationForDeleteStudyNote.mutate(pk);
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

  // mutationForRegisterForCoWriterForOtherUserNote
  const buttonHandlerForRegisterCoWokerForNote = (notePk: number) => {
    // alert(notePk);
    mutationForRegisterForCoWriterForOtherUserNote.mutate({ notePk });
  };

  // 2244
  return (
    <Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="90vh"
        margin="10px"
        bg={cardBgColor}
        boxShadow="md"
        transition="box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out"
        _hover={{
          borderColor: borderColor,
          boxShadow: "xl",
          transform: "translateY(-2px)",
        }}
        // position={"relative"}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          bg={writer.username === loginUser.username ? "green.200" : "blue.200"}
          px="2"
          py="1"
        >
          <Text fontSize="xl" fontWeight="bold">
            {title} ({count_for_note_contents})
            {/* {writer.username === loginUser.username ? "(my)" : ""} */}
          </Text>

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
          justifyContent={"space-between"}
          width={"100%"}
          height={"300px"}
          _hover={{ bg: "blue.100" }}
          id={"note-content-card"}
          defaultValue={"note-content-card"}
          gap={2}
          border={"0px solid red"}
        >
          <Box
            fontSize="sm"
            flex={3}
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
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            textAlign={"right"}
            p={2}
            gap={1}
            bg={"gray.100"}
            border={"0px solid red"}
          >
            <Box>
              <Button
                variant={"outline"}
                size={"md"}
                border={"1px solid black"}
                onClick={(event) => {
                  console.log("event : ", event.target);
                  event.stopPropagation();
                  goToStudyNoteDetail(pk);
                }}
                _hover={{ bgColor: "yellow.200" }}
              >
                Open Note
              </Button>
            </Box>
            <Box mb={1}>
              <ModalButtonForSubtititleListForNoteContent
                modal_title={`${title}'s subtitle list`}
                button_text={"SubTitle List"}
                study_note_pk={pk}
                button_size={"sm"}
              />
            </Box>

            <Box>
              {/* 0617 */}
              <ModalButtonForBriefingBoardForNote
                note_owner_user_name={writer.username}
                modal_title={`${title}'s Briefing Board`}
                button_text={"comment"}
                button_size={"sm"}
                study_note_pk={pk}
                count_for_note_comments={count_for_note_comments}
              />
            </Box>

            <Box>
              <ClipboardButtonForCopyCurrentUrl button_size={"sm"} pk={pk} />
            </Box>
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

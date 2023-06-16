import {
  Box,
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

interface IProps {
  pk: any;
  title: string;
  description: string;
  writer: NoteWriterType;
  note_cowriters: TypeForNoteCoWriter[];
  count_for_note_contents: number;
  studyNoteListRefatch: () => void;
}

// 1122
const CardForStudyNote: React.FC<IProps> = ({
  pk,
  title,
  description,
  writer,
  count_for_note_contents,
  note_cowriters,
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
        width="410px"
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
          // onDoubleClick={() => goToStudyNoteDetail(pk)}
          onDoubleClick={() => goToStudyNoteDetail(pk)}
          gap={2}
          // border={"1px solid green"}
        >
          <Box
            fontSize="sm"
            flex={3}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            // border={"1px solid black"}
          >
            <Box flex={1}>{description}</Box>
            <Box flex={2}>
              <Box
                // border="1px solid black"
                display={"flex"}
                justifyContent={"space-between"}
                mb={1}
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
            textAlign={"right"}
            border={"0px solid red"}
            p={2}
            bg={"gray.100"}
          >
            {/* <link> */}
            <Box mb={1}>
              <ModalButtonForSubtititleListForNoteContent
                modal_title={`${title}'s subtitle list`}
                button_text={"List"}
                study_note_pk={pk}
                button_size={"sm"}
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
        >
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

import { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Button,
  Box,
  Avatar,
  Spacer,
  Flex,
  IconButton,
  Textarea,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { FaCheckSquare, FaPlus, FaTrash } from "react-icons/fa";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   createCommentForTaskApi,
//   deleteOneCommentForTaskByPkApi,
//   updateCommentTextForTaskApi,
//   updateMutationForCommentEditModeApi,
// } from "../apis/project_progress_api";

interface Message {
  writer: any;
  comment: string;
  isUser: boolean;
  is_edit_mode: boolean;
  pk: number | string;
  refetch: () => void
}

function ListItem({ pk, writer, comment, isUser, is_edit_mode, refetch }: Message) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);
  const [commentTextForUpdate, setCommentTextForUpdate] = useState(comment);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

//   const updateMutationForCommentEditMode = useMutation(
//     updateMutationForCommentEditModeApi,
//     {
//       onSuccess: (result: any) => {
//         console.log("result : ", result);

//         refetch();
//       },
//     }
//   );

//   const EditModeHandler = (comment_pk: number | string) => {
//     console.log("edit mode click check pk : ", comment_pk);
//     updateMutationForCommentEditMode.mutate(comment_pk);
//   };

//   const updateMutationForCommentTextForTask = useMutation(
//     updateCommentTextForTaskApi,
//     {
//       onSuccess: (result: any) => {
//         console.log("result : ", result);

//         refetch();
//         // queryClient.refetchQueries(["getOneProjectTask"]);

//         toast({
//           status: "success",
//           title: "task status update success",
//           description: result.message,
//         });
//       },
//       onError: (err) => {
//         console.log("error : ", err);
//       },
//     }
//   );

//   const onEditConfirmHandler = (commentPk: number | string) => {
//     // alert(commentTextForUpdate)
//     // pk, commentTextForUpdate 를 이용해서 comment update
//     updateMutationForCommentTextForTask.mutate({
//       commentPk,
//       commentText: commentTextForUpdate,
//     });
//   };

//   const deleteCommentMutationByPk = useMutation(
//     (pk: string | number) => {
//       return deleteOneCommentForTaskByPkApi(pk);
//     },
//     {
//       onSettled: () => {
//         // setSelectedItems([]);
//       },
//       onSuccess: (data) => {
//         console.log("data : ", data);

//         refetch();
//         // queryClient.refetchQueries(["getOneProjectTask"]);

//         toast({
//           title: "delete comment 성공!",
//           status: "success",
//         });
//       },
//     }
//   );

//   const onDeleteCommentHandler = (commentPk: string | number) => {
//     console.log("onDeleteCommentHandler : ", commentPk);
//     deleteCommentMutationByPk.mutate(commentPk);
//   };

  return (
    <HStack justifyContent={isUser ? "flex-start" : "flex-end"} width="100%">
      {isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}

      <VStack
        p={3}
        borderRadius="lg"
        bg={isUser ? "yellow.50" : "blue.100"}
        alignSelf={isUser ? "flex-start" : "flex-end"}
        border="1px solid black"
        maxWidth="380px"
      >
        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          border="0px solid green"
          width={"100%"}
          gap={2}
        >
          <Box>{isUser && <Avatar size="sm" src={writer.profile_image} />}</Box>
          <Box>
            <Text fontSize="lg">
              {is_edit_mode ? (
                <Box>
                  <Textarea
                    width={"320px"}
                    bg={"blue.100"}
                    defaultValue={comment}
                    onChange={(e) => setCommentTextForUpdate(e.target.value)}
                  />

                  <Box display={"flex"} justifyContent="flex-end" mt={0}>
                    <IconButton
                      aria-label="Confirm"
                      icon={<FaCheck />}
                    //   onClick={() => onEditConfirmHandler(pk)}
                      variant="outline"
                      colorScheme="green"
                      rounded="md"
                      size="xs"
                    />
                    <IconButton
                      aria-label="Cancel"
                      icon={<FaTimes />}
                    //   onClick={() => EditModeHandler(pk)}
                      variant="outline"
                      colorScheme="pink"
                      rounded="md"
                      size="xs"
                      ml={1}
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
                  {comment}
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="modify"
                    // onClick={() => EditModeHandler(pk)}
                    variant="outline"
                    colorScheme="teal"
                    _hover={{ bg: "teal.400" }}
                    size="xs"
                    rounded="md"
                    ml={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    // onClick={() => onDeleteCommentHandler(pk)}
                    variant="outline"
                    colorScheme="teal"
                    _hover={{ bg: "teal.400" }}
                    size="xs"
                    rounded="md"
                    ml={1}
                  />
                </Box>
              )}
            </Text>
          </Box>
          <Box>
            {!isUser && <Avatar size="sm" src={writer.profile_image} />}
          </Box>
        </Flex>
      </VStack>
      {!isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}
    </HStack>
  );
}

// interface User {
//   pk: number;
//   username: string;
//   profile_image: string;
// }

// type IProps = {
//   task_comments: ITaskComment[];
//   task_manager: User | undefined;
//   taskPk: number | string;
//   refetch: () => void;
// };

// main 1122
function ChatStyleBoardForNoteBriefingBoard({
  study_note_pk,
}: any) {
  const toast = useToast();
  const queryClient = useQueryClient();

//   const { loginUser, isLoggedIn } = useSelector(
//     (state: RootState) => state.loginInfo
//   );
  const [commentTextToUpload, setCommentTextToUpload] = useState("");

//   const createMutationForTaskComment = useMutation(createCommentForTaskApi, {
//     onMutate: () => {
//       console.log("mutation starting");
//     },
//     onSuccess: (data) => {
//       console.log("data : ", data);

//       toast({
//         title: "welcome back!",
//         status: "success",
//       });
//       refetch();
//       // queryClient.refetchQueries(["getOneProjectTask"]);
//       setCommentTextToUpload("");
//     },
//     onError: (error: any) => {
//       console.log("error.response : ", error.response);
//       console.log("mutation has an error", error.response.data);
//     },
//   });

//   console.log("isLoggedIn for chatstyle board : ", isLoggedIn);

//   const commentButtonHandler = () => {
//     // alert(isLoggedIn);
//     if (!isLoggedIn) {
//       alert("로그인 해주세요");
//     } else {
//       // alert("로그인 상태입니다")
//     }
//     createMutationForTaskComment.mutate({
//       taskPk,
//       comment: commentTextToUpload,
//     });
//   };

  return (
    <Box border={"0px solid blue"}>
      <Box border={"0px solid green"} mb={1}>
        <HStack spacing={1}>
          <Button
            leftIcon={<FaCheckSquare />}
            size="sm"
            colorScheme="green"
            variant="outline"
            _hover={{ bg: "green.50" }}
            borderRadius="full"
          >
            All
          </Button>
          <Button
            aria-label={""}
            leftIcon={<FaTrash />}
            size="sm"
            colorScheme="red"
            variant="outline"
            _hover={{ bg: "red.50" }}
            borderRadius="full"
            ml={0}
          >
            delete
          </Button>
          <Spacer />
          <Box>
            {/* <ModalButtonForAddCommentForTask taskPk={taskPk} /> */}
          </Box>
        </HStack>{" "}
      </Box>

      <Flex
        flexDirection={"column"}
        p={2}
        bg="gray.50"
        borderRadius="lg"
        border="2px solid gray"
        width="100%"
        height={"642px"}
        overflowY={"scroll"}
        gap={2}
      >
        {/* {task_comments.map((co:any) => (
          <ListItem
            key={co.id}
            pk={co.id}
            writer={co.writer}
            comment={co.comment}
            isUser={co.writer.username === task_manager?.username}
            is_edit_mode={co.is_edit_mode}
            refetch = {refetch}
          />
        ))} */}
      </Flex>

      <Box mt={"3.6px"} px={0} border={"0px solid green"}>
        <Box
          display={"flex"}
          border={"0px solid green"}
          gap={1}
          width={"100%"}
          mt={"6px"}
          px={"1px"}
        >
          <Input
            variant="outline"
            borderRadius="xl"
            borderWidth="2px"
            borderColor="purple.100"
            size="md"
            height={"37px"}
            border={"1px solid purple"}
            width={"100%"}
            _hover={{
              borderColor: "purple.300",
            }}
            _focus={{
              borderColor: "purple.400",
            }}
            bg={"purple.50"}
            mr="1"
            onChange={(e) => setCommentTextToUpload(e.target.value)}
            value={commentTextToUpload}
            placeholder="입력해주세요1"
          />
          <Button
            variant="outline"
            size={"md"}
            height={"37px"}
            borderRadius="md"
            colorScheme={"purple"}
            // onClick={() => commentButtonHandler()}
          >
            입력
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatStyleBoardForNoteBriefingBoard;

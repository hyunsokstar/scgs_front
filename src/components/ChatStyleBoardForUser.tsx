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
} from "@chakra-ui/react";

import { ITaskComment } from "../types/project_progress/project_progress_type";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaCheckSquare, FaPlus, FaTrash } from "react-icons/fa";
import ModalButtonForAddCommentForTask from "./modal/ModalButtonForAddCommentForTask";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCommentTextForTaskApi,
  updateMutationForCommentEditModeApi,
} from "../apis/project_progress_api";
import {
  apiForCreateUserTaskComment,
  apiForDeleteUserTaskCommentForPk,
} from "../apis/user_api";
import { UserTaskComment } from "../types/user/user_types";

interface Message {
  writer: any;
  comment: string;
  isUser: boolean;
  is_edit_mode?: boolean;
  pk: number | string;
}

function ListItem({ pk, writer, comment, isUser, is_edit_mode }: Message) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);
  const [commentTextForUpdate, setCommentTextForUpdate] = useState(comment);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const updateMutationForCommentEditMode = useMutation(
    updateMutationForCommentEditModeApi,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        // toast({
        //   status: "success",
        //   title: "task status update success",
        //   description: result.message,
        // });
      },
    }
  );

  const EditModeHandler = (comment_pk: number | string) => {
    console.log("edit mode click check pk : ", pk);
    updateMutationForCommentEditMode.mutate(comment_pk);
  };

  const updateMutationForCommentTextForTask = useMutation(
    updateCommentTextForTaskApi,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const onEditConfirmHandler = (commentPk: number | string) => {
    // pk, commentTextForUpdate 를 이용해서 comment update
    updateMutationForCommentTextForTask.mutate({
      commentPk,
      commentText: commentTextForUpdate,
    });
  };

  // mutationForDeleteExtraManager
  const mutationForDeleteUserTaskComment = useMutation(
    (pk: string | number) => {
      // return apiForDeleteCommentForChallenge(pk);
      return apiForDeleteUserTaskCommentForPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteButtonHandlerForUserTaskComment = (
    commentPk: string | number
  ) => {
    console.log("coment pk for delete : ", commentPk);
    mutationForDeleteUserTaskComment.mutate(commentPk);
  };

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
                      onClick={() => onEditConfirmHandler(pk)}
                      variant="outline"
                      colorScheme="green"
                      rounded="md"
                      size="xs"
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
                  {comment}
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    // onClick={() => onDeleteCommentHandler(pk)}
                    onClick={() => deleteButtonHandlerForUserTaskComment(pk)}
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

interface User {
  pk?: number;
  username: string;
  profile_image: string;
}

type IProps = {
  userPk: string | undefined;
  task_comments: UserTaskComment[] | undefined;
  task_manager: User | undefined;
};

// main 1122
function ChatStyleBoard({ userPk, task_comments, task_manager }: IProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [commentTextToUpload, setCommentTextToUpload] = useState("");

  console.log("task_comments : ", task_comments);
  console.log("task_manager : ", task_manager);

  const createMutationForUserTaskComment = useMutation(
    apiForCreateUserTaskComment,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "welcome back!",
          status: "success",
        });
        //   requery getOneProjectTask
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  console.log("isLoggedIn for chatstyle board : ", isLoggedIn);

  const buttonHandlerForCreateCommentForUser = () => {
    // alert(isLoggedIn);
    if (!isLoggedIn) {
      alert("로그인 해주세요");
    } else {
      // alert("로그인 상태입니다")
    }
    createMutationForUserTaskComment.mutate({
      userPk,
      comment: commentTextToUpload,
    });
    // alert(taskPk);
    // alert(commentTextToUpload);
  };

  return (
    <Box>
      <Box border={"0px solid green"} mb={2}>
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
          <Box>{/* <ModalButtonForAddCommentForTask taskPk={taskPk} /> */}</Box>
        </HStack>{" "}
      </Box>

      <Flex
        flexDirection={"column"}
        p={2}
        bg="gray.50"
        borderRadius="lg"
        border="2px solid gray"
        width="100%"
        height={"480px"}
        overflowY={"scroll"}
        gap={2}
      >
        {task_comments
          ? task_comments.map((co) => (
              <ListItem
                key={co.id}
                pk={co.id}
                writer={co.writer}
                comment={co.comment}
                isUser={co.writer.username === task_manager?.username}
              />
            ))
          : "no data"}
      </Flex>
      <Box mt={"3.6px"} px={0} border={"0px solid green"}>
        <Box
          display={"flex"}
          border={"0px solid green"}
          gap={1}
          width={"100%"}
          mt={"2px"}
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
            placeholder="입력해주세요2"
          />
          <Button
            variant="outline"
            size={"md"}
            height={"37px"}
            borderRadius="md"
            colorScheme={"purple"}
            onClick={() => buttonHandlerForCreateCommentForUser()}
          >
            입력
          </Button>
          {/* {isLoggedIn ? "true" : "false"} */}
        </Box>
      </Box>
    </Box>
  );
}

export default ChatStyleBoard;

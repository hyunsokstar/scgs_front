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
  deleteOneCommentForTaskByPkApi,
  updateCommentTextForTaskApi,
  updateMutationForCommentEditModeApi,
} from "../apis/project_progress_api";

interface Message {
  writer: any;
  comment: string;
  isUser: boolean;
  is_edit_mode: boolean;
  pk: number | string;
}

function ListItem({ pk, writer, comment, isUser, is_edit_mode }: Message) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);
  const [commentTextForUpdate, setcommentTextForUpdate] = useState(comment);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const updateMutationForCommentEditMode = useMutation(
    updateMutationForCommentEditModeApi,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["getOneProjectTask"]);

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

        queryClient.refetchQueries(["getOneProjectTask"]);

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
    // alert(commentTextForUpdate)
    // pk, commentTextForUpdate 를 이용해서 comment update
    updateMutationForCommentTextForTask.mutate({
      commentPk,
      commentText: commentTextForUpdate,
    });
  };

  const deleteCommentMutationByPk = useMutation(
    (pk: string | number) => {
      return deleteOneCommentForTaskByPkApi(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getOneProjectTask"]);
        
        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const onDeleteCommentHandler = (commentPk: string | number) => {
    console.log("onDeleteCommentHandler : ", commentPk);
    deleteCommentMutationByPk.mutate(commentPk);
  };

  return (
    <HStack justifyContent={isUser ? "flex-start" : "flex-end"} width="100%">
      {isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}

      <VStack
        p={3}
        borderRadius="lg"
        bg={isUser ? "yellow.50" : "blue.50"}
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
                    bg={"blue.50"}
                    defaultValue={comment}
                    onChange={(e) => setcommentTextForUpdate(e.target.value)}
                  />

                  <Box display={"flex"} justifyContent="flex-end" mt={1}>
                    <IconButton
                      aria-label="Confirm"
                      icon={<FaCheck />}
                      onClick={() => onEditConfirmHandler(pk)}
                      variant="outline"
                      colorScheme="green"
                      rounded="md"
                      size="xs"
                    />
                    <IconButton
                      aria-label="Cancel"
                      icon={<FaTimes />}
                      onClick={() => EditModeHandler(pk)}
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
                    onClick={() => EditModeHandler(pk)}
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
                    onClick={() => onDeleteCommentHandler(pk)}
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
  pk: number;
  username: string;
  profile_image: string;
}

type IProps = {
  task_comments: ITaskComment[];
  task_manager: User | undefined;
  taskPk: number | string;
};

// main
function ChatStyleBoard({ taskPk, task_comments, task_manager }: IProps) {
  const [messages, setMessages] = useState<ITaskComment[]>(task_comments);
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  return (
    <Box>
      <Box border={"0px solid green"} mb={2}>
        <HStack spacing={4}>
          <Button
            leftIcon={<FaCheckSquare />}
            size="sm"
            colorScheme="green"
            variant="outline"
            _hover={{ bg: "green.50" }}
            borderRadius="full"
          >
            All Check
          </Button>
          <Button
            leftIcon={<FaTrash />}
            size="sm"
            colorScheme="red"
            variant="outline"
            _hover={{ bg: "red.50" }}
            borderRadius="full"
            ml={1}
          >
            Delete
          </Button>
          <Spacer />
          <Box>
            <ModalButtonForAddCommentForTask taskPk={taskPk} />
          </Box>
        </HStack>{" "}
      </Box>

      <VStack
        p={4}
        bg="gray.50"
        borderRadius="lg"
        border="2px solid gray"
        width="100%"
        height={"500px"}
        overflowY={"scroll"}
      >
        {task_comments.map((co) => (
          <ListItem
            key={co.id}
            pk={co.id}
            writer={co.writer}
            comment={co.comment}
            isUser={co.writer.username === task_manager?.username}
            is_edit_mode={co.is_edit_mode}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default ChatStyleBoard;

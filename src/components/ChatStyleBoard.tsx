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
} from "@chakra-ui/react";
import { ITaskComment } from "../types/project_progress/project_progress_type";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaCheckSquare, FaPlus, FaTrash } from "react-icons/fa";
import ModalButtonForAddCommentForTask from "./modal/ModalButtonForAddCommentForTask";

interface Message {
  writer: any;
  comment: string;
  isUser: boolean;
}

function ListItem({ writer, comment, isUser }: Message) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

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
        width="300px"
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
            <Text fontSize="lg">{comment}</Text>
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

  // console.log("loginUser : ", loginUser);

  // const addCommentHandler = (comment:string) => {
  //   console.log("taskPk at addCommentHandler : ", taskPk);
  //   console.log("comment at addCommentHandler : ", comment);
  // };

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
            {/* <Button
              leftIcon={<FaPlus />}
              size="sm"
              colorScheme="purple"
              variant="outline"
              _hover={{ bg: "purple.50" }}
              borderRadius="full"
            >
              Create
            </Button> */}
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
            writer={co.writer}
            comment={co.comment}
            isUser={co.writer.username === task_manager?.username}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default ChatStyleBoard;

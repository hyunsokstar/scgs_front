import { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Button,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { ITaskComment } from "../types/project_progress/project_progress_type";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
        bg={isUser ? "green.100" : "gray.100"}
        alignSelf={isUser ? "flex-start" : "flex-end"}
        border="1px solid black"
        width="300px"
      >
        <HStack>
          <Box>
            {isUser && (
              <Avatar
                size="sm"
                src={writer.profile_image}
                //   alt="Profile Image"
              />
            )}
          </Box>
          <Text fontSize="lg">{comment}</Text>
          <Box>
            {!isUser && (
              <Avatar
                size="sm"
                src={writer.profile_image}
                //   alt="Profile Image"
              />
            )}
          </Box>
        </HStack>
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
};

function ChatStyleBoard({ task_comments, task_manager }: IProps) {
  const [messages, setMessages] = useState<ITaskComment[]>(task_comments);
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  console.log("loginUser : ", loginUser);

  function handleRemoveMessage(id: number) {
    setMessages(messages.filter((message) => message.id !== id));
  }

  return (
    <VStack
      p={4}
      bg="gray.50"
      borderRadius="lg"
      border="2px solid black"
      width="100%"
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
  );
}

export default ChatStyleBoard;

import React from "react";
import { Box, Checkbox, Avatar, Text, Image, HStack } from "@chakra-ui/react";
import ModalButtonForUpdateTaskStatus from "../modal/ModalButtonForUpdateTaskStatus";
import { TaskForTaskStatusForToday } from "../../types/project_progress/project_progress_type";

type TaskManager = {
  pk: number;
  username: string;
  profile_image?: string;
};

interface Props {
  task: TaskForTaskStatusForToday;
}

const RowForTaskSttusForToday: React.FC<Props> = ({ task }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Checkbox size="lg" colorScheme="blue"></Checkbox>
        {task.task_manager ? (
          <Avatar
            size="md"
            src={task.task_manager.profile_image}
            name={task.task_manager.username}
          />
        ) : (
          <Avatar size="md" name="No manager" />
        )}
        <Text fontSize="md">{task.task}</Text>
      </Box>

      <ModalButtonForUpdateTaskStatus
        modal_text={"Update Task Progress Status"}
        current_status={task.current_status}
        task={task}
      />
    </Box>
  );
};

export default RowForTaskSttusForToday;

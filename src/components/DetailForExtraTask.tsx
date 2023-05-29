import { Box, Avatar, Text } from "@chakra-ui/react";
import { DetailForExtraTaskProps } from "../types/project_progress/project_progress_type";

const DetailForExtraTask: React.FC<DetailForExtraTaskProps> = ({
  extraTaskDetail,
}) => {
  const {
    task_manager,
    task,
    task_url1,
    task_url2,
    task_status,
    started_at_formatted,
  } = extraTaskDetail;

  return (
    <Box bg="green.100" p={4} borderRadius="md">
      {/* @ts-ignore */}
      <Avatar
        src={task_manager.profile_image}
        name={task_manager.username}
        size="md"
      /> 
      <Text mt={2} fontWeight="bold">
        {task}
      </Text>
      <Text>
        Task URL 1: <a href={task_url1}>{task_url1}</a>
      </Text>
      <Text>
        Task URL 2: <a href={task_url2}>{task_url2}</a>
      </Text>
      <Text>Status: {task_status}</Text>
      <Text>Started At: {started_at_formatted}</Text>
    </Box>
  );
};

export default DetailForExtraTask;

import { Box, Avatar, Text } from "@chakra-ui/react";
import { DetailForExtraTaskProps } from "../types/project_progress/project_progress_type";
import UpdateFormForExtraTask from "./InputForm/UpdateFormForExtraTask";

const DetailInfoForExtraTask: React.FC<DetailForExtraTaskProps> = ({
  extraTaskDetail,
}) => {
  const {
    pk,
    task_manager,
    task,
    task_url1,
    task_url2,
    task_status,
    started_at_formatted,
  } = extraTaskDetail;

  return (
    <Box bg="green.100" p={4} borderRadius="md">
      <Avatar
        src={task_manager.profile_image}
        name={task_manager.username}
        size="md"
      />
      <UpdateFormForExtraTask extraTaskDetail={extraTaskDetail} />
    </Box>
  );
};

export default DetailInfoForExtraTask;

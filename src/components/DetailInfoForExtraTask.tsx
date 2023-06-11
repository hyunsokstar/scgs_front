import { Box, Avatar, Text } from "@chakra-ui/react";
import { DetailForExtraTaskProps } from "../types/project_progress/project_progress_type";
import UpdateFormForExtraTask from "./InputForm/UpdateFormForExtraTask";

const DetailInfoForExtraTask: React.FC<DetailForExtraTaskProps> = ({
  extraTaskDetail,
}) => {
  const {} = extraTaskDetail;

  return (
    <Box bg="green.100" borderRadius="md" height={"730px"} overflowY={"scroll"}>
      extra task detail
      <UpdateFormForExtraTask extraTaskDetail={extraTaskDetail} />
    </Box>
  );
};

export default DetailInfoForExtraTask;

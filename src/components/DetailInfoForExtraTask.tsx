import { Box, Avatar, Text } from "@chakra-ui/react";
import UpdateFormForExtraTask from "./InputForm/UpdateFormForExtraTask";
import { IExtraTaskDetailData } from "../types/project_progress/project_progress_type";

interface IProps {
  extraTaskDetail: IExtraTaskDetailData;
}

const DetailInfoForExtraTask= ({
  extraTaskDetail,
}:IProps) => {

  console.log("extraTaskDetail check !! : ", extraTaskDetail);
  

  return (
    <Box bg="green.100" borderRadius="md" height={"730px"} overflowY={"scroll"}>
      extra task detail
      <UpdateFormForExtraTask extraTaskDetail={extraTaskDetail} />
    </Box>
  );
};

export default DetailInfoForExtraTask;

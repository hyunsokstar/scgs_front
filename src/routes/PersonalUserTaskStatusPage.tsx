import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiForGetTaskDataForSelectedUser } from "../apis/user_api";
import HeaderForPersonalTaskStatus from "../components/HeaderForPersonalTaskStatus";
import UnCompleteTaskListForPersnalTaskStatus from "../components/UnCompleteTaskListForPersnalTaskStatus";
import { typeForUncompletedTaskListForPersonalTaskStatus } from "../types/user/user_types";
import CompleteTaskListForPersnalTaskStatus from "../components/CompleteTaskListForPersnalTaskStatus";

interface Props {}

const PersonalUserTaskStatusPage = (props: Props) => {
  const { userPk } = useParams();

  const {
    data: dataForUncompletedTaskListDataForSelectedUser,
    isLoading: isLoadingForUncompletedTaskListDataForSelectedUser,
    refetch: refetchForUncompletedTaskListDataForSelectedUser,
  } = useQuery<typeForUncompletedTaskListForPersonalTaskStatus>(
    ["apiForGetTaskDataForSelectedUser", userPk],
    apiForGetTaskDataForSelectedUser
  );

  console.log(
    "dataForUncompletedTaskListDataForSelectedUser : ",
    dataForUncompletedTaskListDataForSelectedUser
  );

  if (isLoadingForUncompletedTaskListDataForSelectedUser) {
    return <Box>Loading</Box>;
  }

  return (
    <Box>
      <HeaderForPersonalTaskStatus
        userPk={userPk}
        dataForUncompletedTaskListDataForSelectedUser={
          dataForUncompletedTaskListDataForSelectedUser
        }
      />

      {/* 비완료 리스트 */}
      <UnCompleteTaskListForPersnalTaskStatus
        dataForUncompletedTaskListDataForSelectedUser={
          dataForUncompletedTaskListDataForSelectedUser
        }
        refetchForUncompletedTaskListDataForSelectedUser={
          refetchForUncompletedTaskListDataForSelectedUser
        }
      />
      <br />
      <br />
      <CompleteTaskListForPersnalTaskStatus userPk={userPk} />
    </Box>
  );
};

export default PersonalUserTaskStatusPage;

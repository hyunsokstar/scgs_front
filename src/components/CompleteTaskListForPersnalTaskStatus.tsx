import React from "react";
import { apiForGetCompletedTaskListForPersonalTaskStatus } from "../apis/user_api";
import { typeForUncompletedTaskListForPersonalTaskStatus } from "../types/user/user_types";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";

interface Props {
  userPk: string | number | undefined;
}

const CompleteTaskListForPersnalTaskStatus = ({ userPk }: Props) => {
  const {
    data: dataForCompletedTaskListDataForSelectedUser,
    isLoading: isLoadingForCompletedTaskListDataForSelectedUser,
    refetch: refetchForCompletedTaskListDataForSelectedUser,
  } = useQuery<typeForUncompletedTaskListForPersonalTaskStatus | undefined>(
    ["apiForGetTaskDataForSelectedUser", userPk],
    apiForGetCompletedTaskListForPersonalTaskStatus
  );

    console.log("data check : ", dataForCompletedTaskListDataForSelectedUser);

  return <Box>CompleteTaskListForPersnalTaskStatus for {userPk}</Box>;
};

export default CompleteTaskListForPersnalTaskStatus;

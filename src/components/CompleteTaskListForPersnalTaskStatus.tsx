import React, { ReactElement, useState } from "react";
import { apiForGetCompletedTaskListForPersonalTaskStatus } from "../apis/user_api";
import { typeForCompletedTaskListDataForSelectedUser, typeForUncompletedTaskListForPersonalTaskStatus } from "../types/user/user_types";
import { useQuery } from "@tanstack/react-query";
import { Box, Text } from "@chakra-ui/react";
import CompletedTaskRowForMe from "./CompletedTaskRowForMe";
import CompletedTaskRowForPersonalUserTaskStatus from "./CompletedTaskRowForPersonalUserTaskStatus";

interface Props {
  userPk: string | number | undefined;
}

const CompleteTaskListForPersnalTaskStatus = ({ userPk }: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    data: dataForCompletedTaskListDataForSelectedUser,
    isLoading: isLoadingForCompletedTaskListDataForSelectedUser,
    refetch: refetchForCompletedTaskListDataForSelectedUser,
  } = useQuery<typeForCompletedTaskListDataForSelectedUser>(
    ["apiForCompletedTaskListDataForSelectedUser", userPk],
    apiForGetCompletedTaskListForPersonalTaskStatus
  );

  console.log("data check : ", dataForCompletedTaskListDataForSelectedUser);

  return (
    <Box w={"100%"} border={"1px solid black"} p={0} mt={"0px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={1}
        bg={"orange.200"}
        border={"0px solid green"}
      >
        <Text mb={1} fontSize={"20px"}>
          완료 리스트 (총:{" "}
          {dataForCompletedTaskListDataForSelectedUser?.totalPageCount} 개 per
          page:
          {
            dataForCompletedTaskListDataForSelectedUser?.task_number_for_one_page
          }
          )
        </Text>
        <Box textAlign={"right"} m={0}></Box>
      </Box>{" "}
      <Box>
        {dataForCompletedTaskListDataForSelectedUser ? (
          <Box>
            <CompletedTaskRowForPersonalUserTaskStatus
              ProjectProgressList={
                dataForCompletedTaskListDataForSelectedUser.ProjectProgressList
              }
              task_number_for_one_page={
                dataForCompletedTaskListDataForSelectedUser.task_number_for_one_page
              }
              totalPageCount={
                dataForCompletedTaskListDataForSelectedUser.totalPageCount
              }
              projectTaskListRefatch={refetchForCompletedTaskListDataForSelectedUser}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default CompleteTaskListForPersnalTaskStatus;

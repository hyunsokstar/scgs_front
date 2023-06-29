import React, { ReactElement, useState } from "react";
import { apiForGetCompletedTaskListForPersonalTaskStatus } from "../apis/user_api";
import {
  typeForCompletedTaskListDataForSelectedUser,
  typeForUncompletedTaskListForPersonalTaskStatus,
} from "../types/user/user_types";
import { useQuery } from "@tanstack/react-query";
import { Box, Text } from "@chakra-ui/react";
import CompletedTaskRowForMe from "./CompletedTaskRowForMe";
import CompletedTaskRowForPersonalUserTaskStatus from "./CompletedTaskRowForPersonalUserTaskStatus";

interface Props {
  userPk: string | number | undefined;
}

// 1122
const CompleteTaskListForUser = ({ userPk }: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  const {
    data: pageProgressListData,
    isLoading: isLoadingForCompletedTaskListDataForSelectedUser,
    refetch: refetchForCompletedTaskListDataForSelectedUser,
  } = useQuery<typeForCompletedTaskListDataForSelectedUser>(
    ["apiForCompletedTaskListDataForSelectedUser", userPk],
    apiForGetCompletedTaskListForPersonalTaskStatus
  );

  console.log("data check : ", pageProgressListData);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const pk = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, pk]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== pk));
    }
  };

  // 2244
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
          Task List For Complete (총:{" "}
          {pageProgressListData?.totalPageCount} 개 per
          page:
          {
            pageProgressListData?.task_number_for_one_page
          }
          )
        </Text>
        <Box textAlign={"right"} m={0}></Box>
      </Box>{" "}
      <Box>
        {pageProgressListData ? (
          <Box>
            <CompletedTaskRowForPersonalUserTaskStatus
              ProjectProgressList={
                pageProgressListData.ProjectProgressList
              }
              task_number_for_one_page={
                pageProgressListData.task_number_for_one_page
              }
              totalPageCount={
                pageProgressListData.totalPageCount
              }
              projectTaskListRefatch={
                refetchForCompletedTaskListDataForSelectedUser
              }
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

export default CompleteTaskListForUser;

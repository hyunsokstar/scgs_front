import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import UncompletedTaskRowForMe from "./UncompletedTaskRowForMe";
import { typeForUncompletedTaskListForPersonalTaskStatus } from "../types/user/user_types";

interface Props {
  dataForUncompletedTaskListDataForSelectedUser?:
    | typeForUncompletedTaskListForPersonalTaskStatus
    | undefined;
  refetchForUncompletedTaskListDataForSelectedUser: any;
}

const UnCompleteTaskListForPersnalTaskStatus = ({
  dataForUncompletedTaskListDataForSelectedUser,
  refetchForUncompletedTaskListDataForSelectedUser,
}: Props) => {
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={2.5}
        bg={"green.200"}
        border={"1px solid green"}
      >
        <Box>
          <Box mb={1} fontSize={"20px"}>
            My Task 비완료 리스트 (총:{" "}
            {dataForUncompletedTaskListDataForSelectedUser?.totalPageCount} per
            page:{" "}
            {
              dataForUncompletedTaskListDataForSelectedUser?.task_number_for_one_page
            }{" "}
            )
          </Box>
          <Box display={"flex"} gap={2}>
            <ButtonForShowCountForTaskStatus
              task_status={"ready"}
              status_imoge={"⚪"}
              status_count={
                dataForUncompletedTaskListDataForSelectedUser?.count_for_ready
              }
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"in_progress"}
              status_imoge={"🟡"}
              status_count={
                dataForUncompletedTaskListDataForSelectedUser?.count_for_in_progress
              }
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"testing"}
              status_imoge={"🟠"}
              status_count={
                dataForUncompletedTaskListDataForSelectedUser?.count_for_in_testing
              }
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
          </Box>
        </Box>
      </Box>

      {dataForUncompletedTaskListDataForSelectedUser ? (
        <Box>
          <UncompletedTaskRowForMe
            ProjectProgressList={
              dataForUncompletedTaskListDataForSelectedUser.ProjectProgressList
            }
            task_number_for_one_page={
              dataForUncompletedTaskListDataForSelectedUser.task_number_for_one_page
            }
            totalPageCount={
              dataForUncompletedTaskListDataForSelectedUser.totalPageCount
            }
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            projectTaskListRefatch={
              refetchForUncompletedTaskListDataForSelectedUser
            }
          />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default UnCompleteTaskListForPersnalTaskStatus;

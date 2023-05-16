import { Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiForGetTaskDataForSelectedUser } from "../apis/user_api";
import UncompletedTaskRowForMe from "../components/UncompletedTaskRowForMe";
import ButtonForShowCountForTaskStatus from "../components/Button/ButtonForShowCountForTaskStatus";
import { ProfileCardForTeamStatus } from "../components/Card/ProfileCardForTeamStatus";
import ChatStyleBoard from "../components/ChatStyleBoard";
import ChatStyleBoardForUser from "../components/ChatStyleBoardForUser";

interface Props {}

const TeamStatusDetailPage = (props: Props) => {
  const { userPk } = useParams();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");

  const {
    data: dataForUncompletedTaskListDataForSelectedUser,
    isLoading: isLoadingForUncompletedTaskListDataForSelectedUser,
    refetch: refetchForUncompletedTaskListDataForSelectedUser,
  } = useQuery<any>(
    [
      "apiForGetTaskDataForSelectedUser",
      userPk,
      "apiForGetTaskDataForSelectedUser",
    ],
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
      {/* <Box>TeamStatusDetailPage {userPk}</Box> */}
      <Box display={"flex"} mb={5}>
        <Box mt={2}>
          <ProfileCardForTeamStatus
            id={dataForUncompletedTaskListDataForSelectedUser.user_info.id}
            profile_image={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .profile_image
            }
            username={
              dataForUncompletedTaskListDataForSelectedUser.user_info.username
            }
            position={
              dataForUncompletedTaskListDataForSelectedUser.user_info.position
            }
            status={"일하는중"}
            total_count_for_task={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .total_count_for_task
            }
            count_for_uncompleted_task={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .uncompleted_count_for_task
            }
            count_for_completed_task={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .completed_count_for_task
            }
            total_count_for_task_for_today={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .total_count_for_task_for_today
            }
            count_for_uncompleted_task_for_today={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .count_for_uncompleted_task_for_today
            }
            count_for_completed_task_for_today={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .count_for_completed_task_for_today
            }
            total_rewards={
              dataForUncompletedTaskListDataForSelectedUser.user_info.cash
            }
            currentTask={
              dataForUncompletedTaskListDataForSelectedUser.user_info
                .task_in_progress
            }
          />
        </Box>

        <Box border={"1px solid blue"} width={"100%"} mt={2}>
          <ChatStyleBoardForUser
            userPk = {userPk}
            task_manager={dataForUncompletedTaskListDataForSelectedUser.user_info}
            task_comments={dataForUncompletedTaskListDataForSelectedUser?.user_info.user_task_comments}
          /> 
         
        </Box>

      </Box>

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
            currentPageNum={
              dataForUncompletedTaskListDataForSelectedUser.currentPageNum
            }
            setCurrentPageNum={
              dataForUncompletedTaskListDataForSelectedUser.setCurrentPageNum
            }
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

export default TeamStatusDetailPage;

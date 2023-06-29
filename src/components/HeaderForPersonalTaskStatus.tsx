import { Box } from "@chakra-ui/react";
import React from "react";
import ChatStyleBoardForUser from "./ChatStyleBoardForUser";
import { ProfileCardForTeamStatus } from "./Card/ProfileCardForTeamStatus";
import { typeForUncompletedTaskListForPersonalTaskStatus } from "../types/user/user_types";

interface Props {
  userPk: any;
  dataForUncompletedTaskListDataForSelectedUser:
    | typeForUncompletedTaskListForPersonalTaskStatus
    | undefined;
}

const HeaderForPersonalTaskStatus = ({
  userPk,
  dataForUncompletedTaskListDataForSelectedUser,
}: Props) => {
  return (
    <Box
      display={"flex"}
      mb={5}
      flexDirection={["column", "column", "row", "row"]}
      gap={2}
    >
      <Box mt={2}>
        <ProfileCardForTeamStatus
          id={dataForUncompletedTaskListDataForSelectedUser?.user_info.id}
          profile_image={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .profile_image
          }
          username={
            dataForUncompletedTaskListDataForSelectedUser?.user_info.username
          }
          position={
            dataForUncompletedTaskListDataForSelectedUser?.user_info.position
          }
          status={"일하는중"}
          total_count_for_task={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .total_count_for_task
          }
          count_for_uncompleted_task={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .uncompleted_count_for_task
          }
          count_for_completed_task={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .completed_count_for_task
          }
          total_count_for_task_for_today={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .total_count_for_task_for_today
          }
          count_for_uncompleted_task_for_today={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .count_for_uncompleted_task_for_today
          }
          count_for_completed_task_for_today={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .count_for_completed_task_for_today
          }
          total_rewards={
            dataForUncompletedTaskListDataForSelectedUser?.user_info.cash
          }
          currentTask={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .task_in_progress
          }
        />
      </Box>

      <Box border={"0px solid blue"} width={"100%"} mt={2}>
        <ChatStyleBoardForUser
          userPk={userPk}
          task_manager={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
          }
          task_comments={
            dataForUncompletedTaskListDataForSelectedUser?.user_info
              .user_task_comments
          }
        />
      </Box>
    </Box>
  );
};

export default HeaderForPersonalTaskStatus;

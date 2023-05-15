import React from "react";
import { ProfileCardForTeamStatus } from "../components/Card/ProfileCardForTeamStatus";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { TypeForDataForTaskInfoPerUser } from "../types/user/user_types";
import { apiForgetDataForTaskInfoPerUser } from "../apis/user_api";
import { Row } from "react-data-grid";

interface Props {}

const TaskInfosPerMember = (props: Props) => {
  const {
    isLoading: isLoadingForTaskInfoPerUser,
    isError,
    error,
    data: dataForTaskInfoPerUser,
    refetch: refetchFordataForTaskInfoPerUser,
  } = useQuery<TypeForDataForTaskInfoPerUser>(
    ["getTechNoteList"],
    apiForgetDataForTaskInfoPerUser,
    {
      enabled: true,
    }
  );

  console.log("dataForTaskInfoPerUser : ", dataForTaskInfoPerUser);

  if (isError) {
    console.error("An error occurred: ", error);
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="teal.500"
        py={4}
        px={6}
        borderRadius="md"
        shadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" textAlign="center" color="white">
          멤버별 업무 현황
        </Text>
      </Box>{" "}
      <Box display={"flex"} justifyContent={"flex-start"} flexWrap={"wrap"}>
        {dataForTaskInfoPerUser
          ? dataForTaskInfoPerUser.map((user) => {
              return (
                <Box width={"23%"} mt={2} mb={3}>
                  <ProfileCardForTeamStatus
                    id={user.id}
                    profile_image={user.profile_image}
                    username={user.username}
                    position={user.position}
                    status={"일하는중"}
                    total_count_for_task={user.total_count_for_task}
                    count_for_uncompleted_task={user.uncompleted_count_for_task}
                    count_for_completed_task={user.completed_count_for_task}
                    total_count_for_task_for_today={
                      user.total_count_for_task_for_today
                    }
                    count_for_uncompleted_task_for_today={
                      user.count_for_uncompleted_task_for_today
                    }
                    count_for_completed_task_for_today={
                      user.count_for_completed_task_for_today
                    }
                    total_rewards={user.cash}
                    currentTask={user.task_in_progress}
                    // taskCountForToday={10}
                    // ability_score={600}
                  />
                </Box>
              );
            })
          : "no data"}
      </Box>
    </Box>
  );
};

export default TaskInfosPerMember;

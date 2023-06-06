import React from "react";
import { ProfileCardForTeamStatus } from "../components/Card/ProfileCardForTeamStatus";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { TypeForDataForTaskInfoPerUser } from "../types/user/user_types";
import { apiForgetDataForTaskInfoPerUser } from "../apis/user_api";

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
        bgColor={"black"}
        py={4}
        px={6}
        borderRadius="md"
        shadow="md"
        mt={2}
        mb={2}
      >
        <Box
          fontSize="50px"
          fontWeight="bold"
          textAlign="center"
          color="yellow.200"
        >
          Team Members' Work Status
        </Box>
      </Box>{" "}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        px={"20px"}
        py={"20px"}
        flexWrap={"wrap"}
        bgColor={"black"}
        textAlign={"center"}
      >
        {dataForTaskInfoPerUser
          ? dataForTaskInfoPerUser.map((user) => {
              return (
                <Box
                  width={"23%"}
                  mt={2}
                  mb={8}
                  _hover={{
                    transform: "translateY(-5px)",
                    // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    // border: "1px solid #000000",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border 0.2s ease-in-out",
                  }}
                >
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

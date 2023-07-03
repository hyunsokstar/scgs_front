import React from "react";
import { ProfileCardForTeamStatus } from "../components/Card/ProfileCardForTeamStatus";
import { Box, Text } from "@chakra-ui/react";
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
        justifyContent="flex-start"
        alignItems="center"
        bgColor={"green.200"}
        py={4}
        px={6}
        borderRadius="md"
        shadow="md"
        mt={2}
        mb={2}
        // border={"5px solid yellow"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          height={"120px"}
          width={"100%"}
          // border={"2px solid blue"}
        >
          <Text fontSize="32px" fontWeight="bold">
            Team Members' Work Status
          </Text>
        </Box>
      </Box>{" "}
      <Box py={"20px"} px={"auto"} bgColor={"black"} textAlign={"center"}>
        <Box
          width={"98%"}
          display={"grid"}
          gridTemplateColumns={{
            base: "1fr", // 변경된 부분: 모바일 화면에서 컬럼당 하나로 설정
            xl: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
            md: "repeat(2, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
          gap={"24px"}
          mx={"auto"}
        >
          {dataForTaskInfoPerUser
            ? dataForTaskInfoPerUser.map((user) => {
                return (
                  <Box
                    width={"100%"}
                    // mt={2}
                    // mb={8}
                    // border={"5px solid purple"}
                    _hover={{
                      transform: "translateY(-5px)",
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
                      count_for_uncompleted_task={
                        user.uncompleted_count_for_task
                      }
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
    </Box>
  );
};

export default TaskInfosPerMember;

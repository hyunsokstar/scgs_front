import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import {
  getUncompletedTaskList,
  getUncompletedTaskListForMe,
} from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRowForMe from "./UncompletedTaskRowForMe";

interface Props {}

function UncompletedProjectTaskListForMe({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  // const queryClient = useQueryClient();

  const {
    isLoading,
    data: taskListDataForMe,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    ["getUncompletedTaskListForMe", currentPageNum],
    getUncompletedTaskListForMe,
    {
      enabled: true,
    }
  );
  console.log("taskListDataForMe : ", taskListDataForMe);

  if (!taskListDataForMe) {
    return <Box>Loading..</Box>;
  }

  return (
    <Container maxW={"100%"} border={"1px solid purple"} p={0} mt={0}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={2.5}
        bg={"green.200"}
        border={"1px solid green"}
      >
        <Box>
          <Text>
            비완료 리스트 (총: {taskListDataForMe?.totalPageCount} &nbsp; ⚪ :{" "}
            {taskListDataForMe?.count_for_ready}
            &nbsp;&nbsp; 🟡 : {taskListDataForMe?.count_for_in_progress}
            &nbsp;&nbsp; 🟠 : {taskListDataForMe?.count_for_in_testing} )
          </Text>
          per page: {taskListDataForMe?.task_number_for_one_page}
        </Box>

        <Box textAlign={"right"} m={0}>
          <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Flex>
      <Box>
        {taskListDataForMe ? (
          <Box>
            <UncompletedTaskRowForMe
              ProjectProgressList={taskListDataForMe.ProjectProgressList}
              task_number_for_one_page={
                taskListDataForMe.task_number_for_one_page
              }
              totalPageCount={taskListDataForMe.totalPageCount}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
              projectTaskListRefatch={projectTaskListRefatch}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default UncompletedProjectTaskListForMe;

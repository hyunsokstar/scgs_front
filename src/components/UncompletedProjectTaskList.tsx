import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import { getUncompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRow from "./UncompletedTaskRow";


interface Props {}

function UncompletedProjectTaskList({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    
    isLoading,
    data: taskListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    ["getUncompletedTaskList", currentPageNum],
    getUncompletedTaskList,
    {
      enabled: true,
    }
  );
  
  // console.log("taskListData : ", taskListData);

  return (
    <Container maxW={"100%"} border={"1px solid purple"} p={0} mt={2}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={1}
        bg={"green.200"}
        border={"0px solid green"}
      >
        <Box>
          <Text>
            비완료 리스트 (총: {taskListData?.totalPageCount} &nbsp;&nbsp;
          ⚪ : {taskListData?.count_for_ready}
          &nbsp;&nbsp; 🟡 : {taskListData?.count_for_in_progress}
          &nbsp;&nbsp; 🟠 : {taskListData?.count_for_in_testing} )
          </Text>
        </Box>        <Box textAlign={"right"} m={0}>
          <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Flex>
      <Box>
        {taskListData ? (
          <UncompletedTaskRow
            ProjectProgressList={taskListData.ProjectProgressList}
            totalPageCount={taskListData.totalPageCount}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            projectTaskListRefatch={projectTaskListRefatch}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default UncompletedProjectTaskList;

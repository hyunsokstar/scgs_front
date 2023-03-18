import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import TaskListForProjectProgress from "./TaskListForProjectProgress";

interface Props {}

function CompletedProjectTaskList({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    ["getCompletedTaskList", currentPageNum],
    getCompletedTaskList,
    {
      enabled: true,
    }
  );
  
  // console.log("pageProgressListData : ", pageProgressListData);

  return (
    <Container maxW={"100%"} border={"0px solid purple"} p={1} mt={1}>
      <Text>완료 리스트</Text>
      <Box textAlign={"right"} >
        {/* <ModalButtonForAddProjectTask
          projectTaskListRefatch={projectTaskListRefatch}
        /> */}
      </Box>
      <Box>
        {pageProgressListData ? (
          <TaskListForProjectProgress
            ProjectProgressList={pageProgressListData.ProjectProgressList}
            totalPageCount={pageProgressListData.totalPageCount}
            projectTaskListRefatch={projectTaskListRefatch}
            currentPageNum = {currentPageNum}
            setCurrentPageNum = {setCurrentPageNum}            
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default CompletedProjectTaskList;

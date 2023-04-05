import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import CompletedTaskRow from "./CompletedTaskRow";

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

  return (
    <Container maxW={"100%"} border={"0px solid purple"} p={0} mt={0}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        px={1}
        bg={"purple.200"}
        border={"0px solid purple"}
        height={"60px"}
      >
        <Text py={0} fontSize={22}>완료 리스트</Text>
        <Box textAlign={"right"} m={0}>
          {/* <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          /> */}
        </Box>
      </Flex>{" "}
      <Box>
        {pageProgressListData ? (
          <CompletedTaskRow
            ProjectProgressList={pageProgressListData.ProjectProgressList}
            totalPageCount={pageProgressListData.totalPageCount}
            projectTaskListRefatch={projectTaskListRefatch}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default CompletedProjectTaskList;

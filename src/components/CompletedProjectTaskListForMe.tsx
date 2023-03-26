import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import { getCompletedTaskListForMe } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
// import CompletedTaskRow from "./CompletedTaskRow";
import CompletedTaskRowForMe from "./CompletedTaskRowForMe";

interface Props {}

function CompletedProjectTaskListForMe({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    ["getCompletedTaskListForMe", currentPageNum],
    getCompletedTaskListForMe,
    {
      enabled: true,
    }
  );

  return (
    <Container maxW={"100%"} border={"0px solid black"} p={0} mt={2}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={1}
        bg={"orange.200"}
        border={"0px solid green"}
      >
        <Text py={1}>완료 리스트</Text>
        <Box textAlign={"right"} m={0}>
          {/* <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          /> */}
        </Box>
      </Flex>{" "}
      <Box>
        {pageProgressListData ? (
          <Box>
          <CompletedTaskRowForMe
              ProjectProgressList={pageProgressListData.ProjectProgressList}
              totalPageCount={pageProgressListData.totalPageCount}
              projectTaskListRefatch={projectTaskListRefatch}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default CompletedProjectTaskListForMe;
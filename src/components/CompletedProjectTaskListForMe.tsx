import { Box, Button, Container, Text } from "@chakra-ui/react";
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
    <Container maxW={"100%"} border={"0px solid purple"} p={1} mt={1}>
      <Text>완료 리스트</Text>
      <Box>
        {pageProgressListData ? (
          <CompletedTaskRowForMe
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

export default CompletedProjectTaskListForMe;

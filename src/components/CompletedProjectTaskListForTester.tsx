import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState, useEffect } from "react";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import CompletedTaskRowForTester from "./CompletedTaskRowForTester";

interface Props {}

function CompletedProjectTaskListForTester({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getCompletedTaskListForTester",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
    ],
    getCompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    pageProgressListData?.ProjectProgressList
  );

  // filterValueForTask
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<any>();
  const [filterValueForTask, setFilterValueForTask] = useState<any>();

  useEffect(() => {
    setFilteredData(pageProgressListData?.ProjectProgressList);
  }, [pageProgressListData?.ProjectProgressList]);

  const changeHandlerForSelectPeriodOptionForTeamTask = (option: string) => {
    setSelectedPeriodOptionForUncompletedTaskList(option);
  };

  const updateFilteredDataForTask = (filterValueForTask: string) => {
    if (filterValueForTask !== "") {
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task.toLowerCase().includes(filterValueForTask.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
      console.log("filterValueForTask : ", filterValueForTask);
    }
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTask(value);
    updateFilteredDataForTask(value);
  };

  const updateFilteredDataForTaskManager = (
    filterValueForTaskManager: string
  ) => {
    if (filterValueForTaskManager !== "") {
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task_manager.username
            .toLowerCase()
            .includes(filterValueForTaskManager.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
      console.log("filterValueForTaskManager : ", filterValueForTaskManager);
    }
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTaskManager(value);
    updateFilteredDataForTaskManager(value);
  };

  return (
    <Container maxW={"100%"} border={"0px solid purple"} p={0} mt={0}>
      <Box
        border={"0px solid black"}
        display="flex"
        justifyContent={"space-between"}
        bgColor={"#C9A66B"}
        alignItems={"center"}
        px={2}
        py={2}
      >
        <Box border={"0px solid green"}>
          <Box
            border={"0px solid blue"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={2}
          >
            <Box border="0px solid red">
              <Table border="0px" variant={"unstyled"}>
                <Thead>
                  <Tr>
                    <Th colSpan={2}>
                      {" "}
                      <Box fontSize={22}>
                        Complete Task List For Tester (total:{" "}
                        {pageProgressListData?.totalPageCount} , per_page:{" "}
                        {pageProgressListData?.task_number_for_one_page} ){" "}
                      </Box>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody border={"0px solid green"}>
                  <Tr height="30px">
                    <Td>
                      <Text>task manager:</Text>
                    </Td>
                    <Td>
                      {/* {pageProgressListData?.writers_info?.map((writer) => {
                        return (
                          <Text fontSize="lg" color="blue.900">
                            {writer.username}: {writer.task_count}  :{" "}
                            {writer.cash} won
                          </Text>
                        );
                      })} */}
                      <Table variant="unstyled">
                        <Thead>
                          <Tr>
                            <Th>Username</Th>
                            <Th>Task Count</Th>
                            <Th>Cash</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {pageProgressListData?.writers_info?.map((writer) => (
                            <Tr key={writer.username}>
                              <Td>{writer.username}</Td>
                              <Td>{writer.task_count}</Td>
                              <Td>{writer.cash} won</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>

        <Box>
          <ButtonsForSelectForTeamTaskListPeriod
            selectedPeriodOptionForUncompletedTaskList={
              selectedPeriodOptionForUncompletedTaskList
            }
            changeHandler={changeHandlerForSelectPeriodOptionForTeamTask}
          />

          <Box mt={2}>
            <Box>
              담당 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"300px"}
                value={filterValueForTaskManager}
                onChange={handleFilterChangeForTaskManager}
              />
            </Box>

            <Box>
              업무 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"300px"}
                value={filterValueForTask}
                onChange={handleFilterChangeForTask}
              />
            </Box>
          </Box>
        </Box>

        <Box textAlign={"right"} m={0}>
          3영역
        </Box>
      </Box>
      <Box>
        {pageProgressListData ? (
          <CompletedTaskRowForTester
            ProjectProgressList={filteredData}
            totalPageCount={pageProgressListData.totalPageCount}
            task_number_for_one_page={
              pageProgressListData.task_number_for_one_page
            }
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

export default CompletedProjectTaskListForTester;

import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Checkbox,
  Flex,
  Input,
  Text,
  HStack,
  useBreakpointValue
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";

import CompletedTaskRow from "./CompletedTaskRow";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";

interface Props {}

// 1122
function CompletedProjectTaskList({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const [username_for_search, set_username_for_search] = useState<string>();

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getCompletedTaskList",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
      username_for_search,
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

  const searchCompletedListforUserName = (username: string) => {
    console.log("username : ", username);

    set_username_for_search(username);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const pk = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, pk]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== pk));
    }
  };

  const column_option_for_width = useBreakpointValue({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
    lg: "row", // for large screens and up
  });

  // 2244
  return (
    <Container maxW={"100%"} border={"0px solid purple"} p={0} mt={0}>
      <Box
        display={"flex"}
        flexDirection={column_option_for_width}
        border={"1px solid black"}
        justifyContent={"space-between"}
        bgColor={"purple.200"}
        alignItems={"center"}
        px={2}
        py={2}
      >
        <Box>
          <Box fontSize={18}>
            complteted task (total: {pageProgressListData?.totalPageCount} 개,
            per:
            {pageProgressListData?.task_number_for_one_page} 개)
          </Box>
          <Box border="0px solid green">
            <Box display="flex" alignItems="center" height="30px">
              <Box flexBasis="30%">
                <Text>담당자별:</Text>
              </Box>
              <Box flexBasis="70%">
                {pageProgressListData?.writers_info?.map((writer) => (
                  <Box key={writer.username} fontSize="lg" color="blue.900">
                    <HStack>
                      <Button
                        variant="outline"
                        size="sm"
                        border="1px solid black"
                        mb={1}
                        _hover={{
                          bg: "#90CDF4",
                          color: "brown",
                        }}
                        onClick={() =>
                          searchCompletedListforUserName(writer.username)
                        }
                        bgColor={
                          writer.username === username_for_search
                            ? "#90CDF4"
                            : ""
                        }
                      >
                        {writer.username} : {writer.task_count}
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </Box>
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
          {/* <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          /> */}
        </Box>
      </Box>

      <Box>
        <Box w={"100%"} border={"0px solid red"}></Box>
        {pageProgressListData ? (
          <CompletedTaskRow
            ProjectProgressList={filteredData}
            totalPageCount={pageProgressListData.totalPageCount}
            task_number_for_one_page={
              pageProgressListData.task_number_for_one_page
            }
            projectTaskListRefatch={projectTaskListRefatch}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            handleCheckboxChange={handleCheckboxChange}
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default CompletedProjectTaskList;

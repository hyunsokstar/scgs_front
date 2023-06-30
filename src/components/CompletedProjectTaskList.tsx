import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";

import CompletedTaskRow from "./CompletedTaskRow";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import SlideForCompletedTaskList from "./Slide/SlideForCompletedTaskList";

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
    const id = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  const column_option_for_width = useBreakpointValue({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
    lg: "row", // for large screens and up
  });

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: false, // for medium-sized screens and up
    lg: false, // for large screens and up
  });

  // 2244
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={column_option_for_width}
        overflowY={"scroll"}
        gap={2}
        border={"1px solid black"}
        justifyContent={"space-around"}
        bgColor={"purple.200"}
        alignItems={"center"}
        height={["340px", "260px", "260px"]}
        px={"3"}
        py={3}
        width={"100%"}
      >
        <Box fontSize={20} width={"300px"}>
          <Box border={"0px solid blue"} textAlign={"center"}>
            <Text>completed Tasks</Text>
            <Text>
              total: {pageProgressListData?.totalPageCount} , per:{" "}
              {pageProgressListData?.task_number_for_one_page} 개
            </Text>
          </Box>
          <Box border="0px solid green" width={"100%"} p={3}>
            <Box
              flexBasis="100%"
              overflowY={"scroll"}
              height={"130px"}
              width={"100%"}
              border="0px solid black"
              // p={2}
            >
              {pageProgressListData?.writers_info?.map((writer) => (
                <Box key={writer.username} fontSize="lg" color="blue.900">
                  <VStack>
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
                        writer.username === username_for_search ? "#90CDF4" : ""
                      }
                      width={"100%"}
                    >
                      {writer.username} : {writer.task_count}
                    </Button>
                  </VStack>
                </Box>
              ))}
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

          <Box>
            {/* <Box>
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
                width={"100%"}
                value={filterValueForTaskManager}
                onChange={handleFilterChangeForTaskManager}
              />
            </Box> */}

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
                width={"100%"}
                value={filterValueForTask}
                onChange={handleFilterChangeForTask}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* {is_show_for_mobile ? "모바일" : "큰화면"} */}
      {!is_show_for_mobile ? (
        <Box>
          <Box width={"100%"} border={"0px solid red"}></Box>
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
            "no data"
          )}
        </Box>
      ) : (
        <Box>
          {filteredData ? (
            <SlideForCompletedTaskList
              listData={filteredData}
              handleCheckboxChange={handleCheckboxChange}
              checkedRowPks={checkedRowPks}
            />
          ) : (
            "no data"
          )}
        </Box>
      )}
    </Box>
  );
}

export default CompletedProjectTaskList;

import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Text,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react";
import { apiForDeleteCompletedTasksForChecked, getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForResponseForDataForCompletedTask } from "../types/project_progress/project_progress_type";

import CompletedTaskRow from "./CompletedTaskRow";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/SelectBoxForSetPeriodForFilteringUncompletedTaskList";
import SlideForCompletedTaskList from "./Slide/SlideForCompletedTaskList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {}

// 1122
function CompletedProjectTaskList({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const toast = useToast();

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
  } = useQuery<ITypeForResponseForDataForCompletedTask>(
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

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: false, // for medium-sized screens and up
    lg: false, // for large screens and up
  });

  // 2244
  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      pageProgressListData?.ProjectProgressList.map((item) => item.id) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  const mutationForDeleteucompletedTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteCompletedTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        queryClient.refetchQueries(["getCompletedTaskList"]);

        toast({
          title: "Delete Task For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteTaskForChecked = () => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteucompletedTasksForChecked.mutate(checkedRowPks);
  };

  return (
    <Box width={"100%"} border={"2px solid black"}>
      <Box
        display={"flex"}
        flexDirection={["column", "column", "row", "row"]}
        justifyContent={["center", "center", "space-between", "space-between"]}
        bg={"purple.100"}
        width={"100%"}
        p={3}
        // border={"5px solid orange"}
      >
        <Box
          display={"flex"}
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"18px"}
          // border={"5px solid blue"}
          p={3}
          gap={5}
          bg={"purple.100"}
          width={["100%", "100%", "100%", "100%"]}
        >
          <Box fontSize={"18px"} width={["100%", "100%", "30%", "30%"]}>
            <Text>completed Tasks</Text>
            <Text>
              total: {pageProgressListData?.totalPageCount} , per:{" "}
              {pageProgressListData?.task_number_for_one_page} 개
            </Text>
            <Box width={"100%"} border={"0px solid green"}>
              <ButtonsForSelectForTeamTaskListPeriod
                selectedPeriodOptionForUncompletedTaskList={
                  selectedPeriodOptionForUncompletedTaskList
                }
                changeHandler={changeHandlerForSelectPeriodOptionForTeamTask}
              />
            </Box>
          </Box>

          <Box width={["100%", "100%", "30%", "30%"]}>
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

          {/* 헤더 하단 박스 */}
          <Box
            width={["100%", "100%", "40%", "30%"]}
            overflowY={"scroll"}
            maxHeight={["160px", "160px", "160px"]}
            // border="5px solid green"
          >
            {pageProgressListData?.writers_info?.map((writer) => (
              <Box key={writer.username} fontSize="lg" color="blue.900">
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
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={2}>
        {/* 0928 고쳐 */}
        <Checkbox
          size={"lg"}
          onChange={handleChangeForAllCheckBox}
          checked={
            checkedRowPks.length ===
            pageProgressListData?.ProjectProgressList.length
          }
          border={"2px solid black"}
          m={2}
        />

        <Button
          variant="outline"
          size="xs"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          onClick={deleteTaskForChecked}
        >
          delete for Check
        </Button>
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
              refetch={projectTaskListRefatch}
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

import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  // useTheme,
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactElement, useState, useEffect } from "react";
import {
  apiForDeleteTasksForChecked,
  apiForUpdateTaskDueDateForChecked,
  getUncompletedTaskList,
} from "../apis/project_progress_api";
import {
  ITypeForProjectProgressList,
  typeForDueDateUpdateForChecked,
} from "../types/project_progress/project_progress_type";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRow from "./UncompletedTaskRow";
import ModalButtonForUpdateTaskManagerForChecked from "./Button/ModalButtonForUpdateTaskManagerForChecked";

interface Props {}

// 1122
function UncompletedProjectTaskList({}: Props): ReactElement {
  // const theme = useTheme();
  const queryClient = useQueryClient();

  const [checkedRowPks, setCheckedRowPks] = useState<number[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");
  const [username_for_search, set_username_for_search] = useState<string>();

  const {
    isLoading,
    data: taskListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getUncompletedTaskList",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
      username_for_search,
    ],
    getUncompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    taskListData?.ProjectProgressList
  );

  // filterValueForTask
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<any>();
  const [filterValueForTask, setFilterValueForTask] = useState<any>();

  const toast = useToast();

  console.log("taskListData  : ", taskListData);
  console.log("filteredData  : ", filteredData);

  useEffect(() => {
    setFilteredData(taskListData?.ProjectProgressList);
  }, [taskListData?.ProjectProgressList]);

  const changeHandlerForSelectPeriodOptionForTeamTask = (option: string) => {
    setSelectedPeriodOptionForUncompletedTaskList(option);
  };

  const updateFilteredDataForTask = (filterValueForTask: string) => {
    if (filterValueForTask !== "") {
      const filteredData = taskListData?.ProjectProgressList.filter((item) =>
        item.task.toLowerCase().includes(filterValueForTask.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(taskListData?.ProjectProgressList);
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
      const filteredData = taskListData?.ProjectProgressList.filter((item) =>
        item.task_manager.username
          .toLowerCase()
          .includes(filterValueForTaskManager.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(taskListData?.ProjectProgressList);
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

  // const mutationForSearchListByUserName = useMutation(
  //   apiForSelctUncompletedListForUserName(username),
  //   {
  //     onSuccess: (result: any) => {
  //       console.log("result : ", result);
  //       // queryClient.refetchQueries(["getOneProjectTask"]);

  //       toast({
  //         status: "success",
  //         title: "task status update success",
  //         description: result.message,
  //       });
  //     },
  //     onError: (err) => {
  //       console.log("error : ", err);
  //     },
  //   }
  // );

  const searchUncompletedListforUserName = (username: string) => {
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

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Delete Task For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteTaskForChecked = () => {
    // checkedRowPks
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteTasksForChecked.mutate(checkedRowPks);
  };

  const mutationForUpdateTaskDueDateForChecked = useMutation(
    ({ duration_option, checkedRowPks }: typeForDueDateUpdateForChecked) => {
      return apiForUpdateTaskDueDateForChecked({
        duration_option,
        checkedRowPks,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Update Task Due Date For Checked 성공!",
          status: "success",
          description: data.message,
        });

        // window.location.reload(); // 새로고침
      },
    }
  );

  // due_date update
  const handlerForUpdateTaskDuedateForChecked = (
    duration_option: "until-noon" | "until-evening"
  ) => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }

    alert(duration_option);

    mutationForUpdateTaskDueDateForChecked.mutate({
      duration_option,
      checkedRowPks,
    });
  };

  if (!taskListData) {
    return <Box>..Loading</Box>;
  }

  // 2244
  return (
    <Box w={"100%"} border={"1px solid purple"} p={0} mt={2}>
      <Box
        border={"1px solid black"}
        display="flex"
        justifyContent={"space-between"}
        bgColor={"green.200"}
        alignItems={"center"}
        p={4}
      >
        <Box width={"35%"}>
          <Table border={"0px solid blue"} mb={1}>
            <Tr borderBottom={"2px solid #9AE6B4"}>
              <Th colSpan={2}>
                <Text fontSize={22}>
                  비완료 리스트 (총: {taskListData?.totalPageCount} 개,
                  per_page: {taskListData?.task_number_for_one_page} 개){" "}
                </Text>
              </Th>
            </Tr>
            <Tr borderBottom={"2px solid #9AE6B4"}>
              <Td>
                <Text>진행별</Text>
              </Td>
              <Td
                display={"flex"}
                justifyContent={"space-between"}
                gap={2}
                borderBottom={"1px solid #9AE6B4"}
              >
                <Text>⚪ :{taskListData?.count_for_ready}</Text>
                <Text>🟡 : {taskListData?.count_for_in_progress}</Text>
                <Text>🟠 : {taskListData?.count_for_in_testing}</Text>
              </Td>
              {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 1, Column 3
                    </Td> */}
            </Tr>
            <Tr height="30px" borderBottom={"2px solid #9AE6B4"}>
              <Td>
                <Text>담당자별:</Text>
              </Td>
              <Td>
                {taskListData?.writers_info?.map((writer) => {
                  return (
                    <Box fontSize="lg" color="blue.900">
                      <HStack>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          border={"1px solid black"}
                          mb={1}
                          _hover={{
                            bg: "#90CDF4",
                            color: "brown",
                          }}
                          onClick={() =>
                            searchUncompletedListforUserName(writer.username)
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
                  );
                })}
              </Td>
              {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 2, Column 3
                    </Td> */}
            </Tr>
          </Table>
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
                _focus={{ border: "0px solid blue", boxShadow: "none" }}
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
          <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Box>

      {/* 0501 */}
      {/* <Box>{checkedRowPks}</Box> */}
      <Box display={"flex"} border={"1px solid blue"} p={2} gap={2}>
        <Checkbox size="lg" colorScheme="blue" />
        <Button
          variant="outline"
          size="sm"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          mr={2}
          onClick={deleteTaskForChecked}
        >
          delete for check
        </Button>

        <Button
          variant="outline"
          size="sm"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("until-noon")}
        >
          마감 날짜 정오
        </Button>

        <Button
          variant="outline"
          size="sm"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("until-evening")}
        >
          마감 날짜 오후
        </Button>

        {/* 230502 */}
        <ModalButtonForUpdateTaskManagerForChecked
          button_text="담당자 변경 for check"
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />
      </Box>

      <Box>
        {taskListData ? (
          <UncompletedTaskRow
            ProjectProgressList={filteredData}
            totalPageCount={taskListData.totalPageCount}
            task_number_for_one_page={taskListData.task_number_for_one_page}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            projectTaskListRefatch={projectTaskListRefatch}
            handleCheckboxChange={handleCheckboxChange}
            checkedRowPks={checkedRowPks}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default UncompletedProjectTaskList;

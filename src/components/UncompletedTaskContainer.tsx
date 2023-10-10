import React, { ReactElement, useState, useEffect } from "react";
import { Box, useToast, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getUncompletedTaskList } from "../apis/project_progress_api";
import {
  ITypeForTaskListDataForUncompleted,
  typeForDueDateOption,
} from "../types/project_progress/project_progress_type";
import UncompletedTaskList from "./UncompletedTaskList";
import SlideForUncompletedTaskList from "./Slide/SlideForUncompletedTaskList";
import HeaderInfoForUncompletedTaskList from "./HeaderInfo/HeaderInfoForUncompletedTaskList";
import UtilButtonsForUncompletedTaskList from "./Buttons/UtilButtonsForUncompletedTaskList";

interface Props {
  basic_due_date_option?: typeForDueDateOption;
}

function UncompletedTaskContainer({
  basic_due_date_option,
}: Props): ReactElement {
  const [checkedRowPks, setCheckedRowPks] = useState<number[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");
  const [username_for_search, set_username_for_search] = useState<
    string | undefined
  >();
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");

  const [due_date_option_for_filtering, set_due_date_option_for_filtering] =
    useState<string | undefined>(basic_due_date_option);

  const [rating_for_filter_option, set_rating_for_filter_option] =
    useState<number>(0);

  const [isForUrgent, setIsForUrgent] = useState(false);
  const [checkForCashPrize, setCheckForCashPrize] = useState(false);
  const [groupByOption, setGroupByOption] = React.useState<string>("");
  const [is_task_due_date_has_passed, set_is_task_due_date_has_passed] =
    React.useState<boolean>(false);

  const {
    isLoading,
    data: taskListDataForUncompleted,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForTaskListDataForUncompleted>(
    [
      "getUncompletedTaskList",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
      username_for_search,
      task_status_for_search,
      due_date_option_for_filtering,
      rating_for_filter_option,
      isForUrgent,
      checkForCashPrize,
      groupByOption,
      is_task_due_date_has_passed,
    ],
    getUncompletedTaskList,
    {
      enabled: currentPageNum === 1,
    }
  );

  const [filteredListForUncompleteTask, setFilteredListForUncompleteTask] =
    useState<any>(taskListDataForUncompleted?.ProjectProgressList);
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<string>();
  const [filterValueForTask, setFilterValueForTask] = useState<string>();
  const [
    filterValueForTaskClassification,
    setFilterValueForTaskClassification,
  ] = useState<any>();

  useEffect(() => {
    if (!filterValueForTaskManager) {
      setFilteredListForUncompleteTask(taskListDataForUncompleted?.ProjectProgressList);
    } else {
    }
  }, [taskListDataForUncompleted]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);

    // alert("실행 확인"+ id)

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  const is_show_for_mobile = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  if (!taskListDataForUncompleted) {
    return <Box>..Loading</Box>;
  }

  return (
    <Box border={"1px solid black"} p={0} mt={2} width={"100%"}>
      <HeaderInfoForUncompletedTaskList
        set_is_task_due_date_has_passed={set_is_task_due_date_has_passed}
        set_task_status_for_search={set_task_status_for_search}
        set_username_for_search={set_username_for_search}
        set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        setCheckForCashPrize={setCheckForCashPrize}
        setFilterValueForTask={setFilterValueForTask}
        setIsForUrgent={setIsForUrgent}
        setSelectedPeriodOptionForUncompletedTaskList={
          setSelectedPeriodOptionForUncompletedTaskList
        }
        setGroupByOption={setGroupByOption}
        setFilterValueForTaskManager={setFilterValueForTaskManager}
        setFilterValueForTaskClassification={
          setFilterValueForTaskClassification
        }
        taskListDataForUncompleted={taskListDataForUncompleted}
        selectedPeriodOptionForUncompletedTaskList={
          selectedPeriodOptionForUncompletedTaskList
        }
        task_status_for_search={task_status_for_search}
        username_for_search={username_for_search}
        isForUrgent={isForUrgent}
        due_date_option_for_filtering={due_date_option_for_filtering}
        checkForCashPrize={checkForCashPrize}
        groupByOption={groupByOption}
        filterValueForTaskManager={filterValueForTaskManager}
        filterValueForTask={filterValueForTask}
        filterValueForTaskClassification={filterValueForTaskClassification}
        setFilteredListForUncompleteTask={setFilteredListForUncompleteTask}
        filteredListForUncompleteTask={filteredListForUncompleteTask}
      />

      <UtilButtonsForUncompletedTaskList
        taskListDataForUncompleted={taskListDataForUncompleted}
        checkedRowPks={checkedRowPks}
        setCheckedRowPks={setCheckedRowPks}
        projectTaskListRefatch={projectTaskListRefatch}
      />

      {is_show_for_mobile ? (
        <Box border={"0px solid blue"}>
          {taskListDataForUncompleted ? (
            <UncompletedTaskList
              ProjectProgressList={filteredListForUncompleteTask}
              totalPageCount={taskListDataForUncompleted.totalPageCount}
              task_number_for_one_page={taskListDataForUncompleted.task_number_for_one_page}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
              projectTaskListRefatch={projectTaskListRefatch}
              checkedRowPks={checkedRowPks}
              handleCheckboxChange={handleCheckboxChange}
            />
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box>
          {filteredListForUncompleteTask &&
          filteredListForUncompleteTask.length ? (
            <SlideForUncompletedTaskList
              listData={filteredListForUncompleteTask}
              handleCheckboxChange={handleCheckboxChange}
              checkedRowPks={checkedRowPks}
              refetch={projectTaskListRefatch}
            />
          ) : (
            <Box
              height={"100px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"20px"}
              bgColor={"orange.100"}
            >
              no data
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default UncompletedTaskContainer;

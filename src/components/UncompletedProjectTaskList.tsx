import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  useToast,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Progress,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiForDeleteTasksForChecked,
  apiForUpdateTaskDueDateForChecked,
  getUncompletedTaskList,
} from "../apis/project_progress_api";
import {
  ITypeForProjectProgressList,
  typeForDueDateOption,
  typeForDueDateUpdateForChecked,
} from "../types/project_progress/project_progress_type";
import SelectBoxForSetPeriodForFilteringUncompletedTaskList from "./Button/SelectBoxForSetPeriodForFilteringUncompletedTaskList";
import UncompletedTaskRow from "./UncompletedTaskRow";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import ModalButtonForAddProjectTaskWithDuedateOption from "./modal/ModalButtonForAddProjectTaskWithDuedateOption";
import SelectBoxForDueDateForUnompletedTaskForChecked from "./Button/SelectBoxForDueDateForUnompletedTaskForChecked";
import ButtonsForSelectOptionForDueDateForUncompletedTaskList from "./Button/ButtonsForSelectOptionForDueDateForUncompletedTaskList";
import ModalButtonForUpdateTaskManagerForChecked from "./Button/ModalButtonForUpdateTaskManagerForChecked";
import ModalButtonForUpdateTaskClassificationForChecked from "./modal/ModalButtonForUpdateTaskClassificationForChecked";
import { useNavigate } from "react-router-dom";
import SlideForUncompletedTaskList from "./Slide/SlideForUncompletedTaskList";
import StarRatingForSetFilterOptionForTaskList from "./StarRating/StarRatingForSetFilterOptionForTaskList";
import ModalButtonForUpdateImortanceForChecked from "./modal/ModalButtonForUpdateImortanceForChecked";
import HeaderInfoForUncompletedTaskList from "./HeaderInfo/HeaderInfoForUncompletedTaskList";

interface Props {
  basic_due_date_option?: typeForDueDateOption;
}

// 1122
function UncompletedProjectTaskList({
  basic_due_date_option,
}: Props): ReactElement {
  const queryClient = useQueryClient();
  const navigator = useNavigate();

  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");
  const [username_for_search, set_username_for_search] = useState<string | undefined>();
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
    data: taskListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
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
      enabled: true,
    }
  );

  console.log("taskListData??? : ", taskListData);

  const [filteredListForUncompleteTask, setFilteredListForUncompleteTask] = useState<any>(
    taskListData?.ProjectProgressList
  );

  // filterValueForTask
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<string>();
  const [filterValueForTask, setFilterValueForTask] = useState<string>();
  const [
    filterValueForTaskClassification,
    setFilterValueForTaskClassification,
  ] = useState<any>();

  const toast = useToast();

  // console.log("taskListData  : ", taskListData);
  // console.log("filteredData  : ", filteredData);

  useEffect(() => {

    if(!filterValueForTaskManager){
      setFilteredListForUncompleteTask(taskListData?.ProjectProgressList);
    } else {

    }
  }, [taskListData?.ProjectProgressList, filteredListForUncompleteTask]);

  const searchUncompletedListforUserName = (username: string) => {
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

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
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
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Update Task Due Date For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const handlerForUpdateTaskDuedateForChecked = (
    duration_option:
      | "undetermined"
      | "noon"
      | "evening"
      | "night"
      | "tomorrow"
      | "day-after-tomorrow"
      | "this-week"
      | "this-month"
  ) => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    // alert(duration_option);

    mutationForUpdateTaskDueDateForChecked.mutate({
      duration_option,
      checkedRowPks,
    });
  };

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      taskListData?.ProjectProgressList.map((item) => item.id) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  const handleUrgentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsForUrgent(event.target.checked);
  };

  const handleCashPrizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckForCashPrize(event.target.checked);
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTaskManager(event.target.value);
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTask(event.target.value);
  };

  const handleFilterChangeForTaskClassification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTaskClassification(event.target.value);
  };

  const handleSelectPeriodOptionForTeamTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPeriodOptionForUncompletedTaskList(event.target.value);
  };

  const handleButtonClick = () => {
    if (checkedRowPks.length === 0) {
      alert("Please check at least one item");
      return;
    }
    // Perform other actions
    navigator(
      `/task-list-for-checked?checkedRowPks=${checkedRowPks.join(",")}`
    );
  };

  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

  // 2244
  if (!taskListData) {
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
        taskListData={taskListData}
        selectedPeriodOptionForUncompletedTaskList={selectedPeriodOptionForUncompletedTaskList}
        task_status_for_search={task_status_for_search}
        username_for_search={username_for_search}
        isForUrgent={isForUrgent}
        due_date_option_for_filtering={due_date_option_for_filtering}
        checkForCashPrize={checkForCashPrize}
        groupByOption={groupByOption}
        filterValueForTaskManager={filterValueForTaskManager}
        filterValueForTask={filterValueForTask}
        filterValueForTaskClassification={filterValueForTaskClassification}
        setFilteredListForUncompleteTask = {setFilteredListForUncompleteTask}
        filteredListForUncompleteTask = {filteredListForUncompleteTask}
      />

      <Box
        display={"grid"}
        gridTemplateColumns={{
          base: "repeat(2, 1fr)", // 모바일
          md: "repeat(4, 1fr)", // 중간 크기
          lg: "repeat(4, 1fr)", // 큰 화면
        }}
        width={"100%"}
        gap={2}
        p={2}
      >
        <Button
          variant="outline"
          size="xs"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          onClick={deleteTaskForChecked}
        >
          delete for Check
        </Button>

        <ModalButtonForUpdateTaskManagerForChecked
          button_text={"Update Task Manager"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

        <ModalButtonForUpdateImortanceForChecked
          button_text={"update importance"}
          button_width={"100%"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

        <ModalButtonForUpdateTaskClassificationForChecked
          button_text={"update task for class"}
          button_width={"100%"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={2}
        pb={1}
        gap={2}
        // border={"5px solid blue"}
      >
        <Box>
          <Checkbox
            size={"lg"}
            onChange={handleChangeForAllCheckBox}
            checked={
              checkedRowPks.length === taskListData?.ProjectProgressList.length
            }
            border={"2px solid black"}
          />
        </Box>
        <Box>
          <SelectBoxForDueDateForUnompletedTaskForChecked
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
            deleteTaskForChecked={deleteTaskForChecked}
            handlerForUpdateTaskDuedateForChecked={
              handlerForUpdateTaskDuedateForChecked
            }
            width={"100%"}
          />
        </Box>

        {is_show_for_mobile ? (
          <Button
            variant={"outline"}
            border={"2px solid blue"}
            bg={"blue.100"}
            size={"sm"}
            onClick={handleButtonClick}
            p={2}
          >
            Slide For Check
          </Button>
        ) : (
          ""
        )}

        <ModalButtonForAddProjectTaskWithDuedateOption
          button_text="register"
          size={"sm"}
          projectTaskListRefatch={projectTaskListRefatch}
          bgColor="red.300"
          hoverColor="red.500"
          hoverTextColor="yellow"
        />
      </Box>

      {is_show_for_mobile ? (
        <Box border={"0px solid blue"}>
          {taskListData ? (
            <UncompletedTaskRow
              ProjectProgressList={filteredListForUncompleteTask}
              totalPageCount={taskListData.totalPageCount}
              task_number_for_one_page={taskListData.task_number_for_one_page}
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
          {filteredListForUncompleteTask && filteredListForUncompleteTask.length ? (
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

export default UncompletedProjectTaskList;

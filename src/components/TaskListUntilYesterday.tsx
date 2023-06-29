import {
  Box,
  Button,
  useToast,
  Checkbox,
  useBreakpointValue,
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
import UncompletedTaskRow from "./UncompletedTaskRow";
import ModalButtonForUpdateTaskManagerForChecked from "./Button/ModalButtonForUpdateTaskManagerForChecked";
import ModalButtonForUpdateImortanceForChecked from "./modal/ModalButtonForUpdateImortanceForChecked";
import ModalButtonForUpdateTaskClassificationForChecked from "./modal/ModalButtonForUpdateTaskClassificationForChecked";
import ModalButtonForAddProjectTaskWithDuedateOption from "./modal/ModalButtonForAddProjectTaskWithDuedateOption";
import RadioButtonForGroupByOptionForTaskListUntilYesterday from "./Button/RadioButtonForGroupByOptionForTaskListUntilYesterday";
import SlideForUncompletedTaskList from "./Slide/SlideForCompletedTaskList";

interface Props {
  basic_due_date_option?:
    | "undecided"
    | "until-yesterday"
    | "until-noon"
    | "until-evening"
    | "until-tomorrow"
    | "until-the-day-after-tomorrow"
    | "until-this-week"
    | "until-this-month";
}

// 1122
function TaskListUntilYesterday({
  basic_due_date_option,
}: Props): ReactElement {
  // const theme = useTheme();
  const queryClient = useQueryClient();

  const [checkedRowPks, setCheckedRowPks] = useState<number[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");
  const [username_for_search, set_username_for_search] = useState<string>();
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");
  const [due_date_option_for_filtering, set_due_date_option_for_filtering] =
    useState<string | undefined>(basic_due_date_option);

  const [rating_for_filter_option, set_rating_for_filter_option] =
    useState<number>(0);

  const [isForUrgent, setIsForUrgent] = useState(false);
  const [checkForCashPrize, setCheckForCashPrize] = useState(false);
  const [groupByOption, setGroupByOption] = React.useState<string>("");

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
    ],
    getUncompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    taskListData?.ProjectProgressList
  );

  const toast = useToast();

  // console.log("taskListData  : ", taskListData);
  // console.log("filteredData  : ", filteredData);

  useEffect(() => {
    setFilteredData(taskListData?.ProjectProgressList);
  }, [taskListData?.ProjectProgressList]);

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

  // due_date update
  const handlerForUpdateTaskDuedateForChecked = (
    duration_option:
      | "undetermined"
      | "noon"
      | "evening"
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
    <Box w={"100%"} border={"1px solid purple"}>
      <Box
        border={"1px solid black"}
        display="flex"
        justifyContent={"space-between"}
        bgColor={"green.200"}
        alignItems={"center"}
        p={2}
      >
        <Box width={"35%"} display="flex" flexDirection="row" p={2}>
          <RadioButtonForGroupByOptionForTaskListUntilYesterday
            groupByOption={groupByOption}
            setGroupByOption={setGroupByOption}
          />
        </Box>
      </Box>
      {/* 0629 */}
      <Box
        display={"flex"}
        flexDirection={["column", "row", "row"]}
        gap={2}
        flexWrap={"wrap"}
        p={2}
      >
        <Box gap={2} display="flex" flexWrap={"wrap"}>
          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() =>
              handlerForUpdateTaskDuedateForChecked("undetermined")
            }
          >
            Clear Due Date
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() => handlerForUpdateTaskDuedateForChecked("noon")}
          >
            Due Date Noon
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() => handlerForUpdateTaskDuedateForChecked("evening")}
          >
            Due Date Evening
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() => handlerForUpdateTaskDuedateForChecked("tomorrow")}
          >
            Due Date Tomorrow
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() =>
              handlerForUpdateTaskDuedateForChecked("day-after-tomorrow")
            }
          >
            Due Date Day After Tomorrow
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() => handlerForUpdateTaskDuedateForChecked("this-week")}
          >
            Due Date This Week
          </Button>

          <Button
            variant="outline"
            size="sm"
            backgroundColor="purple.50"
            _hover={{ backgroundColor: "purple.100" }}
            mr={2}
            onClick={() => handlerForUpdateTaskDuedateForChecked("this-month")}
          >
            Due Date This Month
          </Button>
        </Box>
        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          <Button
            variant="outline"
            size="sm"
            backgroundColor="red.50"
            _hover={{ backgroundColor: "red.100" }}
            mr={2}
            onClick={deleteTaskForChecked}
          >
            Delete
          </Button>

          <ModalButtonForUpdateTaskManagerForChecked
            size={"sm"}
            button_text="Change Assignee"
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
          />

          <ModalButtonForUpdateImortanceForChecked
            button_text="Update Priority"
            size={"sm"}
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
          />

          <ModalButtonForUpdateTaskClassificationForChecked
            button_text="Update Classification"
            size={"sm"}
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
          />
        </Box>
        <Box display={"flex"} gap={2} justifyContent={"space-between"}>
          <Checkbox size="lg" colorScheme="blue" />
          <ModalButtonForAddProjectTaskWithDuedateOption
            button_text="Add Task For Team Project"
            size={"sm"}
            projectTaskListRefatch={projectTaskListRefatch}
            bgColor="red.300"
            hoverColor="red.500"
            hoverTextColor="yellow"
          />
        </Box>
      </Box>
      {is_show_for_mobile ? (
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
      ) : (
        <SlideForUncompletedTaskList
          listData={filteredData}
          handleCheckboxChange={handleCheckboxChange}
          checkedRowPks={checkedRowPks}
        />
      )}
    </Box>
  );
}

export default TaskListUntilYesterday;

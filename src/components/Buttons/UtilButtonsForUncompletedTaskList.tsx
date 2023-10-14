import React from "react";
import {
  Box,
  Button,
  useToast,
  useBreakpointValue,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import {
  useMutation,
  useQueryClient,
  QueryObserverResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  apiForDeleteTasksForChecked,
  apiForUpdateTaskDueDateForChecked,
} from "../../apis/project_progress_api";
import {
  ITypeForTaskListDataForUncompleted,
  taskRowForUncompleted,
  typeForDueDateUpdateForChecked,
} from "../../types/project_progress/project_progress_type";
import ModalButtonForUpdateTaskManagerForChecked from "../Button/ModalButtonForUpdateTaskManagerForChecked";
import ModalButtonForUpdateImortanceForChecked from "../modal/ModalButtonForUpdateImortanceForChecked";
import ModalButtonForUpdateTaskClassificationForChecked from "../modal/ModalButtonForUpdateTaskClassificationForChecked";
import SelectBoxForDueDateForUnompletedTaskForChecked from "../Button/SelectBoxForDueDateForUnompletedTaskForChecked";
import ModalButtonForAddProjectTaskWithDuedateOption from "../modal/ModalButtonForAddProjectTaskWithDuedateOption";
import ModalButtonForTransformCheckedTasksToSupplementTask from "../modal/ModalButtonForTransformCheckedTasksToSupplementTask";

interface IProps {
  taskListDataForUncompleted: ITypeForTaskListDataForUncompleted | undefined;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
  projectTaskListRefatch: () => Promise<
    QueryObserverResult<ITypeForTaskListDataForUncompleted, unknown>
  >;
}

// 1122
const UtilButtonsForUncompletedTaskList = ({
  taskListDataForUncompleted,
  checkedRowPks,
  setCheckedRowPks,
  projectTaskListRefatch,
}: IProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigator = useNavigate();

  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

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

  const buttonHandlerForslideShowForCheckedRow = () => {
    if (checkedRowPks.length === 0) {
      alert("Please check at least one item");
      return;
    }
    // Perform other actions
    navigator(
      `/task-list-for-checked?checkedRowPks=${checkedRowPks.join(",")}`
    );
  };

  // 2244
  return (
    <Box>
      <Box
        display={"grid"}
        gridTemplateColumns={{
          base: "repeat(2, 1fr)", // 모바일
          md: "repeat(4, 1fr)", // 중간 크기
          lg: "repeat(5, 1fr)", // 큰 화면
        }}
        width={"100%"}
        gap={1}
        px={1}
        py={2}
      >
        {/* 1013 todo */}
        <ModalButtonForTransformCheckedTasksToSupplementTask
          button_text="transform into supplementary task"
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

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
        <Button
          size="xs"
          bg="red.50"
          _hover={{ backgroundColor: "red.100" }}
          variant="outline"
          onClick={deleteTaskForChecked}
        >
          delete for Check
        </Button>

        <SelectBoxForDueDateForUnompletedTaskForChecked
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
          deleteTaskForChecked={deleteTaskForChecked}
          handlerForUpdateTaskDuedateForChecked={
            handlerForUpdateTaskDuedateForChecked
          }
          width={"100%"}
        />

        {is_show_for_mobile ? (
          <Button
            variant={"outline"}
            border={"1px solid blue"}
            bg={"blue.100"}
            size={"xs"}
            onClick={buttonHandlerForslideShowForCheckedRow}
            p={2}
          >
            Slide For Check
          </Button>
        ) : (
          ""
        )}

        <Spacer />
        <Spacer />

        <ModalButtonForAddProjectTaskWithDuedateOption
          button_text="register"
          size={"xs"}
          projectTaskListRefatch={projectTaskListRefatch}
          bgColor="red.300"
          hoverColor="red.500"
          hoverTextColor="yellow"
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
          {/* <Checkbox
            size={"md"}
            onChange={handleChangeForAllCheckBox}
            checked={
              checkedRowPks.length ===
              taskListDataForUncompleted?.ProjectProgressList.length
            }
            border={"2px solid black"}
            ml={6}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default UtilButtonsForUncompletedTaskList;

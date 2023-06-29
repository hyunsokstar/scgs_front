import React, { ReactElement, useState } from "react";
import {
  Text,
  Box,
  useToast,
  Checkbox,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  apiForDeleteTasksForChecked,
  updateProjectImportance,
  updateProjectInProgress,
  updateProjectIsTesting,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { deleteOneProjectTask } from "../apis/user_api";
import ListForUncompletedTaskForUser from "./List/ListForUncompletedTaskForUser";
import { ProjectProgress } from "../types/user/user_types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SlideForUncompletedTaskList from "./Slide/SlideForCompletedTaskList";

interface IProps {
  ProjectProgressList: ProjectProgress[];
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page: number | undefined;
  projectTaskListRefetch: () => void;
}

// 1122
function UncompletedTaskListForUser({
  ProjectProgressList,
  task_number_for_one_page,
  totalPageCount,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefetch,
}: IProps): ReactElement {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);
      queryClient.refetchQueries([
        "apiForCompletedTaskListDataForSelectedUser",
      ]);

      toast({
        status: "success",
        title: "task status update success",
        description: result.message,
      });
    },
  });

  const updateHandlerForTaskStatus = (taskPk: string) => {
    updateProjectTaskMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check pk : ", taskPk);
  };

  const updateMutationForProjectImportance = useMutation(
    updateProjectImportance,
    {
      onSuccess: (result: any) => {
        if (projectTaskListRefetch) {
          projectTaskListRefetch();
        }
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const onChangeForStarRatingHandler = ({ taskPk, star_count }: any) => {
    updateMutationForProjectImportance.mutate({ taskPk, star_count });
  };

  const deleteMutation = useMutation(
    (pk: number) => {
      return deleteOneProjectTask(pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        if (projectTaskListRefetch) {
          projectTaskListRefetch();
        }
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        toast({
          title: "delete project task 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteHandler = (pk: number) => {
    const response = deleteMutation.mutate(pk);
    console.log("response :", response);
  };

  const updateProjectTaskInProgressMutations = useMutation(
    updateProjectInProgress,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        // projectTaskListRefatch();
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        // projectTaskListRefatch()

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
      onError: (err: any) => {
        console.log("error : ", err);
      },
    }
  );

  const updateHandlerForTaskInProgress = (taskPk: string) => {
    updateProjectTaskInProgressMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check pk : ", taskPk);
  };

  const updateProjectTaskIsTestingMutations = useMutation(
    updateProjectIsTesting,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);
        queryClient.refetchQueries([
          "apiForCompletedTaskListDataForSelectedUser",
        ]);

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
    }
  );

  const updateHandlerForTaskIsTesting = (taskPk: string) => {
    updateProjectTaskIsTestingMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check pk : ", taskPk);
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
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const pk = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, pk]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== pk));
    }
  };

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks = ProjectProgressList.map((item) => item.pk) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

  // 2244
  if (ProjectProgressList && ProjectProgressList.length === 0) {
    return (
      <Box textAlign="center">
        <Text fontSize={"48px"} my={3}>
          No Data Available!
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box display={"flex"} gap={2} p={2}>
        <Checkbox
          size={"lg"}
          onChange={handleChangeForAllCheckBox}
          checked={checkedRowPks.length === ProjectProgressList.length}
        />
        <Button
          variant={"outline"}
          _hover={{ backgroundColor: "red.100" }}
          size={"sm"}
          onClick={deleteTaskForChecked}
        >
          delete for check
        </Button>
      </Box>
      {is_show_for_mobile ? (
        <ListForUncompletedTaskForUser
          ProjectProgressList={ProjectProgressList}
          currentPageNum={currentPageNum}
          task_number_for_one_page={task_number_for_one_page}
          totalPageCount={totalPageCount}
          setCurrentPageNum={setCurrentPageNum}
          updateHandlerForTaskInProgress={updateHandlerForTaskInProgress}
          updateHandlerForTaskIsTesting={updateHandlerForTaskIsTesting}
          updateHandlerForTaskStatus={updateHandlerForTaskStatus}
          onChangeForStarRatingHandler={onChangeForStarRatingHandler}
          deleteHandler={deleteHandler}
          projectTaskListRefetch={projectTaskListRefetch}
          checkedRowPks={checkedRowPks}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <SlideForUncompletedTaskList
          listData={ProjectProgressList}
          handleCheckboxChange={handleCheckboxChange}
          checkedRowPks={checkedRowPks}
        />
      )}
    </>
  );
}

export default UncompletedTaskListForUser;

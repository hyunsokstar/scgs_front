import React, { ReactElement } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, Box, useToast, useBreakpointValue } from "@chakra-ui/react";
import {
  updateProjectImportance,
  updateProjectInProgress,
  updateProjectIsTesting,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { deleteOneProjectTask } from "../apis/user_api";
import ListForUncompletedTaskForUser from "./List/ListForUncompletedTaskForUser";
import { ProjectProgress } from "../types/user/user_types";

interface IProps {
  ProjectProgressList: ProjectProgress[];
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page: number | undefined;
  projectTaskListRefetch: () => void;
}

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
        // console.log("result : ", result);
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

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onChangeForStarRatingHandler = ({ taskPk, star_count }: any) => {
    updateMutationForProjectImportance.mutate({ taskPk, star_count });
  };

  const deleteMutation = useMutation(
    (pk: number) => {
      return deleteOneProjectTask(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
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
    // if (projectTaskListRefatch) {
    //   projectTaskListRefatch();
    // }
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
      />
    </>
  );
}

export default UncompletedTaskListForUser;

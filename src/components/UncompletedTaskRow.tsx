import React, { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  List,
  ListItem,
  Checkbox,
  Text,
  useColorModeValue,
  Box,
  IconButton,
  HStack,
  VStack,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  IResponseTypeForProjectTaskUpdate,
  ITypeForProjectProgressList,
  taskRowForUncompleted,
} from "../types/project_progress/project_progress_type";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import SlideToggleButton from "./SlideToggleButton";
import {
  updateProjectImportance,
  updateProjectInProgress,
  updateProjectIsTesting,
  updateProjectTaskCompleted,
  update_task_for_is_task_for_cash_prize,
  update_task_for_is_task_for_urgent,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";
import ModalButtonForUpdateProjectTaskCompleteDate from "./modal/ModalButtonForUpdateProjectTaskCompleteDate";
import ModalButtonForUpdateProjectTaskStartedAt from "./modal/ModalButtonForUpdateProjectTaskStartedAt";
import SlideToggleButtonForInProgress from "./SlideToggleButton/SlideToggleButtonForInProgress";
import SlideToggleButtonForIsTesting from "./SlideToggleButton/SlideToggleButtonForIsTesting";
import CommonDeleteButtonForPk from "./Button/CommonDeleteButtonForPk";

interface IProps {
  ProjectProgressList: taskRowForUncompleted[];
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page?: number;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectTaskListRefatch: () => void;
  checkedRowPks: number[];
}

function UncompletedTaskRow({
  ProjectProgressList,
  totalPageCount,
  task_number_for_one_page,
  currentPageNum,
  setCurrentPageNum,
  handleCheckboxChange,
  projectTaskListRefatch,
  checkedRowPks,
}: IProps): ReactElement {
  const queryClient = useQueryClient();

  // console.log("ProjectProgressList : ", ProjectProgressList);

  const toast = useToast();

  const updateProjectTaskIsTestingMutations = useMutation(
    updateProjectIsTesting,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["getUncompletedTaskList"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);

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
    console.log("update 핸들러 for task_status check id : ", taskPk);
  };

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      queryClient.refetchQueries(["getUncompletedTaskList"]);
      queryClient.refetchQueries(["getCompletedTaskList"]);

      toast({
        status: "success",
        title: "task status update success",
        description: result.message,
      });
    },
  });

  const updateHandlerForTaskStatus = (taskPk: string) => {
    updateProjectTaskMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check id : ", taskPk);
  };

  const updateProjectTaskInProgressMutations = useMutation(
    updateProjectInProgress,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskList"]);
        projectTaskListRefatch()
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
    console.log("update 핸들러 for task_status check id : ", taskPk);
  };

  const updateMutationForProjectImportance = useMutation(
    updateProjectImportance,
    {
      onSuccess: (result: any) => {
        // console.log("result : ", result);
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
        queryClient.refetchQueries(["getUnompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskList"]);
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
    (id: number) => {
      return deleteOneProjectTask(id);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
        // queryClient.refetchQueries(["getUnompletedTaskList"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);
        toast({
          title: "delete project task 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteHandelr = (id: number) => {
    const response = deleteMutation.mutate(id);
    console.log("response :", response);
  };

  const rowColor = (task_status: string) => {
    // console.log("task_staus : ", task_status);

    if (task_status === "ready") {
      return "white";
    }

    if (task_status === "in_progress") {
      return "rgba(255, 255, 0, 0.2)";
    }
    if (task_status === "testing") {
      return "rgba(255, 165, 0, 0.2)";
    }
  };

  const update_mutation_for_is_task_for_cash_prize = useMutation(
    update_task_for_is_task_for_cash_prize,
    {
      onSuccess: (result: any) => {
        // console.log("result : ", result);
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
        queryClient.refetchQueries(["getUnompletedTaskList"]);

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

  const update_For_is_task_for_cash_prize = (taskPk: string) => {
    console.log("taskPk:", taskPk);
    update_mutation_for_is_task_for_cash_prize.mutate(taskPk);
  };

  const update_mutation_for_is_task_for_urgent = useMutation(
    update_task_for_is_task_for_urgent,
    {
      onSuccess: (result: any) => {
        // console.log("result : ", result);
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
        queryClient.refetchQueries(["getUnompletedTaskList"]);

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

  const update_For_is_task_for_urgent = (taskPk: string) => {
    console.log("taskPk:", taskPk);
    update_mutation_for_is_task_for_urgent.mutate(taskPk);
  };

  if (ProjectProgressList && ProjectProgressList.length === 0) {
    return (
      <Box textAlign="center">
        <Text fontSize={"50px"}>No Data Available</Text>
      </Box>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "crud":
        return "blue";
      case "new-future":
        return "green";
      case "trouble-shooting":
        return "red";
      case "ui-task":
        return "yellow";
      case "refactoring":
        return "orange";
      case "optimization":
        return "purple";
      case "boiler-plate":
        return "teal";
      case "test-code":
        return "pink";
      default:
        return "gray";
    }
  };

  // 2244
  return (
    <>
      <Box overflowX={"scroll"} border={"0px solid blue"}>
        {ProjectProgressList
          ? ProjectProgressList.map((task: any) => {
              // console.log("task.task_manager : ", task.taskmanager);
              return (
                <List
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"2600px"}
                >
                  <ListItem border={"0px solid yellow"} flex={0.5}>
                    <Checkbox
                      mx={2}
                      border={"1px solid black"}
                      value={task.id}
                      isChecked={checkedRowPks.includes(task.id)}
                      onChange={handleCheckboxChange}
                    />
                  </ListItem>
                  <ListItem
                    display={"flex"}
                    flexDirection={"column"}
                    border={"0px solid yellow"}
                    flex={1.5}
                  >
                    <Text color={"blue.600"} textAlign={"start"}>
                      {task.task_manager?.username}
                    </Text>
                    <Text color={"tomato"} textAlign={"start"}>
                      {task.writer}
                    </Text>
                  </ListItem>
                  <ListItem border={"0px solid blue"} flex={6}>
                    <Text fontSize="sm" fontWeight="bold">
                      <Link
                        to={`/project_admin/${task.id}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {task.task}
                      </Link>
                      &nbsp;&nbsp;
                      <Badge
                        size="md"
                        fontSize={"10px"}
                        colorScheme={getCategoryColor(task.task_classification)}
                        p={1}
                      >
                        {task.task_classification}
                      </Badge>
                    </Text>
                  </ListItem>
                  <ListItem
                    border={"0px solid blue"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    flex={2.2}
                  >
                    <StarRating
                      initialRating={task.importance}
                      taskPk={task.id}
                      onChangeForStarRatingHandler={
                        onChangeForStarRatingHandler
                      }
                    />
                  </ListItem>
                  <ListItem
                    display={"flex"}
                    border="0px solid green"
                    justifyContent={"flex-start"}
                    alignItems={"centerF"}
                    gap={10}
                    flex={2.8}
                  >
                    <SlideToggleButtonForInProgress
                      onChange={() => {
                        updateHandlerForTaskInProgress(task.id);
                      }}
                      checked={task.in_progress}
                      is_disabled={task.is_testing}
                    />

                    <SlideToggleButtonForIsTesting
                      onChange={() => {
                        updateHandlerForTaskIsTesting(task.id);
                      }}
                      checked={task.is_testing}
                      is_disabled={!task.in_progress}
                    />

                    <SlideToggleButton
                      onChange={() => {
                        updateHandlerForTaskStatus(task.id);
                      }}
                      checked={task.task_completed}
                      in_progress={!task.in_progress}
                      is_testing={!task.is_testing}
                    />
                  </ListItem>
                  <ListItem border={"0px solid blue"} flex={2.5}>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>시작</Text>
                      </Box>
                      <HStack>
                        <Text>{task.started_at_formatted}</Text>
                        <ModalButtonForUpdateProjectTaskStartedAt
                          taskPk={task.id}
                          original_due_date={task.due_date ? task.due_date : ""}
                          started_at={task.started_at ? task.started_at : ""}
                          projectTaskListRefatch={projectTaskListRefatch}
                        />
                      </HStack>
                    </HStack>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>마감</Text>
                      </Box>
                      <Text>{task.due_date_formatted}</Text>

                      <ModalButtonForUpdateProjectTaskCompleteDate
                        taskPk={task.id}
                        original_due_date={task.due_date ? task.due_date : ""}
                        started_at={task.started_at ? task.started_at : ""}
                        projectTaskListRefatch={projectTaskListRefatch}
                      />
                    </HStack>
                  </ListItem>
                  <ListItem border={"0px solid blue"} flex={2.5}>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>경과</Text>
                      </Box>
                      <Box>
                        <Text>{task.elapsed_time_from_started_at}</Text>
                      </Box>
                    </HStack>

                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>남은 시간</Text>
                      </Box>
                      <Box>
                        <Text>{task.time_left_to_due_date}</Text>
                      </Box>
                    </HStack>
                  </ListItem>
                  {/* 긴급 여부 확인 */}
                  <ListItem display={"flex"} flex={1}>
                    <Text fontSize={"2xl"} mr={1}>
                      🚨
                    </Text>
                    <Checkbox
                      size="lg"
                      colorScheme="red"
                      defaultChecked={task.is_task_for_urgent}
                      onChange={() => update_For_is_task_for_urgent(task.id)}
                    />
                  </ListItem>
                  <ListItem display={"flex"} flex={1}>
                    <Text fontSize={"2xl"} mr={1}>
                      💰
                    </Text>
                    <Checkbox
                      size="lg"
                      colorScheme="red"
                      defaultChecked={task.is_task_for_cash_prize}
                      onChange={() =>
                        update_For_is_task_for_cash_prize(task.id)
                      }
                    />
                  </ListItem>
                  <ListItem>
                    {/* <IconButton
                      aria-label="삭제"
                      icon={<FaTrash />}
                      variant="ghost"
                      onClick={() => deleteHandelr(parseInt(task.id))}
                    /> */}
                    <CommonDeleteButtonForPk
                      id={task.id}
                      targetInfoToDelete={task.task}
                      handlerForDelete={deleteHandelr}
                    />
                  </ListItem>
                  hi
                </List>
              );
            })
          : ""}
      </Box>

      <Box mt={5}>
        {ProjectProgressList ? (
          <Box maxW="100%" bg="blue.100" color="red.500" mt={-3.5}>
            <PaginationComponent
              current_page_num={currentPageNum}
              total_page_num={totalPageCount}
              setCurrentPageNum={setCurrentPageNum}
              task_number_for_one_page={task_number_for_one_page}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default UncompletedTaskRow;

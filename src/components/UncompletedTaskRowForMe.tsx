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
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import SlideToggleButton from "./SlideToggleButton";
import {
  updateProjectImportance,
  updateProjectInProgress,
  updateProjectIsTesting,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";
import ModalButtonForUpdateProjectTaskCompleteDate from "./modal/ModalButtonForUpdateProjectTaskCompleteDate";
import ModalButtonForUpdateProjectTaskStartedAt from "./modal/ModalButtonForUpdateProjectTaskStartedAt";
import SlideToggleButtonForInProgress from "./SlideToggleButton/SlideToggleButtonForInProgress";
import SlideToggleButtonForIsTesting from "./SlideToggleButton/SlideToggleButtonForIsTesting";

interface IProps {
  ProjectProgressList: any;
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page: number | undefined;
  projectTaskListRefetch: any;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRowPks: number[];
}

function UncompletedTaskRowForMe({
  ProjectProgressList,
  task_number_for_one_page,
  totalPageCount,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefetch,
  handleCheckboxChange,
  checkedRowPks,
}: IProps): ReactElement {
  const completedColor = useColorModeValue("green.500", "green.300");
  const inProgressColor = useColorModeValue("orange.500", "orange.300");
  const queryClient = useQueryClient();

  const handleSlideToggleChange = (checked: boolean) => {
    console.log(`SlideToggle is now ${checked ? "on" : "off"}`);
  };
  const toast = useToast();

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      queryClient.refetchQueries(["getUncompletedTaskListForMe"]);
      queryClient.refetchQueries(["getCompletedTaskListForMe"]);

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

  const updateMutationForProjectImportance = useMutation(
    updateProjectImportance,
    {
      onSuccess: (result: any) => {
        // console.log("result : ", result);
        if (projectTaskListRefetch) {
          projectTaskListRefetch();
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
        if (projectTaskListRefetch) {
          projectTaskListRefetch();
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
    // if (projectTaskListRefetch) {
    //   projectTaskListRefetch();
    // }
  };

  const updateProjectTaskInProgressMutations = useMutation(
    updateProjectInProgress,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        projectTaskListRefetch();
        // queryClient.refetchQueries(["getUncompletedTaskList"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);
        // projectTaskListRefetch()

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

  const updateProjectTaskIsTestingMutations = useMutation(
    updateProjectIsTesting,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        projectTaskListRefetch();

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
    <Box border={"0px solid blue"} maxWidth={"100%"}>
      <Box overflowX="auto" width="100%">
        {ProjectProgressList ? (
          <List>
            {ProjectProgressList?.map((task: any) => {
              // console.log("task.task_manager : ", task.taskmanager);
              return (
                <ListItem
                  key={task.id}
                  height={16}
                  border={"1px solid lightgray"}
                  my={0}
                  display={"flex"}
                  alignItems={"center"}
                  backgroundColor={task.in_progress ? "yellow.50" : ""}
                  _hover={{ backgroundColor: "gray.100" }}
                  width={"1900px"}
                >
                  <HStack border={"0px solid green"}>
                    <Box border={"0px solid yellow"} width={"50px"}>
                      <Checkbox
                        mx={2}
                        border={"1px solid black"}
                        value={task.id}
                        isChecked={checkedRowPks.includes(task.id)}
                        onChange={handleCheckboxChange}
                      />{" "}
                    </Box>

                    <Box border={"0px solid yellow"} width={"100px"}>
                      <Text color={"blue.600"}>
                        {task.task_manager?.username}
                      </Text>
                      <Text color={"tomato"}>{task.writer}</Text>
                    </Box>

                    <Box border={"0px solid blue"} width={"480px"}>
                      <Text fontSize="sm" fontWeight="bold">
                        <Link
                          to={`/project_admin/${task.id}`}
                          style={{ textDecoration: "underline" }}
                        >
                          {task.task}
                        </Link>
                      </Text>
                    </Box>

                    <Box
                      display="flex"
                      border="0px solid green"
                      justifyContent={"flex-start"}
                      width="300px"
                      gap={10}
                    >
                      <Box border={"0px solid green"} width={"50px"}>
                        <SlideToggleButtonForInProgress
                          onChange={() => {
                            updateHandlerForTaskInProgress(task.id);
                          }}
                          checked={task.in_progress}
                          is_disabled={task.is_testing}
                        />
                      </Box>

                      <Box border={"0px solid green"} width={"50px"}>
                        <SlideToggleButtonForIsTesting
                          onChange={() => {
                            updateHandlerForTaskIsTesting(task.id);
                          }}
                          checked={task.is_testing}
                          is_disabled={!task.in_progress}
                        />
                      </Box>

                      <Box border={"0px solid green"} width={"50px"}>
                        <SlideToggleButton
                          onChange={() => {
                            updateHandlerForTaskStatus(task.id);
                          }}
                          checked={task.task_completed}
                          in_progress={!task.in_progress} // 진행중이 아니면 disabled true
                          is_testing={!task.is_testing} //  testing 중이 아니면
                        />
                      </Box>
                    </Box>

                    <Box
                      border={"0px solid blue"}
                      width={"240px"}
                      display={"flex"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <StarRating
                        initialRating={task.importance}
                        taskPk={task.id}
                        onChangeForStarRatingHandler={
                          onChangeForStarRatingHandler
                        }
                      />
                    </Box>

                    <Box border={"0px solid blue"} width={"310px"}>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text>시작</Text>
                        </Box>
                        <HStack>
                          <Text>{task.started_at_formatted}</Text>
                          <ModalButtonForUpdateProjectTaskStartedAt
                            taskPk={task.id}
                            original_due_date={
                              task.due_date ? task.due_date : ""
                            }
                            started_at={task.started_at ? task.started_at : ""}
                            projectTaskListRefetch={projectTaskListRefetch}
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
                          projectTaskListRefetch={projectTaskListRefetch}
                        />
                      </HStack>
                    </Box>
                    <Box border={"0px solid blue"} width={"260px"}>
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
                    </Box>

                    <Box>
                      <IconButton
                        aria-label="삭제"
                        icon={<FaTrash />}
                        variant="ghost"
                        onClick={() => deleteHandelr(parseInt(task.id))}
                      />
                    </Box>
                  </HStack>
                </ListItem>
              );
            })}
          </List>
        ) : (
          "loading"
        )}
      </Box>

      {/* 페이지 네이션 영역 */}
      <Box mt={5}>
        {ProjectProgressList ? (
          <Box maxW="100%" bg="blue.100" color="red.500" mt={-3.5}>
            <PaginationComponent
              current_page_num={currentPageNum}
              task_number_for_one_page={task_number_for_one_page}
              total_page_num={totalPageCount}
              setCurrentPageNum={setCurrentPageNum}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default UncompletedTaskRowForMe;

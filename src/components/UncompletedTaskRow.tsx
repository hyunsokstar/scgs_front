import React, { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Checkbox,
  Text,
  useColorModeValue,
  Container,
  Grid,
  GridItem,
  Box,
  IconButton,
  HStack,
  VStack,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  IResponseTypeForProjectTaskUpdate,
  ITypeForProjectProgressList,
} from "../types/project_progress/project_progress_type";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import SlideToggleButton from "./SlideToggleButton";
import {
  updateProjectImportance,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";
import ModalButtonForUpdateProjectTaskCompleteDate from "./modal/ModalButtonForUpdateProjectTaskCompleteDate";
import ModalButtonForUpdateProjectTaskStartedAt from "./modal/ModalButtonForUpdateProjectTaskStartedAt";

interface IProps {
  ProjectProgressList: any;
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  projectTaskListRefatch: () => void;
}

function UncompletedTaskRow({
  ProjectProgressList,
  totalPageCount,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefatch,
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
    console.log("update 핸들러 for task_status check pk : ", taskPk);
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
    (pk: number) => {
      return deleteOneProjectTask(pk);
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

  const deleteHandelr = (pk: number) => {
    const response = deleteMutation.mutate(pk);
    console.log("response :", response);
    // if (projectTaskListRefatch) {
    //   projectTaskListRefatch();
    // }
  };

  return (
    <Container border={"0px solid blue"} maxWidth={"100%"}>
      <Box overflowX="auto" width="100%" bgColor={"green.50"}>
        {ProjectProgressList ? (
          <List>
            {ProjectProgressList?.map((task: any) => {
              return (
                <ListItem
                  key={task.pk}
                  height={14}
                  border={"0px solid blue"}
                  width={"1400px"}
                >
                  <HStack border={"0px solid green"}>
                    <Box border={"0px solid yellow"} width={"50px"}>
                      <Checkbox mx={3} />
                    </Box>
                    <Box border={"0px solid green"} width={"120px"}>
                      {task.task_manager !== null ? (
                        <Text color={"blue.600"}>
                          {task.task_manager.username}
                        </Text>
                      ) : (
                        <Text color={"tomato"}>{task.writer}</Text>
                      )}
                    </Box>
                    <Box border={"0px solid blue"} width={"480px"} pl={5}>
                      <Text fontSize="sm" fontWeight="bold">
                        <Link
                          to={`/project_admin/${task.pk}`}
                          style={{ textDecoration: "underline" }}
                        >
                          {task.task}
                        </Link>
                      </Text>
                    </Box>
                    <Box
                      border={"0px solid blue"}
                      width={"200px"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      pr={20}
                    >
                      <StarRating
                        initialRating={task.importance}
                        taskPk={task.pk}
                        onChangeForStarRatingHandler={
                          onChangeForStarRatingHandler
                        }
                      />
                    </Box>
                    <Box border={"0px solid blue"} width={"320px"}>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text
                            fontWeight="bold"
                            fontFamily="Arial, sans-serif"
                            color="orange.500"
                          >
                            시작
                          </Text>
                        </Box>
                        <HStack>
                          <Text>{task.started_at_formatted}</Text>
                          <ModalButtonForUpdateProjectTaskStartedAt
                            taskPk={task.pk}
                            original_due_date={
                              task.due_date ? task.due_date : ""
                            }
                            started_at={task.started_at ? task.started_at : ""}
                            projectTaskListRefatch={projectTaskListRefatch}
                          />
                        </HStack>
                      </HStack>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text
                            fontWeight="bold"
                            fontFamily="Arial, sans-serif"
                            color="orange.500"
                          >
                            경과
                          </Text>
                        </Box>
                        <Box>
                          <Text>{task.elapsed_time_from_started_at}</Text>
                        </Box>
                      </HStack>
                    </Box>
                    <Box border={"0px solid blue"} width={"320px"}>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text
                            fontWeight="bold"
                            fontFamily="Arial, sans-serif"
                            color="orange.500"
                          >
                            마감
                          </Text>
                        </Box>
                        <Text>{task.due_date_formatted}</Text>

                        <ModalButtonForUpdateProjectTaskCompleteDate
                          taskPk={task.pk}
                          original_due_date={task.due_date ? task.due_date : ""}
                          started_at={task.started_at ? task.started_at : ""}
                          projectTaskListRefatch={projectTaskListRefatch}
                        />
                      </HStack>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text
                            fontWeight="bold"
                            fontFamily="Arial, sans-serif"
                            color="orange.500"
                          >
                            남은 시간
                          </Text>
                        </Box>
                        <Box>
                          <Text>{task.time_left_to_due_date}</Text>
                        </Box>
                      </HStack>
                    </Box>
                    <Box border={"0px solid green"}>
                      <SlideToggleButton
                        onChange={() => {
                          updateHandlerForTaskStatus(task.pk);
                        }}
                        checked={task.task_completed}
                      />
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="삭제"
                        icon={<FaTrash />}
                        variant="ghost"
                        onClick={() => deleteHandelr(parseInt(task.pk))}
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

      {/* <Box overflowX="auto" width={"300px"}>
          <List border={"0px solid blue"}>
            <ListItem width={"500px"}>Item 1</ListItem>
            <ListItem width={"500px"}>Item 2</ListItem>
            <ListItem width={"500px"}>Item 3</ListItem>
            <ListItem width={"500px"}>Item 4</ListItem>
            <ListItem width={"500px"}>Item 5</ListItem>
            <ListItem width={"500px"}>Item 6</ListItem>
            <ListItem width={"500px"}>Item 7</ListItem>
            <ListItem width={"500px"}>Item 8</ListItem>
            <ListItem width={"500px"}>Item 9</ListItem>
            <ListItem width={"500px"}>Item 10</ListItem>
          </List>
        </Box> */}

      {/* 페이지 네이션 영역 */}
      <Box mt={0}>
        {ProjectProgressList ? (
          <Container maxW="100%" bg="blue.50" color="red.500" mt={1}>
            <PaginationComponent
              current_page_num={currentPageNum}
              total_page_num={totalPageCount}
              setCurrentPageNum={setCurrentPageNum}
            />
          </Container>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default UncompletedTaskRow;

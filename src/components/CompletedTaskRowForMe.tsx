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
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  IResponseTypeForProjectTaskUpdate,
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

interface IProps {}

function CompletedTaskRowForMe({
  ProjectProgressList,
  task_number_for_one_page,
  totalPageCount,
  projectTaskListRefatch,
  currentPageNum,
  setCurrentPageNum,
  handleCheckboxChange,
  checkedRowPks,
}: any): ReactElement {
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
      // if (projectTaskListRefatch) {
      //   projectTaskListRefatch();
      // }

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
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
        // queryClient.refetchQueries(["getUnompletedTaskList"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);

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
    // if (projectTaskListRefatch) {
    //   projectTaskListRefatch();
    // }
  };

  return (
    <Box border={"0px solid blue"} maxWidth={"100%"}>
      <Box overflowX="auto" width="100%">
        <List>
          {ProjectProgressList?.map((task:any) => {
            return (
              <ListItem
                key={task.id}
                height={16}
                border={"1px solid lightgray"}
                width={"1600px"}
                my={0}
                display={"flex"}
                alignItems={"center"}
                _hover={{ backgroundColor: "gray.100" }}
              >
                <HStack>
                  <Box border={"0px solid yellow"} width={"50px"}>
                    <HStack ml={0}>
                      <Checkbox
                        mx={2}
                        border={"1px solid black"}
                        value={task.id}
                        isChecked={checkedRowPks.includes(task.id)}
                        onChange={handleCheckboxChange}
                      />{" "}
                    </HStack>
                  </Box>
                  <Box width={"140px"}>
                    <Text color={"blue.600"}>{task.task_manager.username}</Text>
                    <Text color={"tomato"}>{task.writer}</Text>
                  </Box>
                  <Box border={"0px solid blue"} width={"360px"}>
                    <Text fontSize="sm" fontWeight="bold">
                      <Link
                        to={`/project_admin/${task.id}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {task.task}
                      </Link>
                    </Text>
                  </Box>
                  {/* task_completed update */}

                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    border={"0px solid green"}
                    width={"120px"}
                  >
                    <SlideToggleButton
                      onChange={() => {
                        updateHandlerForTaskStatus(task.id);
                      }}
                      checked={task.task_completed}
                    />
                  </Box>

                  <Box
                    border={"0px solid blue"}
                    width={"260px"}
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

                  <Box border={"0px solid blue"} width={"260px"}>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>시작</Text>
                      </Box>
                      <Box>
                        <Text>{task.started_at_formatted}</Text>
                      </Box>
                    </HStack>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>완료</Text>
                      </Box>
                      <Box>
                        <Text>{task.completed_at_formatted}</Text>
                      </Box>
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
                        <Text>소요 시간</Text>
                      </Box>
                      <Box>
                        <Text>{task.time_consumed_from_start_to_complete}</Text>
                      </Box>
                    </HStack>
                  </Box>

                  <Box width={"100px"} border="0px solid green">
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
      </Box>

      {/* 페이지 네이션 영역 */}
      <Box mt={5}>
        {ProjectProgressList ? (
          <Container maxW="100%" bg="blue.100" color="red.500" mt={1}>
            <PaginationComponent
              current_page_num={currentPageNum}
              task_number_for_one_page={task_number_for_one_page}
              total_page_num={totalPageCount}
              setCurrentPageNum={setCurrentPageNum}
            />
          </Container>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default CompletedTaskRowForMe;

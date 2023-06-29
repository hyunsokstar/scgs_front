import React, { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  List,
  ListItem,
  Checkbox,
  Text,
  useColorModeValue,
  Container,
  Box,
  IconButton,
  HStack,
  useToast,
  Button,
} from "@chakra-ui/react";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import SlideToggleButton from "./SlideToggleButton";
import {
  apiForDeleteCompletedTaskForChecked,
  updateProjectImportance,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";
import ModalButtonForUpdateProjectTaskCompleteDate from "./modal/ModalButtonForUpdateProjectTaskCompleteDate";
import ModalButtonForUpdateProjectTaskStartedAt from "./modal/ModalButtonForUpdateProjectTaskStartedAt";
interface IProps {}

// 1122
function CompletedTaskRow({
  checkedRowPks,
  setCheckedRowPks,
  handleCheckboxChange,
  ProjectProgressList,
  totalPageCount,
  task_number_for_one_page,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefatch,
}: ITypeForProjectProgressList): ReactElement {
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

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks = ProjectProgressList?.map((item) => item.pk) || [];

    if (checked) {
      // Add all pks to the checkedRowPks array
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      // Remove all pks from the checkedRowPks array
      setCheckedRowPks([]);
    }
  };

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteCompletedTaskForChecked(checkedRowPks);
    },
    {
      onSuccess: (data) => {
        setCheckedRowPks([]);
        queryClient.refetchQueries(["getCompletedTaskList"]);

        toast({
          title: "Delete Task For Checked 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const buttonHandlerForDeleteTaskRowForChecked = () => {
    // checkedRowPks
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteTasksForChecked.mutate(checkedRowPks);
  };

  // 2244
  return (
    <Box border={"0px solid blue"} maxWidth={"100%"}>
      <Box display={"flex"} justifyContent={"flex-start"} gap={2} my={2}>
        {/* 수정 필요 체크 박스가 너무 구림 */}
        <Checkbox
          m={2}
          size={"lg"}
          colorScheme="blue"
          onChange={handleChangeForAllCheckBox}
          checked={checkedRowPks.length === ProjectProgressList?.length}
        />
        <Button
          variant={"outlined"}
          size={"md"}
          border={"1px solid blue"}
          onClick={buttonHandlerForDeleteTaskRowForChecked}
        >
          delete for check
        </Button>
      </Box>

      <Box overflowX="auto" width="100%">
        <List>
          {ProjectProgressList && ProjectProgressList.length !== 0 ? (
            ProjectProgressList?.map((task) => {
              return (
                <ListItem
                  key={task.pk}
                  height={16}
                  border={"1px solid lightgray"}
                  width={"1842px"}
                  my={0}
                  display={"flex"}
                  alignItems={"center"}
                  _hover={{ backgroundColor: "gray.100" }}
                >
                  <HStack>
                    <Box border={"0px solid yellow"} width={"50px"}>
                      <HStack ml={0}>
                        {/* <Checkbox mx={2} /> */}
                        <Checkbox
                          mx={2}
                          border={"1px solid black"}
                          value={task.pk}
                          isChecked={checkedRowPks?.includes(task.pk)}
                          onChange={handleCheckboxChange}
                        />
                      </HStack>
                    </Box>
                    <Box width={"140px"}>
                      <Text color={"blue.600"}>
                        {task.task_manager.username}
                      </Text>
                      <Text color={"tomato"}>{task.writer}</Text>
                    </Box>
                    <Box border={"0px solid blue"} width={"580px"}>
                      <Text fontSize="sm" fontWeight="bold">
                        <Link
                          to={`/project_admin/${task.pk}`}
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
                          updateHandlerForTaskStatus(task.pk);
                        }}
                        checked={task.task_completed}
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
                            taskPk={task.pk}
                            original_due_date={
                              task.due_date ? task.due_date : ""
                            }
                            started_at={task.started_at ? task.started_at : ""}
                            projectTaskListRefatch={projectTaskListRefatch}
                          />
                        </HStack>
                      </HStack>
                    </Box>

                    <Box border={"0px solid blue"} width={"310px"}>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text>완료 시점</Text>
                        </Box>
                        <Text>{task.completed_at_formatted}</Text>

                        <ModalButtonForUpdateProjectTaskCompleteDate
                          taskPk={task.pk}
                          original_due_date={task.due_date ? task.due_date : ""}
                          started_at={task.started_at ? task.started_at : ""}
                          projectTaskListRefatch={projectTaskListRefatch}
                        />
                      </HStack>
                    </Box>

                    <Box border={"0px solid blue"} width={"200px"}>
                      <HStack>
                        <Box textAlign={"center"}>
                          <Text>소요 시간</Text>
                        </Box>
                        <Box>
                          <Text>
                            {task.time_consumed_from_start_to_complete}
                          </Text>
                        </Box>
                      </HStack>

                      {/* <HStack>
                      <Box textAlign={"center"}>
                        <Text>경과</Text>
                      </Box>
                      <Box>
                        <Text>{task.elapsed_time_from_started_at}</Text>
                      </Box>
                    </HStack> */}

                      {/* <HStack>
                      <Box textAlign={"center"}>
                        <Text>남은 시간</Text>
                      </Box>
                      <Box>
                        <Text>{task.time_left_to_due_date}</Text>
                      </Box>
                    </HStack> */}
                    </Box>

                    {/* <Box border={"0px solid blue"} width={"170px"}>
                    업무 평점 부여
                  </Box> */}

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
            })
          ) : (
            <Box>no data</Box>
          )}
        </List>
      </Box>

      {/* 페이지 네이션 영역 */}
      <Box mt={5}>
        {ProjectProgressList ? (
          <Container maxW="100%" bg="blue.100" color="red.500" mt={1}>
            <PaginationComponent
              current_page_num={currentPageNum}
              total_page_num={totalPageCount}
              task_number_for_one_page={task_number_for_one_page}
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

export default CompletedTaskRow;

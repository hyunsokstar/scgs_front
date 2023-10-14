import React, { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Checkbox,
  Text,
  Button,
  Box,
  useToast,
  Avatar,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  ITypeForTaskListDataForUncompleted,
  taskRowForUncompleted,
} from "../types/project_progress/project_progress_type";
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
import ModalButtonForUpdateDueDateOptionForToday from "./modal/ModalButtonForUpdateDueDateOptionForToday";
import StarRating from "./StarRating";
import ModalButtonForAdminExtraManager from "./modal/ModalButtonForAdminExtraManager";
import { useNavigate } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";

interface IProps {
  ProjectProgressList: taskRowForUncompleted[];
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page?: number;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectTaskListRefatch: () => void;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
  taskListDataForUncompleted: ITypeForTaskListDataForUncompleted;
}

// 1122
function UncompletedTaskList({
  ProjectProgressList,
  totalPageCount,
  task_number_for_one_page,
  currentPageNum,
  setCurrentPageNum,
  handleCheckboxChange,
  projectTaskListRefatch,
  checkedRowPks,
  setCheckedRowPks,
  taskListDataForUncompleted,
}: IProps): ReactElement {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toast = useToast();

  const updateProjectTaskIsTestingMutations = useMutation(
    updateProjectIsTesting,
    {
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
    }
  );

  const updateHandlerForTaskIsTesting = (taskPk: string) => {
    updateProjectTaskIsTestingMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check id : ", taskPk);
  };

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      toast({
        status: "success",
        title: "task status update success",
        description: result.message,
      });

      queryClient.refetchQueries(["getUncompletedTaskList"]);
      queryClient.refetchQueries(["getCompletedTaskList"]);
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
        // projectTaskListRefatch();
        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });

        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskList"]);
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
        // if (projectTaskListRefatch) {
        //   projectTaskListRefatch();
        // }
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

  type DueDateOption = "until-noon" | "until-evening" | "until-night";

  function getDueDateEmoji(dueDateOption: DueDateOption): string {
    if (dueDateOption === "until-noon") {
      return "☀️";
    } else if (dueDateOption === "until-evening") {
      return "🌛";
    } else if (dueDateOption === "until-night") {
      return "🌌";
    } else {
      return "?";
    }
  }

  const handleTextClick = (userPk) => {
    // task.id를 사용하여 원하는 경로로 이동
    navigate(`/team-status/${userPk}`);
  };

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      taskListDataForUncompleted?.ProjectProgressList.map((item) => item.id) ||
      [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  // 2244
  return (
    <>
      {/* {checkedRowPks.map((number) => (
        <Box key={number}>{number}</Box>
      ))} */}
      <Box overflowX={"scroll"} border={"0px solid blue"}>
        <Table variant="striped" size="md" width="3600px">
          <Thead>
            <Tr>
              <Th width="50px">
                <Checkbox
                  size={"md"}
                  onChange={handleChangeForAllCheckBox}
                  checked={
                    checkedRowPks.length ===
                    taskListDataForUncompleted?.ProjectProgressList.length
                  }
                  border={"2px solid black"}
                  // ml={6}
                />{" "}
              </Th>
              <Th w={"400px"}>담당</Th>
              <Th w={"800px"}>Task</Th>
              <Th w={"300px"}>Importance</Th>
              <Th w={"200px"}>Classification</Th>
              <Th w={"350px"}>Due Date</Th>
              <Th w={"350px"}>Status</Th>
              <Th w={"500px"}>시작 , 마감 기한</Th>
              <Th w={"500px"}>경과, 남은 시간</Th>
              <Th w={"200px"}>Urgent</Th>
              <Th w={"200px"}>Cash Prize</Th>
              <Th w={"200px"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ProjectProgressList
              ? ProjectProgressList.map((task: taskRowForUncompleted) => {
                  return (
                    <Tr key={task.id}>
                      <Td>
                        <Checkbox
                          // mx={2}
                          border={"1px solid black"}
                          value={task.id}
                          isChecked={checkedRowPks.includes(task.id)}
                          onChange={handleCheckboxChange}
                        />
                      </Td>
                      <Td>
                        {" "}
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          color="blue.600"
                          textAlign="start"
                          fontWeight="bold"
                          gap={``}
                          onClick={() => handleTextClick(task.task_manager.pk)}
                        >
                          담당: {task.task_manager?.username}
                          <IconButton
                            icon={<InfoIcon />}
                            variant="outline"
                            aria-label="팀 상태 보기"
                            ml={2} // 아이콘과 텍스트 사이의 간격 조절
                            size={"xs"}
                            onClick={() =>
                              handleTextClick(task.task_manager.pk)
                            }
                          />
                        </Text>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          border={"0px solid blue"}
                        >
                          <Text
                            color="tomato"
                            textAlign="start"
                            fontSize="lg"
                            fontWeight="bold"
                          >
                            보조 :
                          </Text>
                          {task.extra_managers.map((user) => {
                            return (
                              <Box>
                                <Avatar
                                  name={user.task_manager.username} // 이름 설정
                                  src={user.task_manager.profile_image} // 프로필 이미지 URL (선택 사항)
                                  size="sm" // Avatar 크기 설정 (xs, sm, md, lg, xl 중 선택)
                                />{" "}
                              </Box>
                            );
                          })}
                          <ModalButtonForAdminExtraManager
                            task={task.task}
                            ownerUser={task.task_manager}
                            extra_managers={
                              task.extra_managers ? task.extra_managers : []
                            }
                            buttonText="+"
                            targetTaskId={task.id}
                          />
                        </Box>
                      </Td>
                      <Td flex={6}>
                        {/* Your content for "Task" column */}
                        <Box
                          display={"flex"}
                          gap={2}
                          flexDirection={"column"}
                          // alignItems={"center"}
                          justifyContent={"flex-start"}
                        >
                          <Text fontSize="sm" fontWeight="bold">
                            <Link
                              to={`/project_admin/${task.id}`}
                              style={{ textDecoration: "underline" }}
                            >
                              {task.task}
                            </Link>
                          </Text>

                          <Box display={"flex"} gap={2}>
                            <Button
                              variant={"outline"}
                              border={"1px solid black"}
                              size={"xs"}
                            >
                              i: {task.count_for_task_images}
                            </Button>

                            <Button
                              variant={"outline"}
                              border={"1px solid black"}
                              size={"xs"}
                            >
                              c: {task.count_for_task_comments}
                            </Button>
                            <Button
                              variant={"outline"}
                              border={"1px solid black"}
                              size={"xs"}
                            >
                              t: {task.count_for_tests_for_task}
                            </Button>
                            <Button
                              variant={"outline"}
                              border={"1px solid black"}
                              size={"xs"}
                            >
                              s: {task.count_for_extra_tasks}
                            </Button>
                          </Box>
                        </Box>
                      </Td>
                      <Td>
                        {" "}
                        {/* Your content for "Importance" column */}
                        <StarRating
                          taskPk={task.id}
                          initialRating={task.importance}
                          onChangeForStarRatingHandler={
                            onChangeForStarRatingHandler
                          }
                        />
                      </Td>
                      <Td>
                        {" "}
                        {/* Your content for "Classification" column */}
                        <Box>{task.task_classification}</Box>
                      </Td>
                      <Td>
                        {" "}
                        {/* Your content for "Due Date" column */}
                        <Box display={"flex"} gap={2}>
                          {task.is_for_today ? (
                            <Button
                              variant="outline"
                              size="sm"
                              _hover={{ bg: "lightblue" }}
                              color={"orange.500"}
                            >
                              T
                            </Button>
                          ) : (
                            ""
                          )}

                          {task.is_due_date_has_passed ? (
                            <ModalButtonForUpdateDueDateOptionForToday
                              button_text={"DHP"}
                              button_size={"sm"}
                              modal_title={"update due date to today"}
                              modal_size={"5xl"}
                              taskId={task.id}
                            />
                          ) : (
                            ""
                          )}

                          {task.d_day_count && !task.is_for_today ? (
                            <Button
                              variant="outline"
                              size="sm"
                              _hover={{ bg: "lightblue" }}
                              color={"blue.500"}
                            >
                              D {task.d_day_count}
                            </Button>
                          ) : (
                            ""
                          )}

                          <ModalButtonForUpdateDueDateOptionForToday
                            taskId={task.id}
                            button_text={getDueDateEmoji(
                              task.due_date_option_for_today
                            )}
                            button_size={"sm"}
                            modal_title={"update due date"}
                            modal_size={"5xl"}
                          />
                        </Box>
                      </Td>
                      <Td>
                        {" "}
                        {/* Your content for "Status" column */}
                        <Box display={"flex"} gap={5}>
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
                        </Box>
                      </Td>
                      <Td>
                        {/* Your content for "Start & Due" column */}
                        <Box display={"flex"} gap={1} mb={2}>
                          <Text>시작 : {task.started_at_formatted}</Text>
                          <ModalButtonForUpdateProjectTaskStartedAt
                            taskPk={task.id}
                            original_due_date={
                              task.due_date ? task.due_date : ""
                            }
                            started_at={task.started_at ? task.started_at : ""}
                            projectTaskListRefatch={projectTaskListRefatch}
                          />
                        </Box>
                        <Box display={"flex"} gap={1} mb={2}>
                          <Text>마감 : {task.due_date_formatted}</Text>
                          <ModalButtonForUpdateProjectTaskCompleteDate
                            taskPk={task.id}
                            original_due_date={
                              task.due_date ? task.due_date : ""
                            }
                            started_at={task.started_at ? task.started_at : ""}
                            projectTaskListRefatch={projectTaskListRefatch}
                          />
                        </Box>
                      </Td>
                      <Td>
                        {" "}
                        {/* Your content for "Elapsed Time" column */}
                        <Box>
                          <Text mb={2}>
                            경과 : {task.elapsed_time_from_started_at}
                          </Text>
                          <Text>남음 : {task.time_left_to_due_date}</Text>
                        </Box>
                      </Td>
                      <Td>
                        {/* Your content for "Urgent" column */}
                        <Box display={"flex"} gap={2}>
                          <Text fontSize={"2xl"} mr={1}>
                            🚨
                          </Text>
                          <Checkbox
                            size="lg"
                            colorScheme="red"
                            defaultChecked={task.is_task_for_urgent}
                            onChange={() =>
                              update_For_is_task_for_urgent(task.id)
                            }
                          />
                        </Box>
                      </Td>
                      <Td>
                        {/* Your content for "Cash Prize" column */}
                        <Box display={"flex"} gap={2}>
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
                        </Box>
                      </Td>
                      <Td>
                        <CommonDeleteButtonForPk
                          id={task.id}
                          targetInfoToDelete={task.task}
                          handlerForDelete={deleteHandelr}
                        />
                      </Td>
                    </Tr>
                  );
                })
              : ""}
          </Tbody>
        </Table>
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

export default UncompletedTaskList;

import React, { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  List,
  ListItem,
  Checkbox,
  Text,
  Button,
  Box,
  HStack,
  useToast,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { taskRowForUncompleted } from "../types/project_progress/project_progress_type";
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
}: IProps): ReactElement {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // console.log("ProjectProgressList : ", ProjectProgressList);

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
        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskList"]);
        // projectTaskListRefatch();
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

  // 2244
  return (
    <>
      {/* {checkedRowPks.map((number) => (
        <Box key={number}>{number}</Box>
      ))} */}
      <Box overflowX={"scroll"} border={"0px solid blue"}>
        {ProjectProgressList
          ? ProjectProgressList.map((task: taskRowForUncompleted) => {
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
                    flex={2.2}
                    fontSize="lg"
                    mr={5}
                  >
                    {/* todo: 아래 text 클릭하면 team-status/{task.id} 로 요청 하도록 하기 with chakra-ui, ts */}
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
                        onClick={() => handleTextClick(task.task_manager.pk)}
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
                  </ListItem>
                  <ListItem
                    display={"flex"}
                    gap={1}
                    border={"0px solid blue"}
                    flex={6}
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      <Link
                        to={`/project_admin/${task.id}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {task.task}
                      </Link>
                    </Text>
                  </ListItem>
                  {/* fix */}
                  <ListItem flex={2.6}>
                    <Box size="md">
                      <StarRating
                        taskPk={task.id}
                        initialRating={task.importance}
                        onChangeForStarRatingHandler={
                          onChangeForStarRatingHandler
                        }
                      />
                    </Box>
                  </ListItem>
                  <ListItem flex={1.2}>
                    <Box size="md">{task.task_classification}</Box>
                  </ListItem>
                  <ListItem border={"0px solid blue"} flex={3.4}>
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
                  </ListItem>
                  {/* <ListItem
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
                  </ListItem> */}
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

export default UncompletedTaskList;

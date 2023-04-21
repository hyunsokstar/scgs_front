import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  List,
  ListItem,
  Checkbox,
  Text,
  Container,
  Box,
  IconButton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

import {
  IResponseTypeForProjectTaskUpdate,
  ITypeForProjectProgressList,
} from "../types/project_progress/project_progress_type";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import SlideToggleButton from "./SlideToggleButton";
import {
  apiForUpdateScoreByTester,
  apiForUpdateTaskCheckResultByTester,
  updateProjectImportance,
  updateProjectTaskCompleted,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";
import ModalButtonForUpdateProjectTaskCompleteDate from "./modal/ModalButtonForUpdateProjectTaskCompleteDate";
import ModalButtonForUpdateProjectTaskStartedAt from "./modal/ModalButtonForUpdateProjectTaskStartedAt";
interface IProps {}

function CompletedTaskRowForTester({
  ProjectProgressList,
  totalPageCount,
  task_number_for_one_page,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefatch,
}: ITypeForProjectProgressList): ReactElement {
  const queryClient = useQueryClient();

  const [scoreByTesterForUpdate, setScoreByTesterForUpdate] = useState<string>();

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

  //   check_result
  const mutationForUpdateCheckResultByTester = useMutation(
    apiForUpdateTaskCheckResultByTester,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        // queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskListForTester"]);
        // if (projectTaskListRefatch) {
        //   projectTaskListRefatch();
        // }

        toast({
          status: "success",
          title: "check result update success",
          description: result.message,
        });
      },
    }
  );

  const updateHandlerForCheckResultByTester = (taskPk: string) => {
    mutationForUpdateCheckResultByTester.mutate(taskPk);
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
  };

  const mutationForUpdateScoreByTester = useMutation(
    apiForUpdateScoreByTester,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getCompletedTaskListForTester"]);

        toast({
          status: "success",
          title: "task score update success",
          description: result.message,
        });
      },
    }
  );

  const handleClickForUpdateScoreByTester = (pk:any) => {
    mutationForUpdateScoreByTester.mutate({pk, scoreByTesterForUpdate});
  }

  const handleChangeForScoreByTester = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeForScoreByTester check");
    console.log("e : ", e.target.value);
    
    setScoreByTesterForUpdate(e.target.value);
  };

  return (
    <Box border={"0px solid blue"} maxWidth={"100%"}>
      <Box overflowX="auto" width="100%">
        <List>
          {ProjectProgressList?.map((task) => {
            return (
              <ListItem
                key={task.pk}
                height={16}
                border={"1px solid lightgray"}
                width={"1474px"}
                my={0}
                display={"flex"}
                alignItems={"center"}
                _hover={{ backgroundColor: "gray.100" }}
              >
                <HStack>
                  <Box border={"0px solid yellow"} width={"50px"}>
                    <HStack ml={0}>
                      <Checkbox mx={2} />
                    </HStack>
                  </Box>
                  <Box width={"160px"}>
                    <Text color={"blue.600"}>{task.task_manager.username}</Text>
                    <Text color={"tomato"}>{task.writer}</Text>
                  </Box>
                  <Box border={"0px solid blue"} width={"420px"}>
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

                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    border={"0px solid green"}
                    width={"120px"}
                  >
                    <SlideToggleButton
                      onChange={() => {
                        updateHandlerForCheckResultByTester(task.pk);
                      }}
                      onColor={"#FADADD"}
                      offColor={"#D3D3D3"}
                      checked={task.check_result_by_tester}
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
                        taskPk={task.pk}
                        original_due_date={task.due_date ? task.due_date : ""}
                        started_at={task.started_at ? task.started_at : ""}
                        projectTaskListRefatch={projectTaskListRefatch}
                      />
                    </HStack>
                  </Box>
                  <Box border={"0px solid blue"} width={"140px"}>
                    <InputGroup size="sm">
                      <Input
                        border={"1px solid black"}
                        defaultValue={task.score_by_tester}
                        onChange={handleChangeForScoreByTester}
                      />
                      <InputRightElement width="60px" mr={-2}>
                        <Button
                          border={"1px solid green"}
                          size="sm"
                          onClick={() => handleClickForUpdateScoreByTester(task.pk)}
                          // disabled={value === undefined || value < 0}
                        >
                          평가
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>

                  <Box pl={"40px"}>
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

export default CompletedTaskRowForTester;

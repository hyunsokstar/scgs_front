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
  Input,
  Button,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";
import { CheckIcon, ViewOffIcon } from "@chakra-ui/icons";

import { FaTrash } from "react-icons/fa";

import {
  api_for_update_check_for_cash_prize,
  updateCashPrizeForTask,
  updateChallengerListByTaskPkApi,
  updateProjectTaskCompleted,
  update_task_for_is_task_for_cash_prize,
} from "../apis/project_progress_api";
import { Link } from "react-router-dom";
import { deleteOneProjectTask } from "../apis/user_api";
import PaginationComponent from "./PaginationComponent";

import { FaDollarSign, FaPlus, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SlideToggleButton from "./SlideToggleButton";

interface IProps {
  ProjectProgressList: any;
  totalPageCount: number;
  currentPageNum: number;
  setCurrentPageNum: any;
  task_number_for_one_page?: number;
  projectTaskListRefatch: () => void;
}

function UncompletedTaskRow({
  ProjectProgressList,
  totalPageCount,
  task_number_for_one_page,
  currentPageNum,
  setCurrentPageNum,
  projectTaskListRefatch,
}: IProps): ReactElement {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [cash_prize_for_update, set_cash_prize_for_update] = useState<string>();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

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

  console.log("ProjectProgressList : ", ProjectProgressList);

  const deleteHandelr = (pk: number) => {
    const response = deleteMutation.mutate(pk);
    console.log("response :", response);
  };

  const rowColor = (task_status: string) => {
    console.log("task_staus : ", task_status);

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

  const mutationForCashPrizeForTask = useMutation(updateCashPrizeForTask, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      queryClient.refetchQueries(["getUncompletedTasksWithCashPrize"]);

      toast({
        status: "success",
        title: "cash prize update success",
        description: result.message,
      });
    },
    onError: (err) => {
      console.log("error : ", err);
    },
  });

  const updateForCashPrize = (taskPk: number) => {
    console.log("hi", cash_prize_for_update, taskPk);
    mutationForCashPrizeForTask.mutate({ taskPk, cash_prize_for_update });
  };

  const mutationForUpdateChallengerListByTaskPk = useMutation(
    updateChallengerListByTaskPkApi,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["getUncompletedTasksWithCashPrize"]);

        toast({
          status: "success",
          title: "challenger list update success",
          description: result.message,
        });
      },
    }
  );

  // updateChallengerListByTaskPk
  const updateChallengerListByTaskPk = (testPk: string | number) => {
    mutationForUpdateChallengerListByTaskPk.mutate(testPk);
  };

  const mutationForUpdateCheckResultForCashTask = useMutation(
    api_for_update_check_for_cash_prize,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getUncompletedTasksWithCashPrize"]);

        toast({
          status: "success",
          title: "check result update success",
          description: result.message,
        });
      },
    }
  );

  const update_for_check_for_cash_prize = (
    taskPk: string,
    taskMangerPk: number,
    cash_prize: number
  ) => {
    mutationForUpdateCheckResultForCashTask.mutate({
      taskPk,
      taskMangerPk,
      cash_prize,
    });
    console.log(
      "update 핸들러 for update_for_check_for_cash_prize : ",
      taskPk,
      taskMangerPk
    );
  };

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      queryClient.refetchQueries(["getUncompletedTasksWithCashPrize"]);
      // queryClient.refetchQueries(["getCompletedTaskList"]);
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

  return (
    <Box border={"0px solid blue"}>
      <Box overflowX="auto" border={"0px solid green"}>
        {ProjectProgressList ? (
          <List>
            {ProjectProgressList?.map((task: any) => {
              console.log("task : ", task);
              return (
                <ListItem
                  width={"1600px"}
                  key={task.pk}
                  height={16}
                  border={"0px solid lightgray"}
                  my={0}
                  display={"flex"}
                  alignItems={"center"}
                  h={"60px"}
                  _hover={{ backgroundColor: "gray.100" }}
                >
                  <Box border={"0px solid yellow"} width={"50px"}>
                    <Checkbox mx={2} border={"0px solid black"} />
                  </Box>

                  <Box width={"240px"}>
                    <Text color={"blue.600"}>
                      {task.task_manager?.username}
                      <Button
                        size="xs"
                        ml={2}
                        variant="outline"
                        borderRadius="md"
                        colorScheme="purple"
                        _hover={{
                          bg: "purple.200",
                          borderColor: "purple.200",
                          color: "white",
                        }}
                      >
                        <FaEdit />
                      </Button>
                    </Text>
                  </Box>

                  {/* <Box>
                    <Text color={"tomato"} textAlign={"start"}>
                      {task.writer}
                    </Text>
                  </Box> */}

                  <Box border={"0px solid blue"} width={"440px"}>
                    <Text fontSize="sm" fontWeight="bold">
                      <Link
                        to={`/project_admin/${task.pk}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {task.task}
                      </Link>
                    </Text>
                  </Box>

                  <Box width={"140px"}>{task.current_status}</Box>

                  <Box
                    width={"160px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={"0px solid green"}
                    mr={5}
                  >
                    <Text>완료 : &nbsp;</Text>
                    <SlideToggleButton
                      onChange={() => {
                        updateHandlerForTaskStatus(task.pk);
                      }}
                      checked={task.task_completed}
                    />
                  </Box>

                  <Box
                    width={"160px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={"0px solid green"}
                    mr={5}
                  >
                    통과 : &nbsp;
                    {task.task_completed ? (
                      <SlideToggleButton
                        onChange={() => {
                          update_for_check_for_cash_prize(
                            task.pk,
                            task.task_manager?.pk,
                            task.cash_prize
                          );
                        }}
                        onColor={"#FADADD"}
                        offColor={"#D3D3D3"}
                        checked={task.check_for_cash_prize}
                      />
                    ) : (
                      <SlideToggleButton
                        onChange={() => {
                          update_for_check_for_cash_prize(
                            task.pk,
                            task.task_manager?.pk,
                            task.cash_prize
                          );
                        }}
                        onColor={"#FADADD"}
                        offColor={"#D3D3D3"}
                        checked={task.check_for_cash_prize}
                        is_disabled={true}
                      />
                    )}
                  </Box>

                  {/* 지원자 목록 출력 */}
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}                    
                    width={"280px"}
                    border={"0px solid green"}
                  >
                    {/* hi */}
                    {task.challegers_for_cach_prize.length !== 0 ? (
                      task.challegers_for_cach_prize.map((row: any) => {
                        console.log("row : ", row);

                        return (
                          <Box w={"40px"} border={"0px solid blue"}>
                            {/* {row.challenger.username} */}
                            <Avatar
                              name={row.challenger.username}
                              src={row.challenger.profile_image}
                              size="sm"
                              ml={"2px"}
                            />
                          </Box>
                        );
                      })
                    ) : (
                      <Box w={"40px"}> 0 명 </Box>
                    )}
                    <Box width={"50px"} border={"0px solid green"}>
                      {isLoggedIn ? (
                        <Button
                          variant="outline"
                          colorScheme={"teal"}
                          size={"sm"}
                          aria-label={""}
                          ml={2}
                          onClick={() => updateChallengerListByTaskPk(task.pk)}
                        >
                          <CheckIcon boxSize={3} />
                        </Button>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>

                  {/* 지원자 등록 버튼 추가 */}

                  <Box width={"240px"} border={"0px solid green"} mx={10}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaDollarSign color="gray.300" />}
                        fontSize="md"
                        bgColor={"rgba(255, 215, 0, 0.5)"}
                        px={2}
                      />

                      <Input
                        type="number"
                        placeholder=" 상금 입력"
                        textAlign={"center"}
                        defaultValue={task.cash_prize}
                        onChange={(e) =>
                          set_cash_prize_for_update(e.target.value)
                        }
                      />

                      <InputRightElement>
                        <Button
                          variant={"outline"}
                          type="submit"
                          size="md"
                          mr={0}
                          _hover={{ bg: "blue.600" }}
                          onClick={() => updateForCashPrize(task.pk)}
                        >
                          입력
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>

                  <Box width={"40px"}>
                    {!task.check_for_cash_prize ? (
                      <Checkbox
                        size="lg"
                        colorScheme="red"
                        defaultChecked={task.is_task_for_cash_prize}
                        onChange={() =>
                          update_For_is_task_for_cash_prize(task.pk)
                        }
                      >
                        C
                      </Checkbox>
                    ) : (
                      <Checkbox
                        size="lg"
                        colorScheme="red"
                        defaultChecked={task.is_task_for_cash_prize}
                        disabled={true}
                        onChange={() =>
                          update_For_is_task_for_cash_prize(task.pk)
                        }
                      >
                        C
                      </Checkbox>
                    )}
                  </Box>

                  <Box>
                    <IconButton
                      aria-label="삭제"
                      icon={<FaTrash />}
                      variant="ghost"
                      onClick={() => deleteHandelr(parseInt(task.pk))}
                    />
                  </Box>
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
              total_page_num={totalPageCount}
              setCurrentPageNum={setCurrentPageNum}
              task_number_for_one_page={task_number_for_one_page}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default UncompletedTaskRow;

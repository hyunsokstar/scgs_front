import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
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
  VStack,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

import {
  IResponseTypeForProjectTaskUpdate,
  // ITypeForProjectProgressList,
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
  handleCheckboxChange,
  checkedRowPks,
  setCheckedRowPks,
  projectTaskListRefatch,
}: any): ReactElement {
  const queryClient = useQueryClient();

  const [originalScoreValues, setOriginalScoreValues] = useState<number[]>([]);
  const [scoreValues, setScoreValues] = useState<number[]>([]);

  useEffect(() => {
    const initialScores =
      ProjectProgressList?.map((task: any) => task.score_by_tester ?? 0) || [];
    setOriginalScoreValues(initialScores);
    setScoreValues(initialScores);
  }, [ProjectProgressList]);

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
    console.log("update 핸들러 for task_status check id : ", taskPk);
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
    console.log("update 핸들러 for task_status check id : ", taskPk);
  };

  // const updateMutationForProjectImportance = useMutation(
  //   updateProjectImportance,
  //   {
  //     onSuccess: (result: any) => {
  //       // console.log("result : ", result);
  //       if (projectTaskListRefatch) {
  //         projectTaskListRefatch();
  //       }
  //       // queryClient.refetchQueries(["getUnompletedTaskList"]);
  //       // queryClient.refetchQueries(["getCompletedTaskList"]);

  //       toast({
  //         status: "success",
  //         title: "task status update success",
  //         description: result.message,
  //       });
  //     },
  //     onError: (err) => {
  //       console.log("error : ", err);
  //     },
  //   }
  // );

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  // const onChangeForStarRatingHandler = ({ taskPk, star_count }: any) => {
  //   updateMutationForProjectImportance.mutate({ taskPk, star_count });
  // };

  const deleteMutation = useMutation(
    (id: number) => {
      return deleteOneProjectTask(id);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        if (projectTaskListRefatch) {
          projectTaskListRefatch();
        }
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

  const handleClickForUpdateScoreByTester = (
    id: any,
    index: number,
    username: string
  ) => {
    let scoreByTesterForUpdate;
    if (scoreValues[index] === originalScoreValues[index]) {
      alert("이전값과 같으므로 업데이트 하지 않겠습니다");
      return;
    } else if (scoreValues[index] > originalScoreValues[index]) {
      scoreByTesterForUpdate = scoreValues[index] - originalScoreValues[index];
    } else if (scoreValues[index] < originalScoreValues[index]) {
      scoreByTesterForUpdate = scoreValues[index] - originalScoreValues[index];
    }

    mutationForUpdateScoreByTester.mutate({
      id,
      cashInfoForUpdate: scoreByTesterForUpdate,
      scoreByTesterForUpdate: scoreValues[index],
      username,
    });
  };

  const handleChangeForScoreByTester = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedScoreValues = [...scoreValues];
    updatedScoreValues[index] = parseInt(e.target.value);
    setScoreValues(updatedScoreValues);
  };

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks = ProjectProgressList.map((item: any) => item.id) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  // 2244
  return (
    <Box>
      <Box p={2}>
        <Checkbox
          size={"lg"}
          onChange={handleChangeForAllCheckBox}
          checked={
            ProjectProgressList &&
            checkedRowPks.length === ProjectProgressList.length
          }
          border={"2px solid black"}
        />
      </Box>
      <Box overflowX={"scroll"}>
        {ProjectProgressList?.map((task: any, index: any) => {
          return (
            <List
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"2500px"}
            >
              <ListItem border={"0px solid yellow"} flex={0.5}>
                <Checkbox
                  mx={2}
                  border={"1px solid black"}
                  value={task.id}
                  isChecked={checkedRowPks.includes(task.id)}
                  onChange={handleCheckboxChange}
                />{" "}
              </ListItem>
              <ListItem width={"160px"} flex={0.7}>
                <Text color={"blue.600"}>{task.task_manager.username}</Text>
                <Text color={"tomato"}>{task.writer}</Text>
              </ListItem>
              <ListItem border={"0px solid blue"} flex={2.5}>
                <Text fontSize="sm" fontWeight="bold">
                  <Link
                    to={`/project_admin/${task.id}`}
                    style={{ textDecoration: "underline" }}
                  >
                    {task.task}
                  </Link>
                </Text>
              </ListItem>

              {/* task_completed update */}
              <ListItem
                display={"flex"}
                justifyContent={"flex-start"}
                border={"0px solid green"}
                flex={0.7}
              >
                <SlideToggleButton
                  onChange={() => {
                    updateHandlerForTaskStatus(task.id);
                  }}
                  checked={task.task_completed}
                />
              </ListItem>

              <ListItem
                display={"flex"}
                justifyContent={"flex-start"}
                border={"0px solid green"}
                flex={0.7}
              >
                <SlideToggleButton
                  onChange={() => {
                    updateHandlerForCheckResultByTester(task.id);
                  }}
                  onColor={"#FADADD"}
                  offColor={"#D3D3D3"}
                  checked={task.check_result_by_tester}
                />
              </ListItem>

              <ListItem textAlign={"center"} flex={1.8}>
                <VStack>
                  <HStack>
                    <Text>시작</Text>
                    <Text>{task.started_at_formatted}</Text>
                  </HStack>
                  <HStack>
                    <Text>완료</Text>
                    <Text>{task.completed_at_formatted}</Text>
                  </HStack>
                </VStack>
              </ListItem>

              <ListItem textAlign={"center"} flex={1.5}>
                <HStack>
                  <Text>소요 시간</Text>
                  <Text>{task.time_consumed_from_start_to_complete}</Text>
                </HStack>
              </ListItem>
              <ListItem border={"0px solid blue"} flex={1.8}>
                <InputGroup size="sm" width={"250px"}>
                  <Input
                    border={"1px solid black"}
                    defaultValue={task.score_by_tester}
                    onChange={(e) => handleChangeForScoreByTester(e, index)}
                  />
                  <InputRightElement width="60px" mr={-2}>
                    <Button
                      border={"1px solid green"}
                      size="sm"
                      onClick={() =>
                        handleClickForUpdateScoreByTester(
                          task.id,
                          index,
                          task.task_manager.username
                        )
                      }
                    >
                      평가
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </ListItem>

              <ListItem border={"1px solid red"} mr={2}>
                <IconButton
                  aria-label="삭제"
                  icon={<FaTrash />}
                  variant="ghost"
                  onClick={() => deleteHandelr(parseInt(task.id))}
                />
              </ListItem>
            </List>
          );
        })}

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
    </Box>
  );
}

export default CompletedTaskRowForTester;

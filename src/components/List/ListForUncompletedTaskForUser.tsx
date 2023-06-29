import React from "react";
import {
  Box,
  List,
  ListItem,
  Checkbox,
  Text,
  Link,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import PaginationComponent from "../PaginationComponent";
import ModalButtonForUpdateProjectTaskStartedAt from "../modal/ModalButtonForUpdateProjectTaskStartedAt";
import StarRating from "../StarRating";
import SlideToggleButtonForIsTesting from "../SlideToggleButton/SlideToggleButtonForIsTesting";
import SlideToggleButton from "../SlideToggleButton";
import SlideToggleButtonForInProgress from "../SlideToggleButton/SlideToggleButtonForInProgress";
import { ProjectProgress } from "../../types/user/user_types";

interface ListForUncompletedTaskForUserProps {
  ProjectProgressList: ProjectProgress[];
  currentPageNum: any;
  task_number_for_one_page: any;
  totalPageCount: any;
  setCurrentPageNum: any;
  updateHandlerForTaskInProgress: any;
  updateHandlerForTaskIsTesting: any;
  updateHandlerForTaskStatus: any;
  onChangeForStarRatingHandler: any;
  deleteHandler: any;
  projectTaskListRefetch: any;
}

const ListForUncompletedTaskForUser: React.FC<
  ListForUncompletedTaskForUserProps
> = ({
  ProjectProgressList,
  currentPageNum,
  task_number_for_one_page,
  totalPageCount,
  setCurrentPageNum,
  updateHandlerForTaskInProgress,
  updateHandlerForTaskIsTesting,
  updateHandlerForTaskStatus,
  onChangeForStarRatingHandler,
  deleteHandler,
  projectTaskListRefetch,
}) => {
  return (
    <Box border={"0px solid blue"} maxWidth={"100%"}>
      <Box overflowX="auto" width="100%">
        {ProjectProgressList ? (
          <List>
            {ProjectProgressList?.map((task: any) => {
              return (
                <ListItem
                  key={task.pk}
                  height={16}
                  border={"1px solid lightgray"}
                  my={0}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  backgroundColor={task.in_progress ? "yellow.50" : ""}
                  _hover={{ backgroundColor: "gray.100" }}
                  width={"100%"}
                >
                  <Box border={"0px solid yellow"} width={"50px"}>
                    <Checkbox mx={2} />
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
                        to={`/project_admin/${task.pk}`}
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
                          updateHandlerForTaskInProgress(task.pk);
                        }}
                        checked={task.in_progress}
                        is_disabled={task.is_testing}
                      />
                    </Box>

                    <Box border={"0px solid green"} width={"50px"}>
                      <SlideToggleButtonForIsTesting
                        onChange={() => {
                          updateHandlerForTaskIsTesting(task.pk);
                        }}
                        checked={task.is_testing}
                        is_disabled={!task.in_progress}
                      />
                    </Box>

                    <Box border={"0px solid green"} width={"50px"}>
                      <SlideToggleButton
                        onChange={() => {
                          updateHandlerForTaskStatus(task.pk);
                        }}
                        checked={task.task_completed}
                        in_progress={!task.in_progress} // 진행중이 아니면 disabled true
                        is_testing={!task.is_testing} // testing 중이 아니면
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
                      taskPk={task.pk}
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
                          taskPk={task.pk}
                          original_due_date={task.due_date ? task.due_date : ""}
                          started_at={task.started_at ? task.started_at : ""}
                          projectTaskListRefetch={projectTaskListRefetch}
                        />
                      </HStack>
                    </HStack>
                    <HStack>
                      <Box textAlign={"center"}>
                        <Text>마감</Text>
                      </Box>

                      <ModalButtonForUpdateProjectTaskStartedAt
                        taskPk={task.pk}
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
                      onClick={() => deleteHandler(parseInt(task.pk))}
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
};

export default ListForUncompletedTaskForUser;

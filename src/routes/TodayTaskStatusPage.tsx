import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import { AxiosResponse } from "axios";
import {
  apiForUpdateTaskDueDateAndOrder,
  apiForgetTaskStatusForToday,
} from "../apis/project_progress_api";
import RowForTaskSttusForToday from "../components/Row/row";
import { Box, Button, Text, Heading, useToast, HStack } from "@chakra-ui/react";
import ModalButtonForAddProjectTaskWithDuedateOption from "../components/modal/ModalButtonForAddProjectTaskWithDuedateOption";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ITypeForTaskStatusForToday } from "../types/project_progress/project_progress_type";
import TableForStaticsForTodayTaskStatus from "../components/Table/TableForStaticsForTodayTaskStatus";
import ModalButtonForTaskListWithDeadlineUntilYesterDay from "../components/modal/ModalButtonForTaskListWithDeadlineUntilYesterDay";
import TableForTaskLogForTasksOfWeekDay from "../components/Table/TableForTaskLogForTasksOfWeekDay";
import TableForTaskManagersForTasksForToday from "../components/Table/TableForTaskManagersForTasksForToday";

type Time = "morning_tasks" | "afternoon_tasks" | "night_tasks";
const Tasks: Time[] = ["morning_tasks", "afternoon_tasks", "night_tasks"];
const initialTasks = {
  morning_tasks: ["Task 1", "Task 2", "Task 3"],
  afternoon_tasks: ["Task 4", "Task 5", "Task 6"],
  night_tasks: ["Task 7", "Task 8", "Task 9"],
};

const teamColors: Record<Time, string> = {
  morning_tasks: "#edf2f7", // light blue-gray
  afternoon_tasks: "#fffaf0", // light orange-yellow
  night_tasks: "#e2e8f0", // light indigo-blue
};

const taskColors = {
  morning_tasks: "green.500", // or "blue.500"
  afternoon_tasks: "orange.500", // or "yellow.500"
  night_tasks: "blue.800", // or "purple.500"
};

const TodayTaskStatusPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    data: dataForTaskStatusForToday,
    isLoading,
    isError,
    refetch: refetchForGetProgectTasksStatusForToday,
  } = useQuery<ITypeForTaskStatusForToday | any>(
    ["getTaskStatusForToday"],
    apiForgetTaskStatusForToday
  );

  const [tasks, setTasks] = useState<any>(initialTasks);

  console.log("dataForTaskStatusForToday : ", dataForTaskStatusForToday);

  useEffect(() => {
    if (dataForTaskStatusForToday) {
      const new_tasks = {
        morning_tasks: dataForTaskStatusForToday?.morning_tasks?.map(
          (row: any) => {
            return row;
          }
        ),

        afternoon_tasks: dataForTaskStatusForToday?.afternoon_tasks?.map(
          (row: any) => {
            return row;
          }
        ),

        night_tasks: dataForTaskStatusForToday?.night_tasks?.map((row: any) => {
          return row;
        }),
      };
      setTasks(new_tasks);
    }
  }, [dataForTaskStatusForToday]);

  // console.log("dataForTaskStatusForToday : ", dataForTaskStatusForToday);

  const mutationForSwitchTheOrderOfTheTwoTasks = useMutation(
    ({ taskPk, time_option, orgin_task_id, ordering_option }: any) => {
      return apiForUpdateTaskDueDateAndOrder({
        taskPk,
        time_option,
        orgin_task_id,
        ordering_option,
      });
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["getTaskStatusForToday"]);

        toast({
          title: "Update Task Stauts Success",
          status: "success",
          description: data.message,
        });

        // window.location.reload(); // 새로고침
      },
    }
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const startTasks = [...tasks[source.droppableId as Time]];
    const endTasks = [...tasks[destination.droppableId as Time]];

    // remove the task from the starting column
    const [removed] = startTasks.splice(source.index, 1);

    if (
      dataForTaskStatusForToday?.[destination.droppableId]?.[destination.index]
    ) {
      // alert("마지막 아님")
      startTasks.splice(destination.index, 0, removed);

      if (
        dataForTaskStatusForToday?.[destination.droppableId]?.[
          destination.index
        ]
      ) {
        console.log(
          "교체 하면서 이동(바뀌는거 order -1, 바뀌는거보다 order 작은것들 -2)",
          "moved task pk : ",
          dataForTaskStatusForToday?.[source.droppableId]?.[source.index].id,
          "time_option : ",
          destination.droppableId,
          "orgin_task_id : ",
          dataForTaskStatusForToday?.[destination.droppableId]?.[
            destination.index
          ].id
        );

        mutationForSwitchTheOrderOfTheTwoTasks.mutate({
          taskPk:
            dataForTaskStatusForToday[source.droppableId]?.[source.index].id,
          time_option: destination.droppableId,
          orgin_task_id:
            dataForTaskStatusForToday[destination.droppableId]?.[
              destination.index
            ].id,
          ordering_option: "switch_order_of_two_tasks",
        });
      }
    } else {
      // alert("마지막");

      console.log(
        "moved task pk : ",
        dataForTaskStatusForToday[source.droppableId][source.index].id,
        "time_option : ",
        destination.droppableId,
        "orgin_task_id : ",
        dataForTaskStatusForToday[destination.droppableId][destination.index]
      );

      // if the destination is different from the source, we're moving the task to another column
      endTasks.splice(destination.index, 0, removed);

      mutationForSwitchTheOrderOfTheTwoTasks.mutate({
        taskPk: dataForTaskStatusForToday[source.droppableId][source.index].id,
        time_option: destination.droppableId,
        orgin_task_id: "",
        ordering_option: "move_to_last",
      });
    }
  };

  return (
    <Box>
      <Box
        fontSize="2xl"
        color={"black"}
        fontWeight="bold"
        textAlign="center"
        mb={2}
        p={3}
        bg={"gray.200"}
      >
        Today Task Status Page
      </Box>{" "}
      <Box bg="gray.200" height={"100%"}>
        <Box display={"flex"} justifyContent={"flex-start"} gap={10}>
          <Box display={"flex"} flexDirection={"column"} gap={2} ml={2}>
            <Box>
              <Box mb={1}>
                {dataForTaskStatusForToday &&
                  dataForTaskStatusForToday?.today_info.date}

                {dataForTaskStatusForToday &&
                  dataForTaskStatusForToday?.today_info.dayOfWeek}
              </Box>

              {dataForTaskStatusForToday && (
                <TableForTaskLogForTasksOfWeekDay
                  today_info={dataForTaskStatusForToday?.today_info}
                  taskCountForWeekdays={
                    dataForTaskStatusForToday?.task_count_for_weekdays
                  }
                />
              )}
            </Box>
          </Box>

          <Box
            // fontFamily="sans-serif"
            color="teal.800"
            border={"0px solid red"}
            height={"100%"}
            mx={2}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              textAlign={"center"}
              my={1}
            >
              task status for this week &nbsp;&nbsp; 오늘 이전 비완료 : &nbsp;
              <ModalButtonForTaskListWithDeadlineUntilYesterDay
                buttonText={
                  dataForTaskStatusForToday?.task_count_for_uncompleted_task_until_yesterday
                }
              />
            </Box>

            <TableForStaticsForTodayTaskStatus
              toal_task_count_for_today={
                dataForTaskStatusForToday?.toal_task_count_for_today
              }
              task_count_for_ready={
                dataForTaskStatusForToday?.task_count_for_ready
              }
              task_count_for_in_progress={
                dataForTaskStatusForToday?.task_count_for_in_progress
              }
              task_count_for_testing={
                dataForTaskStatusForToday?.task_count_for_testing
              }
              task_count_for_completed={
                dataForTaskStatusForToday?.task_count_for_completed
              }
              progress_rate={dataForTaskStatusForToday?.progress_rate}
            />
          </Box>

          <Box>
            task status for today
            <TableForTaskManagersForTasksForToday
              task_managers_data={dataForTaskStatusForToday?.task_managers_data}
            />
          </Box>
        </Box>
      </Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {Tasks.map((Time, i) => (
            <Droppable droppableId={Time} key={i}>
              {(provided: DroppableProvided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: teamColors[Time],
                    width: "30%",
                    padding: "10px",
                    margin: "1%",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <Box
                    bg={taskColors[Time]}
                    p={3}
                    borderRadius="md"
                    shadow="md"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Heading size="md" color="white">
                      {Time}
                    </Heading>

                    <ModalButtonForAddProjectTaskWithDuedateOption
                      projectTaskListRefatch={
                        refetchForGetProgectTasksStatusForToday
                      }
                      button_text={"Create"}
                      due_date_option_for_button={Time}
                      size={"md"}
                    />
                  </Box>
                  {tasks[Time].length
                    ? tasks[Time].map((task: any, index: any) => (
                        <Draggable
                          key={task.id ? task.id.toString() : index}
                          draggableId={task.id ? task.id.toString() : index}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <p
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                padding: "10px",
                                margin: "10px 0",
                                backgroundColor: "white",
                                borderRadius: "5px",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <RowForTaskSttusForToday task={task} />
                            </p>
                          )}
                        </Draggable>
                      ))
                    : "no data"}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default TodayTaskStatusPage;

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import {
  apiForUpdateTaskDueDateAndOrder,
  apiForgetTaskStatusForToday,
} from "../apis/project_progress_api";
import RowForTaskSttusForToday from "../components/Row/row";
import {
  Box,
  Text,
  Heading,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import ModalButtonForAddProjectTaskWithDuedateOption from "../components/modal/ModalButtonForAddProjectTaskWithDuedateOption";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ITypeForTaskStatusForToday } from "../types/project_progress/project_progress_type";
import TableForStaticsForTodayTaskStatus from "../components/Table/TableForStaticsForTodayTaskStatus";
import ModalButtonForTaskListWithDeadlineUntilYesterDay from "../components/modal/ModalButtonForTaskListWithDeadlineUntilYesterDay";
import TableForTaskLogForTasksOfWeekDay from "../components/Table/TableForTaskLogForTasksOfWeekDay";
import TableForTaskManagersForTasksForToday from "../components/Table/TableForTaskManagersForTasksForToday";
import SlideForTodayTaskStatus from "../components/Slide/SlideForTodayTaskStatus";

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
  const [checkedPksForUserList, setCheckedPksForUserList] =
    useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState(""); // 초기 선택값은 없음
  
  const {
    data: dataForTaskStatusForToday,
    isLoading,
    isError,
    refetch: refetchForGetProgectTasksStatusForToday,
  } = useQuery<ITypeForTaskStatusForToday | any>(
    ["getTaskStatusForToday", checkedPksForUserList, selectedDay],
    apiForgetTaskStatusForToday
    );
    
  const [tasks, setTasks] = useState<any>(initialTasks);

  console.log("tasks : ", tasks);

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

  const column_option_for_responsive = useBreakpointValue<any>({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
    lg: "row", // for large screens and up
  });

  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

  useEffect(() => {
    if (
      selectedDay === "" &&
      dataForTaskStatusForToday &&
      dataForTaskStatusForToday.today_info
    ) {
      setSelectedDay(dataForTaskStatusForToday.today_info.dayOfWeek);
    }
  }, [dataForTaskStatusForToday, setSelectedDay]);

  // 2244
  return (
    <Box width={"100%"} border={"0px solid purple"}>
      <Box display={"flex"} gap={2} my={2}>
        <Text>
          {dataForTaskStatusForToday &&
            dataForTaskStatusForToday?.today_info.date}
        </Text>
        <Text>
          {dataForTaskStatusForToday &&
            dataForTaskStatusForToday?.today_info.dayOfWeek}
        </Text>

        <ModalButtonForTaskListWithDeadlineUntilYesterDay
          buttonText={
            dataForTaskStatusForToday?.task_count_for_uncompleted_task_until_yesterday
          }
        />
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={{
          xl: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
          md: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
        }}
        gap={2}
        bg="gray.200"
        width={"100%"}
        p={4}
        mt={2}
      >
        <Box color="teal.800" width={"100%"}>
          <Box width={"100%"}>
            <TableForStaticsForTodayTaskStatus
              total_task_count_for_today={
                dataForTaskStatusForToday?.total_task_count_for_today
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
        </Box>

        {/* 유저 리스트 for today task status */}
        <Box width={"100%"} overflowY={"scroll"} maxHeight={"160px"}>
          <TableForTaskManagersForTasksForToday
            task_managers_data={dataForTaskStatusForToday?.task_managers_data}
            checkedPksForUserList={checkedPksForUserList}
            setCheckedPksForUserList={setCheckedPksForUserList}
          />
        </Box>
      </Box>

      <Box width={"100%"} mt={2}>
        {/* <Box display={"flex"} gap={2} mb={1}>
          <Text>
            {dataForTaskStatusForToday &&
              dataForTaskStatusForToday?.today_info.date}
          </Text>
          <Text>
            {dataForTaskStatusForToday &&
              dataForTaskStatusForToday?.today_info.dayOfWeek}
          </Text>

          <ModalButtonForTaskListWithDeadlineUntilYesterDay
            buttonText={
              dataForTaskStatusForToday?.task_count_for_uncompleted_task_until_yesterday
            }
          />
        </Box> */}

        {dataForTaskStatusForToday && (
          <TableForTaskLogForTasksOfWeekDay
            today_info={dataForTaskStatusForToday?.today_info}
            taskCountForWeekdays={
              dataForTaskStatusForToday?.task_count_for_weekdays
            }
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        )}
      </Box>
      {/* fix */}
      {is_show_for_mobile ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Box
            style={{
              display: "flex",
              flexDirection: column_option_for_responsive,
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
                      width: "100%",
                      padding: "5px",
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
                        projectTaskListRefetch={
                          refetchForGetProgectTasksStatusForToday
                        }
                        button_text={"Create"}
                        due_date_option_for_button={Time}
                        size={"md"}
                      />
                    </Box>
                    {tasks[Time].length ? (
                      tasks[Time].map((task: any, index: any) => (
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
                                padding: "5px",
                                margin: "5px 0",
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
                    ) : (
                      <Box
                        fontSize={"15px"}
                        bgColor={"white"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        p={2}
                      >
                        no data
                      </Box>
                    )}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      ) : (
        <Box mt={2} mb={10}>
          <SlideForTodayTaskStatus taskData={tasks} />
        </Box>
      )}
    </Box>
  );
};

export default TodayTaskStatusPage;

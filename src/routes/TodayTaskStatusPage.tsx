import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { apiForgetTaskStatusForToday } from "../apis/project_progress_api";
import RowForTaskSttusForToday from "../components/Row/row";
import { Box, Button, Heading } from "@chakra-ui/react";
import ModalButtonForAddProjectTaskWithDuedateOption from "../components/modal/ModalButtonForAddProjectTaskWithDuedateOption";

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
  const {
    data: dataForTaskStatusForToday,
    isLoading,
    isError,
    refetch: refetchForGetProgectTasksStatus,
  } = useQuery<any>(["getTaskStatusForToday"], apiForgetTaskStatusForToday);

  const [tasks, setTasks] = useState<any>(initialTasks);

  console.log(
    "dataForTaskStatusForToday.afternoon_tasks : ",
    dataForTaskStatusForToday?.afternoon_tasks
  );
  console.log(
    "check : ",
    dataForTaskStatusForToday?.afternoon_tasks?.map((row: any) => {
      return row.task;
    })
  );

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

  console.log("dataForTaskStatusForToday : ", dataForTaskStatusForToday);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const startTasks = [...tasks[source.droppableId as Time]];
    const endTasks = [...tasks[destination.droppableId as Time]];

    // remove the task from the starting column
    const [removed] = startTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // if the destination is the same as the source, we're reordering in the same column
      startTasks.splice(destination.index, 0, removed);

      setTasks((prevTasks: any) => ({
        ...prevTasks,
        [source.droppableId as Time]: startTasks,
      }));
    } else {
      // if the destination is different from the source, we're moving the task to another column
      endTasks.splice(destination.index, 0, removed);

      setTasks((prevTasks: any) => ({
        ...prevTasks,
        [source.droppableId as Time]: startTasks,
        [destination.droppableId as Time]: endTasks,
      }));
    }
  };

  return (
    <Box>
      <Box p={4} bg="gray.200">
        <Heading
          as="h1"
          size="lg"
          fontFamily="sans-serif"
          textAlign="center"
          color="teal.800"
        >
          Today Task Status Page
        </Heading>
        {/* Rest of your content */}
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
                    width: "24%",
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
                      projectTaskListRefatch={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      button_text={"Create"}
                      due_date_option={Time}
                    />
                  </Box>
                  {tasks[Time].map((task: any, index: any) => (
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
                  ))}
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

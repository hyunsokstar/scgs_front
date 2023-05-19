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

type Time = "morning_tasks" | "afternoon_tasks" | "for_money_tasks";
const Tasks: Time[] = ["morning_tasks", "afternoon_tasks", "for_money_tasks"];
const initialTasks = {
  morning_tasks: ["Task 1", "Task 2", "Task 3"],
  afternoon_tasks: ["Task 4", "Task 5", "Task 6"],
  for_money_tasks: ["Task 7", "Task 8", "Task 9"],
};

const teamColors: Record<Time, string> = {
  morning_tasks: "lightblue",
  afternoon_tasks: "lightyellow",
  for_money_tasks: "lightpink",
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

        for_money_tasks: dataForTaskStatusForToday?.for_money_tasks?.map(
          (row: any) => {
            return row;
          }
        ),
        // for_money_tasks: [],
      };
      setTasks(new_tasks);
    }
  }, [dataForTaskStatusForToday]);

  console.log("dataForTaskStatusForToday : ", dataForTaskStatusForToday);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    console.log("source, destination : ", source, destination);

    if (source.droppableId !== destination.droppableId) {
      const sourceMembers = [...tasks[source.droppableId as Time]];
      const destMembers = [...tasks[destination.droppableId as Time]];
      const [removed] = sourceMembers.splice(source.index, 1);
      destMembers.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId as Time]: sourceMembers,
        [destination.droppableId as Time]: destMembers,
      });
    } else {
      console.log("같은 task 내의 이동");

      const tasksForTime = [...tasks[source.droppableId as Time]];
      const [removed] = tasksForTime.splice(source.index, 1);
      tasksForTime.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId as Time]: tasksForTime,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {Tasks.map((Time, i) => (
          <Droppable droppableId={Time} key={i}>
            {(provided: DroppableProvided) => (
              <div
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
                <h2>{Time}</h2>
                {tasks[Time].map((task: any, index: any) => (
                  <Draggable key={task} draggableId={task} index={index}>
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
                        {/* {task.id} */}
                        <RowForTaskSttusForToday task={task} />
                      </p>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TodayTaskStatusPage;

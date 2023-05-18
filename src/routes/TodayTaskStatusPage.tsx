import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";

type Time = "오전" | "오후" | "상금";
const Tasks: Time[] = ["오전", "오후", "상금"];
const initialTasks: Record<Time, string[]> = {
  "오전": ["Task 1", "Task 2", "Task 3"],
  "오후": ["Task 4", "Task 5", "Task 6"],
  "상금": ["Task 7", "Task 8", "Task 9"],
};

const teamColors: Record<Time, string> = {
  "오전": "lightblue",
  "오후": "lightyellow",
  "상금": "lightpink",
};

const TodayTaskStatusPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

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
        {Tasks.map((team, i) => (
          <Droppable droppableId={team} key={i}>
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: teamColors[team],
                  width: "24%",
                  padding: "10px",
                  margin: "1%",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                }}
              >
                <h2>{team}</h2>
                {tasks[team].map((member, index) => (
                  <Draggable key={member} draggableId={member} index={index}>
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
                        {member}
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


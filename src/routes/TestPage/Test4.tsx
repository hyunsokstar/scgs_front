import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";

type Team = "기획팀" | "API 팀" | "UI 팀" | "Assister 팀";
const teams: Team[] = ["기획팀", "API 팀", "UI 팀", "Assister 팀"];
const initialMembers: Record<Team, string[]> = {
  기획팀: ["Member 1", "Member 2", "Member 3"],
  "API 팀": ["Member 4", "Member 5", "Member 6"],
  "UI 팀": ["Member 7", "Member 8", "Member 9"],
  "Assister 팀": ["Member 10", "Member 11", "Member 12"],
};

const teamColors: Record<Team, string> = {
  기획팀: "lightgreen",
  "API 팀": "lightblue",
  "UI 팀": "lightyellow",
  "Assister 팀": "lightpink",
};

const Test4 = () => {
  const [members, setMembers] = useState(initialMembers);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceMembers = [...members[source.droppableId as Team]];
      const destMembers = [...members[destination.droppableId as Team]];
      const [removed] = sourceMembers.splice(source.index, 1);
      destMembers.splice(destination.index, 0, removed);
      setMembers({
        ...members,
        [source.droppableId as Team]: sourceMembers,
        [destination.droppableId as Team]: destMembers,
      });
    } else {
      const teamMembers = [...members[source.droppableId as Team]];
      const [removed] = teamMembers.splice(source.index, 1);
      teamMembers.splice(destination.index, 0, removed);
      setMembers({
        ...members,
        [source.droppableId as Team]: teamMembers,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {teams.map((team, i) => (
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
                {members[team].map((member, index) => (
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

export default Test4;

import { useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

type Task = {
  id: number;
  content: string;
};

type Column = {
  name: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  {
    name: "준비중",
    tasks: [
      { id: 1, content: "todo1" },
      { id: 2, content: "todo2" }
    ]
  },
  {
    name: "작업중",
    tasks: []
  },
  {
    name: "테스트중",
    tasks: []
  },
  {
    name: "완료",
    tasks: []
  }
];

const App = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: number) => {
    event.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, columnName: string) => {
    const taskId = parseInt(event.dataTransfer.getData("text/plain"));
    const newColumns = columns.map((column) => {
      const tasks = column.tasks.filter((task) => task.id !== taskId);
      if (column.name === columnName) {
        tasks.push({ id: taskId, content: `todo${taskId}` });
      }
      return {
        ...column,
        tasks
      };
    });
    setColumns(newColumns);
  };

  return (
    <Box maxW="100%" mx="auto" mt="6" border="1px solid black">
      <Heading mb="2">ToDo 목록</Heading>
      <Box display="flex" border={"2px solid blue"} justifyContent={"center"} mx={2} mb={2} gap={2}>
        {columns.map((column) => (
          <Box key={column.name} p="2" bg="gray.100" flex="1" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, column.name)}>
            <Text fontSize="lg" fontWeight="bold" mb="4">
              {column.name}
            </Text>
            <VStack spacing="4">
              {column.tasks.map((task) => (
                <Box
                  key={task.id}
                  p="4"
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  cursor="move"
                  draggable
                  onDragStart={(event) => handleDragStart(event, task.id)}
                  w={"100%"}
                >
                  {task.content}
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;

import {
  Avatar,
  Box,
  Checkbox,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IPropsForCardForTodayTaskListBySlide } from "../../types/project_progress/project_progress_type";
import ButtonsForChangeDueDateForTaskForToday from "../Buttons/ButtonsForChangeDueDateForTaskForToday";

const CardForTodayTaskListBySlide = ({
  title,
  todos,
}: IPropsForCardForTodayTaskListBySlide) => {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);

  function getBackgroundColor(
    title: string
  ) {
    let backgroundColor = "orange.100"; // 기본 배경색

    if (title === "until-noon") {
      backgroundColor = "yellow.100"; // 배경색을 변경하는 조건 1
    } else if (title === "until-evening") {
      backgroundColor = "blue.200"; // 배경색을 변경하는 조건 2
    } else if (title === "until-night") {
      backgroundColor = "orange.200"; // 배경색을 변경하는 조건 3
    }

    return backgroundColor;
  }

  // todo1: Function to handle checkbox toggle for all rows
  const handleAllCheckboxToggle = () => {
    if (checkedRows.length === todos.length) {
      // If all rows are checked, uncheck all rows
      setCheckedRows([]);
    } else {
      // If some rows are not checked, check all rows
      const allRowIds = todos.map((todo) => todo.id);
      setCheckedRows(allRowIds);
    }
  };

  // todo2: Function to handle checkbox toggle for individual rows
  const handleRowCheckboxToggle = (todoId: number) => {
    if (checkedRows.includes(todoId)) {
      // If the row is already checked, uncheck it
      setCheckedRows(checkedRows.filter((id) => id !== todoId));
    } else {
      // If the row is not checked, check it
      setCheckedRows([...checkedRows, todoId]);
    }
  };

  return (
    <Box
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
      p={2}
      maxW="md"
      w="100%"
    >
      <Flex direction="column" height={"500px"}>
        <Heading
          as="h2"
          size="lg"
          mb={2}
          color="teal.500"
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={2}
          bg={getBackgroundColor(title)} // 배경색을 함수로 연결
          p={2}
        >
          <Checkbox
            isChecked={checkedRows.length === todos.length}
            onChange={handleAllCheckboxToggle}
          />
          <Text>{title}</Text>
        </Heading>

        <Box borderRadius="md" mb={10}>
          {todos ? (
            <List styleType="none" spacing={2}>
              {todos
                .sort((a, b) => a.order - b.order)
                .map((todo) => (
                  <ListItem
                    key={todo.id}
                    display={"flex"}
                    flexDirection={"column"}
                    bgColor={"green.100"}
                    p={2}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      bgColor={"yellow.50"}
                      p={1}
                    >
                      <Checkbox
                        isChecked={checkedRows.includes(todo.id)}
                        value={todo.id}
                        onChange={() => handleRowCheckboxToggle(todo.id)}
                      />

                      <ButtonsForChangeDueDateForTaskForToday
                        id={todo.id}
                        title={title}
                      />

                      {todo.task_manager ? (
                        <Avatar
                          src={todo?.task_manager.profile_image}
                          name={todo?.task_manager.username}
                          size="sm"
                        />
                      ) : (
                        "no manager"
                      )}
                    </Box>
                    <Box bgColor={"blue.50"} px={1}>
                      {todo.task}
                    </Box>
                  </ListItem>
                ))}
            </List>
          ) : (
            <Box
              height="100px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text>No data</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CardForTodayTaskListBySlide;

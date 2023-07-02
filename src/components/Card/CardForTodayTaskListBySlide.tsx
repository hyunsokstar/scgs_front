import {
  Avatar,
  Box,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { IPropsForCardForTodayTaskListBySlide } from "../../types/project_progress/project_progress_type";
import { MdSwapHoriz } from "react-icons/md";
import ButtonsForChangeDueDateForTaskForToday from "../Buttons/ButtonsForChangeDueDateForTaskForToday";

const CardForTodayTaskListBySlide = ({
  title,
  todos,
}: IPropsForCardForTodayTaskListBySlide) => {
  const [checkedRows, setCheckedRows] = useState([]);

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
  const handleRowCheckboxToggle = (todoId) => {
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
          bg={"orange.100"}
          p={2}
        >
          <Checkbox
            isChecked={checkedRows.length === todos.length}
            onChange={handleAllCheckboxToggle}
          />
          <Text>{title}</Text>
          {/* {checkedRows.length === todos.length ? (
            <ButtonsForChangeDueDateForTaskForToday title={title} />
          ) : (
            <Box></Box>
          )} */}
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

                      <Avatar
                        src={todo.task_manager.profile_image}
                        alt={todo.task_manager.username}
                        size="sm"
                      />
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

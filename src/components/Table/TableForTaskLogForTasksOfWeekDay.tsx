import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

type TaskCountForWeekdays = {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
};

type TableForTaskLogForTasksOfWeekDayProps = {
  taskCountForWeekdays: TaskCountForWeekdays;
  today_info: {
    date: string;
    dayOfWeek: string;
  };
};

const TableForTaskLogForTasksOfWeekDay: React.FC<
  TableForTaskLogForTasksOfWeekDayProps
> = ({ today_info, taskCountForWeekdays }) => {
  const daysOfWeek = Object.keys(taskCountForWeekdays) as Array<
    keyof TaskCountForWeekdays
  >;

  return (
    <Box mx="auto">
      <Table
        variant="striped"
        colorScheme="black"
        size="md"
        borderRadius="md"
        bg={"blue.100"}
        border={"1px solid black"}
      >
        <Thead>
          <Tr>
            {daysOfWeek.map((day) => (
              <Th
                key={day}
                bg={
                  day === today_info.dayOfWeek ? "yellow.200" : "" ? "red.200" : ""
                }
              >
                {day.substring(0, 2)}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {daysOfWeek.map((day) => (
            <Td
              key={day}
              bg={
                day === today_info.dayOfWeek ? "yellow.200" : "" ? "red.200" : ""
              }
            >
              {taskCountForWeekdays[day]}
            </Td>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForTaskLogForTasksOfWeekDay;

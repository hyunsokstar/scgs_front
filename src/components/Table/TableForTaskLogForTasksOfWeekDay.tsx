  import React, { useState } from "react";
  import { Box, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

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
    selectedDay: string;
    setSelectedDay: (day: string) => void; // 선택된 요일을 설정하는 콜백 함수
  };

  const TableForTaskLogForTasksOfWeekDay: React.FC<
    TableForTaskLogForTasksOfWeekDayProps
  > = ({ today_info, taskCountForWeekdays, selectedDay, setSelectedDay }) => {
    const daysOfWeek = Object.keys(taskCountForWeekdays) as Array<
      keyof TaskCountForWeekdays
    >;
    // const [selectedDay, setSelectedDay] = useState(""); // 초기 선택값은 없음

    const getToday = (day: string) => {

      // day가 이번주의 요일이거든 utc 날짜로 변환 해줄수 있어? 그다음 setSelectedDay 에 설정
      setSelectedDay(day);
    };

    return (
      <Box width={"100%"} border={"1px solid green"}>
        <Table
          variant="striped"
          colorScheme="black"
          size="xs"
          borderRadius="md"
          bg={"blue.100"}
          width={"100%"}
        >
          <Thead>
            <Tr>
              {daysOfWeek.map((day) => (
                <Th
                  key={day}
                  style={{
                    backgroundColor:
                      day === selectedDay
                        ? "lightcoral" // 선택한 요일 배경색
                        : "lightgray"
                  }}
                  textAlign={"center"}
                  onClick={() => getToday(day)}
                >
                  {day}({taskCountForWeekdays[day]})
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody></Tbody>
        </Table>
      </Box>
    );
  };

  export default TableForTaskLogForTasksOfWeekDay;

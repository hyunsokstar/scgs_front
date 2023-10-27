import React from "react";
import { Box, Table, Thead, Tbody, Tr, Td, Checkbox } from "@chakra-ui/react";
import { TaskManagerData } from "../../types/project_progress/project_progress_type";

type Props = {
  task_managers_data: TaskManagerData[] | undefined;
  checkedPksForUserList: number[];
  setCheckedPksForUserList: any;
};

function TableForTaskManagersForTasksForToday({
  task_managers_data,
  checkedPksForUserList,
  setCheckedPksForUserList,
}: Props) {
  const handleCheckboxChange = (id: number) => {
    // 클릭한 체크박스의 id를 배열에 추가하거나 제거
    if (checkedPksForUserList.includes(id)) {
      setCheckedPksForUserList(checkedPksForUserList.filter((pk) => pk !== id));
    } else {
      setCheckedPksForUserList([...checkedPksForUserList, id]);
    }
  };

  return (
    <>
      {checkedPksForUserList}
      <Table
        variant="striped"
        colorScheme="black"
        size="xs"
        borderRadius="md"
        bg="blue.100"
        border="1px solid black"
        width={["100%", "100%", "100%", "100%"]}
      >
        <Thead>
          <Tr>
            <Td border={"1px solid green"} px={1}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Checkbox />
              </Box>
            </Td>
            <Td textAlign="center" width={"33.3%"}>
              manager
            </Td>
            <Td textAlign="center" width={"33.3%"}>
              uncomplete
            </Td>
            <Td textAlign="center" width={"33.3%"}>
              complete
            </Td>
          </Tr>
        </Thead>
        <Tbody>
          {task_managers_data ? (
            task_managers_data.map((data, index) => (
              <Tr key={index}>
                <Td border={"1px solid green"} px={1}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Checkbox
                      onChange={() => handleCheckboxChange(data.id)}
                      isChecked={checkedPksForUserList.includes(data.id)}
                    />
                  </Box>{" "}
                </Td>
                <Td textAlign="center" width={"33%"}>
                  {data.task_manager}
                </Td>
                <Td textAlign="center" width={"33%"}>
                  {data.uncompleted_count}
                </Td>
                <Td textAlign="center" width={"33%"}>
                  {data.completed_count}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} textAlign="center">
                no data
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  );
}

export default TableForTaskManagersForTasksForToday;

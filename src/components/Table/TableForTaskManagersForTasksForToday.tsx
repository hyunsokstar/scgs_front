import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { TaskManagerData } from "../../types/project_progress/project_progress_type";


type Props = {
  task_managers_data: TaskManagerData[] | undefined;
};

function TableForTaskManagersForTasksForToday({ task_managers_data }: Props) {
  return (
    // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <Table
      variant="striped"
      colorScheme="black"
      size="sm"
      borderRadius="md"
      bg={"blue.100"}
      border={"1px solid black"}
    >
      <Thead>
        <Tr>
          <Th>Task Manager</Th>
          <Th>uncompleted_count</Th>
          <Th>completed_count</Th>
        </Tr>
      </Thead>
      <Tbody>
        {task_managers_data
          ? task_managers_data.map((data, index) => (
              <Tr key={index}>
                <Td>{data.task_manager}</Td>
                <Td>{data.uncompleted_count}</Td>
                <Td>{data.completed_count}</Td>
              </Tr>
            ))
          : "no data"}
      </Tbody>
    </Table>
  );
}

export default TableForTaskManagersForTasksForToday;

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
      size="xs"
      borderRadius="md"
      bg="blue.100"
      border="1px solid black"
      width={["100%", "100%", "100%", "100%"]}
    >
      <Thead>
        <Tr>
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
  );
}

export default TableForTaskManagersForTasksForToday;

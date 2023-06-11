import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IOneTaskForProjectTaskType } from "../../types/project_progress/project_progress_type";

type Props = {
  data: IOneTaskForProjectTaskType[];
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
};

// 1122
const TableForTaskListForChecked: React.FC<Props> = ({
  data,
  checkedRowPks,
  setCheckedRowPks,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const pk = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, pk]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== pk));
    }
  };
  // 2244
  return (
    <Box overflowX="auto">
      <Table variant="outline" size="sm">
        <Thead bgColor={"yellow.100"}>
          <Tr>
            <Th>
              <Checkbox size="lg" colorScheme="orange"></Checkbox>{" "}
            </Th>
            <Th>작성자</Th>
            <Th>작업 내용</Th>
            <Th>상태</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((task) => (
            <Tr key={task.pk}>
              <Td>
                <Checkbox
                  size="md"
                  colorScheme="green"
                  value={task.pk}
                  isChecked={checkedRowPks.includes(task.pk)}
                  onChange={handleCheckboxChange}
                />
              </Td>
              <Td>{task.task_manager.username}</Td>
              <Td>{task.task}</Td>
              <Td>{task.current_status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForTaskListForChecked;

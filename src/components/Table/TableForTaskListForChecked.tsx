import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IOneTaskForProjectTaskType } from "../../types/project_progress/project_progress_type";
import TextForCharacterLimit from "../Text/TextForCharacterLimit";

type Props = {
  data: IOneTaskForProjectTaskType[];
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
};

const TableForTaskListForChecked: React.FC<Props> = ({
  data,
  checkedRowPks,
  setCheckedRowPks,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  const isAllChecked = data.length > 0 && data.length === checkedRowPks.length;

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    if (checked) {
      setCheckedRowPks(data.map((task:any) => task.id));
    } else {
      setCheckedRowPks([]);
    }
  };

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: false, // for medium-sized screens and up
    lg: false, // for large screens and up
  });

  return (
    <Box overflowX="auto">
      <Table variant="outline" size="sm">
        <Thead bgColor={"yellow.100"}>
          <Tr>
            <Th>
              <Checkbox
                size="lg"
                colorScheme="orange"
                isChecked={isAllChecked}
                onChange={handleSelectAllChange}
              />
            </Th>
            <Th>작성자</Th>
            <Th>작업 내용</Th>
            <Th>상태</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((task:any) => (
            <Tr key={task.id}>
              <Td>
                <Checkbox
                  size="md"
                  colorScheme="green"
                  value={task.id}
                  isChecked={checkedRowPks.includes(task.id)}
                  onChange={handleCheckboxChange}
                />
              </Td>
              <Td>{task.task_manager.username}</Td>
              <Td>
                {is_show_for_mobile ? (
                  <TextForCharacterLimit text={task.task} />
                ) : (
                  task.task
                )}
              </Td>
              <Td>{task.current_status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForTaskListForChecked;

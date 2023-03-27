import React, { ReactElement } from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Checkbox,
  Image,
  HStack,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import { extra_task_row_type } from "../types/project_progress/project_progress_type";

interface ExtraTasksTableProps {
  extra_tasks: extra_task_row_type[] | undefined;
}

const ExtraTasksTable = ({
  extra_tasks,
}: ExtraTasksTableProps): ReactElement => {
  return (
    <Box overflowX="scroll" width={"100%"}>


      <Table
        variant="simple"
        colorScheme="blue"
        // borderWidth="2px"
        overflowY="scroll"
        css={{
          textAlign: "center",
          td: { border: "2px solid green", textAlign: "center" },
          th: { border: "2px solid green", textAlign: "center" },
        }} // 각 셀의 패딩을 0으로 설정
        width="1900px"
      >
        <Thead border="2px solid green">
          <Tr>
            <Th width="20px">
              <input type="checkbox" />
            </Th>
            <Th width="30px">Task Manager</Th>
            <Th width="200px">Task</Th>
            <Th width="100px">Task Status</Th>
            <Th width="30px">Task importance</Th>
            <Th width="30px">Started At</Th>
            <Th width="30px">Completed At</Th>
            <Th width="30px"> 삭제 </Th>
          </Tr>
        </Thead>
        <Tbody>
          {extra_tasks?.length ? (
            extra_tasks.map((row) => {
              return (
                <Tr>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>
                    <HStack>
                      <Image
                        src={row.task_manager.profile_image}
                        w={"50px"}
                        h={"50px"}
                      />
                      <Text>{row.task_manager.username}</Text>
                    </HStack>
                  </Td>
                  <Td>{row.task}</Td>
                  <Td>
                    <Select
                      //   {...register("task_status_option")}
                      defaultValue={row.task_status}
                      placeholder="Select an option"
                    >
                      <option value="ready">Ready</option>
                      <option value="in_progress">In Progress</option>
                      <option value="testing">Testing</option>
                      <option value="completed">Completed</option>
                    </Select>
                  </Td>
                  <Td>{row.importance}</Td>
                  <Td>{row.started_at}</Td>
                  <Td>{row.completed_at ? row.completed_at : "미정"}</Td>
                  <Td>
                    <Button>삭제</Button>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={7}>no data</Td>
            </Tr>
          )}
          {/* Add more rows here */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExtraTasksTable;

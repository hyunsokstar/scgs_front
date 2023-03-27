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
} from "@chakra-ui/react";
import { extra_task_row_type } from "../types/project_progress/project_progress_type";
import ModalButtonForExtraTask from "./modal/ModalButtonForExtraTask";

interface ExtraTasksTableProps {
  extra_tasks: extra_task_row_type[] | undefined;
}

const ExtraTasksTable = ({
  extra_tasks,
}: ExtraTasksTableProps): ReactElement => {
  return (
    <Box overflowX="scroll" width={"100%"}>
      {/* <Flex justifyContent={"flex-end"} pr={1} mb={2}>
        <Button
          variant="outline"
          colorScheme="blue"
          css={{ "&:hover": { backgroundColor: "blue", color: "white" } }}
        >
          부가 업무 추가
        </Button>{" "}
      </Flex> */}
      <ModalButtonForExtraTask />

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
        width="1600px"
      >
        <Thead border="2px solid green">
          <Tr>
            <Th width="20px">
              <input type="checkbox" />
            </Th>
            <Th width="30px">Task Manager</Th>
            <Th width="200px">Task</Th>
            <Th width="30px">Task Status</Th>
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
                  <Td>{row.task_status}</Td>
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

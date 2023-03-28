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
  IconButton,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { extra_task_row_type } from "../types/project_progress/project_progress_type";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteOneExtraTaskForPk,
  updateExtraTaskImportance,
  updateExtraTaskStatusUsingSelectBox,
} from "../apis/project_progress_api";
import StarRating from "./StarRating";

interface ExtraTasksTableProps {
  extra_tasks: extra_task_row_type[] | undefined;
}

// 1122
const ExtraTasksTable = ({
  extra_tasks,
}: ExtraTasksTableProps): ReactElement => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (extraTaskPk: number) => {
      return deleteOneExtraTaskForPk(extraTaskPk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["getOneProjectTask"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);
        toast({
          title: "extra task 삭제 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteHandelr = (extraTaskPk: any) => {
    const response = deleteMutation.mutate(extraTaskPk);
    console.log("response :", response);
  };

  const updateForExtasTaskStatusMutation = useMutation(
    updateExtraTaskStatusUsingSelectBox,
    {
      onSuccess: (result: any) => {
        toast({
          status: "success",
          title: "extra task update success !",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const selectHandlerForExtraTaskStatusUpdate = (
    event: React.ChangeEvent<HTMLSelectElement>,
    pk: number
  ) => {
    const selectedValue = event.target.value;
    console.log("selectedValue : ", selectedValue);
    console.log("pk : ", pk);

    const taskPk = pk;
    const task_status = selectedValue;

    updateForExtasTaskStatusMutation.mutate({ taskPk, task_status });
  };

  const updateMutationForProjectImportance = useMutation(
    updateExtraTaskImportance,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // queryClient.refetchQueries(["getOneProjectTask"]);

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const onChangeForStarRatingHandler = ({ taskPk, star_count }: any) => {
    updateMutationForProjectImportance.mutate({ taskPk, star_count });
  };

  //2244
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
            <Th width="10px">
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
                      defaultValue={row.task_status}
                      placeholder="Select an option"
                      onChange={(e) =>
                        selectHandlerForExtraTaskStatusUpdate(e, row.pk)
                      }
                      border="1px solid green"
                    >
                      <option value="ready">
                        대기중&nbsp;&nbsp; ⚪
                      </option>
                      <option value="in_progress">진행중&nbsp;&nbsp; 🟡</option>
                      <option value="testing">테스팅&nbsp;&nbsp; 🟠</option>
                      <option value="completed">완료됨&nbsp;&nbsp; 🔵</option>
                    </Select>
                  </Td>
                  {/* <Td>{row.importance}</Td> */}
                  <Td>
                    <StarRating
                      initialRating={row.importance}
                      taskPk={row.pk}
                      onChangeForStarRatingHandler={
                        onChangeForStarRatingHandler
                      }
                    />
                  </Td>
                  <Td>{row.started_at ? row.started_at_formatted : "미정"}</Td>
                  <Td>{row.completed_at ? row.completed_at : "미정"}</Td>
                  <Td>
                    <IconButton
                      aria-label="삭제"
                      icon={<FaTrash />}
                      variant="ghost"
                      onClick={() => deleteHandelr(row.pk)}
                    />{" "}
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

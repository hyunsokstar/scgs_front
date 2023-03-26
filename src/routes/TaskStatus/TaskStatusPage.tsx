import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ITypeForProjectProgressList } from "../../types/project_progress/project_progress_type";
import {
  getProgectTasksStatusData,
  updateProjectStatusByDrag,
} from "../../apis/project_progress_api";
import { AxiosResponse } from "axios";
import "./styles.scss";
import StarRating from "../../components/StarRating";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Task = {
  pk: number;
  task: string | undefined;
  importance: number | undefined;
  task_manager:
    | {
        pk: number;
        username: string;
      }
    | undefined;
};

type Column = {
  name: string;
  tasks: Task[];
};

interface ITypeForTaskStatus {
  all_tasks_in_month: Task[];
  tasks_in_ready: Task[];
  tasks_in_progress: Task[];
  tasks_in_testing: Task[];
  tasks_in_completed: Task[];
}

const initialColumns: Column[] = [
  {
    name: "준비중",
    tasks: [],
  },
  {
    name: "작업중",
    tasks: [],
  },
  {
    name: "테스트중",
    tasks: [],
  },
  {
    name: "완료",
    tasks: [],
  },
];

const TaskStatusPage = () => {
  const toast = useToast();

  const queryClient = useQueryClient();
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [total_tasks, set_total_tasks] = useState<Task[]>([]);

  const {
    data: taskStatusData,
    isLoading,
    isError,
    refetch: refetchForGetProgectTasksStatus,
  } = useQuery<AxiosResponse<ITypeForTaskStatus>>(
    ["getProgectTasksStatusData"],
    () => getProgectTasksStatusData()
  );

  // console.log(" ", taskStatusData);

  useEffect(() => {
    let new_columns;
    let tasks_for_ready: Task[] = [];
    let tasks_for_in_progress: Task[] = [];
    let tasks_for_in_testing: Task[] = [];
    let tasks_for_in_completed: Task[] = [];

    if (taskStatusData) {
      tasks_for_ready = taskStatusData?.data.tasks_in_ready.map((row: any) => {
        return {
          pk: row.pk,
          task: row.task,
          importance: row.importance,
          task_manager: row.task_manager,
        };
      });
      tasks_for_in_progress = taskStatusData?.data.tasks_in_progress.map(
        (row: any) => {
          return {
            pk: row.pk,
            task: row.task,
            task_manager: row.task_manager,
            importance: row.importance,
          };
        }
      );

      tasks_for_in_testing = taskStatusData?.data.tasks_in_testing.map(
        (row: any) => {
          return {
            pk: row.pk,
            task: row.task,
            task_manager: row.task_manager,
            importance: row.importance,
          };
        }
      );

      tasks_for_in_completed = taskStatusData?.data.tasks_in_completed.map(
        (row: any) => {
          return {
            pk: row.pk,
            task: row.task,
            task_manager: row.task_manager,
            importance: row.importance,
          };
        }
      );
    }

    new_columns = [
      {
        name: "ready",
        tasks: tasks_for_ready,
      },
      {
        name: "in_progress",
        tasks: tasks_for_in_progress,
      },
      {
        name: "is_testing",
        tasks: tasks_for_in_testing,
      },
      {
        name: "complete",
        tasks: tasks_for_in_completed,
      },
    ];

    set_total_tasks(
      taskStatusData ? taskStatusData?.data.all_tasks_in_month : []
    );
    setColumns(new_columns);
  }, [taskStatusData]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskPk: number
  ) => {
    event.dataTransfer.setData("text/plain", taskPk.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const updateMutationForProjectStatusByDrag = useMutation(
    updateProjectStatusByDrag,
    {
      onSuccess: (result: any) => {
        // console.log("result : ", result);
        if (refetchForGetProgectTasksStatus) {
          refetchForGetProgectTasksStatus();
        }
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

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const updateTaskStatusByDragHandler = (
    taskPk: number,
    status_to_move: string
  ) => {
    // console.log("status_to_move : ", status_to_move);

    updateMutationForProjectStatusByDrag.mutate({ taskPk, status_to_move });
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    columnName: string
  ) => {
    const taskPk = parseInt(event.dataTransfer.getData("text/plain"));

    console.log("drop event data(columnName, taskPk) : ", columnName, taskPk);

    // 해당 pk가 아닌것만 필터링하되 column.name 이 columnName(옮긴 영역) 일 경우 push
    const newColumns = columns.map((column) => {
      // 모든 컬럼에서 제거후
      const tasks = column.tasks.filter((task) => task.pk !== taskPk);

      // 추가
      if (column.name === columnName) {
        const task_to_move = total_tasks.find((task) => task.pk === taskPk);

        tasks.push({
          pk: taskPk,
          task: task_to_move?.task,
          task_manager: task_to_move?.task_manager,
          importance: task_to_move?.importance,
        });

        // taskPk 에 해당하는 task 의 상태를 이동한 칼럼에 맞게 업데이트
        // 1122
        // alert(columnName);
        updateTaskStatusByDragHandler(taskPk, columnName);
      }
      return {
        ...column,
        tasks,
      };
    });
    setColumns(newColumns);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred: {isError}</div>;
  }

  return (
    <Box
      maxW="100%"
      mx="auto"
      mt="6"
      border="1px solid black"
      bgColor={"white"}
    >
      <Flex justifyContent={"center"}>
        <Heading mb="2">ToDo 목록</Heading>
      </Flex>
      <Box
        display="flex"
        border={"2px solid blue"}
        justifyContent={"center"}
        mx={2}
        mb={2}
        gap={2}
      >
        {columns.map((column) => (
          <Box
            key={column.name}
            p="2"
            bg="gray.100"
            flex="1"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, column.name)}
            color={"black"}
          >
            <Text fontSize="lg" fontWeight="bold" mb="4">
              {column.name}
            </Text>
            <VStack spacing="4">
              {column.tasks.map((task) => (
                <Container>
                  <VStack
                    key={task.pk}
                    gap={2}
                    p="4"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    cursor="move"
                    draggable
                    onDragStart={(event) => handleDragStart(event, task.pk)}
                    w={"100%"}
                  >
                    <HStack width={"100%"} border={"1px solid blue"}>
                      <Box>{task.task_manager?.username}</Box>
                    </HStack>
                    <Box>{task.task}</Box>
                    <Box>
                      <StarRating
                        initialRating={task.importance}
                        taskPk={task.pk}
                      />
                    </Box>
                  </VStack>
                </Container>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskStatusPage;

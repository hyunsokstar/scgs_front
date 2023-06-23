import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import {
  apiForCreateTaskUrlForExtaTask,
  apiForDeleteExtraTaskUrlForTaskWithPk,
  apiForUpdateTaskUrlForExtraTaskForPk,
} from "../apis/project_progress_api";
import { AddIcon } from "@chakra-ui/icons";

interface Props {
  extraTaskPk: number;
  task_urls: string[];
  titleText: string;
}

// 1122
const TaskUrlsListUsingInputForUpdate = ({
  titleText,
  extraTaskPk,
  task_urls,
}: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [taskUrls, setTaskUrls] = useState<any>([]);

  const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
    (pk: string | number) => {
      return apiForDeleteExtraTaskUrlForTaskWithPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForExtraTaskDetail"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteTaskUrl = (pk: number) => {
    mutationForDeleteTaskUrlForTaskWithPk.mutate(pk);
  };

  const updateTaskUrl = (index: number, newUrl: string) => {
    console.log("newUrl : ", newUrl);

    const updatedTaskUrls = [...taskUrls];
    console.log("updatedTaskUrls : ", updatedTaskUrls);

    updatedTaskUrls[index] = newUrl;
    setTaskUrls(updatedTaskUrls);
  };

  const mutationForUpdateTaskUrlForTaskForPk = useMutation(
    apiForUpdateTaskUrlForExtraTaskForPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["apiForExtraTaskDetail"]);
        setTaskUrls([]);
        toast({
          status: "success",
          title: "task url update success",
          description: result.message,
        });
      },
    }
  );

  const buttonHandlerForOpenTaskUrl = (pk: number, index: number) => {
    console.log("url for update : ", taskUrls[index]);
    const taskUrlForUpdate = taskUrls[index];

    const testUrlPatternAndUpdate = (pk: number, taskUrlForUpdate: string) => {
      try {
        const parsedUrl = new URL(taskUrlForUpdate);
        if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
          // alert(`task_url(id:${pk}) update to : ${taskUrlForUpdate}`);
          mutationForUpdateTaskUrlForTaskForPk.mutate({ pk, taskUrlForUpdate });
        } else {
          alert("Invalid URL: " + taskUrlForUpdate);
          return;
        }
      } catch (error) {
        alert("Invalid URL: " + taskUrlForUpdate);
        return;
      }
    };

    if (taskUrlForUpdate) {
      testUrlPatternAndUpdate(pk, taskUrlForUpdate);
    } else {
      alert("The input hasn't been modified, so I won't perform an update");
    }
  };
  const handlerForOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateTaskUrlForExtaTask,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForExtraTaskDetail"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleAddTaskUrl = () => {
    mutationForCreateTaskUrlForTask.mutate(extraTaskPk);
  };

  // 2244
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>{titleText}</Box>
        <Box>
          <IconButton
            icon={<AddIcon />}
            size={"xs"}
            aria-label="Add Task Url"
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              if (window.confirm("Task URL을 추가하시겠습니까?")) {
                handleAddTaskUrl();
              }
            }}
          />
        </Box>
      </Box>

      {task_urls.length ? (
        task_urls.map((taskUrl: any, index: any) => (
          <Box
            display="flex"
            alignItems={"center"}
            width={"100%"}
            border={"0px solid green"}
            gap={2}
            p={1}
          >
            <IconButton
              icon={<MinusIcon />}
              size={"xs"}
              aria-label="Add Task Url"
              colorScheme="red"
              variant="outline"
              onClick={() => buttonHandlerForDeleteTaskUrl(taskUrl.id)}
            />{" "}
            <Box key={taskUrl.id} alignItems="center" width={"100%"}>
              <InputGroup>
                <Input
                  defaultValue={taskUrl.task_url}
                  value={taskUrls[index]}
                  width={"100%"}
                  onChange={(e) => updateTaskUrl(index, e.target.value)}
                />
                <InputRightAddon width={"80px"} p={0}>
                  {taskUrls[index] && taskUrls[index] !== taskUrl.task_url ? (
                    <Button
                      colorScheme="teal"
                      size="sm"
                      bg={"orange.200"}
                      width={"80px"}
                      height={"100%"}
                      variant={"outline"}
                      onClick={() =>
                        buttonHandlerForOpenTaskUrl(taskUrl.id, index)
                      }
                    >
                      update
                    </Button>
                  ) : (
                    <Button
                      colorScheme="teal"
                      size="sm"
                      width={"80px"}
                      height={"100%"}
                      variant={"outline"}
                      onClick={() => handlerForOpenUrl(taskUrl.task_url)}
                    >
                      open
                    </Button>
                  )}
                </InputRightAddon>
              </InputGroup>
            </Box>
          </Box>
        ))
      ) : (
        <Box textAlign="center">
          <Box fontSize={"20px"} my={3}>
            "no task urls is available"
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TaskUrlsListUsingInputForUpdate;

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
  apiForDeleteTaskUrlForTaskWithPk,
  apiForUpdateTaskUrlForTaskForPk,
} from "../apis/project_progress_api";

interface Props {
  task_urls: string[];
}

// 1122
const TaskUrlsListUsingInputForUpdate = ({ task_urls }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [taskUrls, setTaskUrls] = useState<any>([]);

  const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
    (pk: string | number) => {
      return apiForDeleteTaskUrlForTaskWithPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getOneProjectTask"]);

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
    apiForUpdateTaskUrlForTaskForPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getOneProjectTask"]);
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

  return (
    <Box>
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

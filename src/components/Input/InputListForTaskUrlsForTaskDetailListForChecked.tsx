import React, { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { apiForUpdateTaskUrlForTaskForPk } from "../../apis/project_progress_api";

interface Props {
  taskUrlsForList: any;
}

// 1122
const InputListForTaskUrlsForTaskDetailListForChecked = ({
  taskUrlsForList,
}: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [taskUrls, setTaskUrls] = useState<any>([]);

  console.log("taskUrlsForList : ", taskUrlsForList);

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
        queryClient.refetchQueries(["getTaskListForCheckedPksForImageSlide"]);
        setTaskUrls([]);
        toast({
          status: "success",
          title: "task url update success",
          description: result.message,
        });
      },
    }
  );

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

  const buttonHandlerForUpdateTaskUrlForTask = (pk: number, index: number) => {
    console.log("url for update : ", taskUrls[index]);
    const taskUrlForUpdate = taskUrls[index];

    if (taskUrlForUpdate) {
      testUrlPatternAndUpdate(pk, taskUrlForUpdate);
    } else {
      alert("The input hasn't been modified, so I won't perform an update");
    }
  };

  return (
    <Box>
      {taskUrlsForList.map((tu: any, index: any) => (
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
            // onClick={() => buttonHandlerForDeleteTaskUrl(tu.id)}
          />{" "}
          <Box key={tu.id} alignItems="center" width={"100%"}>
            <InputGroup>
              <Input
                defaultValue={tu.task_url}
                // value={taskUrls[index]}
                width={"100%"}
                onChange={(e) => updateTaskUrl(index, e.target.value)}
              />
              <InputRightAddon width={"80px"} p={0}>
                {taskUrls[index] && taskUrls[index] !== tu.task_url ? (
                  <Button
                    colorScheme="teal"
                    size="sm"
                    bg={"orange.200"}
                    width={"80px"}
                    height={"100%"}
                    variant={"outline"}
                    onClick={() =>
                      buttonHandlerForUpdateTaskUrlForTask(tu.id, index)
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
                    // onClick={() => handlerForOpenUrl(taskUrl.task_url)}
                  >
                    open
                  </Button>
                )}
              </InputRightAddon>
            </InputGroup>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default InputListForTaskUrlsForTaskDetailListForChecked;

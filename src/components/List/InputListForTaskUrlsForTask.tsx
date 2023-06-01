import React, { useState } from "react";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";

interface TaskUrl {
  id: number;
  task_url: string;
}

interface InputListForTaskUrlsForTaskProps {
  taskData: any;
  taskUrls: any;
  updateTaskUrl: (index: number, value: string) => void;
  buttonHandlerForDeleteTaskUrl: (id: number) => void;
  buttonHandlerForOpenTaskUrl: (id: number, index: number) => void;
  handlerForOpenUrl: (url: string) => void;
}

const InputListForTaskUrlsForTask: React.FC<
  InputListForTaskUrlsForTaskProps
> = ({
  taskData,
  taskUrls,
  updateTaskUrl,
  buttonHandlerForDeleteTaskUrl,
  buttonHandlerForOpenTaskUrl,
  handlerForOpenUrl,
}) => {

  return (
    <Box>
      <Box>
        {taskData.task_urls.map((taskUrl:any, index:any) => (
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
        ))}
      </Box>
    </Box>
  );
};

export default InputListForTaskUrlsForTask;

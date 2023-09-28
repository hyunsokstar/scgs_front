import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  task_status: "ready" | "in_progress" | "testing";
  status_imoge: string;
  status_count: number | undefined;
  button_size: "md" | "sm" | "lg" | "xs";
  task_status_for_search: string;
  set_task_status_for_search: (button_text: string) => void;
}

const ButtonForShowCountForTaskStatus = ({
  task_status,
  status_imoge,
  status_count,
  button_size = "md",
  task_status_for_search = "",
  set_task_status_for_search,
}: // handler_for_button_for_show_count_for_task_status
Props) => {
  const handler_for_button_for_show_count_for_task_status = (
    button_text: string
  ) => {
    set_task_status_for_search(task_status);
  };

  return (
    <Box>
      <Button
        variant={"outline"}
        size={button_size}
        border={"1px solid black"}
        mb={1}
        _hover={{
          bg: "#90CDF4",
          color: "brown",
        }}
        onClick={() =>
          handler_for_button_for_show_count_for_task_status(task_status)
        }
        bg={task_status_for_search === task_status ? "blue.100" : ""}
      >
        {status_imoge} : {status_count}
      </Button>
    </Box>
  );
};

export default ButtonForShowCountForTaskStatus;

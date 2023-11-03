import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, useToast } from "@chakra-ui/react";
import { apiForUpdateTaskDueDateByPk } from "../../apis/project_progress_api";

interface ButtonsForChangeDueDateForTaskForTodayProps {
  id: number;
  title: string;
}

const ButtonsForChangeDueDateForTaskForToday: React.FC<
  ButtonsForChangeDueDateForTaskForTodayProps
> = ({ id, title }) => {
  let morningIcon, noonIcon, nightIcon;
  const queryClient = useQueryClient();
  const toast = useToast();

  if (title === "until-noon") {
    noonIcon = "🌛";
    nightIcon = "🌌";
  } else if (title === "until-evening") {
    morningIcon = "☀️";
    nightIcon = "🌌";
  } else if (title === "until-night") {
    morningIcon = "☀️";
    noonIcon = "🌛";
  }

  const mutationForUpdateTaskDueDateByPk = useMutation(
    apiForUpdateTaskDueDateByPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["getTaskStatusForToday"]);

        toast({
          status: "success",
          title: "task due date update success",
          description: result.message,
        });
      },
    }
  );

  const buttonHandlerForChangeDueDateForTaskForToday = (
    id: number,
    due_date_option: "until-noon" | "until-evening" | "until-night"
  ) => {
    mutationForUpdateTaskDueDateByPk.mutate({ id, due_date_option });
    console.log(`id : ${id} due_date_option : ${due_date_option}`);
  };

  return (
    <Box display={"flex"} gap={1}>
      {morningIcon && (
        <Button
          variant="outline"
          size="sm"
          _hover={{ backgroundColor: "yellow.100" }}
          onClick={() =>
            buttonHandlerForChangeDueDateForTaskForToday(id, "until-noon")
          }
        >
          {morningIcon}
        </Button>
      )}
      {noonIcon && (
        <Button
          variant="outline"
          size="sm"
          _hover={{ backgroundColor: "yellow.100" }}
          onClick={() =>
            buttonHandlerForChangeDueDateForTaskForToday(id, "until-evening")
          }
        >
          {noonIcon}
        </Button>
      )}
      {nightIcon && (
        <Button
          variant="outline"
          size="sm"
          _hover={{ backgroundColor: "yellow.100" }}
          onClick={() =>
            buttonHandlerForChangeDueDateForTaskForToday(id, "until-night")
          }
        >
          {nightIcon}
        </Button>
      )}
    </Box>
  );
};

export default ButtonsForChangeDueDateForTaskForToday;

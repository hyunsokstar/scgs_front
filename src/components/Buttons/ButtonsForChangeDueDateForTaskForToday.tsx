import React from "react";
import { Box, Button } from "@chakra-ui/react";

interface ButtonsForChangeDueDateForTaskForTodayProps {
  id: number;
  title: "until-morning" | "until-evening" | "until-night";
}

const ButtonsForChangeDueDateForTaskForToday: React.FC<
  ButtonsForChangeDueDateForTaskForTodayProps
> = ({ id, title }) => {
  let morningIcon, noonIcon, nightIcon;

  if (title === "until-morning") {
    noonIcon = "🌛";
    nightIcon = "🌌";
  } else if (title === "until-evening") {
    morningIcon = "☀️";
    nightIcon = "🌌";
  } else if (title === "until-night") {
    morningIcon = "☀️";
    noonIcon = "🌛";
  }

  const buttonHandlerForChangeDueDateForTaskForToday = (
    id: number,
    due_date_option: "until-morning" | "until-evening" | "until-night"
  ) => {
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
            buttonHandlerForChangeDueDateForTaskForToday(id, "until-morning")
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

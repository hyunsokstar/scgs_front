import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

interface ButtonsForUpdateTaskForCheckedListProps {
  checkedRowPks: any[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<any[]>>;
  deleteTaskForChecked: () => void;
  handlerForUpdateTaskDuedateForChecked: (
    duration_option:
      | "undetermined"
      | "noon"
      | "evening"
      | "tomorrow"
      | "day-after-tomorrow"
      | "this-week"
      | "this-month"
  ) => void;
}

const ButtonsForUpdateTaskForCheckedList: React.FC<ButtonsForUpdateTaskForCheckedListProps> = ({
  checkedRowPks,
  setCheckedRowPks,
  deleteTaskForChecked,
  handlerForUpdateTaskDuedateForChecked,
}) => {
  return (
    <Box>
      <Box p={2} gap={2}>
        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() =>
            handlerForUpdateTaskDuedateForChecked("undetermined")
          }
        >
          Reset Duedate
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("noon")}
        >
          Set DueDate to Noon
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("evening")}
        >
          Set DueDate to evening
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("tomorrow")}
        >
          Set DueDate to Tomorrow
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() =>
            handlerForUpdateTaskDuedateForChecked("day-after-tomorrow")
          }
        >
          Set DueDate to Day After Tomorrow
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("this-week")}
        >
          Set DueDate this Weekend
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("this-month")}
        >
          Set DueDate to This Month
        </Button>
      </Box>
      <Box display={"flex"} p={2} gap={2}>
        <Button
          variant="outline"
          size="xs"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          mr={2}
          onClick={deleteTaskForChecked}
        >
          Delete For Check
        </Button>

        <Button
          variant={"outline"}
          border={"1px solid blue"}
          bg={"blue.100"}
          size={"xs"}
        >
          show task detail using image slide for check
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonsForUpdateTaskForCheckedList;

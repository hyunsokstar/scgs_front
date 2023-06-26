import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import ModalButtonForUpdateTaskManagerForChecked from "./ModalButtonForUpdateTaskManagerForChecked";
import ModalButtonForUpdateImortanceForChecked from "../modal/ModalButtonForUpdateImortanceForChecked";
import ModalButtonForUpdateTaskClassificationForChecked from "../modal/ModalButtonForUpdateTaskClassificationForChecked";
import { useNavigate } from "react-router-dom";

interface ButtonsForUpdateTaskDueDateForCheckedListProps {
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
      | "night"
  ) => void;
}

const ButtonsForUnompletedTaskForChecked: React.FC<
  ButtonsForUpdateTaskDueDateForCheckedListProps
> = ({
  checkedRowPks,
  setCheckedRowPks,
  deleteTaskForChecked,
  handlerForUpdateTaskDuedateForChecked,
}) => {
  const navigator = useNavigate();

  const handleButtonClick = () => {
    if (checkedRowPks.length === 0) {
      alert("Please check at least one item");
      return;
    }
    // Perform other actions
    navigator(
      `/task-list-for-checked?checkedRowPks=${checkedRowPks.join(",")}`
    );
  };

  return (
    <Box width={"100%"} border={"0px solid orange"} maxWidth={"100%"}>
      <Box p={2} gap={2} display={"flex"} flexWrap={"wrap"}>
        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("undetermined")}
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
          Set DueDate to Evening
        </Button>

        <Button
          variant="outline"
          size="xs"
          backgroundColor="purple.50"
          _hover={{ backgroundColor: "purple.100" }}
          mr={2}
          onClick={() => handlerForUpdateTaskDuedateForChecked("night")}
        >
          Set DueDate to Night
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
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        gap={2}
        ml={2}
      >
        <Button
          variant="outline"
          size="xs"
          backgroundColor="red.50"
          _hover={{ backgroundColor: "red.100" }}
          mr={2}
          gap={10}
          onClick={deleteTaskForChecked}
        >
          Delete For Check
        </Button>

        <ModalButtonForUpdateTaskManagerForChecked
          button_text={"update task manager"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

        <ModalButtonForUpdateImortanceForChecked
          button_text={"update importance"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

        <ModalButtonForUpdateTaskClassificationForChecked
          button_text={"update task for classification"}
          size={"xs"}
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />

        <Button
          variant={"outline"}
          border={"1px solid blue"}
          bg={"blue.100"}
          size={"xs"}
          mr={5}
          onClick={handleButtonClick}
        >
          show task detail using image slide for check
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonsForUnompletedTaskForChecked;

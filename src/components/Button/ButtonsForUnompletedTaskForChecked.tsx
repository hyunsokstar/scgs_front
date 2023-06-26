import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
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
  handlerForUpdateTaskDuedateForChecked,
}) => {
  const navigator = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    handlerForUpdateTaskDuedateForChecked(event.target.value as any);
  };

  return (
    <Box width={"100%"} border={"0px solid orange"} maxWidth={"100%"}>
      <Box p={2} gap={2} display={"flex"} flexWrap={"wrap"}>
        <Select
          size="xs"
          backgroundColor="purple.50"
          value={selectedOption}
          onChange={handleSelectChange}
          mr={2}
        >
          <option value="undetermined">Reset Duedate</option>
          <option value="noon">Set DueDate to Noon</option>
          <option value="evening">Set DueDate to Evening</option>
          <option value="night">Set DueDate to Night</option>
          <option value="tomorrow">Set DueDate to Tomorrow</option>
          <option value="day-after-tomorrow">Set DueDate to Day After Tomorrow</option>
          <option value="this-week">Set DueDate this Weekend</option>
          <option value="this-month">Set DueDate to This Month</option>
        </Select>

        {/* Rest of the code */}
      </Box>
      {/* Rest of the code */}
    </Box>
  );
};

export default ButtonsForUnompletedTaskForChecked;

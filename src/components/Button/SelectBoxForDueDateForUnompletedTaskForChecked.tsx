import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SelectForUpdateTaskDueDateForCheckedListProps {
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
  width: string;
}

const SelectBoxForDueDateForUnompletedTaskForChecked: React.FC<
  SelectForUpdateTaskDueDateForCheckedListProps
> = ({ checkedRowPks, handlerForUpdateTaskDuedateForChecked, width }) => {
  const navigator = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    handlerForUpdateTaskDuedateForChecked(event.target.value as any);
  };

  return (
    <Box width={"100%"} border={"0px solid orange"}>
      <Select
        width={width}
        size="sm"
        backgroundColor="purple.50"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="undetermined">Reset Duedate</option>
        <option value="noon">Set DueDate to Noon</option>
        <option value="evening">Set DueDate to Evening</option>
        <option value="night">Set DueDate to Night</option>
        <option value="tomorrow">Set DueDate to Tomorrow</option>
        <option value="day-after-tomorrow">
          Set DueDate to Day After Tomorrow
        </option>
        <option value="this-week">Set DueDate this Weekend</option>
        <option value="this-month">Set DueDate to This Month</option>
      </Select>
    </Box>
  );
};

export default SelectBoxForDueDateForUnompletedTaskForChecked;

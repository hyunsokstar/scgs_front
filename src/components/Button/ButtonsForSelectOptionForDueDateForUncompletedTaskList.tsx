import React, { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import ButtonForFilteringTaskForDueDate from "./ButtonForFilteringTaskForDueDate";

interface ButtonsForSelectOptionForDueDateForUncompletedTaskListProps {
  due_date_option_for_filtering: string | undefined;
  set_due_date_option_for_filtering: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

const ButtonsForSelectOptionForDueDateForUncompletedTaskList: React.FC<
  ButtonsForSelectOptionForDueDateForUncompletedTaskListProps
> = ({ due_date_option_for_filtering, set_due_date_option_for_filtering }) => {
  const options = [
    { value: "undecided", label: "Undetermined" },
    { value: "until-yesterday", label: "Until Yesterday" },
    { value: "until-noon", label: "Until Noon" },
    { value: "until-evening", label: "Until Evening" },
    { value: "until-night", label: "Until Night" },
    { value: "until-tomorrow", label: "Until Tomorrow" },
    {
      value: "until-the-day-after-tomorrow",
      label: "Until Day After Tomorrow",
    },
    { value: "until-this-week", label: "Until This Week" },
    { value: "until-this-month", label: "Until This Month" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_due_date_option_for_filtering(event.target.value);
  };

  return (
    <>
      {/* {due_date_option_for_filtering} */}
      <Box display={"flex"} gap={2} mt={1}>
        <Select
          value={due_date_option_for_filtering}
          onChange={handleChange}
          placeholder="Default"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default ButtonsForSelectOptionForDueDateForUncompletedTaskList;

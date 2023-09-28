import { Box, Select, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";

interface FilterProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPeriodOptionForUncompletedTaskList: string;
}

const SelectBoxForSetPeriodForFilteringUncompletedTaskList = ({
  selectedPeriodOptionForUncompletedTaskList,
  changeHandler,
}: FilterProps) => {
  const [selected, setSelected] = useState(
    selectedPeriodOptionForUncompletedTaskList
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value;
    console.log("filter: ", filter);
    setSelected(filter);
    changeHandler(filter);
  };

  const selectWidth = useBreakpointValue({
    base: "100%", // for mobile and small screens
    md: "50%", // for medium-sized screens and up
    lg: "100%", // for large screens and up
  });

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      width="94%"
      border="1px solid purple"
    >
      {/* {selectedPeriodOptionForUncompletedTaskList} */}
      <Select
        size="sm"
        value={selected}
        width={selectWidth}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="within_a_week">Within a week</option>
        <option value="within_a_month">Within a month</option>
        <option value="over_a_month_ago">Over a month ago</option>
      </Select>
    </Box>
  );
};

export default SelectBoxForSetPeriodForFilteringUncompletedTaskList;

import { Box, Button, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";

interface FilterProps {
  changeHandler: (filter: string) => void;
  selectedPeriodOptionForUncompletedTaskList: string;
}

const ButtonsForSelectForTeamTaskListPeriod = ({
  selectedPeriodOptionForUncompletedTaskList,
  changeHandler,
}: FilterProps) => {
  const [selected, setSelected] = useState(
    selectedPeriodOptionForUncompletedTaskList
  );

  const handleClick = (filter: string) => {
    console.log("filter : ", filter);
    setSelected(filter);
    changeHandler(filter);
  };

  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 50%)", // for mobile and small screens
    md: "repeat(2, 50%)", // for medium-sized screens and up
    lg: "repeat(3, 50%)", // for large screens and up
  });

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={gridTemplateColumns}
      gap={2}
      width={"40%"}
      border={"3px solid purple"}
      flexWrap={"wrap"}
    >
      {selectedPeriodOptionForUncompletedTaskList}
      <Button
        size={"sm"}
        width={"100%"}
        border={"2px solid black"}
        variant={selected === "all" ? "solid" : "outline"}
        onClick={() => handleClick("all")}
      >
        All
      </Button>
      <Button
        size={"sm"}
        border={"2px solid black"}
        variant={selected === "within_a_week" ? "solid" : "outline"}
        width={"100%"}
        onClick={() => handleClick("within_a_week")}
      >
        Within a week
      </Button>
      <Button
        size={"sm"}
        border={"2px solid black"}
        variant={selected === "within_a_month" ? "solid" : "outline"}
        onClick={() => handleClick("within_a_month")}
      >
        Within a month
      </Button>
      <Button
        size={"sm"}
        border={"2px solid black"}
        variant={selected === "over_a_month_ago" ? "solid" : "outline"}
        onClick={() => handleClick("over_a_month_ago")}
      >
        Over a month ago
      </Button>
    </Box>
  );
};

export default ButtonsForSelectForTeamTaskListPeriod;

import { Box, Button } from "@chakra-ui/react";
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

  return (
    <Box display={"flex"} gap={2} >
        <Button
          size={"sm"}
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

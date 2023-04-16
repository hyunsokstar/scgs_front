import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

interface FilterProps {
  changeHandler: (filter: string) => void;
}

const ButtonsForSelectForTeamTaskListPeriod = ({
  changeHandler,
}: FilterProps) => {
  const [selected, setSelected] = useState("All");

  const handleClick = (filter: string) => {    
    console.log("filter : ", filter);       
    setSelected(filter);
    changeHandler(filter);
  };

  return (
    <Box display={"flex"} gap={2}>
      <Button
        variant={selected === "all" ? "solid" : "outline"}
        onClick={() => handleClick("all")}
      >
        All
      </Button>
      <Button
        variant={selected === "within_a_week" ? "solid" : "outline"}
        onClick={() => handleClick("within_a_week")}
      >
        Within a week
      </Button>
      <Button
        variant={selected === "within_a_month" ? "solid" : "outline"}
        onClick={() => handleClick("within_a_month")}
      >
        Within a month
      </Button>
      <Button
        variant={selected === "over_a_month_ago" ? "solid" : "outline"}
        onClick={() => handleClick("over_a_month_ago")}
      >
        Over a month ago
      </Button>
    </Box>
  );
};

export default ButtonsForSelectForTeamTaskListPeriod;

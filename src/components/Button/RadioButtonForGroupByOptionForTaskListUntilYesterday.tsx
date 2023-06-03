import * as React from "react";
import { Text, Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";

interface RadioButtonForSelectOptionForGropyByProps {
  groupByOption: string;
  setGroupByOption: (value: string) => void;
}

const RadioButtonForGroupByOptionForTaskListUntilYesterday: React.FC<
  RadioButtonForSelectOptionForGropyByProps
> = ({ groupByOption, setGroupByOption }) => {
  const handleChange = (value: string) => {
    setGroupByOption(value);
  };

  return (
    <Box>
      <Box fontSize="xl" fontWeight="bold" color="blue.500" mb={2}>
        groupByOption: {groupByOption !== "" ? groupByOption : "無"}
      </Box>
      <RadioGroup onChange={handleChange} value={groupByOption}>
        <Stack direction="row">
          <Radio size="lg" value="">
            조건 無
          </Radio>
          <Radio size="lg" value="member">
            멤버별
          </Radio>
          <Radio size="lg" value="importance">
            중요도별2
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RadioButtonForGroupByOptionForTaskListUntilYesterday;

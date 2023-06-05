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
            Default
          </Radio>
          <Radio size="lg" value="member">
            Member
          </Radio>
          <Radio size="lg" value="importance">
            Importance
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RadioButtonForGroupByOptionForTaskListUntilYesterday;

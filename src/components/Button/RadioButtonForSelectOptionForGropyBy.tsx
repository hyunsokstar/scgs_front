import * as React from "react";
import { Text, Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";

interface RadioButtonForSelectOptionForGropyByProps {
  groupByOption: string;
  setGroupByOption: (value: string) => void;
}

const RadioButtonForSelectOptionForGropyBy: React.FC<
  RadioButtonForSelectOptionForGropyByProps
> = ({ groupByOption, setGroupByOption }) => {
  const handleChange = (value: string) => {
    setGroupByOption(value);
  };

  return (
    <Box>
      {/* <Box fontSize="xl" fontWeight="bold" color="blue.500" mb={2}>
        groupBy: {groupByOption !== "" ? groupByOption : "無"}
      </Box> */}
      <RadioGroup onChange={handleChange} value={groupByOption}>
        <Stack direction="row" spacing={5}>
          <Radio size="lg" value="">
            조건 無
          </Radio>
          <Radio size="lg" value="member">
            멤버별
          </Radio>
          <Radio size="lg" value="importance">
            중요도별
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RadioButtonForSelectOptionForGropyBy;

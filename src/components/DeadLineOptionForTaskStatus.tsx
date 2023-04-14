import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type DeadlineOption = "" | "deadlineSoon" | "deadlinePassed";

interface Props {
  value: DeadlineOption;
  onChange: (value: DeadlineOption) => void;
}

const DeadLineOptionForTaskStatus: React.FC<Props> = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onChange={(value) => onChange(value as DeadlineOption)}>
      <Stack direction="row">
        <Radio value="deadlineSoon">Deadline Soon</Radio>
        <Radio value="deadlinePassed">Deadline Passed</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default DeadLineOptionForTaskStatus;

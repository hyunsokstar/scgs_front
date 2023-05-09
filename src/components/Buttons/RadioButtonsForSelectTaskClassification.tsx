import { useState } from "react";
import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";

type TaskClassification =
  | "crud"
  | "new-future"
  | "trouble-shooting"
  | "ui-task"
  | "refactoring"
  | "optimization"
  | "boiler-plate"
  | "test-code";

type RadioButtonsForSelectTaskClassificationProps = {
  selectedClassification: TaskClassification;
  setSelectedClassification: React.Dispatch<
    React.SetStateAction<TaskClassification>
  >;
};

const TaskClassificationChoices: TaskClassification[] = [
  "crud",
  "new-future",
  "trouble-shooting",
  "ui-task",
  "refactoring",
  "optimization",
  "boiler-plate",
  "test-code",
];

export function RadioButtonsForSelectTaskClassification({
  selectedClassification,
  setSelectedClassification,
}: RadioButtonsForSelectTaskClassificationProps) {
  const handleClassificationChange = (e: any) => {
    console.log("e : ", e);
    setSelectedClassification(e);
  };

  return (
    <Box display={"flex"} flexDirection="column">
      <p>Selected classification: {selectedClassification}</p>
      <RadioGroup
        colorScheme="blue"
        value={selectedClassification}
        onChange={handleClassificationChange}
      >
        <Stack direction="column">
          {TaskClassificationChoices.map((classification) => (
            <Radio key={classification} value={classification} size="lg">
              {classification}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}

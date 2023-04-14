// import { Switch, SwitchProps } from '@chakra-ui/react';

import { Switch } from "@chakra-ui/react";
import { SwitchButtonForFilterOptionForWhetherToHelpRequestProps } from "../../types/project_progress/project_progress_type";

const SwitchButtonForFilterOption = ({
  isChecked,
  onToggle,
}: SwitchButtonForFilterOptionForWhetherToHelpRequestProps) => {
  return (
    <Switch
      size="lg"
      isChecked={isChecked}
      onChange={(e) => onToggle(e.target.checked)}
    />
  );
};

export default SwitchButtonForFilterOption;

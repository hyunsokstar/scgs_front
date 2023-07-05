import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";

interface SlideToggleButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  in_progress?: boolean;
  is_testing?: boolean;
  onColor?: string;
  offColor?: string;
  is_disabled?: boolean;
}

const SlideToggleButton: React.FC<SlideToggleButtonProps> = ({
  onChange,
  checked,
  in_progress,
  is_testing,
  onColor,
  offColor,
  is_disabled,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [is_disabled_option, set_is_disabled_option] = useState(is_disabled);

  useEffect(() => {
    if (in_progress === true || is_testing === true || is_disabled) {
      set_is_disabled_option(true);
    } else {
      set_is_disabled_option(false);
    }
  }, [in_progress, is_testing, is_disabled]);

  const handleToggleChange = (checked: boolean) => {
    // setIsChecked(checked);
    onChange(checked);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Switch
        onChange={handleToggleChange}
        checked={isChecked}
        onColor={onColor ? onColor : "#86d3ff"}
        offColor={offColor ? offColor : "#888888"}
        uncheckedIcon={false}
        checkedIcon={false}
        disabled={is_disabled_option}
      />
    </Box>
  );
};

export default SlideToggleButton;

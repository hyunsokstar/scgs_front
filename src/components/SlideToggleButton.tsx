import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";

interface SlideToggleButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  in_progress?: boolean;
  is_testing?: boolean;
}

const SlideToggleButton: React.FC<SlideToggleButtonProps> = ({
  onChange,
  checked,
  in_progress,
  is_testing
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [is_disabled_option ,set_is_disabled_option] = useState(false)

  useEffect(() => {
  if(in_progress === true || is_testing === true){
    set_is_disabled_option(true)
  } else {
    set_is_disabled_option(false)
  }
  }, [in_progress, is_testing])

  const handleToggleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Switch
        onChange={handleToggleChange}
        checked={isChecked}
        onColor="#86d3ff"
        offColor="#888888"
        uncheckedIcon={false}
        checkedIcon={false}
        disabled={is_disabled_option}
      />
    </Flex>
  );
};

export default SlideToggleButton;

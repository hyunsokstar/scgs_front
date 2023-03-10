import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Switch from "react-switch";

interface SlideToggleButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const SlideToggleButton: React.FC<SlideToggleButtonProps> = ({
  onChange,
  checked,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

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
      />
    </Flex>
  );
};

export default SlideToggleButton;

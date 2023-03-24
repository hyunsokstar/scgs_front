import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Switch from "react-switch";

interface SlideToggleButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const SlideToggleButtonForInProgress: React.FC<SlideToggleButtonProps> = ({
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
        onColor="#FFFF00" // 스위치가 켜졌을 때 색상 지정
        offColor="#888888"
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </Flex>
  );
};

export default SlideToggleButtonForInProgress;

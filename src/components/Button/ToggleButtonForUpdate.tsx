import { useState } from "react";
import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";

interface ToggleButtonForUpdateProps extends ButtonProps {
  currentState: boolean | undefined;
  onChangeHandler: (state: boolean) => void;
}

const ToggleButtonForUpdate = ({
  currentState,
  onChangeHandler,
  ...rest
}: ToggleButtonForUpdateProps) => {
  const [isOn, setIsOn] = useState(currentState);
  const pastelColor = useColorModeValue("blue.300", "blue.500"); // 파스텔톤 색상을 설정합니다.

  const handleClick = () => {
    setIsOn(!isOn);
    onChangeHandler(!isOn);
  };

  return (
    <Button
      variant={"outline"}
      size="sm"
      bg={isOn ? pastelColor : "gray.200"}
      _hover={{ bg: isOn ? pastelColor : "gray.300" }}
      _active={{ bg: isOn ? pastelColor : "gray.400" }}
      onClick={handleClick}
      {...rest}
    >
      {isOn ? "On" : "Off"}
    </Button>
  );
};

export default ToggleButtonForUpdate;

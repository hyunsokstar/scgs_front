import { useState } from "react";
import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";

interface ToggleButtonForUpdateProps extends ButtonProps {
  currentState: boolean | undefined;
  onChangeHandler: (state: boolean| undefined) => void;
  setEditMode?: any
  editMode?: boolean | undefined
}

const ToggleButtonForUpdate = ({
  currentState,
  onChangeHandler,
  editMode,
  setEditMode,
  ...rest
}: ToggleButtonForUpdateProps) => {
  const [isOn, setIsOn] = useState<any>(editMode);
  const pastelColor = useColorModeValue("blue.300", "blue.500"); // 파스텔톤 색상을 설정합니다.

  const handleClick = () => {
    setIsOn(editMode);
    setEditMode(!editMode)
    onChangeHandler(editMode);
  };

  return (
    <Button
      variant={"outline"}
      size="sm"
      bg={!editMode ? "blue.200" : "red.200"}
      _hover={{ bg: isOn ? pastelColor : "red.300" }}
      onClick={handleClick}
      {...rest}
    >
      {editMode ? "Edit mode Off" : "Edit mode On"}
    </Button>
  );
};

export default ToggleButtonForUpdate;

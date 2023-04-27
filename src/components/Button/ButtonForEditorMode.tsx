import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
};

const ButtonForEditorMode = ({ editMode, setEditMode }: Props) => {
  //   const [isToggledOn, setIsToggledOn] = useState(editMode);

  const handleClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Box display={"flex"} justifyContent={"flex-end"} border={"0px solid blue"}>
      <Button
        variant="outline"
        size="sm"
        colorScheme={editMode ? "green" : "pink"}
        borderColor={editMode ? "green.400" : "pink.400"}
        _hover={{
          bg: editMode ? "green.50" : "pink.50",
          borderColor: editMode ? "green.300" : "pink.300",
        }}
        onClick={handleClick}
      >
        {editMode ? "On" : "Off"}
      </Button>
    </Box>
  );
};

export default ButtonForEditorMode;

import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


type Props = {
  setEditMode: any;
  editMode: boolean | undefined;
  button_text: string;
};

const ButtonForEditorMode = ({ button_text, editMode, setEditMode }: Props) => {
  //   const [isToggledOn, setIsToggledOn] = useState(editMode);
  

  const handleClick = () => {
    if(editMode) {

    }

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
        {button_text}
      </Button>
    </Box>
  );
};

export default ButtonForEditorMode;

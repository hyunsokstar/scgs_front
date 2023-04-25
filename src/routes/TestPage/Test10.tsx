import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { selectButton } from "../../reducers/studyNoteSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

interface Props {
  buttonNumbers: number;
}

const pagesData = Array.from({ length: 10 }, (_, i) => i + 1);

const Test10: React.FC<Props> = ({ buttonNumbers }) => {
  const selectedButtons = useSelector(
    (state: RootState) => state.studyNote.selectedButtons
  );

  const dispatch = useDispatch();
  //   const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleButtonClick = (buttonNumber: number) => {
    dispatch(selectButton(buttonNumber));
  };

  return (
    <Box>
      <Box display={"flex"} gap={2}>
        {selectedButtons.length !== 0
          ? selectedButtons.map((num) => {
              return (
                <Box onClick={() => handleButtonClick(num)}>{num}</Box>
              );
            })
          : (
            <Box>no data</Box>
          )}
      </Box>

      {pagesData.map((page) => {
        // console.log("currentPage, page", typeof currentPage, typeof page);   

        return (
          <Button
            key={page}
            width={"10px"}
            height={"30px"}
            variant="outline"
            // borderColor={currentPage == page ? "red" : "blue"}
            onClick={() => handleButtonClick(page)}
            style={{
              width: "25px",
              height: "25px",
              margin: "5px",
              backgroundColor: selectedButtons.includes(page)
                ? "#ffcdd2"
                : "#e0e0e0",
            }}
            borderRadius="0"
          >
            {page}
          </Button>
        );
      })}
    </Box>
  );
};

export default Test10;

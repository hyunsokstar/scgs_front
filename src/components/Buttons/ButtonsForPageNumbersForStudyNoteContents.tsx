import { Box, Button, ButtonProps, Input } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { selectButton } from "../../reducers/studyNoteSlice";

interface ButtonsForPageNumbersForStudyNoteContentsProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
// const pagesData = Array.from({ length: 50 }, (_, i) => i + 1);

const ButtonsForPageNumbersForStudyNoteContents: React.FC<
  ButtonsForPageNumbersForStudyNoteContentsProps & ButtonProps
> = ({ currentPage, setCurrentPage }) => {
  // state
  const dispatch = useDispatch();

  // const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const selectedButtons = useSelector(
    (state: RootState) => state.studyNote.selectedButtons
  );

  const [pagesData, setpagesData] = useState(
    Array.from({ length: 50 }, (_, i) => i + 1)
  );

  const clickHandlerForPageButton = (buttonNumber: number) => {
    if (selectedButtons.includes(buttonNumber)) {
      dispatch(selectButton(buttonNumber));
    } else {
      dispatch(selectButton(buttonNumber));
    }
    setCurrentPage(buttonNumber);
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      {/* <Input type="text" value={selectedButtons.join(",")} readOnly /> */}

      <InputGroup>
        {/* <InputLeftElement>
          <Button>pagenums</Button>
        </InputLeftElement> */}
        <Input placeholder="Input" value={selectedButtons.join(",")} readOnly />
        <InputRightElement width="auto">
          <Button>-</Button>
          <Button>+</Button>
        </InputRightElement>
      </InputGroup>

      <Box>
        {pagesData.map((page) => {
          console.log("currentPage, page", typeof currentPage, typeof page);

          return (
            <Button
              key={page}
              width={"10px"}
              height={"30px"}
              variant="outline"
              borderColor={currentPage == page ? "red" : "blue"}
              onClick={() => clickHandlerForPageButton(page)}
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
    </Box>
  );
};

export default ButtonsForPageNumbersForStudyNoteContents;

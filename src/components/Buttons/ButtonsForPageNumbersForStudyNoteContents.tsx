import { Box, Button, ButtonProps, Input } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  selectButton,
  initalizeSelctButtons,
  initializeCurrentPage,
} from "../../reducers/studyNoteSlice";
import ButtonForEditorMode from "../Button/ButtonForEditorMode";

interface ButtonsForPageNumbersForStudyNoteContentsProps {
  currentPage: number;
  exist_page_numbers: number[];
  selectedButtonsData: number[];
}

// 1122
const ButtonsForPageNumbersForStudyNoteContents: React.FC<
  ButtonsForPageNumbersForStudyNoteContentsProps
> = ({ currentPage, selectedButtonsData, exist_page_numbers }) => {
  const dispatch = useDispatch();
  const [pagesData, setpagesData] = useState(
    Array.from({ length: 50 }, (_, i) => i + 1)
  );
  const [editMode, setEditMode] = useState(false);
  const clickHandlerForPageButton = (buttonNumber: number) => {
    dispatch(selectButton({ buttonNumber, editMode }));
  };

  const handlerForApply = () => {
    console.log("handlerForApply : ", selectedButtonsData);
    exist_page_numbers.map((number) => {
      dispatch(selectButton({ buttonNumber: number, editMode }));
    });
  };

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={1}
      width={"100%"}
      border={"1px solid green"}
    >
      <Box width={"100%"} pt={1}>
        <ButtonForEditorMode
          editMode={editMode}
          setEditMode={setEditMode}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Box>

      <InputGroup>
        <Input
          placeholder="Input"
          defaultValue={exist_page_numbers?.join(",")}
        />
        <InputRightElement width="auto">
          <Button onClick={() => handlerForApply()}>apply</Button>
        </InputRightElement>
      </InputGroup>

      {/* 페이지 넘버 출력 start */}
      <Box px={"auto"} border={"1px solid green"}>
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
                width: "30px",
                height: "30px",
                margin: "5px",
                backgroundColor: selectedButtonsData?.includes(page)
                  ? "rgba(46, 204, 113, 1)"
                  : "white",
              }}
              borderRadius="0"
            >
              {page}
            </Button>
          );
        })}
      </Box>
      {/* 페이지 넘버 출력 end */}
    </Box>
  );
};

export default ButtonsForPageNumbersForStudyNoteContents;
function num(value: number, index: number, array: number[]): unknown {
  throw new Error("Function not implemented.");
}

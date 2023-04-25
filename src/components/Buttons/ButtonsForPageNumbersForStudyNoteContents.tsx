import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Input,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  selectButton,
  moveToBeforPage,
  moveToNextPage
} from "../../reducers/studyNoteSlice";
import ButtonForEditorMode from "../Button/ButtonForEditorMode";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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

  const pageMoveButtonHandler = (direction: string) => {
    if (direction === "left") {
      dispatch(moveToBeforPage(currentPage - 1));
    }
    
    if (direction === "right") {
      dispatch(moveToNextPage(currentPage + 1));
    }
  };

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={1}
      width={"100%"}
      border={"1px solid green"}
    >
      {/* {exist_page_numbers} */}
      <HStack width={"100%"} pt={1} px={1}>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          variant="outline"
          colorScheme="teal"
          size="md"
          mr={2}
          _hover={{ bg: "teal.100", color: "white" }}
          onClick={() => pageMoveButtonHandler("left")}
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          variant="outline"
          colorScheme="teal"
          size="md"
          _hover={{ bg: "teal.100", color: "white" }}
          onClick={() => pageMoveButtonHandler("right")}

        />

        <Button
          onClick={() => handlerForApply()}
          variant="outline"
          size="md"
          colorScheme="teal"
          borderWidth="2px"
          borderColor="teal.300"
          _hover={{ bg: "teal.100", color: "white" }}
        >
          Apply
        </Button>
        <ButtonForEditorMode editMode={editMode} setEditMode={setEditMode} />
      </HStack>
      <Box
        display="flex"
        justifyContent="space-between"
        border={"1px solid blue"}
        mt={0}
        w={"100%"}
        p={1}
      >
        <Button
          variant="outline"
          size="md"
          colorScheme="purple"
          borderColor="purple.500"
          _hover={{ bg: "purple.50", borderColor: "purple.300" }}
        >
          -1
        </Button>
        <Button
          variant="outline"
          size="md"
          colorScheme="purple"
          borderColor="purple.500"
          _hover={{ bg: "purple.50", borderColor: "purple.300" }}
        >
          +1
        </Button>
        <Button
          variant="outline"
          size="md"
          colorScheme="red"
          borderColor="red.500"
          _hover={{ bg: "red.50", borderColor: "red.300" }}
        >
          <FaTrashAlt />
        </Button>
        <Button
          variant="outline"
          size="md"
          colorScheme="red"
          borderColor="red.500"
          _hover={{ bg: "red.50", borderColor: "red.300" }}
        >
          Cancle
        </Button>
      </Box>{" "}
      {/* <InputGroup>
        <Input
          placeholder="Input"
          defaultValue={exist_page_numbers?.join(",")}
        />
      </InputGroup> */}
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
                width: "25px",
                height: "25px",
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

import { Box, Button, ButtonProps } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ButtonsForPageNumbersForStudyNoteContentsProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
// const pagesData = Array.from({ length: 50 }, (_, i) => i + 1);

const ButtonsForPageNumbersForStudyNoteContents: React.FC<
  ButtonsForPageNumbersForStudyNoteContentsProps & ButtonProps
> = ({ currentPage, setCurrentPage }) => {
  const [pagesData, setpagesData] = useState(
    Array.from({ length: 50 }, (_, i) => i + 1)
  );

  const clickHandlerForPageButton = (page: number) => {
    console.log("clickHandlerForPageButton : ", clickHandlerForPageButton);
    setCurrentPage(page);
  };

  useEffect(() => {
    // currentPage 값이 변경될 때마다 컴포넌트를 리렌더링 함
    setpagesData(Array.from({ length: 50 }, (_, i) => i + 1));
  }, [currentPage]);

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      {currentPage}
      <Box>
        {pagesData.map((page) => {
          console.log("currentPage, page", typeof currentPage, typeof page);

          if (currentPage == page) {
            return (
              <Button
                key={page}
                width={"10px"}
                height={"30px"}
                variant="outline"
                border={"2px solid red"}
                onClick={() => clickHandlerForPageButton(page)}
                borderRadius="0"
              >
                {page}
              </Button>
            );
          } else {
            return (
              <Button
                key={page}
                width={"10px"}
                height={"30px"}
                variant="outline"
                borderColor={"blue"}
                onClick={() => clickHandlerForPageButton(page)}
                borderRadius="0"
              >
                {page}
              </Button>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default ButtonsForPageNumbersForStudyNoteContents;

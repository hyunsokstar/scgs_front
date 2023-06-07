import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ImageSlideForUncompletedTaskListForChecked from "../components/ImageSlideForUncompletedTaskListForChecked";

interface Props {}

const UncompltedTaskListWithImageSlideForCheckedPage = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkedRowPks = queryParams.get("checkedRowPks")?.split(",") || [];

  const numSlides = 3;
  const dataForTaskListForChecked = ["1", "2", "3"];

  
  return (
    <Box>
      UncompltedTaskListWithImageSlideForCheckedPage
      <ImageSlideForUncompletedTaskListForChecked
        numSlides={numSlides}
        dataForTaskListForChecked={dataForTaskListForChecked}
      />
      <ul>
        {checkedRowPks.map((rowPk) => (
          <li key={rowPk}>{rowPk}</li>
        ))}
      </ul>
    </Box>
  );
};

export default UncompltedTaskListWithImageSlideForCheckedPage;

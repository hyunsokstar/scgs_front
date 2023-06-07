import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ImageSlideForUncompletedTaskListForChecked from "../components/ImageSlideForUncompletedTaskListForChecked";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { typeForTaskListForChecked } from "../types/project_progress/project_progress_type";
import { apiForGetTaskListForCheckedPks } from "../apis/project_progress_api";

interface Props {}

// 1122
const UncompltedTaskListWithImageSlideForCheckedPage = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkedRowPks = queryParams.get("checkedRowPks")?.split(",") || [];
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForCheckedPks", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );

  // 이미지 슬라이드 관련
  const numSlides = 3;
  const dataForTaskListForChecked = ["1", "2", "3"];

  // 2244
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

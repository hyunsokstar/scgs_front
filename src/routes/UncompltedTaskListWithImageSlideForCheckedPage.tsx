import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ImageSlideForUncompletedTaskListForChecked from "../components/ImageSlideForUncompletedTaskListForChecked";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { typeForTaskListForChecked } from "../types/project_progress/project_progress_type";
import { apiForGetTaskListForCheckedPks } from "../apis/project_progress_api";

interface Props {}

const UncompltedTaskListWithImageSlideForCheckedPage = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkedRowPks = queryParams.get("checkedRowPks")?.split(",") || [];
  const queryClient = useQueryClient();
  
  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskDetailListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForCheckedPksForImageSlide", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );

  if (isLoading) {
    // 데이터 로딩 중 상태를 표시하거나 스켈레톤 UI를 사용할 수 있습니다.
    return <div>Loading...??</div>;
  }

  if (!dataForTaskListForCheckedPks) {
    // 데이터가 없거나 로딩에 실패한 경우 에러 메시지를 표시할 수 있습니다.
    return <div>Error: Failed to load data</div>;
  }

  const numSlides = dataForTaskListForCheckedPks.total_count;
  const dataForTaskListForChecked =
    dataForTaskListForCheckedPks.ProjectProgressList;

  return (
    <Box>
      {/* UncompltedTaskListWithImageSlideForCheckedPage */}
      <ImageSlideForUncompletedTaskListForChecked
        numSlides={numSlides}
        dataForTaskListForChecked={dataForTaskListForChecked}
        refetch={refatchForTaskDetailListForCheckedPks}
      />
      {/* <ul>
        {checkedRowPks.map((rowPk) => (
          <li key={rowPk}>{rowPk}</li>
        ))}
      </ul> */}
    </Box>
  );
};

export default UncompltedTaskListWithImageSlideForCheckedPage;

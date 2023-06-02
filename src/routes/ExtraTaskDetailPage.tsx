import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { Box, Divider } from "@chakra-ui/react";
import { apiForExtraTaskDetail } from "../apis/project_progress_api";
import DetailInfoForExtraTask from "../components/DetailInfoForExtraTask";
import ChatStyleBoard from "../components/ChatStyleBoard";
import BriefingBoardForExtraTask from "../components/BriefingBoardForExtraTask";
import TestListForTaskDetail from "../components/TestList/TestListForTaskDetail";
import ModalButtonForCreateTest from "../components/modal/ModalButtonForCreateTest";
import TestListForExtraTask from "../components/TestList/TestListForExtraTask";

interface Props {}

const ExtraTaskDetailPage = (props: Props) => {
  let { taskPk: ExtraTaskPk } = useParams();
  const {
    data: dataForExtraTaskDetail,
    isLoading: isLoadingForExtraTaskDetail,
    refetch: refetchForExtraTaskDetail,
  } = useQuery<any>(
    ["apiForExtraTaskDetail", ExtraTaskPk],
    apiForExtraTaskDetail
  );
  console.log("dataForExtraTaskDetail : ", dataForExtraTaskDetail);
  if (isLoadingForExtraTaskDetail || !dataForExtraTaskDetail) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box>
      <Box display="flex" mt={5}>
        <Box width="50%">
          <Box fontSize={"24px"} fontFamily={"sans-serif"}>
            extra task detail info area
          </Box>
          <DetailInfoForExtraTask extraTaskDetail={dataForExtraTaskDetail} />
        </Box>
        <Divider orientation="vertical" mx={1} />
        <Box width="50%">
          <Box fontSize={"24px"} fontFamily={"sans-serif"}>
            briefing board for extra task
          </Box>
          <BriefingBoardForExtraTask
            taskPk={dataForExtraTaskDetail.pk}
            task_manager={dataForExtraTaskDetail?.task_manager}
            task_comments={dataForExtraTaskDetail?.task_comments}
          />
        </Box>
      </Box>
      10
      <TestListForExtraTask
        taskPk={ExtraTaskPk}
        testData={dataForExtraTaskDetail.tests_for_extra_task}
      />
      <Box border={"1px solid green"} w={"100%"} mt={10}>
        test result 등록 영역
      </Box>
    </Box>
  );
};

export default ExtraTaskDetailPage;

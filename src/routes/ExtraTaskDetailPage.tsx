import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // 임포트 위치 최상단
import { Box } from "@chakra-ui/react";
import { apiForExtraTaskDetail } from "../apis/project_progress_api";
import DetailInfoForExtraTask from "../components/DetailInfoForExtraTask";
import BriefingBoardForExtraTask from "../components/BriefingBoardForExtraTask";
import TestListForExtraTask from "../components/TestList/TestListForExtraTask";
import DropZoneForReferImagesForExtraTask from "../components/DragZone/DropZoneForReferImagesForExtraTask";
import { IExtraTaskDetailData } from "../types/project_progress/project_progress_type";

interface Props {}

const ExtraTaskDetailPage = (props: Props) => {
  let { taskPk: ExtraTaskPk } = useParams();
  const {
    data: dataForExtraTaskDetail,
    isLoading: isLoadingForExtraTaskDetail,
    refetch: refetchForExtraTaskDetail,
  } = useQuery<IExtraTaskDetailData>(
    ["apiForExtraTaskDetail", ExtraTaskPk],
    apiForExtraTaskDetail
  );
  console.log("dataForExtraTaskDetail : ", dataForExtraTaskDetail);
  if (isLoadingForExtraTaskDetail || !dataForExtraTaskDetail) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box>
      <Box mt={1} width={"100%"} border={"0px solid red"} display={"flex"} height={"730px"}>
        <Box width="50%" display={"flex"}>
          <Box width={"70%"} height={"100%"}>
            {/* Update Form For ExtraTask, task description task status , task url */}
            <DetailInfoForExtraTask extraTaskDetail={dataForExtraTaskDetail} />
          </Box>

          <Box width={"30%"} height={"100%"} bg={"blue.100"}>
            <DropZoneForReferImagesForExtraTask
              taskPk={ExtraTaskPk}
              refer_images={dataForExtraTaskDetail.task_images}
            />
          </Box>
        </Box>
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

      <Box mt={5}>
        <TestListForExtraTask
          listTitle={"Test List For Extra Task"}
          taskPk={ExtraTaskPk}
          testData={dataForExtraTaskDetail.tests_for_extra_task}
          refetch={refetchForExtraTaskDetail}
        />
      </Box>

      <Box border={"1px solid green"} w={"100%"} mt={10}>
        test result 등록 영역
      </Box>
    </Box>
  );
};

export default ExtraTaskDetailPage;

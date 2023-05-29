import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { Box, Divider  } from "@chakra-ui/react";
import { apiForExtraTaskDetail } from "../apis/project_progress_api";
import DetailForExtraTask from "../components/DetailForExtraTask";

interface Props {}

const ExtraTaskDetailPage = (props: Props) => {
  let { taskPk: ExtraTaskDetailPk } = useParams();
  const {
    data: dataForExtraTaskDetail,
    isLoading: isLoadingForExtraTaskDetail,
    refetch: refetchForExtraTaskDetail,
  } = useQuery<any>(
    ["apiForExtraTaskDetail", ExtraTaskDetailPk],
    apiForExtraTaskDetail
  );
  console.log("dataForExtraTaskDetail : ", dataForExtraTaskDetail);
  if (isLoadingForExtraTaskDetail || !dataForExtraTaskDetail) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box display="flex">
      <Box width="50%">
        <DetailForExtraTask extraTaskDetail={dataForExtraTaskDetail} />
      </Box>
      <Divider orientation="vertical" mx={1} />
      <Box width="50%">
        <DetailForExtraTask extraTaskDetail={dataForExtraTaskDetail} />
      </Box>
    </Box>
  );
};

export default ExtraTaskDetailPage;

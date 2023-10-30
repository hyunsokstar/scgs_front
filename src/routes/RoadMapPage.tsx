import React, { useState } from "react";

import { Box, Center, Grid } from "@chakra-ui/react"; // Grid 추가
import CardListForRoadMap from "../components/Card/CardListForRoadMap";
import { useQuery } from "@tanstack/react-query";
import { apiForRoadMapList } from "../apis/study_note_api";

interface Props {}

const RoadMapPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isRoading,
    data: dataForRoadMap,
    refetch: refetchForDataForLoadMap,
  } = useQuery<any>(["apiForGetRoloadMapList", pageNum], apiForRoadMapList, {
    enabled: true,
  });

  return (
    <Box>
      <Center>카드 리스트</Center>
      <Grid templateColumns="3fr 1fr" gap={4}> {/* Grid 컴포넌트로 전체 영역을 3:1 비율로 나누기 */}
        <CardListForRoadMap /> {/* 왼쪽 사이드 */}
        <Box bg="gray.200">오른쪽 사이드 영역</Box> {/* 오른쪽 사이드 - 배경색 적용 */}
      </Grid>
    </Box>
  );
};

export default RoadMapPage;
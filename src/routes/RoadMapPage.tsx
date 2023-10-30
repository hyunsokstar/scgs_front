import React, { useState } from "react";
import { Box, Center, Grid } from "@chakra-ui/react"; // Grid 추가
import CardListForRoadMap from "../components/Card/CardListForRoadMap";
import { useQuery } from "@tanstack/react-query";
import { apiForRoadMapList } from "../apis/study_note_api";
import { DataTypeForRoadMapList } from "../types/study_note_type";

interface Props {}

const RoadMapPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isRoading,
    data: dataForRoadMap,
    refetch: refetchForDataForLoadMap,
  } = useQuery<DataTypeForRoadMapList>(
    ["apiForGetRoloadMapList", pageNum],
    apiForRoadMapList,
    {
      enabled: true,
    }
  );
  console.log("dataForRoadMap : ", dataForRoadMap);

  return (
    <Box>
      <Center>카드 리스트</Center>
      <Grid templateColumns="3fr 1fr" gap={4}>
        {/* 왼쪽 사이드 */}
        <Box>
          {dataForRoadMap ? (
            <CardListForRoadMap dataForRoadMap={dataForRoadMap} />
          ) : (
            ""
          )}
        </Box>
        {/* 오른쪽 사이드 */}
        <Box bg="gray.200">오른쪽 사이드 영역</Box>{" "}
      </Grid>
    </Box>
  );
};

export default RoadMapPage;

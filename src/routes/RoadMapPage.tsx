import React, { useState } from "react";
import { Box, Button, Center, Grid } from "@chakra-ui/react"; // Grid 추가
import CardListForRoadMap from "../components/Card/CardListForRoadMap";
import { useQuery } from "@tanstack/react-query";
import { apiForRoadMapList } from "../apis/study_note_api";
import { DataTypeForRoadMapList } from "../types/study_note_type";
import ModalButtonForCreateRoadMap from "../components/modal/ModalButtonForCreateRoadMap";
import useUser from "../lib/useUser";

interface Props {}

const RoadMapPage = (props: Props) => {
  const { userLoading, user: loginUser, isLoggedIn } = useUser();
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
      <Grid templateColumns="3fr 1fr" gap={4}>
        {/* 왼쪽 사이드 */}
        <Box>
          <Box display={"flex"} justifyContent={"flex-end"} py={2 }>
            <ModalButtonForCreateRoadMap buttonText="create road map" />
          </Box>

          {dataForRoadMap ? (
            <CardListForRoadMap
              dataForRoadMap={dataForRoadMap}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          ) : (
            ""
          )}
        </Box>
        <Box bg="gray.200">오른쪽 사이드 영역</Box>{" "}
      </Grid>
    </Box>
  );
};

export default RoadMapPage;

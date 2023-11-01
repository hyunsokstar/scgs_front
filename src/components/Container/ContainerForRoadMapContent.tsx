import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { apiForRoadMapContentList } from "../../apis/study_note_api";

interface IProps {
  roadMapId: number;
}

const ContainerForRoadMapContent = ({ roadMapId }: IProps) => {
  // 가짜 데이터 예시 (임시로 작성된 데이터)
  const fakeData = [
    { id: 1, title: "가짜 데이터 1", description: "이것은 첫 번째 가짜 데이터입니다." },
    { id: 2, title: "가짜 데이터 2", description: "두 번째 가짜 데이터입니다." },
  ];

  const {
    isLoading: isRoading,
    data: dataForRoadMapContent,
    refetch: refetchForDataForLoadMap,
  } = useQuery<any>(
    ["apiForGetRoloadMapList", roadMapId],
    apiForRoadMapContentList,
    {
      enabled: true,
    }
  );

  return (
    <Box width="80%" margin="auto">
      <Text fontSize="xl" fontWeight="bold">로드맵 for {roadMapId}</Text>
      {fakeData.map((data) => (
        <Box
          key={data.id}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          my={4}
          width="100%"
          display="flex"
          flexDirection="column"
        >
          <img
            src={"https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"}
            alt={data.title}
            style={{ height: "40%", width: "100%", objectFit: "cover" }}
          />
          <Text fontWeight="bold">{data.title}</Text>
          <Text>{data.description}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ContainerForRoadMapContent;

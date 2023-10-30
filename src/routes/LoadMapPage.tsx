import { Box, Center } from "@chakra-ui/react";
import React from "react";
import CardListForRoadMap from "../components/Card/CardListForRoadMap";

interface Props {}

const LoadMapPage = (props: Props) => {
  return (
    <Box>
      <Center>카드 리스트</Center>
      <CardListForRoadMap />
    </Box>
  );
};

export default LoadMapPage;

import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const TeamStatusDetailPage = (props: Props) => {
  const { userPk } = useParams();

  return <Box>TeamStatusDetailPage {userPk}</Box>;
};

export default TeamStatusDetailPage;

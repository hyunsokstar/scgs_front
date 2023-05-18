import React from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiForGetDataForDailyTaskCountForPersonalUser } from "../../apis/project_progress_api";


interface Props {}

const BarChartForDailyTaskCountForPersonalUserPage = (props: Props) => {
  const { userPk } = useParams();
  const { isLoading, data: dataForDailyTaskCountForPersonalUser } = useQuery<any>([`getDailyTaskCountForPersonalUser`, userPk], apiForGetDataForDailyTaskCountForPersonalUser);
  console.log("dataForDailyTaskCountForPersonalUser : ", dataForDailyTaskCountForPersonalUser);
  
  
  return <Box>BarChartForDailyTaskCountForPersonalUserPage : {userPk}</Box>;
};

export default BarChartForDailyTaskCountForPersonalUserPage;

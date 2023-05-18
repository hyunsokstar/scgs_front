import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiForGetDataForDailyTaskCountForPersonalUser } from "../../apis/project_progress_api";
import BarChartForDailyTaskCountForPersonalUser from "../../components/Chart/BarChartForDailyTaskCountForPersonalUser";

interface Props {}

const BarChartForDailyTaskCountForPersonalUserPage = (props: Props) => {
  const { userPk } = useParams();
  const { isLoading, data: dataForDailyTaskCountForPersonalUser } =
    useQuery<any>(
      [`getDailyTaskCountForPersonalUser`, userPk],
      apiForGetDataForDailyTaskCountForPersonalUser
    );
  console.log(
    "dataForDailyTaskCountForPersonalUser : ",
    dataForDailyTaskCountForPersonalUser
  );

  return (
    <Box>
      {/* User: {dataForDailyTaskCountForPersonalUser.username} */}
      {/* <Box> */}
      {dataForDailyTaskCountForPersonalUser ? (
        <Box>
          <Box>User: {dataForDailyTaskCountForPersonalUser.username}</Box>

          <BarChartForDailyTaskCountForPersonalUser
            data={dataForDailyTaskCountForPersonalUser.task_count_for_month}
          />
        </Box>
      ) : (
        "no data"
      )}
    </Box>
  );
};

export default BarChartForDailyTaskCountForPersonalUserPage;

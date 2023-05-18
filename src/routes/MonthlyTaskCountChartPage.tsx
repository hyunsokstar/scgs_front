import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const MonthlyTaskCountChartPage = (props: Props) => {
  const { userPk } = useParams();

  return <div>MonthlyTaskCountChartPage {userPk}</div>;
};

export default MonthlyTaskCountChartPage;

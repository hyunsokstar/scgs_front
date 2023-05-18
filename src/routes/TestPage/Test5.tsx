import { FC } from "react";
import BarChartForTaskStatus from "../../components/Chart/BarChartForTaskStatus";
// import { ITypeForTaskStaticsDataForPerson } from "../../types/project_progress/project_progress_type";

const data: any = [
  {
    task_manager: "terecal",
    completed_count_for_task: 0,
    count_for_testing_task: 1,
    uncompleted_count_for_task: 1,
    total_count_for_uncompleted_task: 5,
    total_count_for_completed_task: 8,
  },
  {
    task_manager: "hyun",
    completed_count_for_task: 4,
    count_for_testing_task: 1,
    uncompleted_count_for_task: 3,
    total_count_for_uncompleted_task: 5,
    total_count_for_completed_task: 8,
  },
];

const Example: FC = () => {
  return <BarChartForTaskStatus data={data} />;
};

export default Example;

import { FC } from "react";
import BarChartForTaskStatus from "../../components/Chart/BarChartForTaskStatus";
import { ITypeForTaskStaticsDataForPerson } from "../../types/project_progress/project_progress_type";

const data: ITypeForTaskStaticsDataForPerson = [
  {
    task_manager: "terecal",
    completed_count_for_task: 0,
    count_for_testing_task: 1,
    uncompleted_count_for_task: 1,
  },
  {
    task_manager: "hyun",
    completed_count_for_task: 4,
    count_for_testing_task: 1,
    uncompleted_count_for_task: 3,
  },
];

const Example: FC = () => {
  return <BarChartForTaskStatus data={data} />;
};

export default Example;

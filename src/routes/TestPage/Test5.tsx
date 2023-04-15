import { FC } from "react";
import BarChartForTaskStatus from "../../components/Chart/BarChartForTaskStatus";
import { ITypeForTaskStaticsDataForPerson } from "../../types/project_progress/project_progress_type";

// type TaskManagerInfo = {
//   task_manager: number;
//   completed_count_for_task: number;
//   uncompleted_count_for_task: number;
// }

// type ITypeForTaskStaticsData = TaskManagerInfo[];

// interface Data {
//   name: string;
//   uv: number;
//   pv: number;
//   amt: number;
// }

const data: ITypeForTaskStaticsDataForPerson = [
  {
    task_manager: "terecal",
    completed_count_for_task: 0,
    uncompleted_count_for_task: 1,
  },
  {
    task_manager: "hyun",
    completed_count_for_task: 4,
    uncompleted_count_for_task: 3,
  }
];

const Example: FC = () => {
  return <BarChartForTaskStatus data={data} />;
};

export default Example;

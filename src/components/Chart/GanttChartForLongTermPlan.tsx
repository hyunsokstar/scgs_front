import React from "react";
import { FrappeGantt, ViewMode, Task } from "frappe-gantt-react";
import { LongTermPlanContentList } from "../../types/type_for_plan_maker";

type Props = { dataForPlanContents: LongTermPlanContentList };

const GanttChartForPlanContents = ({ dataForPlanContents }: Props) => {
  const tasks = dataForPlanContents.map((item) => {
    return new Task({
      id: item.id.toString(),
      name: item.name,
      start: item.start,
      end: item.end,
      progress: item.progress,
      dependencies: item.dependencies,
    });
  });

  const viewMode = ViewMode.Day; // or ViewMode.Week, ViewMode.Month

  return <FrappeGantt tasks={tasks} viewMode={viewMode} />;
};

export default GanttChartForPlanContents;

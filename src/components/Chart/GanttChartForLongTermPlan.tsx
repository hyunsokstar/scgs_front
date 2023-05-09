// LongTermPlanContent
import React, { useState } from "react";
import { FrappeGantt, ViewMode, Task } from "frappe-gantt-react";
import { LongTermPlanContentList } from "../../types/type_for_plan_maker";

type Props = { dataForPlanContents: LongTermPlanContentList };

const GanttChartForPlanContents: React.FC<Props> = ({ dataForPlanContents }) => {
  const [tasks, setTasks] = useState<Task[]>(
    dataForPlanContents.map((item) => {
      return new Task({
        id: item.id.toString(),
        name: item.name,
        start: item.start,
        end: item.end,
        progress: item.progress,
        dependencies: item.dependencies,
      });
    })
  );

  const viewMode = ViewMode.Day; // or ViewMode.Week, ViewMode.Month

  const handleTasksChange = (updatedTasks: Task[]) => {
    console.log("updatedTasks : ", updatedTasks);

    // Update the local state
    setTasks(updatedTasks);

    // Call API to update the server, if necessary
    // ...
  };

  return (
    <FrappeGantt
      tasks={tasks}
      viewMode={viewMode}
      onTasksChange={handleTasksChange}
    />
  );
};

export default GanttChartForPlanContents;

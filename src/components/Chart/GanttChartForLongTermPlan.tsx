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

    setTasks(updatedTasks);

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

// import React from 'react'

// interface Props {
  
// }

// const GanttChartForLongTermPlan = (props: Props) => {
//   return (
//     <div>
//       hi
//     </div>
//   )
// }

// export default GanttChartForLongTermPlan

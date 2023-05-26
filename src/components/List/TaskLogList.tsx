import { Avatar, List, ListItem, Text, Box } from "@chakra-ui/react";
import { TypeForTaskLog } from "../../types/project_progress/project_progress_type";

interface TaskLogListProps {
  dataForTaskLogs: TypeForTaskLog[];
  userOptionForList: string;
}


const TaskLogList: React.FC<TaskLogListProps> = ({
  dataForTaskLogs,
  userOptionForList,
}) => {
  let totalMinutes;
  
  return (
    <List>
      {dataForTaskLogs.map((taskLog, index) => {
        if (userOptionForList !== "") {
          totalMinutes = taskLog.time_distance_from_before_my_task;
        } else {
          totalMinutes = taskLog.time_distance_from_before_task;
        }

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const minuteBlocks =
          minutes > 0 ? Array(Math.floor(minutes / 10)).fill("|") : [];

        return (
          <Box>
            <Box border={"0px solid black"}>
              <Text>
                {hours > 0 && <Text>| 1 hour |</Text>}
                {minuteBlocks.map((block, index) => (
                  <Text key={index}>{`${block}`}</Text>
                ))}
              </Text>
            </Box>
            <ListItem key={taskLog.id} display="flex" alignItems="center">
              <Box mr={5}> {index + 1} </Box>
              <Text mr={"100px"}>{taskLog.completed_at_formatted}</Text>
              <Avatar
                src={taskLog.writer.profile_image}
                name={taskLog.writer.username}
                size="sm"
                mr={2}
              />
              <Text>{taskLog.task}</Text>
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
};

export default TaskLogList;

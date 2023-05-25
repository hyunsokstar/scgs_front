import { Avatar, List, ListItem, Text, Box } from "@chakra-ui/react";
import { TypeForTaskLog } from "../../types/project_progress/project_progress_type";

interface TaskLogListProps {
  dataForTaskLogs: TypeForTaskLog[];
}

const TaskLogList : React.FC<TaskLogListProps> = ({ dataForTaskLogs}) => {
  return (
    <List>
      {dataForTaskLogs.map((taskLog, index) => (
        <Box>
          
          <Box border={"0px solid black"}>
            {[
              ...Array(Math.floor(taskLog.time_distance_for_team_task / 6)),
            ].map((_, index) => (
              <Text key={index}>| 1hour |</Text>
            ))}
            {[...Array(taskLog.time_distance_for_team_task % 6)].map(
              (_, index) => (
                <Text key={index}>|</Text>
              )
            )}

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
      ))}
    </List>
  );
};

export default TaskLogList;

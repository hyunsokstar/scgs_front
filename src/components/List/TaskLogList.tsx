import { Avatar, List, ListItem, Text, Box } from "@chakra-ui/react";

interface TaskLog {
  id: number;
  writer: {
    pk: number;
    username: string;
    profile_image: string;
  };
  taskPk: number;
  task: string;
  completed_at: string;
  completed_at_formatted: string;
  time_distance_for_team_task: number;
  time_distance_for_my_task: number;
}

interface TaskLogListProps {
  dataForTaskLogs: TaskLog[];
}

const TaskLogList: React.FC<TaskLogListProps> = ({ dataForTaskLogs }) => {
  return (
    <List>
      {dataForTaskLogs.map((taskLog) => (
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

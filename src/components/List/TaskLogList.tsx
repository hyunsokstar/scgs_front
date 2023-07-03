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

  console.log("dataForTaskLogs.length : ", dataForTaskLogs.length);

  return (
    <List>
      {dataForTaskLogs.length !== 0 ? (
        dataForTaskLogs.map((taskLog, index) => {
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
            <Box width={"100%"} border={"0px solid red"} height={"100%"}>
              {index !== 0 && (
                <Box border={"0px solid black"}>
                  <Text>
                    {hours > 0 && <Text>| 1 hour |</Text>}
                    {minuteBlocks.map((block, index) => (
                      <Text key={index}>{`${block}`}</Text>
                    ))}
                  </Text>
                </Box>
              )}

              <ListItem
                key={taskLog.id}
                display="flex"
                flexDirection={"column"}
                width={["100%", "100%", "50%", "50%"]}
                bg={"yellow.100"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box display={"flex"} gap={2}>
                    <Box mr={5}> {index + 1} </Box>
                    <Text>{taskLog.completed_at_formatted}</Text>
                  </Box>
                  <Avatar
                    src={taskLog.writer.profile_image}
                    name={taskLog.writer.username}
                    size="sm"
                    mr={2}
                  />
                </Box>
                <Text px={2}>{taskLog.task}</Text>
              </ListItem>
            </Box>
          );
        })
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"200px"}
          fontSize={"24px"}
          bg={"orange.100"}
        >
          no task logs
        </Box>
      )}
    </List>
  );
};

export default TaskLogList;

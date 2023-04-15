import { Flex, Box } from "@chakra-ui/react";

function TaskStaticsPage(): JSX.Element {
  return (
    <Flex>
      <Box flex={4} border="1px solid black">
        4의 영역
      </Box>
      <Box flex={2} border="1px solid black">
        2의 영역
      </Box>
    </Flex>
  );
}

export default TaskStaticsPage;
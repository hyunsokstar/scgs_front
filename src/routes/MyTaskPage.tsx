import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskListForMe from "../components/CompletedProjectTaskListForMe";
import UncompletedProjectTaskListForMe from "../components/UncompletedProjectTaskListForMe";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

interface Props {}

function MyTaskPage({}: Props): ReactElement {
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  return (
    <Box width={"100%"} border={"0px solid blue"} mt={2}>
      <Flex direction={"column"} mt={0} width="100%">
        {isLoggedIn ? (
          <VStack mt={0} spacing={5}>
            <UncompletedProjectTaskListForMe />
            <CompletedProjectTaskListForMe />
          </VStack>
        ) : (
          "로그인이 필요 합니다"
        )}
      </Flex>
    </Box>
  );
}

export default MyTaskPage;

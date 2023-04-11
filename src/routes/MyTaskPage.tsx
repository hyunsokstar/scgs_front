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

  console.log("isLoggedIn : ", isLoggedIn);
  console.log("loginUser : ", loginUser);

  return (
    <Box width={"100%"} border={"2px solid blue"}>
      {isLoggedIn ? "로그인중" : "로그아웃 상태"}
      <Flex direction={"column"} mt={0} width="100%">
        {isLoggedIn ? (
          <VStack mt={0}>
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

import {
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  Checkbox,
  IconButton,
  Flex,
  useToast,
  HStack,
  Avatar,
  Button,
  Img,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import TestResultImage, {
  ItypeFortestRow,
} from "../../types/project_progress/project_progress_type";
import {
  apiForDeleteTestForExtraTask,
  apiForupdateTesterListForExtraTask,
  apiForUpdateTestPassedForExtraTask,
  deleteOneTestForTask,
  updateTesterListByTestPkApi,
  updateTestPassedForTestForTask,
} from "../../apis/project_progress_api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SlideToggleButtonForUpateTestPassed from "../SlideToggleButton/SlideToggleButtonForUpateTestPassed";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { CheckIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import ModalButtonForImageUploadForTestResult from "../modal/ModalButtonForImageUploadForTestResult";
import ModalButtonForCreateTest from "../modal/ModalButtonForCreateTest";
import ModalButtonForInsertTestResultImageForExtraTask from "../modal/ModalButtonForInsertTestResultImageForExtraTask";
import ModalButtonForCreateTestForExtraTask from "../modal/ModalButtonForCreateTestForExtraTask";

interface IPropsForTestListForTaskDetail {
  listTitle?: string;
  taskPk?: string | undefined;
  testData: ItypeFortestRow[];
  refetch: () => void;
}

function DataItem({
  pk,
  test_description,
  test_passed,
  testers_for_test_for_extra_task,
  test_method,
  test_result_image,
  test_result_images,
}: ItypeFortestRow) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  console.log("isLoggedIn : ", isLoggedIn);
  console.log("pk : ", pk);

  const mutationForDeleteForTestForExtraTask = useMutation(
    (pk: string | number) => {
      //   return deleteOneTestForTask(pk);
      return apiForDeleteTestForExtraTask(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForExtraTaskDetail"]);
        toast({
          title: "delete test for extra task success!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteTestForExtraTask = (pk: string | number) => {
    const response = mutationForDeleteForTestForExtraTask.mutate(pk);
    console.log("response :", response);
  };

  const mutationForUpdateTestPassedForExtraTask = useMutation(
    apiForUpdateTestPassedForExtraTask,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["getOneProjectTask"]);

        toast({
          status: "success",
          title: "test passed update success",
          description: result.message,
        });
      },
    }
  );

  const toggleButtonHandlerForUpdateTestPassedForExtraTask = (
    taskPk: string | number
  ) => {
    mutationForUpdateTestPassedForExtraTask.mutate(taskPk);
    console.log("update 핸들러 for task_status check pk : ", taskPk);
  };

  // mutationForUpdateTesterListByTestPk
  const mutationForUpdateTesterListForExtraTask = useMutation(
    apiForupdateTesterListForExtraTask,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        queryClient.refetchQueries(["apiForExtraTaskDetail"]);

        toast({
          status: "success",
          title: "test passed update success",
          description: result.message,
        });
      },
    }
  );

  const buttonHandlerForUpdateTesterForExtraTask = (
    testPk: string | number
  ) => {
    mutationForUpdateTesterListForExtraTask.mutate(testPk);
  };

  return (
    <ListItem
      key={pk}
      display="flex"
      alignItems="center"
      overflowX={"auto"}
      width={"100%"}
      my={1}
      border={"0px solid pink"}
    >
      <Flex
        border={"0px solid green"}
        width="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"} width={"50px"}>
          <Checkbox ml={2} />
        </Box>
        <Box>
          <Text border={"0px solid blue"} width="450px">
            {test_description}
          </Text>
        </Box>

        <Box width={"100px"}>
          {/* updateHandlerForTestPassed */}
          <SlideToggleButtonForUpateTestPassed
            onChange={() =>
              toggleButtonHandlerForUpdateTestPassedForExtraTask(pk)
            }
            checked={test_passed}
          />
        </Box>

        {/* 0407 작업중 modal button for image upload */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          border={"0px solid red"}
          textAlign={"end"}
          mr={10}
          width={"420px"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            // alignItems={"center"}
            gap={2}
            border={"0px solid blue"}
            p={3}
          >
            {test_result_images
              ? test_result_images.map((row) => {
                  return (
                    <Box
                      border={"0px solid purple"}
                      display="flex"
                      alignItems={"center"}
                    >
                      <Img
                        src={row.image_url}
                        w={"80px"}
                        h={"80px"}
                        objectFit={"cover"}
                      />
                    </Box>
                  );
                })
              : ""}
          </Box>
          <ModalButtonForInsertTestResultImageForExtraTask
            modalTitle={"register test result image for test for Extra Task"}
            testPk={pk}
          />
        </Box>

        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          width={"280px"}
          border={"0px solid black"}
        >
          <Box>
            {testers_for_test_for_extra_task &&
            testers_for_test_for_extra_task.length !== 0 ? (
              testers_for_test_for_extra_task.map((row: any) => {
                return (
                  <Avatar
                    name={row.tester.username}
                    src={row.tester.profile_image}
                    size="sm"
                    ml={"0px"}
                  />
                );
              })
            ) : (
              <ViewOffIcon boxSize={5} color="gray.500" />
            )}
          </Box>
          <Box>
            {/* 0404 체크 아이콘 누르면 체커 리스트에 로그인 유저 추가 update */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                colorScheme={"teal"} // colorScheme은 필수가 아닙니다.
                size={"sm"} // size는 필수가 아닙니다.
                aria-label={""}
                ml={2}
                onClick={() => buttonHandlerForUpdateTesterForExtraTask(pk)}
              >
                <CheckIcon boxSize={5} />
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Flex>

        <IconButton
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={() => buttonHandlerForDeleteTestForExtraTask(pk)}
          size="sm"
          //   colorScheme="purple.50"
          outline="1px solid"
          _hover={{ bgColor: "red.100" }}
          mr={2}
        />
      </Flex>
    </ListItem>
  );
}

function TestListForExtraTask({
  listTitle,
  taskPk,
  testData,
  refetch
}: IPropsForTestListForTaskDetail) {
  // console.log("testData : ", testData);

  return (
    <Box>
      <Box bg={"white"} width={"100%"} border={"0px solid black"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgColor={"yellow.200"}
          p={1}
          textAlign="center"
        >
          <Box>{listTitle}</Box>
          <ModalButtonForCreateTestForExtraTask
            buttonText={"create test for extra task"}
            taskPk={taskPk}
          />
        </Box>
      </Box>

      <List bg={"gray.50"} spacing={2} height="200px" overflowY="auto">
        {testData.length ? (
          testData?.map((row) => (
            <DataItem
              pk={row.id}
              test_description={row.test_description}
              test_passed={row.test_passed}
              test_method={row.test_method}
              test_result_image={row.test_result_image}
              testers_for_test_for_extra_task={
                row.testers_for_test_for_extra_task
              }
              test_result_images={row.test_result_images}
              refetch={refetch}
            />
          ))
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            fontSize={"20px"}
            fontFamily="Arial, sans-serif"
          >
            No Test Result Data Is Available
          </Box>
        )}
      </List>
    </Box>
  );
}

export default TestListForExtraTask;

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
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { ItypeFortestRow } from "../../types/project_progress/project_progress_type";
import { deleteOneTestForTask } from "../../apis/project_progress_api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IPropsForTestListForTaskDetail {
  testData: ItypeFortestRow[];
}

interface DataItemProps {
  id: number;
  testDescription: string;
  test_status: boolean;
  test_passed: string;
  test_result_image: string;
}

function DataItem({
  pk,
  test_description,
  test_passed,
  test_method,
  test_result_image,
}: ItypeFortestRow) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteTestMutation = useMutation(
    (pk: string | number) => {
      return deleteOneTestForTask(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getOneProjectTask"]);
        toast({
          title: "delete test 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteTestHandler = (pk: string | number) => {
    const response = deleteTestMutation.mutate(pk);
    console.log("response :", response);
  };

  return (
    <ListItem
      key={pk}
      display="flex"
      alignItems="center"
      overflowX={"auto"}
      width={"1200px"}
      my={1}
    >
      <Flex border={"0px solid green"} width="35px">
        <Checkbox ml={2} />
      </Flex>
      <Box display={"flex"} justifyContent="space-between" gap="5">
        <Text border={"0px solid blue"} width="450px">
          {test_description}
        </Text>
        <Box border="1px solid purple" width="130px">
          {test_passed ? "완료" : "비완료"}
        </Box>
        <Box
          border="1px solid purple"
          width="30px"
          textAlign={"center"}
          onClick={() => deleteTestHandler(pk)}
        >
          <DeleteIcon />
        </Box>
      </Box>
    </ListItem>
  );
}

function TestListForTaskDetail({ testData }: IPropsForTestListForTaskDetail) {
  // console.log("testData : ", testData);

  return (
    <List spacing={3} height="280px" overflowY="auto">
      {testData?.map((row) => (
        <DataItem
          pk={row.pk}
          test_description={row.test_description}
          test_passed={row.test_passed}
          test_method={row.test_method}
          test_result_image={row.test_result_image}
        />
      ))}
    </List>
  );
}

export default TestListForTaskDetail;

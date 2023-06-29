import React, { ReactElement, useState } from "react";
import { apiForGetCompletedTaskListForPersonalTaskStatus } from "../apis/user_api";
import { typeForCompletedTaskListDataForSelectedUser } from "../types/user/user_types";
import CompletedTaskRow from "./CompletedTaskRow";
import SlideForCompletedTaskList from "./Slide/SlideForCompletedTaskList";
import {
  Box,
  Text,
  useBreakpointValue,
  Checkbox,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteTasksForChecked } from "../apis/project_progress_api";

interface Props {
  userPk: string | number | undefined;
}

// 1122
const CompleteTaskListForUser = ({ userPk }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  const {
    data: CompletedTaskListData,
    isLoading: isLoadingForCompletedTaskListDataForUser,
    refetch: refetchForCompletedTaskListDataForUser,
  } = useQuery<typeForCompletedTaskListDataForSelectedUser>(
    ["apiForCompletedTaskListDataForSelectedUser", userPk],
    apiForGetCompletedTaskListForPersonalTaskStatus
  );

  console.log("data check : ", CompletedTaskListData);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: false, // for medium-sized screens and up
    lg: false, // for large screens and up
  });

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        queryClient.refetchQueries(["apiForGetTaskDataForSelectedUser"]);

        toast({
          title: "Delete Task For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteTaskForChecked = () => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteTasksForChecked.mutate(checkedRowPks);
  };

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      CompletedTaskListData?.ProjectProgressList.map((item) => item.id) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  // 2244
  return (
    <Box w={"100%"} border={"1px solid black"} p={0} mt={"0px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={1}
        bg={"orange.200"}
        border={"0px solid green"}
      >
        <Text mb={1} fontSize={"20px"}>
          Task List For Complete
        </Text>
        <Text>
          (total: {CompletedTaskListData?.totalPageCount}
          per page:
          {CompletedTaskListData?.task_number_for_one_page})
        </Text>
        <Box textAlign={"right"} m={0}></Box>
      </Box>{" "}
      <Box>
        <Box display={"flex"} gap={2} p={2}>
          <Checkbox
            size={"lg"}
            onChange={handleChangeForAllCheckBox}
            checked={
              checkedRowPks.length ===
              CompletedTaskListData?.ProjectProgressList.length
            }
          />
          <Button
            variant={"outline"}
            _hover={{ backgroundColor: "red.100" }}
            size={"sm"}
            onClick={deleteTaskForChecked}
          >
            delete for check
          </Button>
        </Box>

        {!is_show_for_mobile ? (
          <Box>
            <Box w={"100%"} border={"0px solid red"}></Box>
            {CompletedTaskListData ? (
              <CompletedTaskRow
                ProjectProgressList={CompletedTaskListData.ProjectProgressList}
                totalPageCount={CompletedTaskListData.totalPageCount}
                task_number_for_one_page={
                  CompletedTaskListData.task_number_for_one_page
                }
                projectTaskListRefatch={refetchForCompletedTaskListDataForUser}
                currentPageNum={currentPageNum}
                setCurrentPageNum={setCurrentPageNum}
                handleCheckboxChange={handleCheckboxChange}
                checkedRowPks={checkedRowPks}
                setCheckedRowPks={setCheckedRowPks}
              />
            ) : (
              "no data"
            )}
          </Box>
        ) : (
          <Box>
            {CompletedTaskListData ? (
              <SlideForCompletedTaskList
                listData={CompletedTaskListData.ProjectProgressList}
                handleCheckboxChange={handleCheckboxChange}
                checkedRowPks={checkedRowPks}
              />
            ) : (
              "no data"
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CompleteTaskListForUser;

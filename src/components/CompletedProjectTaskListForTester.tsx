import React, { ReactElement, useState, useEffect } from "react";
import { Box, Grid, Input, Text, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/SelectBoxForSetPeriodForFilteringUncompletedTaskList";
import CompletedTaskRowForTester from "./CompletedTaskRowForTester";
import SlideForCompletedTaskListForTest from "./Slide/SlideForCompletedTaskListForTest";

interface Props {}

function CompletedProjectTaskListForTester({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefetch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getCompletedTaskListForTester",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
    ],
    getCompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    pageProgressListData?.ProjectProgressList
  );

  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<string>("");
  const [filterValueForTask, setFilterValueForTask] = useState<string>("");

  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  useEffect(() => {
    setFilteredData(pageProgressListData?.ProjectProgressList);
  }, [pageProgressListData?.ProjectProgressList]);

  const changeHandlerForSelectPeriodOptionForTeamTask = (option: string) => {
    setSelectedPeriodOptionForUncompletedTaskList(option);
  };

  const updateFilteredDataForTask = (filterValueForTask: string) => {
    if (filterValueForTask !== "") {
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task.toLowerCase().includes(filterValueForTask.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
    }
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTask(value);
    updateFilteredDataForTask(value);
  };

  const updateFilteredDataForTaskManager = (
    filterValueForTaskManager: string
  ) => {
    if (filterValueForTaskManager !== "") {
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task_manager.username
            .toLowerCase()
            .includes(filterValueForTaskManager.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
    }
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTaskManager(value);
    updateFilteredDataForTaskManager(value);
  };

  const direction_option_for_mobile = useBreakpointValue({
    base: "1fr",
    sm: "repeat(1, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: false, // for medium-sized screens and up
    lg: false, // for large screens and up
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  // 2244
  return (
    <Box width={"100%"} border={"0px solid purple"} p={0} mt={0}>
      {/* Grid for boxes 1 and 2 */}
      <Grid
        templateColumns={direction_option_for_mobile}
        gap={4}
        border={"1px solid black"}
        bgColor={"#C9A66B"}
        alignItems={"center"}
        px={2}
        py={2}
        width={"100%"}
      >
        {/* Box 1 */}
        <Box border={"0px solid green"}>
          <Box
            // border={"5px solid blue"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={2}
            width={"100%"}
            px={2}
          >
            <Box border="0px solid red" width={"100%"}>
              <Box fontSize={16}>
                <Text>TaskListForTest</Text>
                <Text>
                  (total: {pageProgressListData?.totalPageCount} , per_page:{" "}
                  {pageProgressListData?.task_number_for_one_page} ){" "}
                </Text>
              </Box>
              <Box maxHeight={"200px"} overflowY={"scroll"}>
                <Table
                  variant="unstyled"
                  border={"1px solid black"}
                  size={"sm"}
                  width={"90%"}
                >
                  <Tbody>
                    {pageProgressListData?.writers_info?.map((writer) => (
                      <Tr key={writer.username} border={"1px solid black"}>
                        <Td>{writer.username}</Td>
                        <Td>{writer.task_count}</Td>
                        <Td>{writer.cash} won</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Box 2 */}
        <Box>
          <ButtonsForSelectForTeamTaskListPeriod
            selectedPeriodOptionForUncompletedTaskList={
              selectedPeriodOptionForUncompletedTaskList
            }
            changeHandler={changeHandlerForSelectPeriodOptionForTeamTask}
          />

          <Box mt={2}>
            <Box>
              담당 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"80%"}
                value={filterValueForTaskManager}
                onChange={handleFilterChangeForTaskManager}
              />
            </Box>

            <Box>
              업무 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"80%"}
                value={filterValueForTask}
                onChange={handleFilterChangeForTask}
              />
            </Box>
          </Box>
        </Box>

        {/* Box 3 */}
        {is_show_for_mobile ? (
          <Box textAlign={"right"} m={0}>
            3영역
          </Box>
        ) : null}
      </Grid>

      {/* fix */}
      {!is_show_for_mobile ? (
        <Box>
          {pageProgressListData ? (
            <CompletedTaskRowForTester
              ProjectProgressList={filteredData}
              totalPageCount={pageProgressListData.totalPageCount}
              task_number_for_one_page={
                pageProgressListData.task_number_for_one_page
              }
              projectTaskListRefetch={projectTaskListRefetch}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
              handleCheckboxChange={handleCheckboxChange}
              checkedRowPks={checkedRowPks}
              setCheckedRowPks={setCheckedRowPks}
            />
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box>
          {/* slide */}
          {filteredData && filteredData.length ? (
            <SlideForCompletedTaskListForTest
              listData={filteredData}
              handleCheckboxChange={handleCheckboxChange}
              checkedRowPks={checkedRowPks}
              refetch={projectTaskListRefetch}
            />
          ) : (
            "no data"
          )}
        </Box>
      )}
    </Box>
  );
}

export default CompletedProjectTaskListForTester;

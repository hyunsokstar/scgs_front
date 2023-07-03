import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Card,
  Checkbox,
  Text,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { taskRowForUncompleted } from "../../types/project_progress/project_progress_type";
import ModalButtonForUpdateTaskStatus from "../modal/ModalButtonForUpdateTaskStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateScoreByTester } from "../../apis/project_progress_api";

interface SlideForUncompletedTaskListProps {
  listData: taskRowForUncompleted[] | any[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRowPks: any[];
  refetch?: () => void;
}

// 1122
function SlideForCompletedTaskListForTest({
  listData,
  handleCheckboxChange,
  checkedRowPks,
  refetch,
}: SlideForUncompletedTaskListProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = listData && listData.length | 0;
  const sliderRef = useRef<any>(null);
  const [originalScoreValues, setOriginalScoreValues] = useState<number[]>([]);
  const [scoreValues, setScoreValues] = useState<number[]>([]);

  // console.log("listData : ", listData);
  useEffect(() => {
    const initialScores =
      listData?.map((task) => task.score_by_tester ?? 0) || [];
    setOriginalScoreValues(initialScores);
    setScoreValues(initialScores);
  }, [listData]);

  const handleSlideChange = (index: any) => {
    setActiveSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0%",
    beforeChange: (current: any, next: any) => handleSlideChange(next),
  };

  const renderCustomPaging = () => {
    const buttons = [];

    for (let i = 0; i < numSlides; i++) {
      const isActive = activeSlide === i;

      buttons.push(
        <Button
          key={i}
          size="sm"
          variant={isActive ? "solid" : "outline"}
          colorScheme="gray"
          mr={1} // 버튼들 간의 간격 조절
          mb={1}
          border="1px solid blue"
          onClick={() => handleSlideChange(i)}
        >
          {i + 1}
        </Button>
      );
    }

    return buttons;
  };

  const handleChangeForScoreByTester = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedScoreValues = [...scoreValues];
    updatedScoreValues[index] = parseInt(e.target.value);
    setScoreValues(updatedScoreValues);
  };

  const mutationForUpdateScoreByTester = useMutation(
    apiForUpdateScoreByTester,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getCompletedTaskListForTester"]);

        toast({
          status: "success",
          title: "task score update success",
          description: result.message,
        });
      },
    }
  );

  const handleClickForUpdateScoreByTester = (
    id: any,
    index: number,
    username: string
  ) => {
    let scoreByTesterForUpdate;
    if (scoreValues[index] === originalScoreValues[index]) {
      alert("이전값과 같으므로 업데이트 하지 않겠습니다");
      return;
    } else if (scoreValues[index] > originalScoreValues[index]) {
      scoreByTesterForUpdate = scoreValues[index] - originalScoreValues[index];
    } else if (scoreValues[index] < originalScoreValues[index]) {
      scoreByTesterForUpdate = scoreValues[index] - originalScoreValues[index];
    }

    mutationForUpdateScoreByTester.mutate({
      id,
      cashInfoForUpdate: scoreByTesterForUpdate,
      scoreByTesterForUpdate: scoreValues[index],
      username,
    });
  };

  // 2244
  return (
    <Box>
      {listData && listData.length ? (
        <Box>
          <Slider {...settings} ref={sliderRef}>
            {listData && listData.length ? (
              listData.map((row, index) => (
                <Card
                  key={index}
                  height="46vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="start"
                  flexDirection={"column"}
                  backgroundColor="gray.50"
                  p={2}
                >
                  <Box
                    display={"flex"}
                    gap={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    bg={"yellow.100"}
                    p={1}
                  >
                    <Checkbox
                      mx={2}
                      border={"1px solid black"}
                      value={row.id}
                      isChecked={checkedRowPks.includes(row.id)}
                      onChange={handleCheckboxChange}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                      ({index + 1}) {row.task}
                    </Text>
                    <Avatar
                      src={row.task_manager.profile_image}
                      name={row.task_manager.username}
                      size="sm"
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    py={2}
                  >
                    <Badge colorScheme="blue">{row.current_status}</Badge>
                    <ModalButtonForUpdateTaskStatus
                      modal_text={"Update Task Progress Status"}
                      current_status={row.current_status}
                      task={row}
                      refetch={refetch}
                    />
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                      <Box>start:</Box>
                      <Box>{row.started_at_formatted}</Box>
                    </Box>

                    <Box>
                      <Box>completed:</Box>
                      <Box>{row.completed_at_formatted}</Box>
                    </Box>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"} py={3}>
                    <Box>elapsed_time</Box>
                    <Box>{row.elapsed_time_from_started_at}</Box>
                  </Box>
                  <Box mt={2}>
                    <InputGroup size="sm" width={"98%"}>
                      <Input
                        border={"1px solid black"}
                        defaultValue={row.score_by_tester}
                        onChange={(e) => handleChangeForScoreByTester(e, index)}
                      />
                      <InputRightElement width="60px" mr={-2}>
                        <Button
                          border={"1px solid green"}
                          size="sm"
                          onClick={() =>
                            handleClickForUpdateScoreByTester(
                              row.id,
                              index,
                              row.task_manager.username
                            )
                          }
                        >
                          평가
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Card>
              ))
            ) : (
              <Box>no data</Box>
            )}
          </Slider>
          <Box display="flex" justifyContent="center" alignItems="center" m={2}>
            <Button variant={"outline"} size={"sm"} onClick={prevSlide}>
              Prev
            </Button>
            <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" mx={2} my={1}>
              {renderCustomPaging()}
            </Box>{" "}
            <Button variant={"outline"} size={"sm"} onClick={nextSlide}>
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        "no data"
      )}
    </Box>
  );
}

export default SlideForCompletedTaskListForTest;

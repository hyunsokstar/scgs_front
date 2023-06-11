import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, ChakraProvider, extendTheme, Button } from "@chakra-ui/react";
import { IOneTaskForProjectTaskType } from "../types/project_progress/project_progress_type";
import UpdateFormForTaskDetailForChecked from "./Form/UpdateFormForTaskDetailForChecked";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNamesForCreate } from "../apis/user_api";
import ChatStyleBoard from "./ChatStyleBoard";
import TestListForTaskDetail from "./TestList/TestListForTaskDetail";
import ExtraTasksTable from "./ExtraTasksTable";
import ModalButtonForExtraTask from "./modal/ModalButtonForExtraTask";
import DragZoneForReferImages from "./DragZone/DragZoneForReferImages";

const theme = extendTheme({
  colors: {
    pastelColor1: "#F9CBCB",
    pastelColor2: "#F5D6C6",
    pastelColor3: "#F4E3D5",
    pastelColor4: "#E8F1DF",
    pastelColor5: "#E1E3F0",
    pastelColor6: "#E7D4E8",
  },
});

interface ImageSlideForUncompletedTaskListForCheckedProps {
  numSlides: number;
  dataForTaskListForChecked: IOneTaskForProjectTaskType[];
  refetch: any;
}

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

// 1122
const ImageSlideForUncompletedTaskListForChecked: React.FC<
  ImageSlideForUncompletedTaskListForCheckedProps
> = ({ numSlides, dataForTaskListForChecked, refetch }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const {
    isLoading: isLoadingForUserNamesData,
    data: dataForUserNames,
    error,
  } = useQuery<IUserNamesForCreate[]>(
    ["user_names_for_task_detail_list_for_checked"],
    getUserNamesForCreate,
    {
      // refetch 함수를 객체에 추가
      refetchOnWindowFocus: true, // 옵션 활성화
      refetchOnMount: true,
    }
  );

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    sliderRef.current?.slickGoTo(index);
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0%",
    beforeChange: (current: number, next: number) => handleSlideChange(next),
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
          mx={1}
          border="1px solid blue"
          onClick={() => handleSlideChange(i)}
        >
          {i + 1}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <ChakraProvider theme={theme}>
      <Slider {...settings} ref={sliderRef}>
        {dataForTaskListForChecked.map((row, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            textAlign="center"
          >
            <Box display={"flex"}>
              <Box
                bg="#E6E6FA"
                width={"50%"}
                overflowY={"scroll"}
                height={"620px"}
                display={"flex"}
              >
                <Box width={"70%"}>
                  <UpdateFormForTaskDetailForChecked
                    pk={row.pk}
                    task={row.task}
                    writer={row.writer}
                    task_description={row.task_description}
                    taskUrls={row.task_urls}
                    importance={row.importance}
                    task_manager={row.task_manager.username}
                    dataForUserNames={dataForUserNames ? dataForUserNames : []}
                    current_status={row.current_status}
                    in_progress={row.in_progress}
                    is_testing={row.is_testing}
                    task_completed={row.task_completed}
                    due_date_formatted={row.due_date_formatted}
                    time_left_to_due_date={row.time_left_to_due_date}
                  />
                </Box>

                <Box width={"30%"} bg={"blue.100"} height={"100%"}>
                  이미지 업로드 영역 (row.pk 넘겨 주기 + 이미지 업로드 구현)
                  <DragZoneForReferImages
                    taskPk={row.pk}
                    refer_images={row.task_images}
                  />
                </Box>
              </Box>
              <Box bg="#D8F6F1" width={"50%"}>
                <ChatStyleBoard
                  taskPk={row.pk}
                  task_manager={row?.task_manager}
                  task_comments={row?.task_comments}
                  refetch={refetch}
                />
              </Box>
            </Box>
            <Box py={3}>
              <TestListForTaskDetail
                refetch={refetch}
                taskPk={row.pk}
                testData={row?.tests_for_tasks}
              />
            </Box>
            <Box>
              <ModalButtonForExtraTask refetch={refetch} taskPk={row.pk} />
              <ExtraTasksTable
                extra_tasks={row.extra_tasks}
                orginal_task_pk={row.pk}
                refetch={refetch}
              />
            </Box>
          </Box>
        ))}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </ChakraProvider>
  );
};

export default ImageSlideForUncompletedTaskListForChecked;

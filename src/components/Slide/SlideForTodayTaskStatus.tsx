import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, ChakraProvider, extendTheme, Button } from "@chakra-ui/react";
import CardForTodayTaskListBySlide from "../Card/CardForTodayTaskListBySlide";

interface Task {
  id: number;
  task: string;
  in_progress: boolean;
  is_testing: boolean;
  order: number;
  task_manager: {
    pk: number;
    username: string;
    profile_image: any;
  };
  task_completed: boolean;
  current_status: string;
  is_urgent_request: boolean;
  is_task_for_cash_prize: boolean;
  due_date: string;
}

interface IProps {
  taskData: {
    morning_tasks: Task[];
    afternoon_tasks: Task[];
    night_tasks: Task[];
  };
}

// 1122
export default function SlideForTodayTaskStatus({ taskData }: IProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = 3;
  const sliderRef = useRef<any>(null);

  const [dataForTaskList, setDataForTaskList] = useState<
    { title: string; todos: Task[] }[]
  >([]);

  useEffect(() => {
    console.log("taskData :", taskData);

    const dataForTaskList = [
      { title: "until-noon", todos: taskData?.morning_tasks },
      { title: "until-evening", todos: taskData?.afternoon_tasks },
      { title: "until-night", todos: taskData?.night_tasks },
    ];
    console.log(
        "dataForTaskList : ", dataForTaskList
    );
    
    if (dataForTaskList) {
      setDataForTaskList(dataForTaskList);
    }

  }, [taskData]);

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
          mx={1} // 버튼들 간의 간격 조절
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
    <Box>
      <Slider {...settings} ref={sliderRef}>
        {dataForTaskList ? dataForTaskList.map((task, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign={"center"}
          >
            <CardForTodayTaskListBySlide
              title={task.title}
              todos={task.todos}
            />
          </Box>
        )): "no data"}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems={"center"} mt={2}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </Box>
  );
}

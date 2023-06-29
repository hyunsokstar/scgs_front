import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Avatar,
  ChakraProvider,
  Button,
  Card,
  Text,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import { taskRowForUncompleted } from "../../types/project_progress/project_progress_type";
import ModalButtonForUpdateTaskStatus from "../modal/ModalButtonForUpdateTaskStatus";

interface SlideForUncompletedTaskListProps {
  listData: taskRowForUncompleted[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRowPks: any[];
  refetch?: () => void;
}

export default function SlideForUncompletedTaskList({
  listData,
  handleCheckboxChange,
  checkedRowPks,
  refetch,
}: SlideForUncompletedTaskListProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = listData && listData.length | 0;
  const sliderRef = useRef<any>(null);

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
    <ChakraProvider>
      <Slider {...settings} ref={sliderRef}>
        {listData
          ? listData.map((row, index) => (
              <Card
                key={index}
                border="1px solid"
                borderColor="gray.200"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="start"
                p={2}
                flexDirection={"column"}
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
                    // mb={2}
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
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  <Box>
                    <Box>start:</Box>
                    <Box>{row.started_at_formatted}</Box>
                  </Box>

                  <Box>
                    <Box>due_date:</Box>
                    <Box>{row.due_date_formatted}</Box>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Box>remaing_time</Box>
                  <Box>{row.time_left_to_due_date}</Box>
                </Box>
              </Card>
            ))
          : "no data"}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <Button variant={"outline"} size={"sm"} onClick={prevSlide}>
          Prev
        </Button>
        {renderCustomPaging()}
        <Button variant={"outline"} size={"sm"} onClick={nextSlide}>
          Next
        </Button>
      </Box>
    </ChakraProvider>
  );
}

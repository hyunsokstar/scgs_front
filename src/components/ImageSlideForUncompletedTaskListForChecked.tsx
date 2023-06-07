import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, ChakraProvider, extendTheme, Button } from "@chakra-ui/react";
import { ProjectProgress } from "../types/project_progress/project_progress_type";
import UpdateFormForTaskDetailForChecked from "./Form/UpdateFormForTaskDetailForChecked";

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
  dataForTaskListForChecked: ProjectProgress[];
}

const ImageSlideForUncompletedTaskListForChecked: React.FC<
  ImageSlideForUncompletedTaskListForCheckedProps
> = ({ numSlides, dataForTaskListForChecked }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

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
              <Box bg="#F6CED8" width={"50%"}>
                <UpdateFormForTaskDetailForChecked
                  pk={row.pk}
                  task={row.task}
                  writer={row.writer}
                  task_description={row.task_description}
                  importance={row.importance}
                />
              </Box>
              <Box bg="#D8F6F1" width={"50%"}>
                <h3>{row.importance}</h3>
              </Box>
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

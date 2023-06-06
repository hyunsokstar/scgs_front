import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, ChakraProvider, extendTheme, Button } from "@chakra-ui/react";

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

export default function SimpleSlider() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = 3;
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
    centerPadding: "10%",
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

  const dataForTaskListForChecked = ["1", "2", "3"];

  return (
    <ChakraProvider theme={theme}>
      <Slider {...settings} ref={sliderRef}>
        {dataForTaskListForChecked.map((content, index) => (
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
            <h3>{content}</h3>
          </Box>
        ))}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems={"center"} mt={2}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </ChakraProvider>
  );
}

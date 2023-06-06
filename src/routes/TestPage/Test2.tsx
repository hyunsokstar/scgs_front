import React, { useRef } from "react";
import Slider from "react-slick";
import { Box, ChakraProvider, extendTheme, Button } from "@chakra-ui/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const theme = extendTheme({
  colors: {
    pastelColor1: "#F9CBCB", // 연한 핑크
    pastelColor2: "#F5D6C6", // 연한 주황
    pastelColor3: "#F4E3D5", // 연한 베이지
    pastelColor4: "#E8F1DF", // 연한 민트
    pastelColor5: "#E1E3F0", // 연한 블루
    pastelColor6: "#E7D4E8", // 연한 보라
  },
});

export default function SimpleSlider() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = 3; // 슬라이드의 개수
  const sliderRef = useRef<any>(null); // Slider 컴포넌트의 ref 생성

  const handleSlideChange = (index: any) => {
    setActiveSlide(index);
    sliderRef.current.slickGoTo(index); // 해당 슬라이드로 이동
  };

  const nextSlide = () => {
    // 다음 슬라이드로 이동
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    // 이전 슬라이드로 이동
    sliderRef.current.slickPrev();
  };

  var settings = {
    dots: false, // 기본 dots는 비활성화
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // 슬라이드 내용물을 중앙에 배치
    centerPadding: "10%", // 중앙에 배치된 슬라이드의 좌우 패딩 설정
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
    <ChakraProvider theme={theme}>
      <Slider {...settings} ref={sliderRef}>
        <Box>
          <Box
            bg="pastelColor1"
            border="1px solid"
            borderColor="gray.200"
            height="100%" // 슬라이드 내용물을 수직 가운데에 정렬하기 위해 추가
            display="flex" // 슬라이드 내용물을 수평 가운데에 정렬하기 위해 추가
            justifyContent="center" // 슬라이드 내용물을 수평 가운데에 정렬하기 위해 추가
            alignItems="center" // 슬라이드 내용물을 수직 가운데에 정렬하기 위해 추가
          >
            <h3>1</h3>
          </Box>
        </Box>
        <Box>
          <Box
            bg="pastelColor2"
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h3>2</h3>
          </Box>
        </Box>
        <Box>
          <Box
            bg="pastelColor3"
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h3>3</h3>
          </Box>
        </Box>
      </Slider>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </ChakraProvider>
  );
}

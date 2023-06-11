import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image, Button } from "@chakra-ui/react";

type IReferImage = {
  pk: number;
  image_url: string;
};

interface IProps {
  refer_images?: IReferImage[];
}

export default function ImageSlideForReferImagesForTask({
  refer_images,
}: IProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = refer_images && refer_images?.length;
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

    if (numSlides) {
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
    }

    return buttons;
  };

  //   const dataForTaskListForChecked = ["1", "2", "3"];

  return (
    <Box>
      <Slider {...settings} ref={sliderRef}>
        {refer_images && refer_images.length
          ? refer_images.map((row, index) => (
              <Box maxH="600px" w="100%" >
                <Image src={row.image_url} objectFit="cover" mx="auto" />
              </Box>
            ))
          : "no data"}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems={"center"} mt={0}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </Box>
  );
}

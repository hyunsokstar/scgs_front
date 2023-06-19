import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, ChakraProvider, Button, Text } from "@chakra-ui/react";
import { DataForStudyNoteContent } from "../../types/study_note_type";

interface IProps {
  dataForNoteContentListForPage: DataForStudyNoteContent[];
}

// 1122
export default function NoteSlideForStudyNoteSpecificPage({
  dataForNoteContentListForPage,
}: IProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = dataForNoteContentListForPage.length;
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
    swipe: false, // Disable mouse swipe navigation
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

  // const dataForNoteContentListForPage = ["1", "2", "3"];

  return (
    <ChakraProvider>
      <Slider {...settings} ref={sliderRef}>
        {dataForNoteContentListForPage.map((note, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            userSelect="text"
            // textAlign={"center"}
          >
            <Box bg={"yellow.100"} display={"flex"} p={3} fontSize={"24px"}>
              <Box width={"50%"}>
                title:
                <Text>{note.title}</Text>
              </Box>
              <Box width={"50%"}>
                file :<Text>{note.file_name}</Text>
              </Box>
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: note.content }} />
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

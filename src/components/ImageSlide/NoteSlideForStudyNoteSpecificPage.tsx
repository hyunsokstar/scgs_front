import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  ChakraProvider,
  Button,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { DataForStudyNoteContent } from "../../types/study_note_type";
import PlayerForYouTube from "../Player/PlayerForYouTube";
import CreateFormForStudyNoteForSlide from "../Form/CreateFormForStudyNoteForSlide";

interface IProps {
  study_note_pk: number | string | undefined;
  note_page_num: number | string | undefined;
  dataForNoteContentListForPage: DataForStudyNoteContent[];
}

// 1122
export default function NoteSlideForStudyNoteSpecificPage({
  study_note_pk,
  note_page_num,
  dataForNoteContentListForPage,
}: IProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = dataForNoteContentListForPage.length + 1;
  const sliderRef = useRef<any>(null);

  const [dataForSlides, setDataForSlides] = useState<any>([]);

  useEffect(() => {
    let dataForSlidesForUpdate = [
      ...dataForNoteContentListForPage,
      <CreateFormForStudyNoteForSlide
        study_note_pk={study_note_pk}
        currentPage={note_page_num}
      />,
    ];

    setDataForSlides(dataForSlidesForUpdate);
  }, [dataForNoteContentListForPage]);

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

  return (
    <ChakraProvider>
      <Slider {...settings} ref={sliderRef}>
        {dataForSlides.map((note, index) => {
          if (note.content_option === "subtitle_for_page") {
            return (
              <Box>
                <Box width={"100%"} bg={"yellow.100"}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"78vh"}
                    userSelect="text"
                  >
                    {note.youtube_url ? (
                      <Box display={"flex"} width={"100%"}>
                        <Box
                          width={"30%"}
                          // border={"1px solid black"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          fontSize={"24px"}
                        >
                          {note.title}
                        </Box>
                        <Box
                          width={"70%"}
                          // border={"1px solid black"}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <PlayerForYouTube youtubeUrl={note.youtube_url} />
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Text>{note.title}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  height={"5vh"}
                  bg={"blue.100"}
                  alignItems={"center"}
                  p={3}
                >
                  <Box width={"50%"} userSelect="text">
                    {note.ref_url1}
                  </Box>
                  <Box width={"50%"} userSelect="text">
                    {note.ref_url2}
                  </Box>
                </Box>
              </Box>
            );
          } else if (note.content_option === "note_content") {
            return (
              <Box
                key={index}
                border="1px solid"
                borderColor="gray.200"
                // height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                userSelect="text"
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
                <Box
                  dangerouslySetInnerHTML={{ __html: note.content }}
                  overflowY={"scroll"}
                  height={"70vh"}
                />
              </Box>
            );
          } else if (note.content_option === "youtube") {
            return (
              <Box
                width={"100%"}
                bg={"blue.100"}
                display={"flex"}
                alignItems={"center"}
                p={3}
                textAlign={"center"}
                fontSize={"38px"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  overflowY={"scroll"}
                  height={"80vh"}
                >
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>{note.title}</Td>
                        <Td position={"relative"}>
                          {note.youtube_url ? (
                            <PlayerForYouTube youtubeUrl={note.youtube_url} />
                          ) : (
                            ""
                          )}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            );
          } else {
            return note;
          }
        })}
      </Slider>

      <Box display="flex" justifyContent="center" alignItems={"center"} mt={2}>
        <Button onClick={prevSlide}>Prev</Button>
        {renderCustomPaging()}
        <Button onClick={nextSlide}>Next</Button>
      </Box>
    </ChakraProvider>
  );
}

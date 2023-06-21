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
  useToast,
} from "@chakra-ui/react";
import { DataForStudyNoteContent } from "../../types/study_note_type";
import PlayerForYouTube from "../Player/PlayerForYouTube";
import CreateFormForStudyNoteForSlide from "../Form/CreateFormForStudyNoteForSlide";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoIosSkipBackward, IoIosFastforward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  study_note_pk: string | undefined;
  note_page_num: string | undefined;
  dataForNoteContentListForPage: DataForStudyNoteContent[];
  note_title: string;
  note_writer: string;
}

// 1122
export default function NoteSlideForStudyNoteSpecificPage({
  study_note_pk,
  note_page_num,
  dataForNoteContentListForPage,
  note_title,
  note_writer,
}: IProps) {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = dataForNoteContentListForPage.length + 1;
  const sliderRef = useRef<any>(null);
  const [dataForSlides, setDataForSlides] = useState<any>([]);
  const toast = useToast();

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
    verticalSpacing: 5, // Adjust the desired vertical spacing value
  };

  const renderCustomPaging = () => {
    const buttons = [];

    for (let i = 0; i < numSlides; i++) {
      const isActive = activeSlide === i;
      const buttonText = i === numSlides - 1 ? "C" : i + 1; // 마지막 버튼일 경우 "c"로 표시

      buttons.push(
        <Button
          key={i}
          size="sm"
          variant={isActive ? "solid" : "outline"}
          colorScheme="gray"
          mx={1} // 버튼들 간의 간격 조절
          border="0px solid blue"
          onClick={() => handleSlideChange(i)}
        >
          {buttonText}{" "}
        </Button>
      );
    }

    return buttons;
  };
  const changePage = (option: string) => {
    if (option === "previous") {
      if (note_page_num && parseInt(note_page_num) > 1) {
        const page_to_move = parseInt(note_page_num) - 1;
        navigate(`/study-note/${study_note_pk}/${page_to_move}/slide`);
      } else {
        toast({
          title: "Warnning !",
          description: "1 페이지 이하로는 이동 불가능 합니다",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } else if (option === "next") {
      if (note_page_num !== undefined && parseInt(note_page_num) < 50) {
        console.log("check type : ", typeof note_page_num);
        const page_to_move = parseInt(note_page_num) + 1;
        navigate(`/study-note/${study_note_pk}/${page_to_move}/slide`);
      } else {
        toast({
          title: "Warning!",
          description: `50 is the last page.`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } else if (option === "first") {
      navigate(`/study-note/${study_note_pk}/1/slide`);
    } else if (option === "last") {
      navigate(`/study-note/${study_note_pk}/50/slide`);
    }
  };

  return (
    <ChakraProvider>
      <Slider {...settings} ref={sliderRef}>
        {dataForSlides.map((note, index) => {
          if (note.content_option === "subtitle_for_page") {
            return (
              <Box border={"0px solid blue"} key={note.pk}>
                <Box width={"100%"} bg={"yellow.100"} border={"0px solid pink"}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"60vh"}
                    userSelect="text"
                  >
                    {note.youtube_url ? (
                      <Box display={"flex"} width={"100%"}>
                        <Box
                          width={"30%"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          fontSize={"12px"}
                        >
                          {note.title}
                        </Box>
                        <Box
                          width={"70%"}
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
                  height={"2vh"}
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
                key={note.pk}
                border="0px solid black"
                borderColor="gray.200"
                // height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                userSelect="text"
              >
                <Box bg={"yellow.100"} display={"flex"} p={3} fontSize={"16px"}>
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
                  height={"60vh"}
                />
              </Box>
            );
          } else if (note.content_option === "youtube") {
            return (
              <Box
                key={note.pk}
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
                  height={"60vh"}
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

      <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"50px"}
        border={"1px solid black"}
        mt={1}
      >
        <ChakraProvider>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={1}
            gap={1}
          >
            <Button onClick={() => changePage("first")}>F</Button>
            <Button>
              <IoIosSkipBackward onClick={() => changePage("previous")} />
            </Button>

            <Button onClick={prevSlide}>
              <AiOutlineLeft />
            </Button>
            <Box
              display="flex"
              flexWrap="wrap"
              w="70%" // 화면의 70% 넓이로 설정
              mx="auto" // 중앙 정렬을 위해 mx="auto" 설정
            >
              {renderCustomPaging()}
            </Box>
            <Button onClick={nextSlide}>
              <AiOutlineRight />
            </Button>

            <Button>
              <IoIosFastforward onClick={() => changePage("next")} />
            </Button>
            <Button onClick={() => changePage("last")}>L</Button>
          </Box>
        </ChakraProvider>
      </Box>
    </ChakraProvider>
  );
}

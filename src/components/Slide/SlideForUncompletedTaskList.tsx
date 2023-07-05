import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Badge,
  Box,
  Avatar,
  Button,
  Card,
  Checkbox,
  Grid,
  Image,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { taskRowForUncompleted } from "../../types/project_progress/project_progress_type";
import ModalButtonForUpdateTaskStatus from "../modal/ModalButtonForUpdateTaskStatus";
import ModalButtonForUpdateDueDateOptionForToday from "../modal/ModalButtonForUpdateDueDateOptionForToday";
import { FiUpload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getUploadURL, uploadImage } from "../../api";
import { createRefImageForTask } from "../../apis/project_progress_api";

interface SlideForUncompletedTaskListProps {
  listData: taskRowForUncompleted[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRowPks: any[];
  refetch?: () => void;
}

// 1122
const SlideForUncompletedTaskList = ({
  listData,
  handleCheckboxChange,
  checkedRowPks,
  refetch,
}: SlideForUncompletedTaskListProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = listData && listData.length | 0;
  const sliderRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);
  const [taskId, setTaskId] = useState<Number>();
  // console.log("listData :;:; ", listData);

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

  type DueDateOption = "until-noon" | "until-evening" | "until-night";

  function getDueDateEmoji(dueDateOption: DueDateOption): string {
    if (dueDateOption === "until-noon") {
      return "☀️";
    } else if (dueDateOption === "until-evening") {
      return "🌛";
    } else if (dueDateOption === "until-night") {
      return "🌌";
    } else {
      return "?";
    }
  }

  function openImageInNewTab(imageUrl) {
    window.open(imageUrl, "_blank");
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const mutationForCreateImageForTask = useMutation(createRefImageForTask, {
    onSuccess: (result) => {
      console.log("result : ", result);
      // setIsUploadingForRefImage(false);
      // refetchForTaskDetail();
      queryClient.refetchQueries(["getUncompletedTaskList"]);
      setSelectedFile(null);
      
      toast({
        status: "success",
        title: "Profile Image uploaded!",
        description: "Feel free to upload more images.",
        isClosable: true,
      });
    },
  });

  const mutationForUploadImage = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result);
      console.log("result.variants[0] : ", result.variants[0]);

      mutationForCreateImageForTask.mutate({
        taskPk: taskId,
        image_url: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      });
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      console.log("file to upload", selectedFile);

      mutationForUploadImage.mutate({
        uploadURL: result.uploadURL,
        file: selectedFile,
      });
    },
  });

  // fix2 0705
  const buttonHandlerForConfirmFileUpload = (taskId: number) => {
    console.log("button click check ??");

    if (selectedFile) {
      setTaskId(taskId);
      console.log("selectedFile : ", selectedFile);
      getImageUploadUrlMutation.mutate();
    } else {
      if (fileInputRef.current) {
        console.log("button click check !!");
        
        fileInputRef.current.click();
      }
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null); // 선택한 파일 초기화
  };

  // 2244
  return (
    <Box>
      {listData && listData.length > 0 ? (
        <Slider {...settings} ref={sliderRef}>
          {listData.map((row, index) => (
            <Card
              key={index}
              height="50vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="start"
              flexDirection={"column"}
              backgroundColor="gray.50"
              p={2}
              // border={"5px solid blue"}
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
                  isChecked={checkedRowPks && checkedRowPks.includes(row.id)}
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
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <ModalButtonForUpdateDueDateOptionForToday
                    taskId={row.id}
                    button_text={getDueDateEmoji(row.due_date_option_for_today)}
                    button_size={"sm"}
                    modal_title={"modal for update due date"}
                    modal_size={"5xl"}
                  />

                  <ModalButtonForUpdateTaskStatus
                    modal_text={"Update Task Progress Status"}
                    current_status={row.current_status}
                    task={row}
                    refetch={refetch}
                  />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                <Box>
                  <Box>start:</Box>
                  <Box fontSize={"14px"}>{row.started_at_formatted}</Box>
                </Box>

                <Box>
                  <Box>due_date:</Box>
                  <Box fontSize={"14px"}>{row.due_date_formatted}</Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Box>remaing_time</Box>
                <Box>{row.time_left_to_due_date}</Box>
              </Box>
              {/* fix */}
              <Box display="flex" justifyContent="space-between">
                <Box>
                  {selectedFile ? selectedFile.name : "참고 이미지 리스트"}
                </Box>
                {selectedFile ? (
                  <Box>
                    <IconButton
                      aria-label="파일 업로드"
                      icon={<FiCheckCircle />}
                      size="sm"
                      variant="ghost"
                      onClick={() => buttonHandlerForConfirmFileUpload(row.id)}
                    />
                    <IconButton
                      aria-label="파일 취소"
                      icon={<FiXCircle />}
                      size="sm"
                      variant="ghost"
                      onClick={handleCancelFile}
                    />
                  </Box>
                ) : (
                  <IconButton
                    aria-label="파일 업로드"
                    icon={<FiUpload />}
                    size="sm"
                    variant="ghost"
                    _hover={{ bgColor: "blue.100" }}
                    onClick={buttonHandlerForConfirmFileUpload}
                  />
                )}
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Box>

              <Box mt={1}>
                {row.task_images.length ? (
                  <Box>
                    <Grid
                      templateColumns="repeat(4, 1fr)"
                      gap="2"
                      justifyContent="center"
                    >
                      {row.task_images.map((row: string) => (
                        <Box key={row.id} w="50px" h="50px">
                          <Box
                            key={row.id}
                            w="50px"
                            h="50px"
                            onClick={() => openImageInNewTab(row.image_url)}
                            cursor="pointer"
                          >
                            <Image
                              src={row.image_url}
                              alt="Task Image"
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box bg={"orange.100"} fontSize={"14px"}>
                    no images
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Slider>
      ) : (
        <Text>No data</Text>
      )}

      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <Button variant={"outline"} size={"sm"} onClick={prevSlide}>
          Prev
        </Button>
        <Box
          display="grid"
          gridTemplateColumns="repeat(5, 1fr)"
          gap={1}
          justifyContent="center"
        >
          {renderCustomPaging()}
        </Box>{" "}
        <Button variant={"outline"} size={"sm"} onClick={nextSlide}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SlideForUncompletedTaskList;

import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  TestResultImageForCompleted,
  taskRowForUncompleted,
} from "../../types/project_progress/project_progress_type";
import ModalButtonForUpdateTaskStatus from "../modal/ModalButtonForUpdateTaskStatus";
import { FiUpload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getUploadURL, uploadImage } from "../../api";
import { createResultImageForCompletedTask } from "../../apis/project_progress_api";

interface SlideForUncompletedTaskListProps {
  listData: taskRowForUncompleted[] | any[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRowPks: any[];
  refetch?: () => void;
}

// 1122
export default function SlideForCompletedTaskList({
  listData,
  handleCheckboxChange,
  checkedRowPks,
  refetch,
}: SlideForUncompletedTaskListProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const numSlides = listData && listData.length | 0;
  const sliderRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [taskId, setTaskId] = useState<Number>();
  const fileInputRef = useRef(null);

  const toast = useToast();
  const queryClient = useQueryClient();

  const [isUploading, setIsUploading] = useState(false);

  console.log("listData :::::::::::::::::::: ", listData);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null); // 선택한 파일 초기화
  };

  const buttonHandlerForSelectFile = () => {
    console.log("hi");
    if (fileInputRef.current) {
      console.log("button click check !!");

      fileInputRef.current.click();
    }
  };

  const mutationForCreateResultImageForCompletedTask = useMutation(
    createResultImageForCompletedTask,
    {
      onSuccess: (result) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getCompletedTaskList"]);
        setSelectedFile(null);

        toast({
          status: "success",
          title: "image upload success",
          description: "image upload success",
          isClosable: true,
        });
        setIsUploading(false);
      },
    }
  );

  const mutationForUploadImage = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result);
      console.log("result.variants[0] : ", result.variants[0]);

      mutationForCreateResultImageForCompletedTask.mutate({
        taskPk: taskId,
        image_url: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      });
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (result: any) => {
      setIsUploading(true);
      console.log("result : ", result);
      console.log("file to upload", selectedFile);

      mutationForUploadImage.mutate({
        uploadURL: result.uploadURL,
        file: selectedFile,
      });
    },
  });

  const buttonHandlerForConfirmFileUpload = (taskId: number) => {
    console.log("button click check ??");

    if (selectedFile) {
      setTaskId(taskId);
      console.log("selectedFile : ", selectedFile);
      getImageUploadUrlMutation.mutate();
    }
  };

  function openImageInNewTab(imageUrl) {
    window.open(imageUrl, "_blank");
  }

  // 2244
  return (
    <Box>
      {listData && listData.length ? (
        <Box>
          <Slider {...settings} ref={sliderRef}>
            {listData && listData.length ? (
              listData.map((row, index) => (
                <Card
                  key={index}
                  height="46vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="start"
                  flexDirection={"column"}
                  backgroundColor="gray.50"
                  p={2}
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
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    py={2}
                  >
                    <Badge colorScheme="blue">{row.current_status}</Badge>
                    <Box display={"flex"} gap={2}>
                      {row.is_for_today ? (
                        <Button
                          variant="outline"
                          size="sm"
                          _hover={{ bg: "lightblue" }}
                          color={"orange.500"}
                        >
                          T
                        </Button>
                      ) : (
                        ""
                      )}
                      <ModalButtonForUpdateTaskStatus
                        modal_text={"Update Task Progress Status"}
                        current_status={row.current_status}
                        task={row}
                        refetch={refetch}
                      />
                    </Box>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                      <Box>start:</Box>
                      <Box>{row.started_at_formatted}</Box>
                    </Box>

                    <Box>
                      <Box>completed:</Box>
                      <Box>{row.completed_at_formatted}</Box>
                    </Box>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"} py={3}>
                    <Box>elapsed_time</Box>
                    <Box>{row.elapsed_time_from_started_at}</Box>
                  </Box>

                  {/* fix 0705 */}
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      {selectedFile ? selectedFile.name : "참고 이미지 리스트"}
                      {isUploading && <Spinner size="md" />}
                    </Box>
                    {selectedFile ? (
                      <Box>
                        <IconButton
                          aria-label="파일 업로드"
                          icon={<FiCheckCircle />}
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            buttonHandlerForConfirmFileUpload(row.id)
                          }
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
                        onClick={buttonHandlerForSelectFile}
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
                  <Box>
                    <Grid
                      templateColumns="repeat(4, 1fr)"
                      gap="2"
                      justifyContent="center"
                    >
                      {" "}
                      {row.test_result_images.length
                        ? row.test_result_images.map(
                            (img: TestResultImageForCompleted) => (
                              <Box
                                key={img.id}
                                w="50px"
                                h="50px"
                                // onClick={() => openImageInNewTab(img.image_url)}
                                cursor="pointer"
                              >
                                <Image
                                  src={img.image_url}
                                  alt="Task Image"
                                  w="100%"
                                  h="100%"
                                  objectFit="cover"
                                  onClick={() =>
                                    openImageInNewTab(img.image_url)
                                  }
                                />
                              </Box>
                            )
                          )
                        : "no images"}
                    </Grid>
                  </Box>
                </Card>
              ))
            ) : (
              <Box>no data</Box>
            )}
          </Slider>
          <Box display="flex" justifyContent="center" alignItems="center" m={2}>
            <Button variant={"outline"} size={"sm"} onClick={prevSlide}>
              Prev
            </Button>
            {/* {renderCustomPaging()} */}
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
      ) : (
        "no data"
      )}
    </Box>
  );
}

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  ChakraProvider,
  extendTheme,
  Button,
  useToast,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ProjectProgress } from "../types/project_progress/project_progress_type";
import UpdateFormForTaskDetail from "./Form/UpdateFormForTaskDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { apiForCreateTaskUrlForTask, apiForDeleteTaskUrlForTaskWithPk, apiForUpdateTaskUrlForTaskForPk } from "../apis/project_progress_api";

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

// 1122
const ImageSlideForUncompletedTaskListForChecked: React.FC<
  ImageSlideForUncompletedTaskListForCheckedProps
> = ({ numSlides, dataForTaskListForChecked }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [taskUrls, setTaskUrls] = useState<any>([]);
  const queryClient = useQueryClient();
  const toast = useToast();

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

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateTaskUrlForTask,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["getOneProjectTask"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleAddTaskUrl = (taskPk: number) => {
    mutationForCreateTaskUrlForTask.mutate(taskPk);
  };

  const updateTaskUrl = (index: number, newUrl: string) => {
    console.log("newUrl : ", newUrl);

    const updatedTaskUrls = [...taskUrls];
    console.log("updatedTaskUrls : ", updatedTaskUrls);

    updatedTaskUrls[index] = newUrl;
    setTaskUrls(updatedTaskUrls);
  };

  const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
    (pk: string | number) => {
      return apiForDeleteTaskUrlForTaskWithPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getOneProjectTask"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteTaskUrl = (pk: number) => {
    mutationForDeleteTaskUrlForTaskWithPk.mutate(pk);
  };

  const mutationForUpdateTaskUrlForTaskForPk = useMutation(
    apiForUpdateTaskUrlForTaskForPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getOneProjectTask"]);
        setTaskUrls([]);
        toast({
          status: "success",
          title: "task url update success",
          description: result.message,
        });
      },
    }
  );

  const testUrlPatternAndUpdate = (pk: number, taskUrlForUpdate: string) => {
    try {
      const parsedUrl = new URL(taskUrlForUpdate);
      if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
        // alert(`task_url(id:${pk}) update to : ${taskUrlForUpdate}`);
        mutationForUpdateTaskUrlForTaskForPk.mutate({ pk, taskUrlForUpdate });
      } else {
        alert("Invalid URL: " + taskUrlForUpdate);
        return;
      }
    } catch (error) {
      alert("Invalid URL: " + taskUrlForUpdate);
      return;
    }
  };

  const buttonHandlerForOpenTaskUrl = (pk: number, index: number) => {
    console.log("url for update : ", taskUrls[index]);
    const taskUrlForUpdate = taskUrls[index];

    if (taskUrlForUpdate) {
      testUrlPatternAndUpdate(pk, taskUrlForUpdate);
    } else {
      alert("The input hasn't been modified, so I won't perform an update");
    }
  };

  const handlerForOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  // 2244
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
                {/* <UpdateFormForTaskDetail
                  taskData={dataForTaskListForChecked}
                  handleAddTaskUrl={handleAddTaskUrl(row.pk)}
                  taskUrls={taskUrls}
                  updateTaskUrl={updateTaskUrl}
                  buttonHandlerForDeleteTaskUrl={buttonHandlerForDeleteTaskUrl(
                    row.pk
                  )}
                  buttonHandlerForOpenTaskUrl={buttonHandlerForOpenTaskUrl(
                    row.pk,
                    index
                  )}
                  handlerForOpenUrl={handlerForOpenUrl}
                  invalidDateForStartedAt={invalidDateForStartedAt}
                  handleChangeForStartedAt={handleChangeForStartedAt}
                  invalidDateForCompletedAt={invalidDateForCompletedAt}
                  submitting={submitting}
                  isUploadingForRefImage={isUploadingForRefImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  refer_images={refer_images}
                  setIsHovering={setIsHovering}
                  isHovering={isHovering}
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  delete_lef_image_handler={delete_lef_image_handler}
                /> */}
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

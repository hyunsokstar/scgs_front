import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { useNavigate, useParams } from "react-router-dom";
import { getOneProjectTask } from "../apis/user_api";
import { IOneTaskForProjectTaskType } from "../types/project_progress/project_progress_type";

import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Input,
  HStack,
  VStack,
  Flex,
  Text,
  useToast,
  Checkbox,
  Image,
  IconButton,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// 달력 관련
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import {
  createRefImageForTask,
  deleteOneRefImageForTask,
  updateProjectApiByPk,
} from "../apis/project_progress_api";
import { getUploadURL, uploadImage } from "../api";
import { FaTimes } from "react-icons/fa";

interface Props {}

function ProjectProgressDetail({}: Props): ReactElement {
  const { taskPk } = useParams();
  const toast = useToast();

  const {
    data: taskData,
    isLoading: isLoadingForTaskData,
    refetch: taskDetailRefatch,
  } = useQuery<IOneTaskForProjectTaskType>(
    ["getOneProjectTask", taskPk, "ProjectProgressDetail"],
    getOneProjectTask
  );
  // console.log("taskData : ", taskData);

  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const [started_at, set_started_at] = useState<any>();
  const [due_date, set_due_date] = useState<Date>();
  const [refer_images, set_refer_images] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploadingForRefImage, setIsUploadingForRefImage] = useState(false);

  useEffect(() => {
    set_refer_images(taskData?.task_images);
  }, [taskData]);

  const updateMutation = useMutation(updateProjectApiByPk, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
        title: "project task update success",
        status: "success",
      });
      taskDetailRefatch();
      // navigate("/estimates");
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = ({ writer, task, importance, task_completed }: any) => {
    setSubmitting(true);
    console.log("watch : ", watch(), started_at, due_date);

    updateMutation.mutate({
      taskPk: taskPk,
      writer,
      task,
      importance,
      task_completed,
      started_at: started_at,
      due_date: due_date,
    });

    setSubmitting(false);
  };

  const handleChangeForStartedAt = (newDate: any) => {
    set_started_at(newDate);
  };

  const invalidDateForStartedAt = (current: {
    isBefore: (arg0: Date, arg1: string) => any;
  }) => {
    // 현재 날짜 이전의 모든 날짜를 선택 불가능하도록 설정

    if (due_date) {
      return current.isBefore(new Date(due_date), "day");
    } else {
      return true;
    }
  };

  const invalidDateForCompletedAt = (current: {
    isSameOrAfter: (arg0: Date, arg1: string) => any;
  }) => {
    return current.isSameOrAfter(new Date(started_at), "day");
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    // 드래그 오버 시 Box 배경색을 투명 회색으로 설정
    if (!event.currentTarget.textContent.includes("drag image")) {
      event.currentTarget.style.zIndex = "1";
      // event.currentTarget.style.opacity = 0.5;
      event.currentTarget.style.textAlign = "center";
      event.currentTarget.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    }
  };

  const handleDragLeave = (event: any) => {
    // 드래그 떠날 시 Box 배경색을 초기화
    event.currentTarget.style = "";
  };
  let imageFile: Blob | MediaSource;

  const createRefImageForTaskMutation = useMutation(createRefImageForTask, {
    onSuccess: (result) => {
      console.log("result : ", result);
      setIsUploadingForRefImage(false);
      taskDetailRefatch();

      toast({
        status: "success",
        title: "Profile Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
    },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result);
      console.log("result.variants[0] : ", result.variants[0]);

      createRefImageForTaskMutation.mutate({
        taskPk: taskPk,
        image_url: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      });
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      console.log("file to upload", imageFile);

      uploadImageMutation.mutate({
        uploadURL: result.uploadURL,
        file: imageFile,
      });
    },
  });

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsUploadingForRefImage(true);
    imageFile = event.dataTransfer.files[0];
    // setImageToUpload(imageFile)

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);

      set_refer_images((prevImages: any) => [
        { image_url: imageUrl },
        ...prevImages,
      ]);
    }

    getImageUploadUrlMutation.mutate();
  };

  // 1122
  const deleteRefImageMutation = useMutation(
    (lef_image_pk: number) => {
      return deleteOneRefImageForTask(lef_image_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        if (taskDetailRefatch) {
          taskDetailRefatch();
        }
        // queryClient.refetchQueries(["getUnompletedTaskList"]);
        // queryClient.refetchQueries(["getCompletedTaskList"]);
        toast({
          title: "delete project task 성공!",
          status: "success",
        });
      },
    }
  );

  const delete_lef_image_handler = (lef_image_pk: any) => {
    deleteRefImageMutation.mutate(lef_image_pk);
  };

  if (isLoadingForTaskData) {
    return <Box>Loading</Box>;
  }

  if (!(taskData || isLoadingForTaskData)) {
    return <Box>Loading..</Box>;
  } else {
    return (
      <VStack width={"80%"} mx={"auto"}>
        {/* 상단 상자 추가 */}
        <Box border={"5px solid blue"} width={"100%"}>
          <Flex>
            <Box flex="5" bg="#B2D8D8" p={10} border="5px solid orange">
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={2} w={"80%"}>
                  <FormControl id="writer" isRequired>
                    <FormLabel>Writer</FormLabel>
                    <Input
                      defaultValue={
                        taskData.task_manager
                          ? taskData.task_manager.username
                          : taskData.writer
                      }
                      {...register("writer")}
                      size="md"
                    />
                  </FormControl>

                  <FormControl id="task" isRequired>
                    <FormLabel>Task</FormLabel>
                    <Input
                      {...register("task")}
                      size="md"
                      defaultValue={taskData.task}
                    />
                  </FormControl>

                  <FormControl id="importance" isRequired>
                    <FormLabel>Importance</FormLabel>
                    <RadioGroup defaultValue={taskData.importance.toString()}>
                      <HStack spacing="24px">
                        <Radio value="1" {...register("importance")} size="lg">
                          1
                        </Radio>
                        <Radio value="2" {...register("importance")} size="lg">
                          2
                        </Radio>
                        <Radio value="3" {...register("importance")} size="lg">
                          3
                        </Radio>
                        <Radio value="4" {...register("importance")} size="lg">
                          4
                        </Radio>
                        <Radio value="5" {...register("importance")} size="lg">
                          5
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl id="task_completed">
                    <FormLabel>Task Completed</FormLabel>
                    <Checkbox
                      defaultChecked={taskData.task_completed}
                      {...register("task_completed")}
                    />
                  </FormControl>

                  <Box display={"flex"} justifyContent={"center"} gap={5}>
                    <VStack>
                      <Text>시작</Text>
                      <Datetime
                        isValidDate={invalidDateForStartedAt}
                        onChange={handleChangeForStartedAt}
                        initialValue={
                          taskData.started_at
                            ? new Date(taskData.started_at)
                            : new Date()
                        }
                      />
                    </VStack>

                    <VStack>
                      <Text>마감 날짜</Text>
                      <Datetime
                        isValidDate={invalidDateForCompletedAt}
                        onChange={handleChangeForStartedAt}
                        initialValue={
                          taskData.started_at
                            ? new Date(taskData.started_at)
                            : new Date()
                        }
                      />
                    </VStack>
                  </Box>

                  <Button
                    type="submit"
                    isLoading={submitting}
                    loadingText="Submitting..."
                    size="md"
                    mt={4}
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            </Box>

            <Box
              flex="3"
              // bg="#E8D1CF"
              overflowY="scroll"
              height={"600px"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {refer_images && refer_images.length ? (
                refer_images.map((row: any) => {
                  // console.log("row : ", row);
                  // return <Image src={row.image_url} height={"200px"} width={"100%"}/>;
                  return (
                    <a href={row.image_url} target="_blank" rel="noreferrer">
                      <Box
                        position="relative"
                        zIndex="1"
                        paddingY={1}
                        _hover={{ border: "skyblue", opacity: 0.7 }}
                        // onMouseEnter={() => setIsHovering(true)}
                        // onMouseLeave={() => setIsHovering(false)}
                      >
                        {/* {isHovering ? "호버중" : "떠남"} */}
                        <IconButton
                          icon={
                            <Box display="flex" justifyContent="center">
                              <FaTimes />
                            </Box>
                          }
                          position="absolute"
                          top={"8px"}
                          mt={1}
                          mr={2}
                          right={0}
                          size="sm"
                          // bg="transparent"
                          zIndex={5}
                          // _hover={{ bg: "lightblue" }}
                          // _active={{ bg: "transparent" }}
                          // _focus={{ outline: "none" }}
                          display={isHovering ? "block" : "none"} // display 속성을 이용하여 보이기/숨기기를 조작합니다.
                          onClick={(e) => {
                            e.preventDefault();
                            // alert("삭제 버튼 클릭 : "+ row.pk);
                            delete_lef_image_handler(row.pk);
                          }}
                          aria-label={""}
                        />
                        {isUploadingForRefImage ? (
                          <Spinner size="md" color="blue.500" />
                        ) : (
                          ""
                        )}
                        <Image
                          src={row.image_url}
                          height={"200px"}
                          width={"100%"}
                        />
                      </Box>
                    </a>
                  );
                })
              ) : (
                <Box>
                  <Text>참고 이미지(드래그앤 드롭 가능)</Text>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>{" "}
        {/* 상단 상자 끝 */}
        <Box bg={"yellow"} width={"100%"} border={"5px solid pink"}>
          관련 업무 추가 
        </Box>
      </VStack>
    );
  }
}

export default ProjectProgressDetail;

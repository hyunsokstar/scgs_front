import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { useNavigate, useParams } from "react-router-dom";
import { getOneProjectTask } from "../apis/user_api";
import {
  IOneTaskForProjectTaskType,
  ITypeForTaskDetailUpdate,
  ITypeForTaskDetailUpdateForm,
} from "../types/project_progress/project_progress_type";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

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
  List,
  ListItem,
  ListIcon,
  Textarea,
  Heading,
  Switch,
  Spacer,
  Table,
  Tbody,
  Tr,
  Td,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  apiForCreateTaskUrlForTask,
  apiForDeleteTaskUrlForTaskWithPk,
  apiForUpdateTaskUrlForTaskForPk,
  createRefImageForTask,
  deleteOneRefImageForTask,
  updateProjectApiByPk,
} from "../apis/project_progress_api";
import { getUploadURL, uploadImage } from "../api";
import { FaTimes } from "react-icons/fa";
import ExtraTasksTable from "../components/ExtraTasksTable";
import ModalButtonForExtraTask from "../components/modal/ModalButtonForExtraTask";
import TestListForTaskDetail from "../components/TestList/TestListForTaskDetail";
import ModalButtonForCreateTest from "../components/modal/ModalButtonForCreateTest";
import TableForTechNote from "../components/Table/TableForTechNote";
import ModalButtonForCreateTechNoteList from "../components/modal/ModalButtonForCreateTechNoteList";
import ChatStyleBoard from "../components/ChatStyleBoard";

interface Props {}

// 1122
function ProjectProgressDetail({}: Props): ReactElement {
  const { taskPk } = useParams();
  const [taskUrls, setTaskUrls] = useState<any>([]);

  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: taskData,
    isLoading: isLoadingForTaskData,
    refetch: taskDetailRefatch,
  } = useQuery<IOneTaskForProjectTaskType>(
    ["getOneProjectTask", taskPk, "ProjectProgressDetail"],
    getOneProjectTask
  );

  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset } =
    useForm<ITypeForTaskDetailUpdateForm>();

  const [started_at, set_started_at] = useState<any>();
  const [due_date, set_due_date] = useState<Date>();
  const [refer_images, set_refer_images] = useState<any>();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploadingForRefImage, setIsUploadingForRefImage] = useState(false);

  // const [isChecked, setIsChecked] = useState(false);
  const [isCheckedForShowTechNote, setIsCheckedForShowTechNote] =
    useState(false);

  const handleChange = () =>
    setIsCheckedForShowTechNote(!isCheckedForShowTechNote);

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

  const onSubmit = ({
    writer,
    task,
    task_description,
    importance,
    task_completed,
    cash_prize,
    is_urgent_request,
    task_url1,
    task_url2,
  }: ITypeForTaskDetailUpdateForm) => {
    // alert("submit 확인");

    setSubmitting(true);
    console.log("watch : ", watch(), started_at, due_date);
    // console.log("data for field values: ", data);

    updateMutation.mutate({
      taskPk: taskPk,
      writer,
      task,
      task_url1,
      task_url2,
      task_description,
      importance,
      task_completed,
      started_at: started_at,
      due_date: due_date,
      cash_prize,
      is_urgent_request,
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
        toast({
          title: "delete task url success !",
          status: "success",
        });
      },
      onError: (error) => {
        console.log("delete mutation has an error ", error);
        toast({
          title: `delete mutation has an error :  ${error}`,
          status: "error",
        });
      },
    }
  );

  const delete_lef_image_handler = (lef_image_pk: any) => {
    deleteRefImageMutation.mutate(lef_image_pk);
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
        // queryClient.refetchQueries(["getOneProjectTask"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleAddTaskUrl = () => {
    mutationForCreateTaskUrlForTask.mutate(taskPk);
  };

  const updateTaskUrl = (index: number, newUrl: string) => {
    console.log("newUrl : ", newUrl);

    const updatedTaskUrls = [...taskUrls];
    console.log("updatedTaskUrls : ", updatedTaskUrls);

    updatedTaskUrls[index] = newUrl;
    setTaskUrls(updatedTaskUrls);
  };

  const mutationForUpdateTaskUrlForTaskForPk = useMutation(
    apiForUpdateTaskUrlForTaskForPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // queryClient.refetchQueries(["getCompletedTaskListForTester"]);
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

  // fix 0531
  // const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
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

  // fix 0531
  const buttonHandlerForDeleteTaskUrl = (pk: number) => {
    mutationForDeleteTaskUrlForTaskWithPk.mutate(pk);
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

  // 2244
  if (isLoadingForTaskData) {
    return <Box>Loading</Box>;
  }

  if (!(taskData || isLoadingForTaskData)) {
    return <Box>Loading..</Box>;
  } else {
    return (
      <VStack>
        <Flex border={"0px solid purple"} width="100%" height={"620px"}>
          <VStack width={"50%"} border={"1px solid black"} pt={0}>
            {/* 상단 상자 추가 */}
            <Box width={"100%"} height={"100%"} border="1px solid orange">
              <Flex>
                <Box
                  flex="5"
                  bg="white"
                  border="5px solid black"
                  height={"618px"}
                  px={2}
                  overflowY={"scroll"}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack w={"100%"}>
                      <FormControl id="writer" isRequired>
                        <FormLabel>Writer</FormLabel>
                        <Input
                          defaultValue={
                            taskData.task_manager
                              ? taskData.task_manager.username
                              : taskData.writer
                          }
                          width="50%" // width를 50%로 설정하여 너비 반으로 줄임
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

                      <FormControl
                        id="task"
                        isRequired
                        border="0px solid green"
                        width={"100%"}
                      >
                        <FormLabel>Task Description</FormLabel>
                        <Textarea
                          {...register("task_description")}
                          size="md"
                          height={"200px"}
                          defaultValue={taskData.task_description}
                        />
                      </FormControl>

                      <FormControl
                        id="task"
                        border="0px solid green"
                        width={"100%"}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <FormLabel>Task Urls</FormLabel>
                          <Box>
                            <IconButton
                              icon={<AddIcon />}
                              size={"xs"}
                              aria-label="Add Task Url"
                              colorScheme="teal"
                              variant="outline"
                              onClick={() => {
                                if (
                                  window.confirm("Task URL을 추가하시겠습니까?")
                                ) {
                                  handleAddTaskUrl();
                                }
                              }}
                            />
                          </Box>
                        </Box>
                        <Box>
                          {/* {taskUrls
                            ? taskUrls.map((row: any) => {
                                return <Box>{row}</Box>;
                              })
                            : "no data"} */}
                        </Box>
                        <Box>
                          {taskData.task_urls.map((taskUrl, index) => (
                            <Box
                              display="flex"
                              alignItems={"center"}
                              width={"100%"}
                              border={"0px solid green"}
                              gap={2}
                              p={1}
                            >
                              <IconButton
                                icon={<MinusIcon />}
                                size={"xs"}
                                aria-label="Add Task Url"
                                colorScheme="red"
                                variant="outline"
                                onClick={() =>
                                  buttonHandlerForDeleteTaskUrl(taskUrl.id)
                                }
                              />{" "}
                              <Box
                                key={taskUrl.id}
                                alignItems="center"
                                width={"100%"}
                              >
                                <InputGroup>
                                  <Input
                                    defaultValue={taskUrl.task_url}
                                    value={taskUrls[index]}
                                    width={"100%"}
                                    onChange={(e) =>
                                      updateTaskUrl(index, e.target.value)
                                    }
                                  />
                                  <InputRightAddon width={"80px"} p={0}>
                                    {taskUrls[index] &&
                                    taskUrls[index] !== taskUrl.task_url ? (
                                      <Button
                                        colorScheme="teal"
                                        size="sm"
                                        bg={"orange.200"}
                                        width={"80px"}
                                        height={"100%"}
                                        variant={"outline"}
                                        onClick={() =>
                                          buttonHandlerForOpenTaskUrl(
                                            taskUrl.id,
                                            index
                                          )
                                        }
                                      >
                                        update
                                      </Button>
                                    ) : (
                                      <Button
                                        colorScheme="teal"
                                        size="sm"
                                        width={"80px"}
                                        height={"100%"}
                                        variant={"outline"}
                                        onClick={() => {
                                          alert("open button click");
                                        }}
                                      >
                                        open
                                      </Button>
                                    )}
                                  </InputRightAddon>
                                </InputGroup>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </FormControl>

                      <FormControl id="importance" isRequired>
                        <FormLabel>Importance</FormLabel>
                        <RadioGroup
                          defaultValue={taskData.importance.toString()}
                        >
                          <HStack spacing="24px">
                            <Radio
                              value="1"
                              {...register("importance")}
                              size="lg"
                            >
                              1
                            </Radio>
                            <Radio
                              value="2"
                              {...register("importance")}
                              size="lg"
                            >
                              2
                            </Radio>
                            <Radio
                              value="3"
                              {...register("importance")}
                              size="lg"
                            >
                              3
                            </Radio>
                            <Radio
                              value="4"
                              {...register("importance")}
                              size="lg"
                            >
                              4
                            </Radio>
                            <Radio
                              value="5"
                              {...register("importance")}
                              size="lg"
                            >
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

                      <Box pl={5} border="0px solid blue">
                        <Table w="100%">
                          <Tbody>
                            <Tr borderBottom="1px" borderColor="gray.200">
                              <Td w="50%">
                                <Text>시작:</Text>
                                <Datetime
                                  isValidDate={invalidDateForStartedAt}
                                  onChange={handleChangeForStartedAt}
                                  initialValue={
                                    taskData.started_at
                                      ? new Date(taskData.started_at)
                                      : new Date()
                                  }
                                />
                              </Td>
                              <Td w="50%">
                                <Text>마감:</Text>
                                <Datetime
                                  isValidDate={invalidDateForCompletedAt}
                                  onChange={handleChangeForStartedAt}
                                  initialValue={
                                    taskData.started_at
                                      ? new Date(taskData.started_at)
                                      : new Date()
                                  }
                                />
                              </Td>
                            </Tr>
                            <Tr>
                              <Td w="50%">is_task_for_help</Td>
                              <Td w="50%">
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={taskData.is_urgent_request}
                                  size={"lg"}
                                  {...register("is_urgent_request")}
                                >
                                  <Text
                                    ml="2"
                                    fontSize="md"
                                    fontWeight="semibold"
                                  >
                                    긴급
                                  </Text>
                                </Checkbox>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>
                      <Spacer />
                      <Button
                        type="submit"
                        mt={"20px"}
                        isLoading={submitting}
                        loadingText="Submitting..."
                        size="md"
                        mb={10}
                        width="100%"
                        variant="outline"
                        _hover={{
                          backgroundColor: "gray.100",
                          borderColor: "blue.200",
                        }}
                        colorScheme="purple"
                      >
                        Submit
                      </Button>
                      <Spacer />
                    </VStack>
                  </form>
                </Box>

                <Box>
                  {isUploadingForRefImage && (
                    <Spinner size="md" color="blue.1000" />
                  )}
                </Box>
                <VStack flex="3" border="0px solid green">
                  <Box
                    width={"100%"}
                    overflowY="scroll"
                    height={"618px"}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    border={"1px solid green"}
                  >
                    {refer_images && refer_images.length ? (
                      refer_images.map((row: any) => {
                        // console.log("row : ", row);
                        // return <Image src={row.image_url} height={"200px"} width={"100%"}/>;
                        return (
                          <a
                            href={row.image_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Box
                              position="relative"
                              zIndex="2"
                              paddingY={0}
                              _hover={{ border: "skyblue", opacity: 0.7 }}
                              onMouseEnter={() => setIsHovering(true)}
                              onMouseLeave={() => setIsHovering(false)}
                            >
                              <IconButton
                                icon={
                                  <Box display="flex" justifyContent="center">
                                    <FaTimes />
                                  </Box>
                                }
                                position="absolute"
                                top={"8px"}
                                mt={0}
                                mr={2}
                                right={0}
                                size="sm"
                                // bg="transparent"
                                zIndex={10}
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
                </VStack>
              </Flex>
            </Box>{" "}
          </VStack>

          <Box width={"50%"}>
            <Flex
              flexDirection={"column"}
              justifyContent={"flex-start"}
              width="100%"
              height="620px"
              mb={2}
              px={2}
              border={"1px solid green"}
            >
              <Box width={"100%"} mt={1} mb={5}>
                {/* <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="my-switch" mb="0">
                    Mode Changes(Comment or tech Note)
                  </FormLabel>
                  <Switch
                    isChecked={isCheckedForShowTechNote}
                    onChange={handleChange}
                    size="lg"
                    colorScheme="green"
                  />{" "}
                </FormControl> */}
                Briefing Board
              </Box>{" "}
              <Box width={"100%"} height={"100%"} border={"0px solid red"}>
                {/* 0405 comment list 추가 하기 */}
                {!isCheckedForShowTechNote ? (
                  <ChatStyleBoard
                    taskPk={taskData.pk}
                    task_manager={taskData?.task_manager}
                    task_comments={taskData?.task_comments}
                  />
                ) : (
                  <TableForTechNote isForTask={true} taskPk={taskData?.pk} />
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box bg={"white"} width={"100%"} border={"2px solid blue"}>
          <ModalButtonForExtraTask taskPk={taskPk} />
          <ExtraTasksTable
            extra_tasks={taskData.extra_tasks}
            orginal_task_pk={taskPk}
          />
        </Box>
        <Box bg={"white"} width={"100%"} border={"1px solid black"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgColor={"yellow.200"}
            p={1}
            textAlign="center"
          >
            테스트 리스트 (테스트 체킹은 로그인 필요)
            {!isLoadingForTaskData && taskData ? (
              <ModalButtonForCreateTest taskPk={taskData?.pk} />
            ) : (
              ""
            )}
          </Box>
          <TestListForTaskDetail testData={taskData?.tests_for_tasks} />
        </Box>
      </VStack>
    );
  }
}

export default ProjectProgressDetail;

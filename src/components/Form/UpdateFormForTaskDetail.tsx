import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Spacer,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";
import React from "react";
import InputListForTaskUrlsForTask from "../List/InputListForTaskUrlsForTask";
import { AddIcon } from "@chakra-ui/icons";
import { FaTimes } from "react-icons/fa";
import Datetime from "react-datetime";


interface props {
  handleAddTaskUrl: any;
  taskData: any;
  taskUrls: any;
  updateTaskUrl: any;
  buttonHandlerForDeleteTaskUrl: any;
  buttonHandlerForOpenTaskUrl: any;
  handlerForOpenUrl: any;
  invalidDateForStartedAt: any;
  handleChangeForStartedAt: any;
  invalidDateForCompletedAt: any;
  submitting: any;
  isUploadingForRefImage: any;
  handleDragOver: any;
  handleDragLeave: any;
  handleDrop: any;
  refer_images: any;
  setIsHovering: any;
  isHovering: any;
  register: any;
  handleSubmit:any,
  onSubmit:any
  delete_lef_image_handler: any
}

const UpdateFormForTaskDetail = ({
  handleAddTaskUrl,
  taskData,
  taskUrls,
  updateTaskUrl,
  buttonHandlerForDeleteTaskUrl,
  buttonHandlerForOpenTaskUrl,
  handlerForOpenUrl,
  invalidDateForStartedAt,
  handleChangeForStartedAt,
  invalidDateForCompletedAt,
  submitting,
  isUploadingForRefImage,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  refer_images,
  setIsHovering,
  isHovering,
  register,
  handleSubmit,
  delete_lef_image_handler,
  onSubmit
}: props) => {
  return (
    <Box>
      <Box width={"100%"} height={"100%"} border="1px solid orange">
        <Box display={"flex"}>
          <Box
            flex="5"
            bg="white"
            border="5px solid black"
            height={"618px"}
            px={2}
            overflowY={"scroll"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display={"flex"} flexDirection={"column"} w={"100%"}>
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

                <FormControl id="task" border="0px solid green" width={"100%"}>
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
                          if (window.confirm("Task URL을 추가하시겠습니까?")) {
                            handleAddTaskUrl();
                          }
                        }}
                      />
                    </Box>
                  </Box>

                  <InputListForTaskUrlsForTask
                    taskData={taskData}
                    taskUrls={taskUrls}
                    updateTaskUrl={updateTaskUrl}
                    buttonHandlerForDeleteTaskUrl={
                      buttonHandlerForDeleteTaskUrl
                    }
                    buttonHandlerForOpenTaskUrl={buttonHandlerForOpenTaskUrl}
                    handlerForOpenUrl={handlerForOpenUrl}
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

                <Box pl={5} border="0px solid blue">
                  <Table w="100%">
                    <Tbody>
                      <Tr borderBottom="1px" borderColor="gray.200">
                        <Td width="50%">
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
                        <Td width="50%">
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
                        <Td width="50%">is_task_for_help</Td>
                        <Td width="50%">
                          <Checkbox
                            colorScheme="red"
                            defaultChecked={taskData.is_urgent_request}
                            size={"lg"}
                            {...register("is_urgent_request")}
                          >
                            <Text ml="2" fontSize="md" fontWeight="semibold">
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
              </Box>
            </form>
          </Box>

          <Box>
            {isUploadingForRefImage && <Spinner size="md" color="blue.1000" />}
          </Box>
          <Box flex="3" border="0px solid green">
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
                    <a href={row.image_url} target="_blank" rel="noreferrer">
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateFormForTaskDetail;


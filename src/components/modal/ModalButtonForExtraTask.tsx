  import { FC } from "react";
  import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    VStack,
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    HStack,
    useToast,
    Select,
    Flex,
    Textarea,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import {
    FormTypeForExtraTask,
    IFormTypeForProjectProgress,
  } from "../../types/project_progress/project_progress_type";
  import { getUserNamesForCreate } from "../../apis/user_api";
  import { insertExtraTaskByModal } from "../../apis/project_progress_api";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

  interface IProps {
    taskPk: number | string | undefined;
    refetch: () => void;
  }

  interface IUserNamesForCreate {
    pk: number;
    username: string;
  }

  const ModalButtonForExtraTask: FC<IProps> = ({ taskPk, refetch }: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryClient = useQueryClient();

    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm<IFormTypeForProjectProgress>();

    // user data 가져 오기
    const {
      isLoading,
      data: userNamesData,
      error,
    } = useQuery<IUserNamesForCreate[]>(["users_list2"], getUserNamesForCreate);

    // console.log("user names  :: ", userNamesData);

    const toast = useToast();

    function cancelButtonHandler() {
      onClose();
    }

    const createMutationForExtraTask = useMutation(insertExtraTaskByModal, {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "welcome back!",
          status: "success",
        });
        //   requery getOneProjectTask
        refetch();
        // queryClient.refetchQueries(["getOneProjectTask"]);
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    });

    const onSubmit = ({
      task_manager,
      task,
      importance,
    }: FormTypeForExtraTask) => {
      console.log("task create 체크 :: ", task_manager);

      createMutationForExtraTask.mutate({
        taskPk,
        task_manager,
        task,
        importance,
      });
    };

    return (
      <>
        <Flex justifyContent={"space-between"} p={1}>
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            <Button
              variant="outline"
              colorScheme="blue"
              css={{ "&:hover": { backgroundColor: "blue", color: "white" } }}
              onClick={onOpen}
            >
              부가 업무 추가
            </Button>{" "}
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>프로젝트 task 추가</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={2} align="stretch">
                  <FormControl>
                    <FormLabel>담당자</FormLabel>
                    <Select
                      {...register("task_manager", { required: true })}
                      placeholder="Choose a task_manager"
                    >
                      {userNamesData?.map((user) => (
                        <option key={user.pk} value={user.pk}>
                          {user.username}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Task</FormLabel>
                    <Textarea
                      placeholder="Task"
                      {...register("task", { required: true })}
                    />
                    {errors.task && <Box color="red">Task is required</Box>}
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel>지시자</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Writer"
                      {...register("writer", { required: true })}
                    />
                    {errors.writer && <Box color="red">Writer is required</Box>}
                  </FormControl> */}

                  <FormControl>
                    <FormLabel>Importance</FormLabel>
                    <RadioGroup name="rating">
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

                  <FormControl>
                    {/* <FormLabel>Password</FormLabel>
                    <Input
                      size="sm"
                      type="text"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    /> */}
                    {errors.password && (
                      <Box color="red">Password is required</Box>
                    )}
                  </FormControl>

                  <Button type="submit">Submit</Button>
                </VStack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  export default ModalButtonForExtraTask;

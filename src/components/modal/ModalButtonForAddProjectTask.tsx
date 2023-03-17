import { FC } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  VStack, Box, Input, Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IFormTypeForProjectProgress } from "../../types/project_progress/project_progress_type";
import { useMutation } from "@tanstack/react-query";
import { insertProjectProgressRow } from "../../apis/project_progress_api";


interface IProps {
  projectTaskListRefatch: () => void
}


const ModalButtonForAddProjectTask: FC<IProps> = ({projectTaskListRefatch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormTypeForProjectProgress>();

  const toast = useToast();

  function cancelButtonHandler() {
    onClose();
  }

  // insertProjectProgressRow
  // console.log(watch())

  const createMutationForProjectProgress = useMutation(insertProjectProgressRow, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      projectTaskListRefatch();
      onClose();

    },
    onError: (error:any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = ({
    task,
    writer,
    importance,
    task_completed,
    password
  }: IFormTypeForProjectProgress) => {
    createMutationForProjectProgress.mutate({
      task,
      writer,
      importance,
      task_completed,
      password
    })
  };

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        _hover={{ bg: "green.700" }}
        _active={{ bg: "gree.800" }}
        _focus={{ boxShadow: "none" }}
      >
        Project Task 추가
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>프로젝트 task 추가</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={1} align="stretch">
                <FormControl>
                  <FormLabel>Task</FormLabel>
                  <Input
                    placeholder="Task"
                    {...register("task", { required: true })}
                  />
                  {errors.task && <Box color="red">Task is required</Box>}
                </FormControl>

                <FormControl>
                  <FormLabel>Writer</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Writer"
                    {...register("writer", { required: true })}
                  />
                  {errors.writer && <Box color="red">Writer is required</Box>}
                </FormControl>

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
                  <FormLabel>task_completed</FormLabel>
                  <Checkbox {...register("task_completed")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <Box color="red">Password is required</Box>}
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

export default ModalButtonForAddProjectTask;


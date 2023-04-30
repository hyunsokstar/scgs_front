import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateStudyNoteContent } from "../../apis/study_note_api";

interface FormData {
  pk: number;
  title: string;
  file_name: string;
  content: string;
}

interface ModalButtonForSearchStudyNoteContentProps extends ButtonProps {
  pk: number;
  title: string;
  file_name: string;
  content: string;
}

const ModalButtonForSearchStudyNoteContent: React.FC<
  ModalButtonForSearchStudyNoteContentProps
> = ({ pk, title, file_name, content }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { handleSubmit, register, formState } = useForm<FormData>();
  const queryClient = useQueryClient();

  const mutationForUpdateStudyNoteContent = useMutation(
    apiForUpdateStudyNoteContent,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "update succes for study note content!",
          status: "success",
        });
        onClose();
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);

        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (data: FormData) => {
    console.log(data); // do something with the form data

    mutationForUpdateStudyNoteContent.mutate(data);

    onClose();
  };

  return (
    <>
      <Button
        variant="outline"
        colorScheme="teal"
        // color={"#b8e994"}
        _hover={{ bg: "green.500", color: "white" }}
        onClick={onOpen}
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Study Note Content</ModalHeader>
          <ModalCloseButton
            as={IconButton}
            icon={<CloseIcon />}
            variant="outline"
            position="absolute"
            top="1rem"
            right="1rem"
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={!!formState.errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>

                <Input
                  type="hidden"
                  id="pk"
                  value={pk}
                  {...register("pk", { required: true })}
                />

                <Input
                  id="title"
                  placeholder="Title"
                  defaultValue={title}
                  {...register("title", { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.title?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.file_name}>
                <FormLabel htmlFor="file">File</FormLabel>
                <Input
                  id="file"
                  type="text"
                  defaultValue={file_name}
                  {...register("file_name", { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.file_name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.content}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Textarea
                  id="content"
                  placeholder="Content"
                  defaultValue={content}
                  height={"300px"}
                  {...register("content", { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.content?.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Confirm
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForSearchStudyNoteContent;

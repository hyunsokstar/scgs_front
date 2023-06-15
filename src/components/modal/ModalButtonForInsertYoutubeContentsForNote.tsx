import { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface IProps {
  button_text: string;
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
}

const ModalButtonForInsertYoutubeContentsForNote = ({
  button_text,
  currentPage,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // 폼 데이터 처리 로직 추가
    console.log(data);
    onClose();
  };

  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insert Youtube</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Box>
                <FormControl>
                  <Input
                    type="hidden"
                    {...register("study_note_pk")}
                    value={study_note_pk}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="hidden"
                    {...register("current_page_number")}
                    value={currentPage}
                  />
                </FormControl>
                <FormControl display="none">
                  <Input
                    type="hidden"
                    {...register("content_option")}
                    value={"youtube"}
                  />
                </FormControl>
              </Box>

              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the title"
                  {...register("title", { required: true })}
                  isInvalid={errors.title != null}
                />
              </FormControl>
              <FormControl>
                <FormLabel>YoutubeUrl</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the youtube_url"
                  {...register("youtube_url", { required: true })}
                  isInvalid={errors.title != null}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForInsertYoutubeContentsForNote;

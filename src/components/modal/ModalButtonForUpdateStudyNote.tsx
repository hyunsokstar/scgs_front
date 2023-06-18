import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  study_note_pk: string | undefined;
  study_note_title: string;
  study_note_description: string;
  study_note_first_category: string;
  study_note_second_category: string;
}

// 1122
const ModalButtonForUpdateStudyNote = ({
  modal_title,
  button_text,
  button_size,
  study_note_pk,
  study_note_title,
  study_note_description,
  study_note_first_category,
  study_note_second_category,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // handle form submission
    console.log("data : ", data);
  };

  // 2244
  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0618 */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* study_note_pk */}
              <Input type="hidden" {...register("pk")} value={study_note_pk} />

              {/* title */}
              <FormControl mt={4} isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="study_note_title"
                  {...register("title", { required: false })}
                  defaultValue={study_note_title}
                />
                {errors.study_note_title && (
                  <FormErrorMessage>Please enter a title</FormErrorMessage>
                )}
              </FormControl>

              {/* study_note_description */}
              <FormControl mt={4} isInvalid={!!errors.study_note_description}>
                <FormLabel htmlFor="study_note_description">
                  Description
                </FormLabel>
                <Textarea
                  id="study_note_description"
                  {...register("description", { required: false })}
                  defaultValue={study_note_description}
                />
                {errors.study_note_description && (
                  <FormErrorMessage>
                    Please enter a description
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* study_note_first_category */}
              <FormControl
                mt={4}
                isInvalid={!!errors.study_note_first_category}
              >
                <FormLabel htmlFor="first_category">First Category</FormLabel>
                <Select
                  id="study_note_first_category"
                  {...register("first_category", { required: false })}
                  defaultValue={study_note_first_category}
                >
                  {/* options */}
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="challenge">Challenge</option>
                  <option value="boiler-plate">Boiler Plate</option>
                </Select>
                {errors.study_note_first_category && (
                  <FormErrorMessage>
                    Please select a first category
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* study_note_second_category */}
              <FormControl
                mt={4}
                isInvalid={!!errors.study_note_second_category}
              >
                <FormLabel htmlFor="second_category">Second Category</FormLabel>
                <Select
                  id="study_note_second_category"
                  {...register("second_category", { required: false })}
                  defaultValue={study_note_second_category}
                >
                  {/* options */}
                  <option value="tutorial">Tutorial</option>
                  <option value="framework">Framework</option>
                  <option value="library">Library</option>
                  <option value="boiler-plate">Boiler Plate</option>
                  <option value="sample-code">Sample Code</option>
                  <option value="code-review">Code Review</option>
                  <option value="programming-language">
                    Programming Language
                  </option>
                  <option value="challenge">Challenge</option>
                </Select>
                {errors.study_note_second_category && (
                  <FormErrorMessage>
                    Please select a second category
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                display={"flex"}
                justifyContent={"space-between"}
                mt={4}
              >
                <Button type="submit" colorScheme="blue" mr={3} flex={1}>
                  Submit
                </Button>
                <Button onClick={onClose} flex={1}>Cancel</Button>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForUpdateStudyNote;

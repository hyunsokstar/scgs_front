import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  ModalCloseButton, // 추가
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";

const ModalButtonForInsertToApiDocu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const borderColor = useColorModeValue("gray.400", "gray.500");
  const errorColor = useColorModeValue("red.500", "red.200");

  const onSubmit = async (data: any) => {
    // setSubmitting(true);
    console.log(data); // do something with the form data
    // onClose();
    // setSubmitting(false);
  };

  return (
    <>
      {/* <Button variant="outline" onClick={onOpen}>Add to API docu</Button> */}
      <Button
        size="md"
        colorScheme="teal"
        variant="outline"
        _hover={{ borderColor: "teal.800", backgroundColor: "teal.50" }}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add to API Documentation
            <ModalCloseButton border={"1px solid green"} /> {/* 추가 */}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                mb={2}
                type="url"
                placeholder="Enter URL"
                borderColor={errors?.url ? errorColor : borderColor}
                {...register("url", { required: true })}
              />
              {errors?.url && (
                <span style={{ color: errorColor }}>
                  This field is required
                </span>
              )}
              <Textarea
                mt={2}
                placeholder="Enter description"
                borderColor={errors?.description ? errorColor : borderColor}
                {...register("description", { required: true })}
              />
              {errors?.description && (
                <span style={{ color: errorColor }}>
                  This field is required
                </span>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              type="submit"
              isLoading={submitting}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForInsertToApiDocu;

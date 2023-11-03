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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ModalButtonForInsertToApiDocu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();

  const borderColor = useColorModeValue("gray.400", "gray.500");
  const errorColor = useColorModeValue("red.500", "red.200");

  const onSubmit = async (data:any) => {
    setSubmitting(true);
    console.log(data); // do something with the form data
    onClose();
    setSubmitting(false);
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen}>Add to API docu</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to API Documentation</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                mt={2}
                placeholder="Enter content"
                borderColor={errors?.content ? errorColor : borderColor}
                {...register("content", { required: true })}
              />
              {errors?.content && (
                <span style={{ color: errorColor }}>This field is required</span>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
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
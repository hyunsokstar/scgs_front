import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { FaPlus, FaTimes } from "react-icons/fa";

const ModalButtonForImageUploadForTestResult: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    console.log("File dropped.");
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        colorScheme="green"
        borderRadius="md"
        _hover={{ bg: "green.200" }}
        onClick={onOpen}
      >
        <FaPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent="space-between">
            <Box>Test Result image Upload</Box>
            <Box>
              <Button
                variant="outline"
                colorScheme="red"
                size={"sm"}
                mr={0}
                onClick={onClose}
              >
                <FaTimes />
              </Button>
            </Box>
          </ModalHeader>
          <ModalBody>
            <Box
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragging ? "2px dashed green" : "1px dotted blue",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isDragging ? "파일 놓아주세요!" : "드래그 앤 드롭"}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline">취소</Button>
            <Button colorScheme="blue" ml={3}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForImageUploadForTestResult;

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface ModalButtonProps {
  onDelete: () => void;
}

const ModalButtonForDeleteTechNoteList = ({ onDelete }: ModalButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<FaTrash />}
        aria-label="삭제"
        variant="outline"
        borderColor="red.500"
        _hover={{ bg: "red.100" }}
        _active={{ bg: "red.200" }}
        size="xs"
        ml={1}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Tech Note List</ModalHeader>
          <ModalBody>정말 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isDeleting}
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForDeleteTechNoteList;

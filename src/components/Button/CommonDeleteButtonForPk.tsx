import * as React from "react";
import {
  useDisclosure,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface DeleteButtonForTestForTaskProps {
  id: any;
  targetInfoToDelete: string;
  handlerForDelete: (id: any) => void;
}

const CommonDeleteButtonForPk: React.FC<DeleteButtonForTestForTaskProps> = ({
  id,
  targetInfoToDelete,
  handlerForDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const leastDestructiveRef = React.useRef<HTMLButtonElement | null>(null);

  const confirmDeleteHandler = (id: string | number) => {
    handlerForDelete(id);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="테스트 삭제"
        variant="outline"
        border="1px solid orange"
        width="30px"
        size="sm"
        onClick={onOpen}
        mr={2}
        icon={<DeleteIcon />}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Test
          </AlertDialogHeader>
          <AlertDialogBody>
            <Box mt={2}>Target: {targetInfoToDelete}</Box>
            Are you sure you want to delete this test?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => confirmDeleteHandler(id)}
              ml={3}
              ref={leastDestructiveRef}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CommonDeleteButtonForPk;

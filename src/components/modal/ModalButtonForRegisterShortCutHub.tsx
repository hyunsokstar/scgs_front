import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  HStack,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import TableForCandidateShortCutListForHub from '../Table/TableForCandidateShortCutListForHub';
import TableForShortCutHubContentList from '../Table/TableForShortCutHubContentList';
import { ArrowLeftIcon } from '@chakra-ui/icons';

interface IProps {
  shortcut_hub_id: number;
}

const ModalButtonForRegisterShortCutHub = ({ shortcut_hub_id }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [checkedIdsForShorCutToRegisterToHub, setCheckedIdsForShorCutToRegisterToHub] = useState<number[]>([]);

  return (
    <>
      <IconButton
        icon={<AiOutlinePlus />}
        variant="outline"
        aria-label="shortcut hub register"
        onClick={openModal}
        size="full"
      />

      <Modal isOpen={isOpen} onClose={closeModal} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register Shortcut Hub</ModalHeader>
          <ModalCloseButton />
          <ModalBody border={"1px solid red"}>
            <HStack border={"1px solid green"} height={"80vh"} gap={0}>

              <Box flex="1" border="1px dashed" m={2}>
                <Box textAlign={"center"} fontSize={"28px"} my={5}>
                  ShortCutHub Content List
                </Box>

                <TableForShortCutHubContentList shortcut_hub_id={shortcut_hub_id} data={[]} />

              </Box>
              <Box h={"100%"} display={"flex"} alignItems={"center"} border={"1px solid blue"}>
                이동 <br />
                <IconButton
                  icon={<ArrowLeftIcon />}
                  aria-label="Move Data Left"
                  variant="outline"
                  size="sm"
                  borderColor="black"
                />
              </Box>

              <Box flex="1" border="1px dashed" p={2}>
                여기에 전체 short cut list 출력 <br />
                <TableForCandidateShortCutListForHub
                  checkedIdsForShorCutToRegisterToHub={checkedIdsForShorCutToRegisterToHub}
                  setCheckedIdsForShorCutToRegisterToHub={setCheckedIdsForShorCutToRegisterToHub}
                  shortcut_hub_id={shortcut_hub_id}
                />
              </Box>

            </HStack>
          </ModalBody>
          <ModalFooter>
            {/* Footer content, if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRegisterShortCutHub;
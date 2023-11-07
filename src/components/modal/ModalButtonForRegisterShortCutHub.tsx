import React, { useState } from 'react';
import {
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

interface IProps {

}

const ModalButtonForRegisterShortCutHub = ({ }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
          <ModalBody>
            <HStack>
              <Box flex="1" border="1px dashed" m={2}>
                왼쪽 테이블 영역
              </Box>
              <Box flex="1" border="1px dashed" m={2}>
                오른쪽 테이블 영역 <br />
                여기에 전체 short cut list 출력 <br />
                <TableForCandidateShortCutListForHub />
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
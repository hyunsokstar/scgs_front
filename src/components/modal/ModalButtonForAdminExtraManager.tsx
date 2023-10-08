import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { IExtraManager } from "../../types/project_progress/project_progress_type";

interface ModalButtonProps {
  buttonText: string;
  extra_managers: IExtraManager[];
}

const ModalButtonForAdminExtraManager: React.FC<ModalButtonProps> = ({
  buttonText,
  extra_managers,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="xs"
        variant="outline"
        borderColor="blue"
        _hover={{ bg: "blue.100" }}
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent height={"60%"}>
          <ModalHeader>Admin Extra Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="space-between">
              <Box flex="2" borderRight="1px dashed" pr="4">
                {/* 왼쪽 내용 */}
                {extra_managers
                  ? extra_managers.map((user) => {
                      return (
                        <Box display={"flex"} gap={2}>
                          <Avatar
                            name="John Doe" // 이름 설정
                            src={user.task_manager.profile_image} // 프로필 이미지 URL (선택 사항)
                            size="sm" // Avatar 크기 설정 (xs, sm, md, lg, xl 중 선택)
                          />
                          <Text>{user.task_manager.username}</Text>
                        </Box>
                      );
                    })
                  : "no assistant managers"}
              </Box>
              <Box flex="1" pl="4">
                {/* 오른쪽 내용 */}
                all users
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* 모달 하단 버튼 등을 이 부분에 추가하세요 */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAdminExtraManager;

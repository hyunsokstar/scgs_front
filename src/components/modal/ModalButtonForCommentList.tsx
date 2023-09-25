import React from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { ChallengeCommentRow } from "../../types/type_for_challenge";

type ModalButtonForCommentListProps = {
  commentListForChallenge: ChallengeCommentRow[];
};

const ModalButtonForCommentList: React.FC<ModalButtonForCommentListProps> = ({
  commentListForChallenge,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        size="md"
        icon={<ChatIcon />}
        colorScheme="blue"
        onClick={onOpen}
        aria-label={"comments"}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글 목록</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <List spacing={3}>
                {commentListForChallenge.map((comment) => (
                  <ListItem key={comment.id}>
                    <strong>댓글 작성자:</strong> {comment.commenter.username}
                    <br />
                    <strong>댓글 내용:</strong> {comment.comment}
                    {/* 다른 댓글 관련 정보를 렌더링하려면 여기에 추가 */}
                  </ListItem>
                ))}
              </List>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForCommentList;

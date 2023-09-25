import React from "react";
import {
  Box,
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
            <VStack spacing={4} align="stretch">
              <List spacing={3}>
                {commentListForChallenge.map((comment) => {
                  const isCommenter = comment.writer_classfication === "commenter";
                  const alignment = isCommenter ? "flex-start" : "flex-end";
                  const bgColor = isCommenter ? "blue.100" : "gray.200";
                  const textColor = isCommenter ? "blue.900" : "gray.700";

                  return (
                    <ListItem
                      key={comment.id}
                      display="flex"
                      justifyContent={alignment}
                      alignItems="flex-start"
                      bg={bgColor}
                      p={2}
                      borderRadius="lg"
                    >
                      <Box>
                        <strong>{comment.writer.username}</strong>
                        <br />
                        {comment.comment}
                      </Box>
                    </ListItem>
                  );
                })}
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

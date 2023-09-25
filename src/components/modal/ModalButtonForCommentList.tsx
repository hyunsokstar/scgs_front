import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
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
  challengeId: string | number;
  commentListForChallenge: ChallengeCommentRow[];
};

const ModalButtonForCommentList: React.FC<ModalButtonForCommentListProps> = ({
  challengeId,
  commentListForChallenge,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = () => {
    // 댓글 입력 상태(commentText)를 서버로 전송하거나 처리하는 코드를 추가하세요.
    // 여기에서는 간단하게 콘솔에 댓글 내용을 출력하는 예시를 보여줍니다.
    console.log("댓글 내용:", commentText);

    // 댓글을 성공적으로 저장하면 입력 필드를 비웁니다.
    setCommentText("");
  };

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
                  const isCommenter =
                    comment.writer_classfication === "commenter";
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

            {/* Input과 Submit 버튼 추가 */}
            <InputGroup mt={4}>
              <Input
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={handleCommentChange}
                onKeyDown={handleKeyPress}
              />
              <InputRightElement width="auto" mr={1}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleSubmitComment}
                >
                  댓글 추가
                </Button>
              </InputRightElement>
            </InputGroup>
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

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
  useToast,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { ChallengeCommentRow } from "../../types/type_for_challenge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForCreateCommentForChallenge,
  apiForDeleteCommentForChallenge,
} from "../../apis/challenge_api";
import { DeleteIcon } from "@chakra-ui/icons";
import useUser from "../../lib/useUser";

type ModalButtonForCommentListProps = {
  challengeId: string | number;
  participant_username: string;
  commentListForChallenge: ChallengeCommentRow[];
};

const ModalButtonForCommentList: React.FC<ModalButtonForCommentListProps> = ({
  challengeId,
  commentListForChallenge,
  participant_username,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentText, setCommentText] = useState<string>("");

  const { userLoading, user: loginUser, isLoggedIn } = useUser();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitComment();
    }
  };

  const mutationForCreateCommentForChallenge = useMutation(
    apiForCreateCommentForChallenge,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가 !!",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setCommentText("");

        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleSubmitComment = () => {
    console.log("댓글 내용:", commentText);

    mutationForCreateCommentForChallenge.mutate({
      challengeId,
      commentText,
      participant_username,
    });
  };

  // mutationForDeleteCommentForChallenge
  const mutationForDeleteCommentForChallenge = useMutation(
    (pk: string | number) => {
      // return apiForDeleteCommentForChallenge(pk);
      return apiForDeleteCommentForChallenge(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const handleDeleteComment = (commentId: any) => {
    mutationForDeleteCommentForChallenge.mutate(commentId);
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
                  const bgColor =
                    comment.writer_classfication === "commenter"
                      ? "red.100"
                      : comment.writer_classfication === "challenger"
                      ? "blue.100"
                      : comment.writer_classfication === "participant"
                      ? "yellow.100"
                      : "gray.200";
                  const textColor = isCommenter ? "blue.900" : "gray.700";

                  return (
                    <ListItem
                      key={comment.id}
                      display="flex"
                      justifyContent={alignment}
                      alignItems="center"
                      bg={bgColor}
                      p={2}
                      borderRadius="lg"
                    >
                      <Box>
                        <strong>{comment.writer.username}</strong>
                        <br />
                        {comment.comment}
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        {comment.writer.username === loginUser.username ? (
                          <IconButton
                            icon={<DeleteIcon />}
                            aria-label="삭제"
                            colorScheme="red"
                            size="sm"
                            ml={2}
                            onClick={() => handleDeleteComment(comment.id)}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </VStack>

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

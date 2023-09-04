import React, { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { apiForAddCommentForErrorReportForNote, apiForAddCommentForQuestionForNote } from "../../apis/study_note_api";

interface IComment {
  pk: number;
  error_report: number;
  writer: {
    pk: number;
    username: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
  created_at_formatted: string;
}

interface CommentListProps {
  error_report_pk: number; // Define the prop for report_pk
  comments: IComment[]; // Define the prop for comments
}

// todo props 어떻게 받아? comments 는 IComment[] 임
function CommentListForErrorReport({
  error_report_pk,
  comments,
}: CommentListProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [newComment, setNewComment] = useState("");

  const mutationForAddCommentForErrorReportForNote = useMutation(
    apiForAddCommentForErrorReportForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetErrorReportListForStudyNote"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleCommentSubmit = async () => {
    mutationForAddCommentForErrorReportForNote.mutate({
      error_report_pk,
      content: newComment,
    });
    // alert(newComment + error_report_pk);
  };

  return (
    <VStack p={0} bgColor={"blue.50"}>
      <HStack mt={0} width={"100%"}>
        <Input
          placeholder="댓글 추가"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleCommentSubmit}>
          추가
        </Button>
      </HStack>

      {comments && comments.length > 0 ? (
        <Box width="100%">
          {comments.map((comment: IComment) => (
            <HStack
              key={comment.pk}
              p={2}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              align="center"
              justify="space-between"
            >
              <Avatar
                size="md"
                name={comment.writer.username}
                src={comment.writer.profile_image}
              />
              <Text>{comment.content}</Text>
              <Text>{comment.created_at_formatted}</Text>
              <IconButton
                size="sm"
                colorScheme="red"
                aria-label="삭제"
                icon={<DeleteIcon />}
              />
            </HStack>
          ))}
        </Box>
      ) : (
        <Text>No comments</Text>
      )}
    </VStack>
  );
}

export default CommentListForErrorReport;

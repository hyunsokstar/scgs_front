import React, { useState } from "react";
import { VStack, Box, Text, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

interface Comment {
  id: number;
  content: string;
  replies: Comment[];
}

interface CommentListProps {
  comments: Comment[];
  indentLevel?: number;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  indentLevel = 0,
}) => {
  return (
    <VStack align="start" spacing={2} pl={indentLevel * 4}>
      {comments.map((comment: Comment) => (
        <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md">
          <Table size="sm" variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Text pl={indentLevel * 4} fontWeight="bold">
                    {`${indentLevel === 0 ? "" : "ㄴ"} ${comment.content}`}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <CommentList
            comments={comment.replies}
            indentLevel={indentLevel + 1}
          />
        </Box>
      ))}
    </VStack>
  );
};

interface QnAPost {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

interface QnAPostListProps {
  posts: QnAPost[];
}

const QnAPostList: React.FC<QnAPostListProps> = () => {
  const [posts, setPosts] = useState<QnAPost[]>([
    {
      id: 1,
      title: "게시글 제목",
      content: "게시글 내용",
      comments: [
        {
          id: 1,
          content: "1차 댓글 1",
          replies: [
            {
              id: 2,
              content: "2차 댓글 1",
              replies: [
                {
                  id: 3,
                  content: "3차 댓글 1",
                  replies: [],
                },
              ],
            },
            {
              id: 4,
              content: "2차 댓글 2",
              replies: [],
            },
          ],
        },
        {
          id: 5,
          content: "1차 댓글 2",
          replies: [
            {
              id: 6,
              content: "2차 댓글 3",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: "다른 게시글",
      content: "다른 게시글 내용",
      comments: [],
    },
  ]);

  return (
    <VStack align="center" spacing={4}>
      {posts.map((post: QnAPost) => (
        <Box key={post.id} p={4} borderWidth="1px" borderRadius="md">
          <Table size="sm" variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="bold" fontSize="sm">
                    {post.title}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontSize="xs">{post.content}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <CommentList comments={post.comments} />
        </Box>
      ))}
    </VStack>
  );
};

export default QnAPostList;
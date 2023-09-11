import React from "react";
import {
  List,
  ListItem,
  Flex,
  Avatar,
  Text,
  IconButton,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface Comment {
  id: number;
  writer: {
    pk: number;
    username: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
}

interface CommentListProps {
  commentList: Comment[];
}

const CommentListForSuggestionForBoard: React.FC<CommentListProps> = ({
  commentList,
}) => {
  return (
    <Box>
      {commentList.length === 0 ? (
        <Text>댓글이 없습니다</Text>
      ) : (
        <List spacing={2}>
          {commentList.map((comment) => (
            <ListItem key={comment.id} borderWidth="1px" borderRadius="lg" p={2}>
              <Flex alignItems="center">
                <Box>
                  <Avatar
                    name={comment.writer.username}
                    src={comment.writer.profile_image}
                    size="sm"
                  />
                </Box>
                <Text flex="3" pl={2} fontSize="lg" textAlign={"center"}>
                  {comment.content}
                </Text>
                <Spacer />
                <Text fontSize="sm">{comment.created_at}</Text>
                <IconButton aria-label="Edit" icon={<EditIcon />} ml={2} />
                <IconButton aria-label="Delete" icon={<DeleteIcon />} ml={2} />
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CommentListForSuggestionForBoard;

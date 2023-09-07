import React, { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface Comment {
  writer: {
    username: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
}

interface CommentList {
  commentList: Comment[];
}

interface IProps {
  commentList: CommentList;
}

const CommentListForFaqBoard: React.FC<IProps> = ({ commentList }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleEditClick = (index: number, content: string) => {
    if (editingIndex === null) {
      setEditingIndex(index);
      setEditedContent(content);
    } else {
      // 이미 수정 중인 댓글이 있으면 그것을 먼저 완료하도록 합니다.
      // 여기에 필요한 로직을 추가하세요.
    }
  };

  const handleSaveClick = (index: number) => {
    setEditingIndex(null);
    setEditedContent("");
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedContent("");
  };

  return (
    <Box mt={4}>
      {commentList ? (
        commentList.map((comment, index) => (
          <Flex key={index} alignItems="center">
            <Avatar
              name={comment.writer.username}
              src={comment.writer.profile_image || ""}
              size="md"
            />
            <Box ml={2} width="100%">
              {editingIndex === index ? (
                <Flex alignItems="center">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    size="sm"
                    flex="1"
                    marginRight="4px" // 수정 버튼과의 간격
                  />
                  <IconButton
                    icon={<CheckIcon color="green.500" boxSize={6} />} // 체크 아이콘의 색상을 초록색으로, 크기를 조절합니다.
                    size="sm"
                    aria-label="Save Comment"
                    onClick={() => handleSaveClick(index)}
                    marginRight="4px"
                  />
                  <IconButton
                    icon={<CloseIcon color="orange.500" boxSize={6} />} // 취소 아이콘의 색상을 주황색으로, 크기를 조절합니다.
                    size="sm"
                    aria-label="Cancel Edit"
                    onClick={handleCancelClick}
                  />
                </Flex>
              ) : (
                <>
                  <Text>{comment.content}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {comment.created_at}
                  </Text>
                </>
              )}
            </Box>
            <Spacer />
            {editingIndex === index ? // 수정 중일 때는 삭제 버튼 숨기기
            null : (
              <Tooltip label="수정">
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  aria-label="Edit Comment"
                  marginRight="4px" // 수정 버튼과의 간격
                  onClick={() => handleEditClick(index, comment.content)}
                />
              </Tooltip>
            )}
            {editingIndex === index ? // 수정 중일 때는 삭제 버튼 숨기기
            null : (
              <Tooltip label="삭제">
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  aria-label="Delete Comment"
                  onClick={() => {
                    // 삭제 로직을 추가하세요.
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        ))
      ) : (
        <Text>FAQ에 대한 댓글이 없습니다.</Text>
      )}
    </Box>
  );
};

export default CommentListForFaqBoard;

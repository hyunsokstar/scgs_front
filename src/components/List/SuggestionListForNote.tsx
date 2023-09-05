import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface Suggestion {
  pk: number;
  title: string;
  writer: {
    username: string;
    profile_image: string | null;
  };
  created_at_formatted: string;
}

interface SuggestionListProps {
  suggestionList: Suggestion[];
}

const SuggestionListForNote: React.FC<SuggestionListProps> = ({
  suggestionList,
}) => {
  // 수정 핸들러 함수
  const handleEdit = (pk: number) => {
    alert(`수정 아이콘을 클릭했습니다. PK: ${pk}`);
    // 실제로 수정할 로직을 추가하세요.
  };

  // 삭제 핸들러 함수
  const handleDelete = (pk: number) => {
    alert(`삭제 아이콘을 클릭했습니다. PK: ${pk}`);
    // 실제로 삭제할 로직을 추가하세요.
  };

  return (
    <Table variant="striped" colorScheme="teal" size="md">
      <Thead>
        <Tr>
          <Th>작성자</Th>
          <Th>제목</Th>
          <Th>작성일</Th>
          <Th>수정/삭제</Th>
        </Tr>
      </Thead>
      <Tbody>
        {suggestionList.map((suggestion) => (
          <Tr key={suggestion.pk}>
            <Td>
              <Avatar
                size="sm"
                name={suggestion.writer.username}
                src={suggestion.writer.profile_image || undefined}
              />
              <Text marginLeft="1rem">{suggestion.writer.username}</Text>
            </Td>
            <Td>{suggestion.title}</Td>
            <Td>{suggestion.created_at_formatted}</Td>
            <Td>
              <EditIcon
                color="blue.500"
                cursor="pointer"
                marginRight="0.5rem"
                onClick={() => handleEdit(suggestion.pk)} // 수정 핸들러 함수 호출
              />
              <DeleteIcon
                color="red.500"
                cursor="pointer"
                onClick={() => handleDelete(suggestion.pk)} // 삭제 핸들러 함수 호출
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SuggestionListForNote;

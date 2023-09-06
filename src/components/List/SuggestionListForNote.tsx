import React, { useEffect, useState } from "react";
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
import ModalForSuggestionDetailForNote from "../modal/ModalForSuggestionDetailForNote";

interface Suggestion {
  pk: number;
  title: string;
  writer: {
    username: string;
    profile_image: string | null;
  };
  created_at_formatted: string;
  content: string; // 내용 추가
}

interface SuggestionListProps {
  suggestionList: Suggestion[];
}

const SuggestionListForNote: React.FC<SuggestionListProps> = ({
  suggestionList,
}) => {
  // 모달 열기/닫기 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);

    
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

  // 모달 열기 함수
  const openModal = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuggestion(null);
  };

  // 현재 마우스가 호버 상태인 항목의 인덱스를 저장
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
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
          {suggestionList.map((suggestion, index) => (
            <Tr key={suggestion.pk}>
              <Td>
                <Avatar
                  size="sm"
                  name={suggestion.writer.username}
                  src={suggestion.writer.profile_image || undefined}
                />
                <Text marginLeft="1rem">{suggestion.writer.username}</Text>
              </Td>
              <Td
                // 현재 호버된 항목에만 링크 표시
                style={{
                  textDecoration: index === hoveredIndex ? "underline" : "none",
                  cursor: "pointer",
                }}
                onClick={() => openModal(suggestion)} // 클릭 이벤트 추가하여 모달 열기
                onMouseEnter={() => setHoveredIndex(index)} // 호버 상태로 변경
                onMouseLeave={() => setHoveredIndex(null)} // 호버 해제
              >
                {suggestion.title}
              </Td>
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
      {/* 모달 컴포넌트 추가 */}
      <ModalForSuggestionDetailForNote
        isOpen={isModalOpen}
        onClose={closeModal}
        suggestion={selectedSuggestion ? selectedSuggestion : ""}
        suggestionPk={selectedSuggestion?.pk}
        title={selectedSuggestion?.title || ""}
        content={selectedSuggestion?.content || ""}
      />
    </>
  );
};

export default SuggestionListForNote;

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  useToast,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalForSuggestionDetailForNote from "../modal/ModalForSuggestionDetailForNote";
import {
  apiForDeleteCommentForSuggestion,
  apiForDeleteSuggestionForNote,
} from "../../apis/study_note_api";
import ModalButtonForUpdateSuggestion from "../modal/ModalButtonForUpdateSuggestion";

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
  const toast = useToast();
  const queryClient = useQueryClient();

  // 모달 열기/닫기 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);




  // mutationForDeleteCommentForChallenge
  const mutationForDeleteCommentForSuggestion = useMutation(
    (suggestionPk: string | number) => {
      // return apiForDeleteCommentForChallenge(pk);
      return apiForDeleteSuggestionForNote(suggestionPk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetSuggestionList"]);

        toast({
          // title: "delete comment 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  // 삭제 핸들러 함수
  const handleDelete = (suggestionPk: number) => {
    // alert(suggestionPk);
    // 실제로 삭제할 로직을 추가하세요.
    mutationForDeleteCommentForSuggestion.mutate(suggestionPk);
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
                {/* <Text marginLeft="1rem">{suggestion.writer.username}</Text> */}
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
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <ModalButtonForUpdateSuggestion
                    modal_title={"update suggestion"}
                    modal_size={"5xl"}
                    button_text={"update suggestion"}
                    button_size={"md"}
                    pk={suggestion.pk}
                    title={suggestion.title}
                    content={suggestion.content}
                  />
                  <IconButton
                    aria-label={"삭제"}
                    onClick={() => handleDelete(suggestion.pk)} // 이 부분에 삭제 핸들러 함수 호출
                    icon={<DeleteIcon />}
                    size={"md"}
                    _hover={{ bgColor: "red.100" }}
                    variant="ghost"
                    // bgColor="red.100" // bgColor를 red.100으로 설정
                  />
                </Box>
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

import React, { useState } from "react";

import {
  Checkbox,
  Avatar,
  Text,
  Flex,
  IconButton,
  VStack,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TypeForSuggestionRow } from "../../types/board_type";
import ModalForSuggestionDetailForBoard from "../modal/ModalForSuggestionDetailForBoard";
import ModalButtonForUpdateSuggestionForBoard from "../modal/ModalButtonForUpdateSuggestionForBoard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteSuggestionForBoard } from "../../apis/board_api";

interface ITypeForPropsForSuggestionList {
  suggestions: TypeForSuggestionRow[];
}

const ListForSuggestionForBoard: React.FC<ITypeForPropsForSuggestionList> = ({
  suggestions,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<TypeForSuggestionRow>();

  const handleTitleClick = (suggestion: TypeForSuggestionRow) => {
    if (suggestion) {
      // 선택된 제안이 존재하는 경우에만 모달을 열도록 합니다.
      setIsModalOpen(true);
      setSelectedSuggestion(suggestion);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // mutationForDeleteSuggestionForNote
  const mutationForDeleteCommentForSuggestion = useMutation(
    (suggestionPk: string | number) => {
      return apiForDeleteSuggestionForBoard(suggestionPk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetSuggestionListForBoard"]);

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

  return (
    <VStack spacing={2} align="stretch">
      {suggestions
        ? suggestions.map((suggestion: TypeForSuggestionRow) => (
            <Flex
              key={suggestion.id}
              borderWidth="1px"
              borderRadius="lg"
              p={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Checkbox size="sm" mr={2} />
              <Avatar
                name={suggestion.writer?.username || "u"} // username이 없을 경우 "u"를 기본값으로 사용
                src={suggestion.writer?.profile_image || ""} // profile_image가 없을 경우 빈 문자열을 기본값으로 사용
                size="sm"
              />
              <Text
                flex="1"
                pr={2}
                fontWeight="bold"
                color="teal.500"
                textAlign="center"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleTitleClick(suggestion)} // 함수를 직접 호출하는 대신 콜백으로 전달
              >
                {suggestion.title}
              </Text>
              <Spacer />
              <Text fontSize="sm" ml={2}>
                {suggestion.created_at_formatted}
              </Text>
              <ModalButtonForUpdateSuggestionForBoard
                modal_title={"update suggestion"}
                modal_size={"5xl"}
                button_text={"update suggestion"}
                button_size={"md"}
                pk={suggestion.id}
                title={suggestion.title}
                content={suggestion.content}
              />{" "}
              <IconButton
                aria-label={"삭제"}
                onClick={() => handleDelete(suggestion.id)} // 이 부분에 삭제 핸들러 함수 호출
                icon={<DeleteIcon />}
                size={"md"}
                _hover={{ bgColor: "red.100" }}
                variant="ghost"
                // bgColor="red.100" // bgColor를 red.100으로 설정
              />{" "}
            </Flex>
          ))
        : "no suggestion"}

      {selectedSuggestion ? (
        <ModalForSuggestionDetailForBoard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedSuggestion={selectedSuggestion}
        />
      ) : (
        ""
      )}
    </VStack>
  );
};

export default ListForSuggestionForBoard;

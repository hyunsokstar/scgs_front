import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Avatar,
  Checkbox,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ITypeForFaqRow } from "../../types/board_type";
import ModalButtonForUpdateFaqForBoard from "../modal/ModalButtonForUpdateFaqForBoard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteFaqForBoard } from "../../apis/board_api";
import ModalForFaqDetailForBoard from "../modal/ModalForFaqDetailForBoard";

interface IPropsForFaqList {
  faqList: ITypeForFaqRow[];
}

const ListForFaqForBoard: React.FC<IPropsForFaqList> = ({ faqList }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<any>();

  const mutationForDeleteFaqForBoard = useMutation(
    (pk: string | number) => {
      return apiForDeleteFaqForBoard(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetSuggestionListForFaq"]);

        toast({
          title: "delete faq 성공!",
          status: "success",
        });
      },
      onError: (error: any) => {
        console.error("FAQ 삭제 오류:", error);
        if (error.response.data.message) {
          toast({
            title: "FAQ 삭제 실패",
            description: error.response.data.message,
            status: "error",
          });
        } else {
          toast({
            title: "FAQ 삭제 실패",
            status: "error",
          });
        }
      },
    }
  );

  const handleDeleteFaq = (faqId: number) => {
    console.log(`Delete FAQ with ID: ${faqId}`);
    mutationForDeleteFaqForBoard.mutate(faqId);
  };

  const openModal = (faq: any) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaq(null);
  };

  return (
    <Box>
      <VStack spacing={2} align="stretch">
        {faqList.length === 0 ? (
          <Box p={2} textAlign="center">
            데이터가 없습니다.
          </Box>
        ) : (
          faqList.map((faq) => (
            <Box
              key={faq.id}
              borderWidth="1px"
              borderRadius="lg"
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Checkbox size="sm" mr={2} />
              <Avatar
                name={faq.writer?.username || "User"}
                src={faq.writer?.profile_image || ""}
                size="sm"
              />
              <Text
                flex="1"
                pr={2}
                fontWeight="bold"
                color="teal.500"
                textAlign="center"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => openModal(faq)} // 클릭 이벤트 추가하여 모달 열기
              >
                {faq.title}
              </Text>
              <Spacer />
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <ModalButtonForUpdateFaqForBoard
                  id={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
                <IconButton
                  aria-label="삭제"
                  icon={<DeleteIcon />}
                  size="sm"
                  _hover={{ bgColor: "red.100" }}
                  variant="ghost"
                  onClick={() => handleDeleteFaq(faq.id)} // 딜리트 핸들러 함수 호출
                />
              </Box>
            </Box>
          ))
        )}
      </VStack>

      <ModalForFaqDetailForBoard
        isOpen={isModalOpen}
        onClose={closeModal}
        faqId={selectedFaq?.pk}
        title={selectedFaq?.title || ""}
        content={selectedFaq?.content || ""}
      />

    </Box>
  );
};

export default ListForFaqForBoard;

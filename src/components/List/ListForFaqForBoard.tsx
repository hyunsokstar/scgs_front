import React from "react";
import {
  Box,
  Text,
  VStack,
  Avatar,
  Checkbox,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ITypeForFaqRow } from "../../types/board_type";
import ModalButtonForUpdateFaqForBoard from "../modal/ModalButtonForUpdateFaqForBoard";

interface IPropsForFaqList {
  faqList: ITypeForFaqRow[];
}

const ListForFaqForBoard: React.FC<IPropsForFaqList> = ({ faqList }) => {
  return (
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
              // 클릭 이벤트 핸들러 추가
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
                // 삭제 핸들러 함수 호출
                // 아이콘을 클릭하면 삭제 이벤트를 처리하는 함수를 호출해야 합니다.
                icon={<DeleteIcon />}
              />
            </Box>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default ListForFaqForBoard;

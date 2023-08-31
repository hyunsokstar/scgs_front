import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FAQRow } from "../../types/study_note_type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteNoteFaq } from "../../apis/study_note_api";
import ModalForFAQDetailForNote from "../modal/ModalForFAQDetailForNote";
import ModalButtonForAddFaqForStudyNote from "../modal/ModalButtonForAddFaqForStudyNote";
import ModalButtonForUpdateFaqForNote from "../modal/ModalButtonForUpdateFaqForNote";

interface TabelForFAQListForStudyNoteProps {
  study_note_pk: number | string | undefined;
  data: FAQRow[] | undefined;
  refetchForGetQnABoardList: () => void;
}

const TableForFAQListForStudyNote: React.FC<
  TabelForFAQListForStudyNoteProps
> = ({ study_note_pk, data, refetchForGetQnABoardList }) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [isOpen, setIsOpen] = useState(false);
  const [faqData, setFaqData] = useState<FAQRow | null>(null);

  // todo
  const openModal = (question: FAQRow) => {
    setFaqData(question);
    setIsOpen(true);
  };

  const closeModal = () => {
    setFaqData(null);
    setIsOpen(false);
  };

  const mutationForDeleteNoteFaq = useMutation(
    (pk: string | number) => {
      return apiForDeleteNoteFaq(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetFAQBoardList"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteFaq = (pk: any) => {
    console.log("delete button click !", pk);
    mutationForDeleteNoteFaq.mutate(pk);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} p={2}>
        
        <ModalButtonForAddFaqForStudyNote
          button_text={"add faq"}
          button_size={"lg"}
          modal_title={"add faq"}
          modal_size={"6xl"}
          study_note_pk={study_note_pk}
        />
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Title2</Th>
            <Th>Writer</Th>
            <Th>Created At</Th>
            <Th>Update / Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length ? (
            data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Box
                    cursor="pointer"
                    textDecoration={"underline"}
                    _hover={{ color: "blue.500" }}
                    onClick={() => openModal(row)}
                  >
                    <Text>{row.title}</Text>
                  </Box>
                  {/* 모달을 열기 위한 클릭 핸들러 */}
                </Td>
                {/* <Td>{row.content}</Td> */}
                <Td>{row.writer.username}</Td>
                <Td>{row.created_at_formatted}</Td>
                <Td>
                  <Box display={"flex"} gap={2}>
                    <ModalButtonForUpdateFaqForNote
                      button_text={"update question"}
                      button_size={"sm"}
                      modal_title={"update question"}
                      modal_size={"6xl"}
                      pk={row.pk}
                      title={row.title}
                      content={row.content}
                    />
                    <IconButton
                      onClick={() => buttonHandlerForDeleteFaq(row.pk)}
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                    />
                  </Box>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} fontSize={"30px"} textAlign={"center"} py={10}>
                There is No FaqList
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {isOpen && (
        <ModalForFAQDetailForNote
          isOpen={isOpen}
          closeModal={closeModal}
          faqData={faqData}
          refetchForGetQnABoardList={refetchForGetQnABoardList}
        />
      )}
    </Box>
  );
};

export default TableForFAQListForStudyNote;

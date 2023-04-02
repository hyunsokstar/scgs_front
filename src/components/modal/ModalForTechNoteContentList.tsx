import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
  Spacer,
} from "@chakra-ui/react";
import CardForTechNoteContent from "../CardForTechNoteContent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getTechNoteContentListByPk } from "../../apis/tech_note_api";
import { TechNoteContentRowType } from "../../types/tech_note_type";

type TechNoteModalProps = {
  techNotePk: string | number | undefined;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalForTechNoteContentList = ({
  techNotePk,
  isOpen,
  onOpen,
  onClose,
}: TechNoteModalProps) => {
  const {
    data: tech_note_content_list_data,
    isLoading: tech_note_content_list_loading,
    refetch: tech_note_content_list_data_refetching,
  } = useQuery<any>(
    ["getTechNoteContentListByPk", techNotePk, "getTechNoteContentListByPk"],
    getTechNoteContentListByPk
  );

  console.log(
    "tech_note_content_list_data for modal: ",
    tech_note_content_list_data
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="7xl">
        <ModalOverlay bg="rgba(0,0,0,0.5)" />
        <ModalContent bg="green.50" height={"80%"}>
          <ModalHeader>Tech Note Content list For {techNotePk}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="60vh">

            <Box display="flex" justifyContent="space-between" gap={2} mb={2}>
              <Button
                variant="outline"
                colorScheme="green"
                _hover={{ bg: "green.100" }}
              >
                All Check
              </Button>
              <Spacer />
              <Button
                variant="outline"
                colorScheme="red"
                _hover={{ bg: "red.100" }}
              >
                삭제
              </Button>
              <Button
                variant="outline"
                colorScheme="purple"
                _hover={{ bg: "purple.100" }}
              >
                Create
              </Button>
            </Box>

            {tech_note_content_list_data
              ? tech_note_content_list_data.data.map(
                  (row: TechNoteContentRowType) => {
                    return (
                      <Box mb={2} width="100%" border={"0px solid red"}>
                        <CardForTechNoteContent
                          pk = {row.pk}
                          title={row.title}
                          file={row.file}
                          content={row.content}
                          created_at={row.created_at}
                        />
                      </Box>
                    );
                  }
                )
              : "no techNoteContentListData"}{" "}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForTechNoteContentList;

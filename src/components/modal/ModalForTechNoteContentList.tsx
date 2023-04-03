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
  HStack,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import CardForTechNoteContent from "../CardForTechNoteContent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getTechNoteContentListByPk } from "../../apis/tech_note_api";
import { TechNoteContentRowType } from "../../types/tech_note_type";
import ModalButtonForCreateTechNoteContent from "./ModalButtonForCreateTechNoteContent";
import ModalButtonForCreateTechNoteContent2 from "./ModalButtonForCreateTechNoteContent2";

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
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay bg="rgba(0,0,0,0.5)" />
        <ModalContent bg="white" height={"80%"}>
          {/* tech_note_title */}
          <ModalHeader>
            노트 주제 : {tech_note_content_list_data?.tech_note_title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="60vh">
            <Box
              display="flex"
              justifyContent="space-between"
              width={"100%"}
              border={"0px solid purple"}
              mb={2}
              gap={2}
            >
              <Box>
                <Button
                  variant="outline"
                  colorScheme="green"
                  _hover={{ bg: "green.100" }}
                >
                  All Check
                </Button>
              </Box>
              <Box display={"flex"} border="0px solid purple" gap={2}>
                <Button
                  variant="outline"
                  colorScheme="red"
                  _hover={{ bg: "red.100" }}
                >
                  삭제
                </Button>

                {/* <ModalButtonForCreateTechNoteContent
                  note_content_fk={techNotePk}
                /> */}
                <ModalButtonForCreateTechNoteContent2 />
                
              </Box>
            </Box>
            {/* rome-ignore lint/complexity/useOptionalChain: <explanation> */}
            {tech_note_content_list_data?.data &&
            tech_note_content_list_data?.data.length ? (
              tech_note_content_list_data.data.map(
                (row: TechNoteContentRowType) => {
                  return (
                    <Box mb={2} width="100%" border={"1px solid black"} p={2}>
                      <CardForTechNoteContent
                        pk={row.pk}
                        title={row.note_content_title}
                        file={row.note_content_file}
                        content={row.note_content_content}
                        created_at={row.created_at}
                      />
                    </Box>
                  );
                }
              )
            ) : (
              <Flex border="1px dotted green">
                <Image
                  /* 데이터가 없음을 나타내는 이미지 파일 경로 */
                  src="https://img.freepik.com/premium-vector/no-result-found-concept_637684-8.jpg?w=740"
                  alt="no data"
                  boxSize="350px"
                  objectFit="contain"
                  mt="0px"
                />
                <Text fontSize={20} p={2}>
                  {tech_note_content_list_data?.tech_note_title} 에 대해 content
                  List 가 없습니다. create button 을 이용해 등록해 주세요
                </Text>
              </Flex>
            )}
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

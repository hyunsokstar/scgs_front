import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { QnARow } from "../../types/study_note_type";
import { apiForGetQnABoardList } from "../../apis/study_note_api";
import TableForQnaListForStudyNote from "../Table/TableForQnaListForStudyNote";
import PaginationComponent from "../PaginationComponent";

interface IProps {
  button_text: string;
  button_size: string;
  button_width?: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | undefined;
  count_for_qna_boards: number | undefined;
}

// 1122
const ModalButtonForQnAList = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
  count_for_qna_boards,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetQnABoardList,
    data: dataForGetQa,
    refetch: refetchForGetQnABoardList,
  } = useQuery<any[]>(
    ["apiForGetQnABoardList", study_note_pk, pageNum],
    apiForGetQnABoardList,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("dataForGetQa : ", dataForGetQa);

  // 2244
  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        width={button_width}
      >
        {button_text} ({count_for_qna_boards})
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* todo: 검색 버튼을 위한 input 추가 with chakra-ui 인풋 추가 하고 인풋 오른쪽 끝에 addone 으로 search 버튼 추가 */}
            <InputGroup>
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                // 여기에 검색어를 처리할 상태나 함수를 연결하세요
              />
              <InputRightElement width="4.5rem">
                <Button colorScheme="blue" h="1.75rem" size="sm">
                  검색
                </Button>
              </InputRightElement>
            </InputGroup>

            <TableForQnaListForStudyNote
              study_note_pk={study_note_pk}
              data={dataForGetQa?.qaList}
              refetchForGetQnABoardList={refetchForGetQnABoardList}
            />

            {dataForGetQa ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={dataForGetQa.totalQaCount}
                task_number_for_one_page={dataForGetQa.perPage}
              />
            ) : (
              ""
            )}
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForQnAList;

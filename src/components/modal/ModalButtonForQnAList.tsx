import { useEffect, useState } from "react";
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
  Text,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { apiForGetQnABoardList, apiForSearchQnaListBySearchWords } from "../../apis/study_note_api";
import TableForQnaListForStudyNote from "../Table/TableForQnaListForStudyNote";
import PaginationComponent from "../PaginationComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface IProps {
  button_text: string;
  button_size: string;
  button_width?: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | undefined;
  total_count_for_qna_board: number | undefined;
}

// 1122
const ModalButtonForQnAList = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
  total_count_for_qna_board,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();  
  const [pageNum, setPageNum] = useState(1);
  const [searchWords, setSearchWords] = useState("");

  const [qnaList, setQnaList] = useState([]);

  const {
    isLoading: isLoadingForGetQnABoardList,
    data: dataForQa,
    refetch: refetchForGetQnABoardList,
  } = useQuery<any[]>(
    ["apiForGetQnABoardList", study_note_pk, pageNum],
    apiForGetQnABoardList,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  // console.log("dataForQa : ", dataForQa);  

  const mutationForSearchQnaListBySearchWords = useMutation(
    apiForSearchQnaListBySearchWords,
    {
      onSuccess: (result: any) => {
        console.log("result for search: ", result);
        setQnaList(result.data)

        toast({
          status: "success",
          title: "search faq list !!",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleSearch = () => {
    // alert("검색 버튼 클릭");
    mutationForSearchQnaListBySearchWords.mutate({
      study_note_pk,
      searchWords
    })
    
  };


  // 2244
  useEffect(() => {
    if (dataForQa) {
      setQnaList(dataForQa.qaList);
    }
  }, [dataForQa]);

  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        width={button_width}
        display="flex"
        justifyContent="space-between" // 양쪽 끝에 정렬하도록 지정
        px={2}
      >
        {/* {button_text} ({total_count_for_qna_board}) */}
        <Text>{button_text}</Text>
        <Text>({total_count_for_qna_board})</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              {/* todo input 에서 엔터 치거나 검색 버튼 클릭하면 검색 함수로 연결 */}
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchWords}
                onChange={(e) => setSearchWords(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // 엔터 키를 누르면 검색 함수를 호출합니다.
                  }
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  colorScheme="blue"
                  h="1.75rem"
                  size="sm"
                  onClick={handleSearch}
                >
                  검색
                </Button>
              </InputRightElement>
            </InputGroup>

            <TableForQnaListForStudyNote
              study_note_pk={study_note_pk}
              data={qnaList ? qnaList : []}
              refetchForGetQnABoardList={refetchForGetQnABoardList}
            />

            {dataForQa ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={dataForQa.totalQaCount}
                task_number_for_one_page={dataForQa.perPage}
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

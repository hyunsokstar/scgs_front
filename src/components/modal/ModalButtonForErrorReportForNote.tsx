import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  apiForGetErrorReportListForStudyNote,
  apiForSearchErrorReportListBySearchWords,
} from "../../apis/study_note_api";
import TableForErrorReportListForStudyNote from "../Table/TableForErrorReportListForStudyNote";
import PaginationComponent from "../PaginationComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: any;
}

// 1122
const ModalButtonForErrorReportForNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [pageNum, setPageNum] = useState(1);
  const [errorReportList, setErrorReportList] = useState([]);
  const [searchWords, setSearchWords] = useState("");

  const {
    isLoading: isLoadingForGetErrorReportListForStudyNote,
    data: dataForErrorReport,
    refetch: refetchForGetErrorReportListForStudyNote,
  } = useQuery<any>(
    ["apiForGetErrorReportListForStudyNote", study_note_pk, pageNum],
    apiForGetErrorReportListForStudyNote,
    {
      enabled: true,
    }
  );
  // console.log("dataForErrorReport : ", dataForErrorReport);

  const mutationForSearchErrorReportListBySearchWords = useMutation(
    apiForSearchErrorReportListBySearchWords,
    {
      onSuccess: (result: any) => {
        console.log("result for search: ", result);
        setErrorReportList(result.data);

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
    mutationForSearchErrorReportListBySearchWords.mutate({
      study_note_pk,
      searchWords,
    });
  };

  useEffect(() => {
    if (dataForErrorReport) {
      setErrorReportList(dataForErrorReport.errorReportList);
    }
  }, [dataForErrorReport]);

  if (!dataForErrorReport) {
    return <Box>Loading..</Box>;
  }

  // 2244
  return (
    <>
      <Button
        aria-label="Confirm"
        variant="outline"
        colorScheme="green"
        rounded="md"
        size={button_size}
        width={button_width}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup mb={2}>
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

            {errorReportList.length ? (
              <TableForErrorReportListForStudyNote
                errorReportList={errorReportList && errorReportList}
                refetchForGetErrorReportListForStudyNote={
                  refetchForGetErrorReportListForStudyNote
                }
              />
            ) : (
              <Center h="300px" bg="teal.200">
                <Box fontSize="2xl">There is no error report data</Box>
              </Center>
            )}

            {errorReportList.length ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={dataForErrorReport.totalErrorReportCount}
                task_number_for_one_page={dataForErrorReport.perPage}
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

export default ModalButtonForErrorReportForNote;

import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  apiForGetSuggestionListForNote,
  apiForSearchSurgesttionListBySearchWords,
} from "../../apis/study_note_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import SuggestionListForNote from "../List/SuggestionListForNote";
import ModalButtonForCreateSuggestion from "./ModalButtonForCreateSuggestion";
import PaginationComponent from "../PaginationComponent";

interface ModalButtonProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  study_note_pk: any;
}


// 1122
function ModalButtonForNoteSuggestion(props: ModalButtonProps) {
  const toast = useToast();
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const {
    button_text,
    button_size,
    button_width,
    modal_title,
    modal_size,
    study_note_pk,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchWords, setsearchWords] = useState("");

  const {
    isLoading: isLoadingForGetsuggestion,
    data: suggestionData,
    refetch: refetchForGetsuggestion,
  } = useQuery<any>(
    ["apiForGetSuggestionList", study_note_pk, pageNum],
    apiForGetSuggestionListForNote,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  const mutationForSearchSuggestionListBySearchWords = useMutation(
    apiForSearchSurgesttionListBySearchWords,
    {
      onSuccess: (result: any) => {
        console.log("result for search: ", result);
        setSuggestionList(result.data);

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
    // console.log("handleSearch check : ", searchWords);
    mutationForSearchSuggestionListBySearchWords.mutate({
      study_note_pk,
      searchWords,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchWord = (searchWords: string) => {
    // console.log("handleSearchWord searchWords : ", searchWords);
    setsearchWords(searchWords);
  };

  useEffect(() => {
    if (suggestionData) {
      setSuggestionList(suggestionData.suggestionList);
    }
  }, [suggestionData]);

  return (
    <Box>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        width={button_width}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box>
              <InputGroup>
                <Input
                  placeholder="Search..."
                  value={searchWords}
                  onChange={(e) => handleSearchWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <InputRightElement width="auto" mr={1}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Box display={"flex"} justifyContent={"flex-end"} my={2} mr={2}>
                <ModalButtonForCreateSuggestion
                  study_note_pk={study_note_pk}
                  modal_title={"건의 사항"}
                  modal_size={"5xl"}
                  button_text="건의 사항 추가"
                />
              </Box>

              {suggestionData ? (
                <SuggestionListForNote suggestionList={suggestionList} />
              ) : (
                "no data"
              )}
            </Box>

            {suggestionData ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={suggestionData.totalSuggestionCount}
                task_number_for_one_page={suggestionData.perPage}
              />
            ) : (
              ""
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalButtonForNoteSuggestion;

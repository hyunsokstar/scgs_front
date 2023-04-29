import { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputRightAddon,
  IconButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import TableForSearchResultForStudyNoteContent from "../Table/TableForSearchResultForStudyNoteContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ForSearchContentListForStudyNote } from "../../apis/study_note_api";
import { type_for_content_list_from_search_result } from "../../types/study_note_type";

interface IProps {
  study_note_pk: string | undefined;
}

// mutationForSearchStudyNoteContentList
// 1122
const ModalButtonForSearchStudyNoteContent = ({ study_note_pk }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [contentListForSearchList, setContentListForSearchList] =
    useState<type_for_content_list_from_search_result[]>([]);

  const queryClient = useQueryClient();
  const toast = useToast();

  const mutationForSearchContentListForStudyNote = useMutation(
    ForSearchContentListForStudyNote,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        setContentListForSearchList(result);
        setSearchTerm("")

        toast({
          status: "success",
          title: "search for study note content list success !",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 엔터 키가 눌렸을 때 실행할 코드를 여기에 작성하세요.
      console.log("Enter key pressed. Search term:", searchTerm);
      mutationForSearchContentListForStudyNote.mutate({
        study_note_pk,
        searchTerm,
      });
    //   alert(searchTerm);
    }
  };

  const handleMouseEnter = () => {
    // InputRightAddon에 호버 이벤트가 발생했을 때 실행할 코드를 여기에 작성하세요.
    console.log("Mouse entered InputRightAddon");
    // alert(searchTerm)
  };

  return (
    <>
      <Button
        ml={2}
        size="sm"
        colorScheme="yellow"
        variant="outline"
        _hover={{ backgroundColor: "yellow.50" }}
        onClick={onOpen}
        leftIcon={<SearchIcon />}
      >
        Search(already)
      </Button>

      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="blue.100">
          <ModalHeader bg="blue.200">Search StudyNote Content</ModalHeader>
          <ModalBody bg="white">
            <InputGroup>
              <Input
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputRightAddon
                border={"1px solid lightgray"}
                onMouseEnter={handleMouseEnter}
                px={0}
              >
                <IconButton
                  width={"80px"}
                  aria-label="Search"
                  icon={<SearchIcon color="gray.500" />}
                  onClick={() => console.log("Search button clicked")}
                />
              </InputRightAddon>
            </InputGroup>
            <Box mt={2}>
                총 {contentListForSearchList.length} 개
              {contentListForSearchList ? (
                <TableForSearchResultForStudyNoteContent
                  contentListForSearchList={contentListForSearchList}
                  onClose = {onClose}
                />
              ) : (
                ""
              )}
            </Box>
          </ModalBody>
          <ModalFooter bg="blue.400">Modal Footer</ModalFooter>
          <Button
            position="absolute"
            top={4}
            right={4}
            onClick={onClose}
            variant="outline"
            bg="white"
            _hover={{ bg: "purple.400" }}
          >
            X
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForSearchStudyNoteContent;

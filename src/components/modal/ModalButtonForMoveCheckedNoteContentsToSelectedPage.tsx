import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForMoveNoteContentsToOtherPage } from "../../apis/study_note_api";
import { useNavigate } from "react-router-dom";

interface ModalButtonProps {
  items: Array<{
    content_pk: number;
    order: number;
    title: string;
  }>;
  checkedIds: string[];
  study_note_pk: any;
  currentPage: number;
  setCheckedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

// 1122
const ModalButtonForMoveCheckedNoteContentsToSelectedPage: React.FC<
  ModalButtonProps
> = ({ items, checkedIds, study_note_pk, currentPage, setCheckedIds }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false); // 모달 열고 닫기 상태 관리

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (content_pk: number) => {
    const updatedCheckedIds = [...checkedIds];
    const contentPkStr = content_pk.toString();

    if (updatedCheckedIds.includes(contentPkStr)) {
      setCheckedIds(updatedCheckedIds.filter((id) => id !== contentPkStr));
    } else {
      setCheckedIds([...updatedCheckedIds, contentPkStr]);
    }
  };

  //  apiForMoveNoteContentsToOtherPage;
  const mutationForMoveNoteContentsToOtherPage = useMutation(
    apiForMoveNoteContentsToOtherPage,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        toast({
          status: "success",
          title: "checked contents move to selected page success",
          description: result.message,
        });
        setIsOpen(false);
        navigate(`/study-note/${study_note_pk}/${result.pageToMove}`);
      },
    }
  );

  const moveToOtherPage = (page: number) => {
    console.log(`Moving to page ${page}`);
    mutationForMoveNoteContentsToOtherPage.mutate({
      checkedIds,
      selectedPage: page,
    });
  };

  const confirmMoveToPage = (selectedPage: number) => {
    const confirmResult = window.confirm(
      ` 체크된 ${checkedIds.length} 개의 노트 내용들을 '${selectedPage}' 페이지로 이동하시겠습니까?`
    );
    if (confirmResult) {
      moveToOtherPage(selectedPage);
    }
  };

  // 2244
  return (
    <>
      <Button
        size="md"
        variant="outline"
        colorScheme="blue"
        onClick={handleOpen}
      >
        move to other page
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size={"7xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            modalButtonForMoveCheckedNoteContentsToSelectedPage
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" border={"1px dotted black"} gap={5}>
              <Box flex={1} px={2}>
                current_page: {currentPage}
                <Table>
                  <Thead>
                    <Tr>
                      <Th>체크 박스</Th>
                      <Th>pk</Th>
                      <Th>title</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items
                      .filter((item) =>
                        checkedIds.includes(item.content_pk.toString())
                      )
                      .map((item) => (
                        <Tr key={item.content_pk}>
                          <Td>
                            <input
                              type="checkbox"
                              checked={checkedIds.includes(
                                item.content_pk.toString()
                              )}
                              onChange={() =>
                                handleCheckboxChange(item.content_pk)
                              }
                            />
                          </Td>
                          <Td>{item.content_pk}</Td>
                          <Td>{item.title}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
              <Box flex={1} textAlign="center">
                <Text>버튼 영역</Text>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(10, 1fr)"
                  gap={2}
                  marginTop={4}
                  p={2}
                >
                  {Array.from({ length: 100 }, (_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      border={
                        currentPage == index + 1
                          ? "1px solid red"
                          : "1px solid black"
                      }
                      onClick={() => {
                        const page = index + 1;
                        if (currentPage == page) {
                          alert("현재 페이지로는 이동 불가 합니다");
                          return;
                        }
                        confirmMoveToPage(page);
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForMoveCheckedNoteContentsToSelectedPage;

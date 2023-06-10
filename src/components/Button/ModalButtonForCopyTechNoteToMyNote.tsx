import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Checkbox,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForCopySelectedNotesToMyNote,
  apiForGetTechNoteListForSelectedRowPks,
} from "../../apis/study_note_api";

interface ModalButtonForCopyTechNoteToMyNoteProps {
  buttonText: string;
  selectedRowPksFromOriginalTable: number[];
  setSelectedRowPksFromOriginalTable: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  handleCheckboxChange: (id: number) => void;
}

// 1122
const ModalButtonForCopyTechNoteToMyNote: React.FC<
  ModalButtonForCopyTechNoteToMyNoteProps
> = ({
  buttonText,
  selectedRowPksFromOriginalTable,
  handleCheckboxChange,
  setSelectedRowPksFromOriginalTable,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowPks, setSelectedRowPks] = useState<number[]>([]);

  const {
    isLoading: isLoadingForGetTechNoteListForSelectedRowPks,
    data: dataForGetTechNoteListForSelectedRowPks,
    refetch: refatchForGetTechNoteListForSelectedRowPks,
  } = useQuery<any>(
    ["apiForGetTechNoteListForSelectedRowPks", selectedRowPksFromOriginalTable],
    apiForGetTechNoteListForSelectedRowPks,
    {
      enabled: true,
    }
  );

  console.log(
    "dataForGetTechNoteListForSelectedRowPks : ",
    dataForGetTechNoteListForSelectedRowPks
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const mutationForCopySelectedNotesToMyNote = useMutation(
    apiForCopySelectedNotesToMyNote,
    {
      onMutate: () => {
        // console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "note copy success",
          description: "note copy success",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["getStudyNoteListForCopyModeForMe"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  // fix 0611
  const buttonHandlerForCopyNoteForCheckedRowsToMyNote = (
    selectedRowPksFromOriginalTable: number[]
  ) => {
    mutationForCopySelectedNotesToMyNote.mutate({
        selectedRowPksFromOriginalTable,
    });
  };

  // 2244
  return (
    <>
      <Button
        variant="outline"
        borderColor="black"
        _hover={{ bg: "teal.100" }}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>

      <Modal size={"6xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Header</ModalHeader>
          <ModalCloseButton
            color="black"
            _hover={{ bg: "red.100" }}
            border="1px solid black"
          />
          <ModalBody bg="gray.200">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox border={"1px solid black"} />
                  </Th>
                  <Th>writer</Th>
                  <Th>Note Title</Th>
                  <Th>Note Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataForGetTechNoteListForSelectedRowPks &&
                dataForGetTechNoteListForSelectedRowPks.noteList.length ? (
                  dataForGetTechNoteListForSelectedRowPks.noteList.map(
                    (item: any) => (
                      <Tr key={item.pk}>
                        <Td>
                          <Checkbox
                            isChecked={selectedRowPksFromOriginalTable.includes(
                              item.pk
                            )}
                            border={"1px solid black"}
                            onChange={() => handleCheckboxChange(item.pk)}
                          />
                        </Td>
                        <Td>{item.writer.username}</Td>
                        <Td>{item.title}</Td>
                        <Td>{item.description}</Td>
                      </Tr>
                    )
                  )
                ) : (
                  <Tr>
                    <Td colSpan={5}>
                      <Box fontSize={"30px"} textAlign={"center"}>
                        {dataForGetTechNoteListForSelectedRowPks &&
                          dataForGetTechNoteListForSelectedRowPks.noteList
                            .length === 0 && <Box>note is not exist !</Box>}
                      </Box>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>

            <Box>
              {/* 현재 선택된 note pks :
              <p>{selectedRowPksFromOriginalTable.join(", ")}</p> */}
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} p={2}>
              {/* {selectedRowPksFromOriginalTable} */}
              <Button
                variant={"outline"}
                size={"md"}
                border={"1px solid green"}
                _hover={{ bg: "green.100" }}
                // onClick={buttonHandlerForCopyNoteForCheckedRowsToMyNote}
                onClick={() => {
                  if (window.confirm("Task URL을 추가하시겠습니까?")) {
                    buttonHandlerForCopyNoteForCheckedRowsToMyNote(
                      selectedRowPksFromOriginalTable
                    );
                  }
                }}
              >
                Copy To My Note
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter bg="gray.100">Modal Footer</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForCopyTechNoteToMyNote;

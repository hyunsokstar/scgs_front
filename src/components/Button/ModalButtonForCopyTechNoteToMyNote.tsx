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
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTechNoteListForSelectedRowPks } from "../../apis/study_note_api";

interface ModalButtonForCopyTechNoteToMyNoteProps {
  buttonText: string;
  selectedRowPksFromOriginalTable: number[];
  setSelectedRowPksFromOriginalTable: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  handleCheckboxChange: (id: number) => void;
}

const ModalButtonForCopyTechNoteToMyNote: React.FC<
  ModalButtonForCopyTechNoteToMyNoteProps
> = ({
  buttonText,
  selectedRowPksFromOriginalTable,
  handleCheckboxChange,
  setSelectedRowPksFromOriginalTable,
}) => {
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

  const buttonHandlerForCopyNoteForCheckedRowsToMyNote = () => {

    alert("button click check !")

    console.log(
      "buttonHandlerForCopyNoteForCheckedRowsToMyNote : ",
      buttonHandlerForCopyNoteForCheckedRowsToMyNote
    );
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

            <Box display={"flex"} justifyContent={"flex-end"} p={2}>
              <Button
                variant={"outline"}
                size={"md"}
                border={"1px solid green"}
                _hover={{ bg: "green.100" }}
                onClick={buttonHandlerForCopyNoteForCheckedRowsToMyNote}
              >
                Copyt To My Note
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

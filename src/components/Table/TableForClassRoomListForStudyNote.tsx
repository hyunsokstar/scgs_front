import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ITypeForClassRoomRowForStudyNote } from "../../types/study_note_type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForRegisterClassRoomForStudyNote } from "../../apis/study_note_api";

interface TableComponentProps {
  dataForGetClassRoomList: ITypeForClassRoomRowForStudyNote[] | undefined;
  study_note_pk: any;
}

// 1122
const TableForClassRoomListForStudyNote: React.FC<TableComponentProps> = ({
  dataForGetClassRoomList,
  study_note_pk,
}) => {
  const toast = useToast();

  const mutationForRegisterClassRoomForStudyNote = useMutation(
    apiForRegisterClassRoomForStudyNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data: ", data);

        toast({
          title: "Classroom registration success!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        console.log("error.response: ", error.response);
        console.log("mutation has an error", error.response.data);

        const errorMessage = error.response.data; // Adjust the error message field based on your API response structure

        toast({
          title: "Error registering classroom",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const buttonHandlerForRegisterClassRoomForStudyNote = () => {
    alert(study_note_pk);
    const current_page = 1;
    mutationForRegisterClassRoomForStudyNote.mutate({
      study_note_pk,
      current_page,
    });
  };

  // 2244
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button>All Check</Button>
        <Button onClick={buttonHandlerForRegisterClassRoomForStudyNote}>
          Create
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            {/* <Th>Current Note</Th> */}
            <Th>Current Page</Th>
            <Th>Writer</Th>
            <Th>Is Approved</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForGetClassRoomList &&
            dataForGetClassRoomList.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                {/* <Td>{row.current_note}</Td> */}
                <Td>{row.current_page}</Td>
                <Td>{row.writer.username}</Td>
                <Td>{row.is_approved ? "Yes" : "No"}</Td>
                <Td>{row.created_at_formatted}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForClassRoomListForStudyNote;

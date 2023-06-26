import { useState } from "react";
import {
  Box,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Avatar,
  IconButton,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ErrorReportForStudyNoteData } from "../../types/study_note_type";
import {
  apiForDeleteErrorReportByPk,
  apiForUpdateErrorReportForNote,
} from "../../apis/study_note_api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface TableForErrorReportListForStudyNoteProps {
  data: ErrorReportForStudyNoteData[] | undefined;
  refetchForGetErrorReportListForStudyNote: () => void;
}

// 1122
const TableForErrorReportListForStudyNote: React.FC<
  TableForErrorReportListForStudyNoteProps
> = ({ data, refetchForGetErrorReportListForStudyNote }) => {
  const queryClient = new QueryClient();
  const toast = useToast();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const handleEditClick = (index: number, content: string) => {
    setEditingIndex(index);
    setUpdatedContent(content);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setUpdatedContent("");
  };

  const mutationForUpdateErrorReportForNote = useMutation(
    apiForUpdateErrorReportForNote,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
        refetchForGetErrorReportListForStudyNote();
        setEditingIndex(null);
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleConfirmClick = (errorPk: number) => {
    mutationForUpdateErrorReportForNote.mutate({
      errorPk,
      content: updatedContent,
    });
  };

  const mutationForDeleteErrorReportForNote = useMutation(
    ({ error_report_pk }: any) => {
      // return deleteOneCommentForTaskByPkApi(pk);
      return apiForDeleteErrorReportByPk(error_report_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (result) => {
        refetchForGetErrorReportListForStudyNote();
        setEditingIndex(null);

        toast({
          title: "delete error report success",
          status: "success",
          description: result.message,
        });
      },
    }
  );

  const buttonHandlerForDeleteErrorReportByPk = (pk: number) => {
    mutationForDeleteErrorReportForNote.mutate({
      error_report_pk: pk,
    });
  };

  // 2244
  return (
    <Box overflowX="auto" overflowY="scroll" height="400px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Writer</Th>
            <Th>Page</Th>
            <Th>Content</Th>
            <Th>Is Resolved</Th>
            <Th>Created At</Th>
            <Th>update/delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length !== 0 ? (
            data.map((item, index) => (
              <Tr
                key={item.created_at_formatted}
                bgColor={editingIndex === index ? "yellow.100" : ""}
              >
                <Td>
                  {item.writer.profile_image ? (
                    <Avatar
                      size="sm"
                      name={item.writer.username}
                      src={item.writer.profile_image}
                    />
                  ) : (
                    <Text>{item.writer.username}</Text>
                  )}
                </Td>
                <Td>{item.page}</Td>
                <Td>
                  {editingIndex === index ? (
                    <Textarea
                      value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    item.content
                  )}
                </Td>
                <Td>{item.is_resolved ? "Yes" : "No"}</Td>
                <Td>{item.created_at_formatted}</Td>
                <Td>
                  {editingIndex === index ? (
                    <Box display="flex" gap={2}>
                      <IconButton
                        variant="outline"
                        border="1px solid black"
                        _hover={{ bgColor: "blue.100" }}
                        aria-label="Confirm"
                        icon={<CheckIcon />}
                        colorScheme="blue"
                        onClick={() => handleConfirmClick(item.pk)}
                      />
                      <IconButton
                        variant="outline"
                        border="1px solid black"
                        _hover={{ bgColor: "blue.100" }}
                        aria-label="Cancel"
                        icon={<CloseIcon />}
                        colorScheme="red"
                        onClick={handleCancelClick}
                      />
                    </Box>
                  ) : (
                    <Box>
                      {loginUser.username === item.writer.username ? (
                        <Box display={"flex"} gap={2}>
                          <IconButton
                            variant="outline"
                            border="1px solid black"
                            _hover={{ bgColor: "blue.100" }}
                            aria-label="Edit"
                            icon={<EditIcon />}
                            colorScheme="blue"
                            onClick={() => handleEditClick(index, item.content)}
                          />
                          <IconButton
                            variant="outline"
                            border="1px solid black"
                            _hover={{ bgColor: "blue.100" }}
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() =>
                              buttonHandlerForDeleteErrorReportByPk(item.pk)
                            }
                          />
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6}>
                <Center h="100px" bgColor="gray.100">
                  <Box
                    fontSize="xl"
                    fontWeight="bold"
                    fontFamily="Helvetica Neue, Arial, sans-serif"
                  >
                    No data
                  </Box>
                </Center>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForErrorReportListForStudyNote;

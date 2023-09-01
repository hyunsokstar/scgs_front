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
import ErrorReportTableRow from "../Row/ErrorReportTableRow";

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

  const openModalForReportDetail = () => {
    // alert("컨텐트 클릭");
  };

  // 2244
  return (
    <Box overflowX="auto" overflowY="scroll" height="400px">
      <Box width="100%">
        {data && data.length !== 0 ? (
          data.map((item, index) => (
            <ErrorReportTableRow
              key={item.created_at_formatted}
              item={item}
              index={index}
              editingIndex={editingIndex}
              updatedContent={updatedContent}
              handleEditClick={handleEditClick}
              handleCancelClick={handleCancelClick}
              handleConfirmClick={handleConfirmClick}
              buttonHandlerForDeleteErrorReportByPk={
                buttonHandlerForDeleteErrorReportByPk
              }
              openModalForReportDetail={openModalForReportDetail}
              loginUser={loginUser}
            />
          ))
        ) : (
          <Box>
            <Center h="100px" bgColor="gray.100">
              <Box
                fontSize="xl"
                fontWeight="bold"
                fontFamily="Helvetica Neue, Arial, sans-serif"
              >
                No data
              </Box>
            </Center>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TableForErrorReportListForStudyNote;

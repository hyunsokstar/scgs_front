import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Image,
  Text,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  apiForDeleteErrorReportByPk,
  apiForUpdateErrorReportForNote,
} from "../../apis/study_note_api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorReportTableRow from "../Row/ErrorReportTableRow";
import CommentListForErrorReport from "../Comments/CommentListForErrorReport";

interface TableForErrorReportListForStudyNoteProps {
  errorReportList: any[] | undefined;
  refetchForGetErrorReportListForStudyNote: () => void;
}

// 1122
const TableForErrorReportListForStudyNote: React.FC<
  TableForErrorReportListForStudyNoteProps
> = ({ errorReportList, refetchForGetErrorReportListForStudyNote }) => {
  const queryClient = new QueryClient();
  const toast = useToast();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const [openAccordion, setOpenAccordion] = useState<boolean[]>(
    Array(errorReportList?.length).fill(false)
  );

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

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
        // setEditingIndex(null);

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

  // console.log("errorReportList ::::: ", errorReportList);

  // 2244
  return (
    <Box overflowX="auto" overflowY="scroll" height="100%">
      {errorReportList?.map((report, index) => (
        <Accordion allowToggle key={report.pk}>
          <AccordionItem>
            <h2>
              <AccordionButton
                onClick={() => {
                  // Toggle the accordion for this row and close others
                  const newOpenAccordion = openAccordion.slice();
                  newOpenAccordion[index] = !newOpenAccordion[index];
                  setOpenAccordion(newOpenAccordion);
                }}
              >
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  mb={4}
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                  w="100%"
                >
                  {/* <Image
                    src={report.writer.profile_image}
                    alt={`Profile Image of ${report.writer.username}`}
                    boxSize="50px"
                    borderRadius="full"
                    mr={4}
                  /> */}
                  <Text>{report.writer.username}</Text>
                  <Text>
                    {report.content} ({report.comments.length})
                  </Text>
                  <Text>page: {report.page}</Text>
                  <Text>{report.created_at_formatted}</Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {/* 댓글 영역 for 에러 레포트 */}
              <CommentListForErrorReport
                error_report_pk={report.pk}
                comments={report.comments}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export default TableForErrorReportListForStudyNote;

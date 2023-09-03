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
                  <Image
                    src={report.writer.profile_image}
                    alt={`Profile Image of ${report.writer.username}`}
                    boxSize="50px"
                    borderRadius="full"
                    mr={4}
                  />
                  <Text>Page {report.page}</Text>
                  <Text>
                    {report.content} ({report.comments.length})
                  </Text>
                  <Text>{report.created_at_formatted}</Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <VStack p={2} >
                {/* {console.log("report.comments:", report.comments)} */}
                {/* todo 댓글 추가를 위한 input 과 addone submit button(오른쪽) 추가 */}
                {/* 댓글 추가를 위한 입력란과 추가 버튼 */}
                <HStack mt={0} width={"100%"}>
                  <Input placeholder="댓글 추가" />
                  <Button colorScheme="blue">추가</Button>
                </HStack>

                {report.comments && report.comments.length > 0 ? (
                  <Box width="100%">
                    {report.comments.map((comment) => (
                      <HStack
                        key={comment.pk}
                        p={2}
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        align="center"
                        justify="space-between" // 요소 사이의 간격을 space-between으로 설정
                      >
                        <Avatar
                          size="md"
                          name={comment.writer.username}
                          src={comment.writer.profile_image}
                        />

                        <Text>{comment.content}</Text>
                        <Text>{comment.created_at_formatted}</Text>
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          aria-label="삭제"
                          icon={<DeleteIcon />}
                        />
                      </HStack>
                    ))}
                  </Box>
                ) : (
                  <Text>No comments</Text>
                )}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export default TableForErrorReportListForStudyNote;

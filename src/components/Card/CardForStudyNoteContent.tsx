import {
  Box,
  Button,
  CloseButton,
  Input,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteOneStudyNoteContent } from "../../apis/study_note_api";

// 1122
const CardForStudyNoteContent = ({
  pk,
  title,
  file_name,
  content,
  writer,
  index,
}: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutationForDeleteStudyNoteContent = useMutation(
    (pk: number) => {
      return apiFordeleteOneStudyNoteContent(pk);
    },
    {
      onSettled: () => {
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "delete study note content 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteStudyNoteContentByPk = (pk: number) => {
    console.log("pk check for delete : ", pk);
    mutationForDeleteStudyNoteContent.mutate(pk);
  };

  return (
    <Box borderRadius="lg" p="4" border={"2px solid red"} mb={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor={"red.100"}
        px={2}
      >
        <Text>step {index + 1}</Text>
        {/* delete button for study note content */}
        <CloseButton
          size="sm"
          colorScheme="teal"
          onClick={() => deleteStudyNoteContentByPk(pk)}
        />
      </Box>
      <Box my="4">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td w={"3%"}>title:</Td>
              <Td>
                <Input defaultValue={file_name} />
              </Td>
            </Tr>
            <Tr>
              <Td w={"3%"}>file:</Td>
              <Td>
                <Input defaultValue={file_name} />
              </Td>
            </Tr>
            <Tr>
              <Td colSpan={2}>
                <Textarea defaultValue={content} h="300px" />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="outline" colorScheme="teal">
          Update
        </Button>
        <Button variant="outline" colorScheme="teal">
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CardForStudyNoteContent;

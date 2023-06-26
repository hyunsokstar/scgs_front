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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ErrorReportForStudyNoteData } from "../../types/study_note_type";

interface TableForErrorReportListForStudyNoteProps {
  data: ErrorReportForStudyNoteData[] | undefined;
}

const TableForErrorReportListForStudyNote: React.FC<
  TableForErrorReportListForStudyNoteProps
> = ({ data }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const handleEditClick = (index: number, content: string) => {
    setEditingIndex(index);
    setUpdatedContent(content);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setUpdatedContent("");
  };

  const handleConfirmClick = () => {
    // Perform the update operation with the updatedContent
    // You can add your logic here to update the content
    setEditingIndex(null);
    setUpdatedContent("");
  };

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
                bgColor={editingIndex === index ?  "yellow.100" : ""}
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
                        onClick={handleConfirmClick}
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
                    <Box display="flex" gap={2}>
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
                      />
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

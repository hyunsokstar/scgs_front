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
} from "@chakra-ui/react";
import { ErrorReportForStudyNoteData } from "../../types/study_note_type";

interface TableForErrorReportListForStudyNoteProps {
  data: ErrorReportForStudyNoteData[] | undefined;
}

const TableForErrorReportListForStudyNote: React.FC<
  TableForErrorReportListForStudyNoteProps
> = ({ data }) => {
  return (
    <Box overflowX="auto" overflowY={"scroll"} height={"400px"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Writer</Th>
            <Th>Page</Th>
            <Th>Content</Th>
            <Th>Is Resolved</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length !== 0 ? (
            data.map((item) => (
              <Tr key={item.created_at_formatted}>
                <Td>
                  {" "}
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
                <Td>{item.content}</Td>
                <Td>{item.is_resolved ? "Yes" : "No"}</Td>
                <Td>{item.created_at_formatted}</Td>
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

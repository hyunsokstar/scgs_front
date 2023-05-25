import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface WriterData {
  writer: string;
  count: number;
}

interface TableForUsersTaskCountInfoProps {
  writers: WriterData[];
}

const TableForUsersTaskCountInfoForTaskLog: React.FC<
  TableForUsersTaskCountInfoProps
> = ({ writers }) => {
  return (
    <Table
      variant="striped"
      colorScheme="black"
      size="md"
      borderRadius="md"
      border={"1px solid black"}
    >
      <Tbody>
        {writers.map((writerData, index) => (
          <Tr key={index}>
            <Td>{writerData.writer}</Td>
            <Td>{writerData.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableForUsersTaskCountInfoForTaskLog;

import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

interface WriterData {
  writer: string;
  count: number;
}

interface TableForUsersTaskCountInfoProps {
  writers: WriterData[];
  setUserOptionForList: React.Dispatch<React.SetStateAction<string>>;
  userOptionForList: string;
}

const TableForUsersTaskCountInfoForTaskLog: React.FC<
  TableForUsersTaskCountInfoProps
> = ({ writers, userOptionForList, setUserOptionForList }) => {
  const handleWriterClick = (writer: string) => {
    setUserOptionForList(writer);
  };

  return (
    <Table
      variant="striped"
      colorScheme="black"
      size="sm"
      borderRadius="md"
      border={"1px solid black"}
    >
      <Tbody>
        <Tr>
          <Td>
            <Button
              size="sm"
              variant="outline"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => handleWriterClick("")}
            >
              default
            </Button>
          </Td>
          <Td>All User</Td>
        </Tr>

        {writers.map((writerData, index) => (
          <Tr key={index}>
            <Td>
              <Button
                size="sm"
                variant="outline"
                bgColor={
                  userOptionForList === writerData.writer ? "red.200" : ""
                }
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={() => handleWriterClick(writerData.writer)}
              >
                {writerData.writer}
              </Button>
            </Td>
            <Td>{writerData.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableForUsersTaskCountInfoForTaskLog;

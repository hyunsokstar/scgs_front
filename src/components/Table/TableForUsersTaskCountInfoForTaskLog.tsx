import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

interface WriterData {
  writer: string;
  count: number;
}

interface TableForUsersTaskCountInfoProps {
  writers: WriterData[];
  filterOptionForUserNameForTaskLogList: string;
  setFilterOptionForUserNameForTaskLogList: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const TableForUsersTaskCountInfoForTaskLog: React.FC<
  TableForUsersTaskCountInfoProps
> = ({
  writers,
  filterOptionForUserNameForTaskLogList,
  setFilterOptionForUserNameForTaskLogList,
}) => {
  const handleWriterClick = (writer: string) => {
    setFilterOptionForUserNameForTaskLogList(writer);
  };

  return (
    <Table
      variant="striped"
      colorScheme="black"
      size="sm"
      borderRadius="md"
      border={"1px solid black"}
      // textAlign={"center"}
    >
      <Tbody>
        <Tr>
          <Td textAlign={"center"}>
            <Button
              size="sm"
              variant="outline"
              _hover={{ bg: "blue.500", color: "white" }}
              width={"100%"}
              onClick={() => handleWriterClick("")}
            >
              default
            </Button>
          </Td>
          <Td textAlign={"center"}>All User</Td>
        </Tr>

        {writers.map((writerData, index) => (
          <Tr key={index}>
            <Td textAlign={"center"}>
              <Button
                size="sm"
                variant="outline"
                bgColor={
                  filterOptionForUserNameForTaskLogList === writerData.writer
                    ? "red.200"
                    : ""
                }
                _hover={{ bg: "blue.500", color: "white" }}
                width={"100%"}
                onClick={() => handleWriterClick(writerData.writer)}
              >
                {writerData.writer}
              </Button>
            </Td>
            <Td textAlign={"center"}>{writerData.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableForUsersTaskCountInfoForTaskLog;

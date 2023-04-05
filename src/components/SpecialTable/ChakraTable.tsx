import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";

type DataItem = {
  id: number;
  name: string;
  age: number;
};

const data: DataItem[] = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 32 },
  { id: 3, name: "Bob", age: 41 },
  { id: 4, name: "Alex", age: 18 },
];

const ChakraTable = () => {
  const [filterValue, setFilterValue] = useState<string>("");

  const filteredData = data.filter((item: DataItem) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <>
      <Input
        placeholder="Filter by name"
        value={filterValue}
        onChange={handleFilterChange}
        mb={4}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item: DataItem) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.age}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ChakraTable;

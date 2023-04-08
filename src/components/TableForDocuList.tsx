import { useState } from "react";
import { Table, Tbody, Tr, Td, Checkbox, Input } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";

type Data = {
  id: string;
  url: string;
  description: string;
  classification: string;
};

const generateData = (count: number): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: uuid(),
      url: faker.internet.url(),
      description: faker.lorem.sentence(),
      classification: faker.random.word(),
    });
  }
  return data;
};

const initialData = generateData(10);

const TableForDocuList = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [filterValue, setFilterValue] = useState("");

  // const handleCheckboxChange = (id: string) => {
  //   const updatedData = data.map((item) =>
  //     item.id === id ? { ...item, isChecked: !item.isChecked } : item
  //   );
  //   setData(updatedData);
  // };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    updateFilteredData(value);
  };

  const updateFilteredData = (filterValue: string) => {
    const filteredData = data.filter((item) =>
      item.url.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <Input
        size="sm"
        width="20%"
        variant="outlined"
        bg="gray.100"
        border="1px solid gray"
        _focus={{ border: "none", boxShadow: "none" }}
        _hover={{ border: "none", bgColor: "gray.200" }}
        _placeholder={{ color: "gray.400" }}
        value={filterValue}
        onChange={handleFilterChange}
      />
      <Table variant="simple" size="sm">
        <thead>
          <Tr>
            <Td>
              <Checkbox />
            </Td>
            <Td>URL</Td>
            <Td>Description</Td>
            <Td>Classification</Td>
          </Tr>
        </thead>
        <Tbody>
          {filteredData.map(
            ({ id, url, description, classification }) => (
              <Tr key={id}>
                <Td>
                  <Checkbox
                    // isChecked={isChecked}
                    // onChange={() => handleCheckboxChange(id)}
                  />
                </Td>
                <Td>{url}</Td>
                <Td>{description}</Td>
                <Td>{classification}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default TableForDocuList;

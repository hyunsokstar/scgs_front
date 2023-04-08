import { useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Input,
  InputProps,
  FormControl,
  FormLabel,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";

import { type_for_docu_list_row } from "../types/api_docu_type";

interface IPropsForApiDocuTable {
  data_for_api_docu_list: type_for_docu_list_row[];
}

const TableForDocuList = ({
  data_for_api_docu_list,
}: IPropsForApiDocuTable) => {
  const [filteredData, setFilteredData] = useState(data_for_api_docu_list);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    updateFilteredData(value);
  };

  const updateFilteredData = (filterValue: string) => {
    const filteredData = data_for_api_docu_list.filter((item) =>
      item.url.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <Box border={"1px solid purple"}>
      <Text>Api Docu List</Text>
      <HStack border={"1px solid green"} px={2}>
        <Text>url</Text>
        <Input
          size="sm"
          variant="outline"
          bg="blue.100"
          borderColor="blue.100"
          _focus={{ border: "none", boxShadow: "none" }}
          _hover={{ bg: "blue.100", borderColor: "blue.300" }}
          _placeholder={{ color: "gray.400" }}
          id="url"
          w={"300px"}
          value={filterValue}
          onChange={handleFilterChange}
        />
      </HStack>

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
            ({
              id,
              url,
              description,
              classification,
            }: type_for_docu_list_row) => (
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
    </Box>
  );
};

export default TableForDocuList;

import { useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Box,
  Text,
  Flex,
  Button,
  Input,
  InputProps,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { type_for_docu_list_row } from "../types/api_docu_type";
import ModalButtonForInsertToApiDocu from "./modal/ModalButtonForInsertToApiDocu";

interface IPropsForApiDocuTable {
  data_for_api_docu_list: type_for_docu_list_row[];
}

const TableForDocuList = ({
  data_for_api_docu_list,
}: IPropsForApiDocuTable) => {
  const [filteredData, setFilteredData] = useState(data_for_api_docu_list);
  const [filterValueForUrl, setfilterValueForUrl] = useState("");
  const [filterValueForDescription, setfilterValueForDescription] =
    useState("");
  const [filterValueForClassfication, setfilterValueForClassfication] =
    useState("");

  const handleFilterChangeForUrl = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setfilterValueForUrl(value);
    updateFilteredDataForUrl(value);
  };

  const updateFilteredDataForUrl = (filterValueForUrl: string) => {
    const filteredData = data_for_api_docu_list.filter((item) =>
      item.url.toLowerCase().includes(filterValueForUrl.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleFilterChangeForDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setfilterValueForDescription(value);
    updateFilteredDataForDescription(value);
  };

  const updateFilteredDataForDescription = (filterValueForUrl: string) => {
    const filteredData = data_for_api_docu_list.filter((item) =>
      item.description
        .toLowerCase()
        .includes(filterValueForDescription.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleFilterChangeForClassfication = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setfilterValueForClassfication(value);
    updateFilteredDataForClassfication(value);
  };

  const updateFilteredDataForClassfication = (
    filterValueForClassfication: string
  ) => {
    const filteredData = data_for_api_docu_list.filter((item) =>
      item.classification
        .toLowerCase()
        .includes(filterValueForClassfication.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <Box
      border={"1px solid purple"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      bgColor={"white.100"}
    >
      <Box
        bgColor={"gray.50"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100px"
        width="100%"
      >
        <Text
          fontFamily="heading"
          fontWeight="bold"
          fontSize="2xl"
          color="black"
        >
          Table For Api Docu List
        </Text>
      </Box>

      <Flex border={"1px solid green"} px={2} py={2} gap={5}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          border={"0px solid green"}
          gap={1}
        >
          <Text>url</Text>
          <Input
            size="xs"
            variant="outline"
            bg="blue.50"
            borderColor="gray.300"
            _focus={{ border: "1px solid blue", boxShadow: "none" }}
            _hover={{ bg: "green.50", borderColor: "black" }}
            _placeholder={{ color: "black" }}
            id="url"
            w={"300px"}
            value={filterValueForUrl}
            onChange={handleFilterChangeForUrl}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          border={"0px solid green"}
          gap={1}
        >
          <Text>description</Text>
          <Input
            size="xs"
            variant="outline"
            bg="blue.50"
            borderColor="gray.300"
            _focus={{ border: "1px solid blue", boxShadow: "none" }}
            _hover={{ bg: "green.50", borderColor: "black" }}
            _placeholder={{ color: "black" }}
            id="url"
            w={"300px"}
            value={filterValueForDescription}
            onChange={handleFilterChangeForDescription}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          border={"0px solid green"}
          gap={1}
        >
          <Text>classfication</Text>
          <Input
            size="xs"
            variant="outline"
            bg="blue.50"
            borderColor="gray.300"
            _focus={{ border: "1px solid blue", boxShadow: "none" }}
            _hover={{ bg: "green.50", borderColor: "black" }}
            _placeholder={{ color: "black" }}
            id="url"
            w={"300px"}
            value={filterValueForClassfication}
            onChange={handleFilterChangeForClassfication}
          />
        </Box>
        <Spacer />
        <Box>
          {/* <Button
            size="md"
            colorScheme="teal"
            variant="outline"
            _hover={{ borderColor: "teal.800", backgroundColor: "teal.50" }}
          >
            <AddIcon />
          </Button> */}
          <ModalButtonForInsertToApiDocu />
        </Box>
      </Flex>

      <Table variant="simple" size="sm">
        <thead>
          <Tr>
            <Td>
              <Checkbox />
            </Td>
            <Td>WRITER</Td>
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
              writer,
            }: type_for_docu_list_row) => (
              <Tr key={id}>
                <Td>
                  <Checkbox
                  // isChecked={isChecked}
                  // onChange={() => handleCheckboxChange(id)}
                  />
                </Td>
                <Td>
                  <Avatar
                    size={"sm"}
                    src={writer.profile_image}
                    name="user-avatar"
                    borderRadius="full"
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

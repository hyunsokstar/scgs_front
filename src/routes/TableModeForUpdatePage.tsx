import React from "react";
import {
  Box,
  Text,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetAllUserNames } from "../apis/user_api";

interface Props {}

const TableModeForUpdatePage = (props: Props) => {
  const {
    isLoading: isLoadingForGetAllUserNames,
    data: dataForGetAllUserNames,
    error: errorForGetAllUserName,
  } = useQuery<any>(["xxxxxxxx"], apiForGetAllUserNames);

  const [data, setData] = React.useState([
    { id: 1, header1: "Data 1", header2: "Data 2", selected: false },
    { id: 2, header1: "Data 3", header2: "Data 4", selected: false },
  ]);

  const [selectedRowPks, setSelectedRowPks] = React.useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    const isChecked = selectedRowPks.includes(id);
    const updatedSelectedRowPks = isChecked
      ? selectedRowPks.filter((pk) => pk !== id)
      : [...selectedRowPks, id];

    setSelectedRowPks(updatedSelectedRowPks);
  };

  return (
    <Box bg="lightblue" display="flex">
      <Box width="50%" border="1px solid black" bg="lavender">
        <Box>
          <Box>note 유저 선택:</Box>
          <Select
            w={"50%"}
            m={2}
            placeholder="Choose a task_manager"
            // onChange={handleChangeForSelectedManager}
          >
            {dataForGetAllUserNames?.map((user: any) => (
              <option key={user.pk} value={user.pk}>
                {user.username}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Box>Selected User's Notes: {selectedRowPks}</Box>
          <Box>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox border={"1px solid black"} />
                  </Th>
                  <Th>Note Title</Th>
                  <Th>Note Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedRowPks.includes(item.id)}
                        border={"1px solid black"}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </Td>
                    <Td>{item.header1}</Td>
                    <Td>{item.header2}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
      <Box width="50%" border="1px solid black" bg="lightpink">
        target table
      </Box>
    </Box>
  );
};

export default TableModeForUpdatePage;

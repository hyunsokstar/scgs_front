import React, { useState } from "react";
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
import { apiForGetStudyNoteList } from "../apis/study_note_api";
import { type_for_study_note_list_row } from "../types/study_note_type";

interface Props {}

const TableModeForUpdatePage = (props: Props) => {
  const {
    isLoading: isLoadingForGetAllUserNames,
    data: dataForGetAllUserNames,
    error: errorForGetAllUserName,
  } = useQuery<any>(["apiForGetAllUserNames"], apiForGetAllUserNames);

  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetStudyNoteList,
    data: dataForGetStudyNoteList,
    refetch: refetchForGetStudyNoteList,
  } = useQuery<type_for_study_note_list_row[]>(
    ["getStudyNoteListForCopyMode",pageNum, selectedNoteWriter],
    apiForGetStudyNoteList,
    {
      enabled: true,
    }
  );

  console.log("dataForGetStudyNoteList : ", dataForGetStudyNoteList);

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

  const selectHandlerForNoteWriter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedNoteWriter(selectedValue);
  };

  // 2244
  return (
    <Box bg="lightblue" display="flex">
      <Box width="50%" border="1px solid black" bg="lavender">
        <Box>
          <Box>note 유저 선택:</Box>
          <Select
            margin={2}
            placeholder="Choose a task_manager"
            border={"1px solid gray"}
            onChange={selectHandlerForNoteWriter}
          >
            {dataForGetAllUserNames?.map((user: any) => (
              <option key={user.pk} value={user.username}>
                {user.username}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Box>
            Selected User's Notes:
            <Box>{selectedNoteWriter}</Box>
          </Box>
          <Box>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox border={"1px solid black"} />
                  </Th>
                  <Th>writer</Th>
                  <Th>Note Title</Th>
                  <Th>Note Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataForGetStudyNoteList
                  ? dataForGetStudyNoteList.map((item) => (
                      <Tr key={item.pk}>
                        <Td>
                          <Checkbox
                            isChecked={selectedRowPks.includes(item.pk)}
                            border={"1px solid black"}
                            onChange={() => handleCheckboxChange(item.pk)}
                          />
                        </Td>
                        <Td>{item.writer.username}</Td>
                        <Td>{item.title}</Td>
                        <Td>{item.description}</Td>
                      </Tr>
                    ))
                  : "no data"}
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

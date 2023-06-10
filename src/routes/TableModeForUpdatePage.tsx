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
import {
  NoteType,
  TypeForNoteList,
  type_for_study_note_list_row,
} from "../types/study_note_type";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";


interface Props {}

const TableModeForUpdatePage = (props: Props) => {

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

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
  } = useQuery<TypeForNoteList>(
    ["getStudyNoteListForCopyMode", pageNum, selectedNoteWriter],
    apiForGetStudyNoteList,
    {
      enabled: true,
    }
  );

  console.log("dataForGetStudyNoteList : ", dataForGetStudyNoteList);

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
                {dataForGetStudyNoteList && dataForGetStudyNoteList.noteList ? (
                  dataForGetStudyNoteList.noteList.map((item: NoteType) => (
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
                ) : (
                  <Box>"no data"</Box>
                )}
              </Tbody>
            </Table>
            {dataForGetStudyNoteList ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={dataForGetStudyNoteList?.totalPageCount}
                task_number_for_one_page={
                  dataForGetStudyNoteList?.note_count_per_page
                }
              />
            ) : (
              "no data"
            )}
          </Box>
        </Box>
      </Box>
      <Box width="50%" border="1px solid black" bg="lightpink">
        login user: {loginUser.username}
      </Box>
    </Box>
  );
};

export default TableModeForUpdatePage;

import React, { useEffect, useState } from "react";
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
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetAllUserNamesWithOutMe } from "../apis/user_api";
import {
  apiForGetStudyNoteList,
  apiForGetStudyNoteListForMe,
} from "../apis/study_note_api";
import { NoteType, TypeForNoteList } from "../types/study_note_type";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {}

const TableModeForUpdatePage = (props: Props) => {
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const {
    isLoading: isLoadingForGetAllUserNamesWithOutMe,
    data: dataForGetAllUserNamesWithOutMe,
    error: errorForGetAllUserNameWithOutMe,
    refetch: refetchForGetAllUserNameWithOutMe,

  } = useQuery<any>(
    ["apiForGetAllUserNamesWithOutMe"],
    apiForGetAllUserNamesWithOutMe
  );

  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const [selectedNoteWriterForMe, setSelectedNoteWriterForMe] = useState("");
  const [pageNumForMe, setPageNumForMe] = useState(1);

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

  const {
    isLoading: isLoadingForGetStudyNoteListForMe,
    data: dataForGetStudyNoteListForMe,
    refetch: refetchForGetStudyNoteListForMe,
  } = useQuery<TypeForNoteList>(
    ["getStudyNoteListForCopyModeForMe", pageNumForMe],
    apiForGetStudyNoteListForMe,
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

  useEffect(() => {
    if (loginUser) {
      refetchForGetStudyNoteList();
      refetchForGetStudyNoteListForMe();
      refetchForGetAllUserNameWithOutMe()
    }
  }, [loginUser, isLoggedIn]);

  // 2244
  return (
    <Box bg="lightblue" display="flex">
      <Box width="50%" border="1px solid black" bg="lavender" p={2}>
        <Box>
          <Box>note 유저 선택:</Box>
          <Select
            // margin={2}
            width={"50%"}
            placeholder="Choose a task_manager"
            border={"1px solid gray"}
            onChange={selectHandlerForNoteWriter}
          >
            {dataForGetAllUserNamesWithOutMe?.map((user: any) => (
              <option key={user.pk} value={user.username}>
                {user.username}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={5}>
            <Box>
              {selectedNoteWriter !== "" ? (
                <Box>{selectedNoteWriter}'s note</Box>
              ) : (
                "All User's note"
              )}
            </Box>
            <Box>
              {selectedRowPks.length ? (
                <Button>copy note for check to me</Button>
              ) : (
                ""
              )}
            </Box>
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
                {dataForGetStudyNoteList &&
                dataForGetStudyNoteList.noteList.length ? (
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
                  <Tr>
                    <Td colSpan={5}>
                      <Box fontSize={"30px"} textAlign={"center"}>
                        {dataForGetStudyNoteList && dataForGetStudyNoteList.noteList.length === 0 && (
                          <Box>note is not exist !</Box>
                        )}
                      </Box>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
            {dataForGetStudyNoteList ? (
              <PaginationComponent
                current_page_num={pageNumForMe}
                setCurrentPageNum={setPageNumForMe}
                total_page_num={dataForGetStudyNoteListForMe?.totalPageCount}
                task_number_for_one_page={
                  dataForGetStudyNoteListForMe?.note_count_per_page
                }
              />
            ) : (
              "no data"
            )}
          </Box>
        </Box>
      </Box>
      <Box width="50%" border="1px solid black" bg="lightpink">
        <Box>login user: {loginUser.username}</Box>
        <Box>
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
                {dataForGetStudyNoteListForMe &&
                dataForGetStudyNoteListForMe.noteList.length ? (
                  dataForGetStudyNoteListForMe.noteList.map(
                    (item: NoteType) => (
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
                    )
                  )
                ) : (
                  <Tr>
                    <Td colSpan={5}>
                      <Box fontSize={"30px"} textAlign={"center"}>
                        "no data"
                      </Box>
                    </Td>
                  </Tr>
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
    </Box>
  );
};

export default TableModeForUpdatePage;

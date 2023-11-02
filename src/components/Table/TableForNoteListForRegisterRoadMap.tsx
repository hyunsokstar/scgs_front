import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { DataTyprForNoteList } from "../../types/study_note_type";
import PaginationComponent from "../PaginationComponent";
import { apiForgetStudyNoteListForRegisterRoadMap } from "../../apis/study_note_api";

interface IProps {
  roadMapId: number;
  checkedIdsForNoteList: number[];
  setCheckedIdsForNoteList: React.Dispatch<React.SetStateAction<number[]>>;
}

const TableForNoteListForRegisterRoadMap = ({
  roadMapId,
  checkedIdsForNoteList,
  setCheckedIdsForNoteList,
}: IProps) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: studyNoteLoading,
    data: dataForStudyNote,
    refetch: studyNoteListRefatch,
  } = useQuery<DataTyprForNoteList>(
    [
      "apiForListViewForStudyNoteForRegisterRoadMapContent",
      roadMapId,
      pageNum,
      //   selectedNoteWriter,
      //   first_category,
      //   second_category,
    ],
    apiForgetStudyNoteListForRegisterRoadMap,
    {
      enabled: true,
    }
  );

  console.log("dataForStudyNote : ", dataForStudyNote);

  if (!dataForStudyNote) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {checkedIdsForNoteList.map((id, index) => (
        <p key={index}>{id}</p>
      ))}
      <Table size={"xs"}>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>writer</Th>
            <Th>title</Th>
            <Th>description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForStudyNote.noteList.length !== 0 ? (
            dataForStudyNote.noteList.map((row) => {
              return (
                <Tr key={row.pk}>
                  <Td>
                    <Checkbox
                      checked={checkedIdsForNoteList.includes(row.pk)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          // alert("here 11")
                          setCheckedIdsForNoteList((prev) => [...prev, row.pk]);
                        } else {
                          // alert("here 22")
                          setCheckedIdsForNoteList((prev) =>
                            prev.filter((id) => id !== row.pk)
                          );
                        }
                      }}
                    />
                  </Td>
                  <Td>{row.writer.username}</Td>
                  <Td>{row.title}</Td>
                  <Td>{row.description}</Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={"5"}>no data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Box mt={5}>
        {dataForStudyNote.noteList ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={dataForStudyNote?.totalPageCount}
            task_number_for_one_page={dataForStudyNote?.note_count_per_page}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default TableForNoteListForRegisterRoadMap;

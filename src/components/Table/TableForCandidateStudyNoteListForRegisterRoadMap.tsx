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
import { apiForgetCandidateStudyNoteListForRegisterRoadMap } from "../../apis/study_note_api";
import { DataTyprForNoteList } from "../../types/study_note_type";
import PaginationComponent from "../PaginationComponent";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface IProps {
  checkedIdsForNoteList: number[];
  setCheckedIdsForNoteList: React.Dispatch<React.SetStateAction<number[]>>;
  roadMapId: number;
}

const TableForCandidateStudyNoteListForRegisterRoadMap = ({
  checkedIdsForNoteList,
  setCheckedIdsForNoteList,
  roadMapId,
}: IProps) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: studyNoteLoading,
    data: dataForStudyNote,
    refetch: studyNoteListRefatch,
  } = useQuery<DataTyprForNoteList>(
    [
      "apiForgetCandidateStudyNoteListForRegisterRoadMap",
      roadMapId,
      pageNum,
      //   selectedNoteWriter,
      //   first_category,
      //   second_category,
    ],
    apiForgetCandidateStudyNoteListForRegisterRoadMap,
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
          {dataForStudyNote
            ? dataForStudyNote.noteList.map((row: any) => {
                return (
                  <Tr>
                    <Td>
                      <Checkbox
                        checked={checkedIdsForNoteList.includes(row.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setCheckedIdsForNoteList((prev) => [
                              ...prev,
                              row.id,
                            ]);
                          } else {
                            setCheckedIdsForNoteList((prev) =>
                              prev.filter((id) => id !== row.id)
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
            : "no data"}
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

export default TableForCandidateStudyNoteListForRegisterRoadMap;

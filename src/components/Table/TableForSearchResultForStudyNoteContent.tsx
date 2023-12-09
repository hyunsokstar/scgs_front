import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Box,
  Text,
} from "@chakra-ui/react";
import { type_for_content_list_from_search_result } from "../../types/study_note_type";
import { useSelector, useDispatch } from "react-redux";

import {
  go_to_specific_page,
  moveToNextPage,
} from "../../reducers/studyNoteSlice";

interface IProps {
  contentListForSearchList: type_for_content_list_from_search_result[];
  study_note_pk: string | number | undefined;
  onClose: () => void;
}

const TableForSearchResultForStudyNoteContent = ({
  contentListForSearchList,
  study_note_pk,
  onClose,
}: IProps) => {
  const dispatch = useDispatch();

  if (!contentListForSearchList) {
    return <Box>loading..</Box>;
  }

  const clickHandlerForPageMove = (page: number) => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("/study-note/")[0]; // 현재 URL에서 /study-note/ 이전의 부분을 추출
    const url = `${baseUrl}/study-note/${study_note_pk}/${page}`;

    window.location.href = url;
  };

  // 2244
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <Checkbox />
          </Th>
          <Th>Title</Th>
          <Th>Page</Th>
          <Th>order</Th>
          <Th>Code</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contentListForSearchList
          ? contentListForSearchList.map((row) => {
              return (
                <Tr>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>{row.title}</Td>
                  <Td>
                    <Text
                      cursor="pointer"
                      textDecoration="underline"
                      _hover={{ bg: "#e6e6fa", textDecoration: "none" }}
                      _active={{
                        bg: "#f5f5f5",
                        cursor: "default",
                        textDecoration: "none",
                      }}
                      onClick={() => clickHandlerForPageMove(row.page)}
                    >
                      {row.page}
                    </Text>
                  </Td>
                  <Td>{row.order}</Td>
                  <Td>code</Td>
                </Tr>
              );
            })
          : "no data"}
      </Tbody>
    </Table>
  );
};

export default TableForSearchResultForStudyNoteContent;

import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getTechNoteContentListByPk } from "../apis/tech_note_api";
import {
  TechNoteContentListType,
  TechNoteContentRowType,
} from "../types/tech_note_type";
import { Box } from "@chakra-ui/react";
import CardForTechNoteContent from "../components/CardForTechNoteContent";

interface Props {}

function TechNoteContent({}: Props): ReactElement {
  const { notePk } = useParams();
  console.log("notePk check : ", notePk);

  const {
    data: techNoteContentListData,
    isLoading: isLodaingFortechNoteContentList,
    refetch: RefetchFortechNoteContentList,
  } = useQuery<TechNoteContentListType>(
    ["getOneProjectTask", notePk, "ProjectProgressDetail"],
    getTechNoteContentListByPk
  );

  console.log("techNoteContentListData : ", techNoteContentListData);

  return (
    <Box>
      {techNoteContentListData
        ? techNoteContentListData.data.map((row: TechNoteContentRowType) => {
            return (
              <Box>
                <CardForTechNoteContent
                  pk={row.pk}
                  title={row.title}
                  file={row.file}
                  content={row.content}
                  created_at={row.created_at}
                />
              </Box>
            );
          })
        : "no techNoteContentListData"}
    </Box>
  );
}

export default TechNoteContent;
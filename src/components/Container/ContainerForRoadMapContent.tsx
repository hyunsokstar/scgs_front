import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import CardForStudyNote from "../Card/CardForStudyNote";
import { DataTypeForRoadMapContentList } from "../../types/study_note_type";
import { apiForRoadMapContentList } from "../../apis/study_note_api";
import ModalButtonForRegisterRoadMap from "../../routes/ModalButtonForRegisterRoadMap";

interface IProps {
  roadMapId: number;
}

const ContainerForRoadMapContent = ({ roadMapId }: IProps) => {
  const {
    isLoading: isRoading,
    data: dataForRoadMapContent,
    refetch: refetchForDataForLoadMap,
  } = useQuery<DataTypeForRoadMapContentList>(
    ["apiForRoadMapContentList", roadMapId],
    apiForRoadMapContentList,
    {
      enabled: true,
    }
  );

  console.log("dataForRoadMapContent : ", dataForRoadMapContent);

  if (!dataForRoadMapContent) {
    return <Box>...Loading</Box>;
  }

  return (
    <Box
      width="80%"
      margin="auto"
      display={"flex"}
      flexDirection={"column"}
      gap={10}
    >
      <Box border={"1px solid black"} textAlign={"end"} p={2} mt={2}>
        <ModalButtonForRegisterRoadMap
          roadMapId={roadMapId}
          button_text={"register road map"}
        />
      </Box>
      
      {dataForRoadMapContent &&
      dataForRoadMapContent.road_map_contents.length !== 0
        ? dataForRoadMapContent.road_map_contents.map((row: any) => {
            return (
              <Box key={row.pk}>
                <CardForStudyNote
                  pk={row.study_note.pk}
                  key={row.study_note.title}
                  title={row.study_note.title}
                  description={row.study_note.description}
                  writer={row.study_note.writer}
                  note_cowriters={row.study_note.note_cowriters}
                  count_for_note_contents={
                    row.study_note.count_for_note_contents
                  }
                  total_count_for_comments={
                    row.study_note.total_count_for_comments
                  }
                  total_count_for_qna_board={
                    row.study_note.total_count_for_qna_board
                  }
                  total_count_for_faq_list={
                    row.study_note.total_count_for_faq_list
                  }
                  total_count_for_subtitle={
                    row.study_note.total_count_for_subtitle
                  }
                  total_count_for_class_list={
                    row.study_note.total_count_for_class_list
                  }
                  total_count_for_suggestion_list={
                    row.study_note.total_count_for_suggestion_list
                  }
                  total_count_for_error_report_list={
                    row.study_note.total_count_for_error_report_list
                  }
                  first_category={row.study_note.first_category}
                  second_category={row.study_note.second_category}
                  studyNoteListRefatch={refetchForDataForLoadMap}
                />
              </Box>
            );
          })
        : "no road map contents"}
    </Box>
  );
};

export default ContainerForRoadMapContent;

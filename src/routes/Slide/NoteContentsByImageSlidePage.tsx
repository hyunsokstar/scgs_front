import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoteSlideForStudyNoteSpecificPage from "../../components/ImageSlide/NoteSlideForStudyNoteSpecificPage";

import TinyMCEEditor from "../../components/RichEditor/TinyMCEEditor";
import { StudyNoteData } from "../../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../../apis/study_note_api";

interface Props {}

// 1122
const NoteContentsByImageSlidePage = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();
  const [note_content_content, set_note_content_content] = useState<string>("");

  // data_for_study_note_contents : note contents
  const {
    data: dataForNoteContentListForPage,
    isLoading: logind_for_study_note_content_list,
    refetch: refetch_for_study_note_content_list,
  } = useQuery<StudyNoteData>(
    ["apiForGetStuyNoteContentList", study_note_pk, note_page_num],
    apiForGetStuyNoteContentList
  );

  console.log(
    "dataForNoteContentListForPage : ",
    dataForNoteContentListForPage
  );

  const handleChangeForNoteContent = () => {
    console.log("hi");
  };

  // 2244
  return (
    <Box>
      <Box>note_pk: {study_note_pk}</Box>
      <Box>note_page_num: {note_page_num}</Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        border={"1px solid blue"}
      >
        <Box width={"100%"} border={"1px solid green"}>
          {dataForNoteContentListForPage ? (
            <NoteSlideForStudyNoteSpecificPage
              dataForNoteContentListForPage={
                dataForNoteContentListForPage.data_for_study_note_contents
              }
            />
          ) : (
            "no data"
          )}
        </Box>
        <Box width={"100%"} border={"1px solid red"}>
          <TinyMCEEditor
            onChange={handleChangeForNoteContent}
            apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NoteContentsByImageSlidePage;

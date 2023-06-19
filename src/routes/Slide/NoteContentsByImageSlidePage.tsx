import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import NoteSlideForStudyNoteSpecificPage from "../../components/ImageSlide/NoteSlideForStudyNoteSpecificPage";

interface Props {}

// 1122
const NoteContentsByImageSlidePage = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();

  return (
    <Box>
      <Box>note_pk: {study_note_pk}</Box>
      <Box>note_page_num: {note_page_num}</Box>
      <Box display={"flex"} border={"1px solid blue"}>
        <Box width={"50%"} border={"1px solid green"}>
          <NoteSlideForStudyNoteSpecificPage />
        </Box>
        <Box width={"50%"} border={"1px solid red"}>
          right
        </Box>
      </Box>
    </Box>
  );
};

export default NoteContentsByImageSlidePage;

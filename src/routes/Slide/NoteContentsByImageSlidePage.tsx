import React, { useState } from "react";
    import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NoteSlideForStudyNoteSpecificPage from "../../components/ImageSlide/NoteSlideForStudyNoteSpecificPage";
import TinyMCEEditor from "../../components/RichEditor/TinyMCEEditor";

interface Props {}

// 1122
const NoteContentsByImageSlidePage = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();
  const [note_content_content, set_note_content_content] = useState<string>("");

  const handleChangeForNoteContent = () => {
    console.log("hi");
  };

  // 2244
  return (
    <Box>
      <Box>note_pk: {study_note_pk}</Box>
      <Box>note_page_num: {note_page_num}</Box>
      <Box display={"flex"} border={"1px solid blue"}>
        <Box width={"50%"} border={"1px solid green"}>
          <NoteSlideForStudyNoteSpecificPage />
        </Box>
        <Box width={"50%"} border={"1px solid red"}>
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

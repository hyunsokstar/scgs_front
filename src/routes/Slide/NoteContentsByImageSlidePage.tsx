import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoteSlideForStudyNoteSpecificPage from "../../components/ImageSlide/NoteSlideForStudyNoteSpecificPage";

import TinyMCEEditor from "../../components/RichEditor/TinyMCEEditor";
import { StudyNoteData } from "../../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../../apis/study_note_api";
import ModalButtonForInsertYoutubeContentsForNote from "../../components/modal/ModalButtonForInsertYoutubeContentsForNote";
import ModalButtonForInsertSubtitleForPage from "../../components/modal/ModalButtonForInsertSubtitleForPage";
import ModalButtonForInsertStudyNoteContent from "../../components/modal/ModalButtonForInsertStudyNoteContent";

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
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
      >
        <Box>
          note_pk: {study_note_pk} &nbsp;&nbsp; note_page_num: {note_page_num}
        </Box>
        <Box>
          <Box display={"flex"} gap={2}>
            <ModalButtonForInsertYoutubeContentsForNote
              study_note_pk={study_note_pk}
              currentPage={note_page_num}
              button_text="add youtube"
              refetch={refetch_for_study_note_content_list}
            />
            <ModalButtonForInsertSubtitleForPage
              button_text={"add subtitle for page"}
              study_note_pk={study_note_pk}
              currentPage={note_page_num}
              refetch={refetch_for_study_note_content_list}
            />
            <ModalButtonForInsertStudyNoteContent
              button_text={"add note content"}
              currentPage={note_page_num}
              study_note_pk={study_note_pk}
              refetch={refetch_for_study_note_content_list}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        border={"1px solid blue"}
      >
        <Box width={"100%"} border={"1px solid green"}>
          {dataForNoteContentListForPage ? (
            <NoteSlideForStudyNoteSpecificPage
              study_note_pk={study_note_pk}
              note_page_num={note_page_num}
              dataForNoteContentListForPage={
                dataForNoteContentListForPage.data_for_study_note_contents
              }
            />
          ) : (
            "no data"
          )}
        </Box>
        <Box width={"100%"} border={"1px solid red"}>
          {/* <TinyMCEEditor
            onChange={handleChangeForNoteContent}
            apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default NoteContentsByImageSlidePage;

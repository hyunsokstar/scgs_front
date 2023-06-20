import React, { useState } from "react";
import { Avatar, Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoteSlideForStudyNoteSpecificPage from "../../components/ImageSlide/NoteSlideForStudyNoteSpecificPage";

import TinyMCEEditor from "../../components/RichEditor/TinyMCEEditor";
import { StudyNoteData } from "../../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../../apis/study_note_api";
import ModalButtonForInsertYoutubeContentsForNote from "../../components/modal/ModalButtonForInsertYoutubeContentsForNote";
import ModalButtonForInsertSubtitleForPage from "../../components/modal/ModalButtonForInsertSubtitleForPage";
import ModalButtonForInsertStudyNoteContent from "../../components/modal/ModalButtonForInsertStudyNoteContent";
import ButtonsForSelectPageForNoteSlide from "../../components/Button/ButtonsForSelectPageForNoteSlide";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {}

// 1122
const NoteContentsByImageSlidePage = (props: Props) => {
  const { study_note_pk, note_page_num } = useParams();
  const [note_content_content, set_note_content_content] = useState<string>("");
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

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

  const is_authority_for_note =
    dataForNoteContentListForPage?.note_user_name === loginUser.username ||
    dataForNoteContentListForPage?.co_writers_for_approved.includes(
      loginUser.username
    );

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
          <Box>{dataForNoteContentListForPage?.note_title}</Box>
          <Box display={"fex"} gap={2}>
            page: {note_page_num}
            <ButtonsForSelectPageForNoteSlide study_note_pk={study_note_pk} />
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            {/* {dataForNoteContentListForPage?.note_user_profile_image} */}
            <Avatar
              name={dataForNoteContentListForPage?.note_user_name}
              src={dataForNoteContentListForPage?.note_user_profile_image}
              size="sm"
              ml={"2px"}
              border={"1px solid red"}
            />
            {dataForNoteContentListForPage &&
            dataForNoteContentListForPage.co_writers_for_approved.length
              ? dataForNoteContentListForPage?.co_writers_for_approved.map(
                  (row) => {
                    return (
                      <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Box>
                          <Avatar
                            name={row.username}
                            src={row.profile_image}
                            size="sm"
                            ml={"2px"}
                          />
                        </Box>
                        {/* <Box>{row.username}</Box> */}
                      </Box>
                    );
                  }
                )
              : ""}
          </Box>
        </Box>
        <Box>
          {is_authority_for_note ? (
            <Box display={"flex"} gap={2}>
              <ModalButtonForInsertYoutubeContentsForNote
                study_note_pk={study_note_pk}
                currentPage={note_page_num}
                button_text="youtube"
                button_size={"sm"}
                refetch={refetch_for_study_note_content_list}
              />
              <ModalButtonForInsertSubtitleForPage
                button_text={"subtitle"}
                study_note_pk={study_note_pk}
                currentPage={note_page_num}
                button_size={"sm"}
                refetch={refetch_for_study_note_content_list}
              />
              <ModalButtonForInsertStudyNoteContent
                button_text={"content"}
                currentPage={note_page_num}
                study_note_pk={study_note_pk}
                button_size={"sm"}
                refetch={refetch_for_study_note_content_list}
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        border={"1px solid blue"}
      >
        <Box width={"100%"} border={"0px solid green"}>
          {dataForNoteContentListForPage ? (
            <NoteSlideForStudyNoteSpecificPage
              study_note_pk={study_note_pk}
              note_page_num={note_page_num}
              dataForNoteContentListForPage={
                dataForNoteContentListForPage.data_for_study_note_contents
              }
              note_title={""}
              note_writer={""}
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

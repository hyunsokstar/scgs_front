import { Box } from "@chakra-ui/react";
import React from "react";
import ButtonsBriefingBoardForHeaderForNote from "../Buttons/ButtonsBriefingBoardForHeaderForNote";
import ListItemForChatBoard from "./ListItemForChatBoard";

interface Props {
  study_note_pk: any;
  note_owner_user_name: string;
  dataForGetCommentListForNote: any[];
}

const ChatStyleBoardForBriefingBoard = ({
  study_note_pk,
  dataForGetCommentListForNote,
  note_owner_user_name,
}: Props) => {
  return (
    <Box border={"1px solid red"} p={2}>
      <Box>chat style board for briefing board for note</Box>
      <Box border={"1px solid green"}>
        <ButtonsBriefingBoardForHeaderForNote />
      </Box>
      <Box p={2} border={"1px solid green"}>
        {dataForGetCommentListForNote && dataForGetCommentListForNote.length
          ? dataForGetCommentListForNote.map((comment: any) => (
              <ListItemForChatBoard
                key={comment.id}
                pk={comment.id}
                writer={comment.writer}
                comment={comment.comment}
                isUser={comment.writer.username === note_owner_user_name}
                is_edit_mode={comment.is_edit_mode}
              />
            ))
          : "no data"}
      </Box>
    </Box>
  );
};

export default ChatStyleBoardForBriefingBoard;

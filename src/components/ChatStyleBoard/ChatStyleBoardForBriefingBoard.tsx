import { Box } from "@chakra-ui/react";
import React from "react";
import ButtonsBriefingBoardForHeaderForNote from "../Buttons/ButtonsBriefingBoardForHeaderForNote";
import ListItemForChatBoard from "./ListItemForChatBoard";

interface Props {
  study_note_pk: any;
  note_owner_user_name: string;
  dataForGetCommentListForNote: any[];
  refetch: () => void;
}

const ChatStyleBoardForBriefingBoard = ({
  study_note_pk,
  dataForGetCommentListForNote,
  note_owner_user_name,
  refetch,
}: Props) => {
  return (
    <Box border={"1px solid gray"} p={2} height={"60vh"}>
      <Box>chat style board for briefing board for note</Box>
      <Box
      // border={"1px solid green"}
      >
        <ButtonsBriefingBoardForHeaderForNote />
      </Box>
      <Box
        p={2}
        border={"1px solid green"}
        overflowY={"scroll"}
        height={"46vh"}
      >
        {dataForGetCommentListForNote && dataForGetCommentListForNote.length ? (
          dataForGetCommentListForNote.map((comment: any) => (
            <ListItemForChatBoard
              key={comment.id}
              pk={comment.id}
              writer={comment.writer}
              comment={comment.comment}
              isUser={comment.writer.username === note_owner_user_name}
              is_edit_mode={comment.is_edit_mode}
              refetch={refetch}
            />
          ))
        ) : (
          <Box
            bg="orange.200"
            p={4}
            borderRadius="md"
            fontFamily="sans-serif"
            fontSize="50px"
            color="black"
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            No comment data exists for the note yet !
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatStyleBoardForBriefingBoard;

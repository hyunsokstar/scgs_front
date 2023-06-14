import { useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Avatar,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { TypeForNoteCoWriter } from "../../types/study_note_type";
import ToggleButtonForIsApprovedForNoteCoWriting from "../Button/ToggleButtonForIsApprovedForNoteCoWriting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiForCancleCoWriterForOtherUserNote } from "../../apis/study_note_api";

interface IProps {
  noteCowriters: TypeForNoteCoWriter[];
}

const TableForNoteCoworkers = ({ noteCowriters }: IProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  // mutationForCancleCoWriterForOtherUserNote
  const mutationForCancleCoWriterForOtherUserNote = useMutation(
    (pk: any) => {
      return apiForCancleCoWriterForOtherUserNote(pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForgetStudyNoteList"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteCoWriterInfo = (CoWriterId: any) => {
    // alert(CoWriterId);
    mutationForCancleCoWriterForOtherUserNote.mutate(CoWriterId);
  };

  // 2244
  return (
    <Box overflowY={"scroll"} maxH="120px">
      <Table bgColor={"gray.400"}>
        <Tbody>
          {noteCowriters.map((cowriter) => (
            <Tr key={cowriter.id} p={0}>
              <Td>
                <Avatar
                  name={cowriter.writer.username}
                  src={cowriter.writer.profile_image}
                  size="sm"
                />
              </Td>
              <Td>
                <ToggleButtonForIsApprovedForNoteCoWriting
                  cowriterPk={cowriter.id}
                  is_approved={cowriter.is_approved}
                />
              </Td>
              <Td>
                {cowriter.writer.username === loginUser.username ? (
                  <Button
                    size={"xs"}
                    variant="outline"
                    border={"1px solid blue"}
                    _hover={{ bgColor: "red.200" }}
                    onClick={() => {
                      const message = `${loginUser.username} 님 승인 요청을 취소 하시겠습니까`;
                      if (window.confirm(message)) {
                        buttonHandlerForDeleteCoWriterInfo(cowriter.id);
                      } else {
                        alert("취소 하셨습니다. ");
                      }
                    }}
                  >
                    취소
                  </Button>
                ) : (
                  ""
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForNoteCoworkers;

import React from "react";
import { Box, Switch, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateForUpdateIsApprovedForNoteCoWriter } from "../../apis/study_note_api";

interface Props {
  cowriterPk: any;
  noteOwnerUserName: string;
  is_approved: boolean;
  updateAuthority: boolean;
}

const ToggleButtonForIsApprovedForNoteCoWriting = ({
  cowriterPk,
  noteOwnerUserName,
  is_approved,
  updateAuthority,
}: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutationForUpdateUpdateIsApprovedForNoteCoWriter = useMutation(
    apiForUpdateForUpdateIsApprovedForNoteCoWriter,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        toast({
          status: "success",
          title: "Update For IsApproved For CoWorker Success",
          description: result.message,
        });

        queryClient.invalidateQueries(["apiForgetStudyNoteList"]);
      },
      onSettled: () => {
        queryClient.refetchQueries([
          "getTaskListForUpdateImportanceForChecked",
        ]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);
      },
    }
  );

  const onChangeHandlerForUpdateIsApprovedForNoteCoWriter = () => {
    // alert("change 확인");
    if (updateAuthority) {
      mutationForUpdateUpdateIsApprovedForNoteCoWriter.mutate(cowriterPk);
    } else {
      const message = `${noteOwnerUserName} 님만 승인 가능 합니다`
      toast({
        title:
        message,
        status: "warning",
        duration: 2000, // Automatically close after 2 seconds
        isClosable: true, // Display close button
        position: "top", // Display at the top of the screen
      });
    }
    return;
  };

  return (
    <Box>
      <Switch
        colorScheme="blue"
        defaultChecked={is_approved}
        onChange={onChangeHandlerForUpdateIsApprovedForNoteCoWriter}
      />
    </Box>
  );
};

export default ToggleButtonForIsApprovedForNoteCoWriting;

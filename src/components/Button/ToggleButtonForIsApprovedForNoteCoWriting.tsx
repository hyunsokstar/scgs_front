import React from "react";
import { Box, Switch, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateForUpdateIsApprovedForNoteCoWriter } from "../../apis/study_note_api";

interface Props {
  is_approved: boolean;
  cowriterPk: any;
}

const ToggleButtonForIsApprovedForNoteCoWriting = ({
  cowriterPk,
  is_approved,
}: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutationForUpdateUpdateIsApprovedForNoteCoWriter = useMutation(
    apiForUpdateForUpdateIsApprovedForNoteCoWriter
    ,
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
    mutationForUpdateUpdateIsApprovedForNoteCoWriter.mutate(cowriterPk)
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

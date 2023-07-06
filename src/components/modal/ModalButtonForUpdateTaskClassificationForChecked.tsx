import { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";

import {
  apiForGetTaskListForCheckedPks,
  apiForUpdateTaskClassificationForChecked,
} from "../../apis/project_progress_api";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
import { RadioButtonsForSelectTaskClassification } from "../Buttons/RadioButtonsForSelectTaskClassification";

type TaskClassification =
  | "crud"
  | "new-future"
  | "trouble-shooting"
  | "ui-task"
  | "refactoring"
  | "optimization"
  | "boiler-plate"
  | "test-code";

type ModalButtonForUpdateImortanceForCheckedProps = {
  button_text: string;
  button_width: string;
  size: string;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
};

type FormData = {
  importance: string;
};

// 1122
const ModalButtonForUpdateTaskClassificationForChecked: React.FC<
  ModalButtonForUpdateImortanceForCheckedProps
> = ({ button_text, button_width, size, checkedRowPks, setCheckedRowPks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] =
    useState<TaskClassification>("crud");

  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForUpdateImportanceForChecked", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );

  const onClose = () => {
    setIsOpen(false);
  };

  // apiForUpdateTaskClassificationForChecked
  const mutationForUpdateTaskClassificationForChecked = useMutation(
    apiForUpdateTaskClassificationForChecked,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        toast({
          status: "success",
          title: "task_classification update success",
          description: result.message,
        });
        onClose();
        queryClient.invalidateQueries(["getUncompletedTaskList"]);
      },
      onSettled: () => {
        queryClient.refetchQueries([
          "getTaskListForUpdateImportanceForChecked",
        ]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);
      },
    }
  );

  // handlerForUpdateTaskClassificationForChecked
  const handlerForUpdateTaskClassificationForChecked = () => {
    mutationForUpdateTaskClassificationForChecked.mutate({
      checkedRowPks,
      task_classification: selectedClassification,
    });
  };

  const onOpen = () => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      toast({
        status: "warning",
        title: "Please select at least one item",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      setIsOpen(false);
    }
  }, [dataForTaskListForCheckedPks]);

  // 2244
  return (
    <Box>
      <Button
        size={size}
        width={button_width}
        variant="outline"
        backgroundColor="red.50"
        _hover={{ backgroundColor: "red.100" }}
        onClick={() => onOpen()}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="green.100">Update Classification</ModalHeader>
          <ModalCloseButton colorScheme="gray" />
          <ModalBody bg="gray.50">
            <Box mb={3}>
              {dataForTaskListForCheckedPks ? (
                <TableForTaskListForChecked
                  data={dataForTaskListForCheckedPks?.ProjectProgressList}
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                />
              ) : (
                "no data"
              )}
            </Box>

            <Box
              border={"1px solid blue"}
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              mt={5}
            >
              <Box>
                <RadioButtonsForSelectTaskClassification
                  selectedClassification={selectedClassification}
                  setSelectedClassification={setSelectedClassification}
                />
              </Box>
              <Button
                size={"md"}
                colorScheme="purple"
                onClick={handlerForUpdateTaskClassificationForChecked}
              >
                Update
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter bg="green.100">hyun</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateTaskClassificationForChecked;

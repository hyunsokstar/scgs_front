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
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StarRatingForUpdateImportanceForChecked from "../StarRating/StarRatingForUpdateImportanceForChecked";
import {
  apiForGetTaskListForCheckedPks,
  apiForUpdateTaskImportanceForChecked,
} from "../../apis/project_progress_api";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";

type ModalButtonForUpdateImortanceForCheckedProps = {
  button_text: string;
  size: string;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
};

type FormData = {
  importance: string;
};

const ModalButtonForUpdateImortanceForChecked: React.FC<
  ModalButtonForUpdateImortanceForCheckedProps
> = ({ button_text, size, checkedRowPks, setCheckedRowPks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
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

  const mutationForUpdateTaskImportanceForChecked = useMutation(
    apiForUpdateTaskImportanceForChecked,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        toast({
          status: "success",
          title: "task manager update for check success",
          description: result.message,
        });

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

  const handlerForUpdateImportanceForChecked = () => {
    mutationForUpdateTaskImportanceForChecked.mutate({
      checkedRowPks,
      importance: rating,
    });
  };

  return (
    <Box>
      <Button
        size={size}
        variant="outline"
        backgroundColor="red.50"
        _hover={{ backgroundColor: "red.100" }}
        mr={2}
        onClick={() => setIsOpen(true)}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="purple.300">Update Importance</ModalHeader>
          <ModalCloseButton colorScheme="gray" />
          <ModalBody bg="purple.200">
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

            {/* 업데이트용 컴퍼넌트 */}
            <Box
              border={"0px solid blue"}
              width={"340px"}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <StarRatingForUpdateImportanceForChecked
                rating={rating}
                setRating={setRating}
                checkedRowPks={checkedRowPks}
              />

              <Spacer />

              <Button
                size={"md"}
                colorScheme="purple"
                onClick={handlerForUpdateImportanceForChecked}
              >
                Update
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter bg="purple.300">hyun</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateImortanceForChecked;

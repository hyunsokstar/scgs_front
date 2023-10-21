import { useState, useEffect  } from "react";
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
import StarRatingForUpdateImportanceForChecked from "../StarRating/StarRatingForUpdateImportanceForChecked";
import {
  apiForGetTaskListForCheckedPks,
  apiForUpdateTaskImportanceForChecked,
} from "../../apis/project_progress_api";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
// import { useForm } from "react-hook-form";

type ModalButtonForUpdateImortanceForCheckedProps = {
  button_text: string;
  size: string;
  checkedRowPks: number[];
  button_width: string;
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
};

type FormData = {
  importance: string;
};

const ModalButtonForUpdateImortanceForChecked: React.FC<
  ModalButtonForUpdateImortanceForCheckedProps
> = ({ button_text, size, checkedRowPks, button_width, setCheckedRowPks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refetchForTaskListForCheckedPks,
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

  // mutationForUpdateIsTaskingForCowriter
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
        onClose();
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

  const handleOpenModal = () => {
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
  }, [dataForTaskListForCheckedPks, setIsOpen]);

  return (
    <Box>
      <Button
        size={size}
        width={button_width}
        variant="outline"
        backgroundColor="red.50"
        _hover={{ backgroundColor: "red.100" }}
        onClick={handleOpenModal}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="green.100">Update Importance</ModalHeader>
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
                button_size={"sm"}
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

          <ModalFooter bg="green.50">hyun</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateImortanceForChecked;

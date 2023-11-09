import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  HStack,
  VStack,
  useToast
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import TableForCandidateShortCutListForHub from '../Table/TableForCandidateShortCutListForHub';
import TableForShortCutHubContentList from '../Table/TableForShortCutHubContentList';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiToRegisterForShortCutHubFromCheckedShortCutIds } from '../../apis/api_for_shortcut';


interface IProps {
  shortcut_hub_id: any;
}

const ModalButtonForRegisterShortCutHub = ({ shortcut_hub_id }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [checkedIdsForShortCutToRegisterToHub, setCheckedIdsForShortCutToRegisterToHub] = useState<number[]>([]);

  const mutationToRegisterForShortCutHubFromCheckedShortCutIds = useMutation(
    apiToRegisterForShortCutHubFromCheckedShortCutIds,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data: any) => {
        console.log("data : ", data);
        queryClient.refetchQueries([
          "apiForGetShortcutHubContentList",
        ]);
        queryClient.refetchQueries([
          "get_shortcut_list_for_register_to_hub",
        ]);

        toast({
          title: "shortcut register 성공",
          description: data.message,
          status: "success",
          duration: 1800,
          isClosable: true,
        });

        setCheckedIdsForShortCutToRegisterToHub([]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);

        // 에러 메시지를 토스트로 표시
        toast({
          title: "에러 발생",
          description: error.response.data.message, // 에러 메시지를 사용
          status: "error",
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const buttonHandlerToRegisterForShortCutHubFromCheckedShortCutIds =
    (shortcut_hub_id: number, checkedIdsForShortCutToRegisterToHub: number[]) => {
      console.log("shortcut_hub_id : ", shortcut_hub_id);
      console.log("checkedIdsForShortCutToRegisterToHub : ", checkedIdsForShortCutToRegisterToHub);
      mutationToRegisterForShortCutHubFromCheckedShortCutIds.mutate({
        shortcut_hub_id, checkedIdsForShortCutToRegisterToHub
      })
    }

  return (
    <>
      <IconButton
        icon={<AiOutlinePlus />}
        variant="outline"
        aria-label="shortcut hub register"
        onClick={openModal}
        size="sm"
      />

      <Modal isOpen={isOpen} onClose={closeModal} size={"full"}>
        <ModalOverlay />
        <ModalContent width={"100%"}>
          <ModalHeader>Register Shortcut Hub</ModalHeader>
          <ModalCloseButton />
          <ModalBody border={"1px solid red"} width={"100%"} overflowY="scroll" height="70vh">
            <VStack border={"1px solid green"} height={"100%"} gap={0} width={"100%"}>

              <Box flex="1" border="1px dashed" m={2} width={"100%"}>
                <Box textAlign={"center"} fontSize={"28px"} my={5}>
                  ShortCutHub Content List
                </Box>

                <TableForShortCutHubContentList shortcut_hub_id={shortcut_hub_id} data={[]} />

              </Box>
              <Box display={"flex"} justifyContent={"center"} my={2}>
                <IconButton
                  icon={<ArrowLeftIcon />}
                  aria-label="Move Data Left"
                  variant="outline"
                  size="sm"
                  borderColor="black"
                  onClick={
                    () =>
                      buttonHandlerToRegisterForShortCutHubFromCheckedShortCutIds(shortcut_hub_id, checkedIdsForShortCutToRegisterToHub)
                  }
                />
              </Box>

              <Box flex="1" border="1px dashed" width={"100%"}>
                <TableForCandidateShortCutListForHub
                  checkedIdsForShortCutToRegisterToHub={checkedIdsForShortCutToRegisterToHub}
                  setCheckedIdsForShortCutToRegisterToHub={setCheckedIdsForShortCutToRegisterToHub}
                  shortcut_hub_id={shortcut_hub_id}
                />
              </Box>

            </VStack>
          </ModalBody>
          <ModalFooter>
            {/* Footer content, if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRegisterShortCutHub;
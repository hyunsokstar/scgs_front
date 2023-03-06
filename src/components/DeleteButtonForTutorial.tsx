import React, { ReactElement, useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Box,
    Icon,
    useToast,
} from "@chakra-ui/react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { deleteOneTutorial } from '../apis/tutorial_api';


type ITypeForProps = {
    tutorialPk: number;
    refetchTutorialList: any;
}

function DeleteButtonForTutorial({ tutorialPk, refetchTutorialList }: ITypeForProps): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const deleteMutation = useMutation(
        (pk: number) => {
            return deleteOneTutorial(pk);
        },
        {
            onSettled: () => {
                // setSelectedItems([]);
            },
            onSuccess: (data) => {
                console.log("data : ", data);
                refetchTutorialList();
            },
        }
    );

    const handleDelete = () => {
        const response = deleteMutation.mutate(tutorialPk);

        console.log("response :", response);

        toast({
            title: "delete 성공!",
            status: "success",
        });

        onClose();
    };

    return (
        <>
            {/* <Button colorScheme="red" onClick={onOpen}>
                삭제
            </Button> */}
            <Box
                as="button"
                bg="transparent"
                border="none"
                cursor="pointer"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
                _hover={{ bg: "red.500", color: "white" }}
                _active={{ bg: "red.600", color: "white" }}
                _focus={{ boxShadow: "outline" }}
            >
                <Icon
                    as={FaTimes}
                    onClick={onOpen}
                    boxSize="25px"
                />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>삭제 확인</ModalHeader>
                    <ModalBody>정말 삭제하시겠습니까?</ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>취소</Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            삭제
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteButtonForTutorial

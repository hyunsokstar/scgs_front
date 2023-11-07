import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    Textarea,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateShortCutHub } from '../../apis/api_for_shortcut';
import { AiOutlinePlus } from 'react-icons/ai';


type FormData = {
    title: string;
    description: string;
};

const ModalButtonForCreateShortCutHub = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<FormData>();

    const mutationForCreateRoadMap = useMutation(apiForCreateShortCutHub, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            console.log("data : ", data);
            queryClient.refetchQueries(["apiForGetShortcutHubList"]);

            toast({
                title: "shortcut hub create success",
                description: data.message,
                status: "success",
                duration: 1800,
                isClosable: true,
            });
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
    });

    const onSubmit = (data: FormData) => {
        console.log('Title:', data.title);
        console.log('Description:', data.description);
        mutationForCreateRoadMap.mutate({
            title: data.title,
            description: data.description
        })
        // 여기에 데이터 처리 또는 API 호출 등을 추가할 수 있습니다.
        onClose();
    };

    const onOpen = () => setIsOpen(true);
    const onClose = () => {
        setIsOpen(false);
        reset(); // 폼 초기화
    };

    return (
        <>
            <IconButton icon={<AiOutlinePlus />} variant="outline" aria-label="shortcut hub 추가" onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Shortcut Hub</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Stack spacing={4}>
                                <Input {...register('title')} placeholder="Title" />
                                <Textarea {...register('description')} placeholder="Description" />
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Confirm
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreateShortCutHub;
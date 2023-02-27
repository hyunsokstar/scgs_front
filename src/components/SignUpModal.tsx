import { Box, Button, Input, InputGroup, InputLeftElement, Modal, 
    ModalBody, ModalCloseButton, ModalContent, ModalHeader, 
    ModalOverlay, useToast, VStack } from "@chakra-ui/react";
    import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
    import { useMutation, useQueryClient } from "@tanstack/react-query";
    
    import { useForm } from "react-hook-form";
    
    import { ISignupForm } from "../types";
    import { loginCheck, signUp, usernameLogIn } from "../apis/user_api";
    
    interface SignUpModalProps {
        isOpen: boolean;
        onClose: () => void;
    }
    
    
    export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
        const { register, handleSubmit, watch, reset } = useForm<ISignupForm>();
        const queryClient = useQueryClient();
    
        const toast = useToast();
    
        const loginCheckMutation = useMutation(loginCheck, {
            onMutate: () => {
                console.log("mutation starting");
            },
            onSuccess: (data) => {
                console.log("data : ", data);
    
                toast({
                    title: "login check success!",
                    status: "success",
                });
                queryClient.refetchQueries(["me"]);
                onClose();
            },
            onError: (error) => {
                console.log("mutation has an error");
            },
        });
    
        const signupMutation = useMutation(signUp, {
            onMutate: () => {
                console.log("mutation starting");
            },
            onSuccess: (data) => {
                console.log("data : ", data);
                toast({
                    title: "회원 가입 성공!",
                    status: "success",
                });
                onClose();
                // loginCheckMutation.mutate();
                queryClient.refetchQueries(["me"]);
            },
            onError: (error) => {
                console.log("mutation has an error");
            },
        });
    
        const onSubmit = ({ name, username, email, password, password_check }: ISignupForm) => {
            console.log("name : ", name);
            console.log("username : ", username);
            console.log("email : ", email);
            console.log("password : ", password);
            console.log("password_check : ", password_check);
    
            if (password !== password_check) {
                alert("비밀번호와 비밀번호 확인이 다릅니다.");
                return;
            }
            signupMutation.mutate({ name, username, email, password });
        };
    
        return (
            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>회원 가입</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack gap={2} as="form" onSubmit={handleSubmit(onSubmit)}>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaUserSecret />
                                        </Box>
                                    }
                                />
                                {/* <Input variant={"filled"} placeholder="Name" /> */}
                                <Input
                                    variant={"filled"}
                                    placeholder="Name"
                                    {...register("name", {
                                        required: "Please write a name",
                                    })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaEnvelope />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Username"
                                    {...register("username", {
                                        required: "Please write a Username",
                                    })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaUserNinja />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Email"
                                    {...register("email", {
                                        required: "Please write a Email",
                                    })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaLock />
                                        </Box>
                                    }
                                />
                                {/* <Input variant={"filled"} placeholder="Password" /> */}
                                <Input
                                    variant={"filled"}
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Please write a Password",
                                    })}
                                />
                            </InputGroup>
    
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaLock />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="password_check"
                                    {...register("password_check", {
                                        required: "Please write a Password_check",
                                    })}
                                />
                            </InputGroup>
    
                            <Button mt={4} colorScheme={"blue"} w="100%" type="submit">
                                회원 가입
                            </Button>
                        </VStack>
    
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }
    
    
    
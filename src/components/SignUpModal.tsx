import { Box, Button, Input, InputGroup, InputLeftElement, 
  Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

// step1 useForm 임포트
import { useForm } from "react-hook-form";

// step2 type 정의
import { ISignupForm } from "../types";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// step3 reigster 등록
// step4 submit 설정(at Vstack and submit button)
// step5 submit 함수 만들고 test
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const { register, handleSubmit, watch, reset } = useForm<ISignupForm>();

    const onSubmit = ({ name, username, email, password }: ISignupForm) => {
        console.log("name : ", name);
        console.log("username : ", username);
        console.log("email : ", email);
        console.log("password : ", password);
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
                            {/* <Input variant={"filled"} placeholder="Email" /> */}
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
                            {/* <Input variant={"filled"} placeholder="Username" /> */}
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
                        <Button mt={4} colorScheme={"blue"} w="100%" type="submit">
                            회원 가입
                        </Button>
                    </VStack>
                    {/* <SocialLogin /> */}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

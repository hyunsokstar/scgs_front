import {
  Box,
  useToast,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";

//
import { useMutation, useQueryClient } from "@tanstack/react-query";

//
import { usernameLogIn } from "../apis/user_api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [loginErrorExist, setloginErrorExist] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const mutation = useMutation(usernameLogIn, {
    onMutate: () => {
      // console.log("mutation starting");
    },
    onSuccess: (data) => {
      // console.log("data : ", data);
      toast({
        title: "welcome back!",
        status: "success",
      });
      setloginErrorExist("")
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error: any) => {
      console.log("error : ", error);
      console.log("login 실패 error : ", error?.response.data.detail);
      const loginErrorMessage = error?.response.data.detail
      setloginErrorExist(loginErrorMessage)
    },
  });

  // const onSubmit = (data: IForm) => {
  const onSubmit = ({ username, password }: IForm) => {
    // console.log(data);
    mutation.mutate({ username, password });
  };
  // console.log("errors : ", errors);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />

        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="Username"
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
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
          >
            Log in
          </Button>
          {loginErrorExist ?
            <Alert status="error" mt={2} mb={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>로그인 오류</AlertTitle>
                <AlertDescription>{loginErrorExist}</AlertDescription>
              </Box>
            </Alert>

            : ""}
          {/* <SocialLogin /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

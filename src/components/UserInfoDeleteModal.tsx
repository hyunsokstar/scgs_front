import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Switch,
    Select,
    useDisclosure,
    Image,
    Grid,
    GridItem,
    HStack,
    VStack,
    RadioGroup,
    Radio,
  } from "@chakra-ui/react";
  import React, { useRef } from "react";
  import { useForm } from "react-hook-form";
  import { IUsersForUserList } from "../types";
  
  // type Props = {}
  interface UserDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUsersForUserList;
  }
  
  interface IForm {
    username: string;
    avatar_image: FileList;
    is_host: boolean;
    gender: "string";
    language: "string";
  }
  
  function UserInfoDeleteModal({ isOpen, onClose, user }: UserDeleteModalProps) {
    const {
      isOpen: isUserDeleteModalOpen,
      onClose: onUserDeleteModalClose,
      onOpen: onUserDeleteModalOpen,
    } = useDisclosure();
  
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
  
    const onSubmit = (data: any) => {
      console.log("file data : ", data);
      // mutation.mutate();
    };
  
    const imageSearchButton = useRef(null);
  
    const handleDeleteButtonClick = () => {
      // imageSearchButton.current.click();
      console.log("button click check");
    };
  
    return (
      <Box>
        <Button onClick={onUserDeleteModalOpen}>삭제</Button>
  
        <Modal
          blockScrollOnMount={false}
          isOpen={isUserDeleteModalOpen}
          onClose={onUserDeleteModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>유저 정보 삭제</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap={2} as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <FormLabel>username</FormLabel>
                  <Input
                    htmlSize={40}
                    width="auto"
                    value={user.username}
                    {...register("username", {
                      required: "Please write a username",
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>avatar</FormLabel>
  
                  <HStack h="100px" w="100%" bgColor={"lightgrey"} gap={0}>
                    <Image
                      boxSize="80px"
                      objectFit="cover"
                      src={
                        user.avatar
                          ? user.avatar
                          : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                      }
                      alt="Dan Abramov"
                    />
                    <VStack>
                      {/* <Button colorScheme="linkedin">수정</Button> */}
                      {/* <Input
                        {...register("avatar_image")}
                        type="file"
                        accept="image/*"
                        ref={imageSearchButton}
                      /> */}
  
                      {/* <Button
                        colorScheme="facebook"
                        width={"90%"}
                        onClick={handleDeleteButtonClick}
                      >
                        수정
                      </Button> */}
  
                      {/* <Button colorScheme="linkedin" width={"90%"}>
                        삭제
                      </Button> */}
                    </VStack>
                  </HStack>
  
                  {/* <Input htmlSize={40} width="auto" value={user.avatar} /> */}
                </FormControl>
                <FormControl>
                  <FormLabel>is_host</FormLabel>
                  <Stack spacing={5} direction="row">
                    <RadioGroup
                      defaultValue={user.is_host ? "admin" : "employee"}
                    >
                      <HStack>
                        <Radio value="true" {...register("is_host")}>
                          관리자
                        </Radio>
                        <Radio value="false" {...register("is_host")}>
                          직원
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel>성별</FormLabel>
                  <RadioGroup defaultValue={user.gender ? "male" : "female"}>
                    <Stack spacing={5} direction="row">
                      <Radio value="male" {...register("gender")}>
                        남자
                      </Radio>
                      <Radio value="female" {...register("gender")}>
                        여자
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>language</FormLabel>
                  {/* <Input htmlSize={40} width="auto" /> */}
                  <Select
                    placeholder="Select option"
                    defaultValue={user.language}
                    {...register("language")}
                  >
                    <option value="kr">한국</option>
                    <option value="thailand">태국</option>
                    <option value="en">미국</option>
                    <option value="japan">일본</option>
                    <option value="france">프랑스</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <Button
                    m={"auto"}
                    mt={5}
                    w={"100%"}
                    colorScheme="red"
                    type="submit"
                  >
                    삭제
                  </Button>
                </FormControl>
              </VStack>
            </ModalBody>
  
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
  
  export default UserInfoDeleteModal;
  
import React, { useRef, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Image,
    Flex,
    FormControl,
    Input,
    Textarea,
    HStack,
    Select,
    useToast,
    Spinner,
    VisuallyHidden,
    Icon,
} from "@chakra-ui/react";
import { FaEdit, FaTimes } from "react-icons/fa";

// 11. react-hook-form 사용
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../../api";
import { createTutorial, getOneTutorialData, updateTutorial } from "../../apis/tutorial_api";
import { IUserProfile } from "../../types/user/user_types";
import { getProfile } from "../../apis/user_api";
import { ITypeForTutorialUpdate } from "../../types/tutorial_type";

// # tutorial_images: FileList;
// # title: string;
// # price: string;
// # frontend_framework_option: string;
// # backend_framework_option: string;
// # description: string;
// # teacher: string;
// # tutorial_url: string;

type IFormData = {
    pk: number;
    title: string;
    tutorial_images: FileList;
    teacher: string;
    price: string;
    description: string;
    frontend_framework_option: string;
    backend_framework_option: string;
    tutorial_url: string;
};

type ITypeForProps = {
    tutorialPk: number;
    refetchTutorialList: any;
}

const alt_image = "https://a0.muscache.com/im/pictures/21b7c945-10c9-481d-9e8e-04df36c6ec2c.jpg?im_w=1200";

// function ModalButtonForUpdateTutorialCard({ tutorialpk, refetchTutorialList }: ITypeForProps) {
const ModalButtonForUpdateTutorialCard = ({ tutorialPk, refetchTutorialList }: ITypeForProps) => {

    const { isLoading: loadingFortutorialDataForUpdate, data: dataFortutorialUpdate } = useQuery<ITypeForTutorialUpdate>([`tutorial_update`, tutorialPk], getOneTutorialData);

    // console.log("dataFortutorialUpdate : ", dataFortutorialUpdate);


    const [tutorialImage, setTutorialImage] = useState<File | undefined>();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<IFormData>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            alert('파일 크기는 5MB 이하이어야 합니다.');
            if (inputRef.current != null) {
                inputRef.current.value = '';
            }
            return;
        }

        console.log("watch !! ", watch("tutorial_images"));

        if (selectedFile) {
            setTutorialImage(selectedFile);
        }
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const updateTutorialMutation = useMutation(updateTutorial, {
        onSuccess: ({ result }: any) => {
            console.log("result : ", result);
            toast({
                status: "success",
                title: "tutorial upload success!",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
            refetchTutorialList();
            setSubmitLoading(false);
            reset();
            setTutorialImage(undefined)
            onClose();
        },
    });


    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            console.log("result : ", result);

            updateTutorialMutation.mutate({
                ...dataFortutorialUpdate,
                pk: watch("pk"),
                tutorial_image: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
                title: watch("title"),
                teacher: watch("teacher"),
                price: watch("price"),
                description: watch("description"),
                frontend_framework_option: watch("frontend_framework_option"),
                backend_framework_option: watch("backend_framework_option"),
                tutorial_url: watch("tutorial_url")
            });

        },
    });

    const mutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            console.log("data : ", data);

            if (tutorialImage) {
                uploadImageMutation.mutate({
                    uploadURL: data.uploadURL,
                    file: tutorialImage,
                });
            } else if (dataFortutorialUpdate) {
                updateTutorialMutation.mutate({
                    ...dataFortutorialUpdate,
                    pk: watch("pk"),
                    tutorial_image: dataFortutorialUpdate.tutorial_image,
                    title: watch("title"),
                    teacher: watch("teacher"),
                    price: watch("price"),
                    description: watch("description"),
                    frontend_framework_option: watch("frontend_framework_option"),
                    backend_framework_option: watch("backend_framework_option"),
                    tutorial_url: watch("tutorial_url")
                });
            }

        },
    });

    const onSubmit = (data: IFormData) => {
        console.log("watch() ", watch());
        mutation.mutate();
        setSubmitLoading(true);
    };

    const validateUrl = (value: any) => {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    }

    // 1122
    // const deleteHandelr = (pk: number) => {
    //     console.log("pk :", pk);
    //     // const response = deleteMutation.mutate(pk);

    //     toast({
    //         title: `delete 성공! for ${pk}`,
    //         status: "success",
    //     });
    // };

    return (
        <Box mt={2}>
            <Flex width="82%" border="0px solid red" justifyContent={"flex-end"}>
                {/* <Button bg="#ffcc00" color="black" _hover={{ bg: "#ff9900" }} onClick={onOpen} size={"xs"}>수정</Button> */}
                {/* <Button bg="red.200" color="black" _hover={{ bg: "red" }} size={"xs"}>삭제</Button> */}
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
                    <Icon as={FaEdit} onClick={onOpen} boxSize="25px" mb={1} />
                </Box>

                {/* tutorial delete */}

            </Flex>


            <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
                <ModalOverlay />
                <ModalContent style={{ width: "1200px", height: "620px" }}>
                    <ModalCloseButton size={"sm"} />
                    <ModalBody>
                        {!loadingFortutorialDataForUpdate ?

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Flex gap={2}>
                                    <Box maxW="100%" borderWidth="0px" borderRadius="lg" overflow="hidden" boxShadow="md" w="100%">
                                        <Box border={"0px solid blue"}>
                                            <Image src={tutorialImage ? URL.createObjectURL(tutorialImage) : dataFortutorialUpdate?.tutorial_image} w="100%" height={210} objectFit={"cover"} />
                                        </Box>

                                        <VisuallyHidden>
                                            <FormControl>
                                                <HStack>
                                                    <Input
                                                        type="text"
                                                        {...register("pk", {
                                                            required: "Please write a username",
                                                        })}
                                                        defaultValue={tutorialPk}
                                                    />
                                                </HStack>
                                            </FormControl>
                                        </VisuallyHidden>

                                        <FormControl p="1" border={"0px solid blue"}>
                                            <HStack>
                                                <Input w="70%" placeholder="title..." defaultValue={dataFortutorialUpdate?.title} {...register("title")} size="sm" />
                                                <input
                                                    type="file"
                                                    {...register("tutorial_images")}
                                                    name="tutorial_images" // 필수 !!
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                    ref={inputRef}
                                                />

                                                <Button w={"28%"} size="sm" onClick={handleButtonClick}>
                                                    file
                                                </Button>
                                            </HStack>
                                        </FormControl>

                                        <FormControl p="1" border={"0px solid blue"}>
                                            <HStack>
                                                <Input w="50%" placeholder="teacher..." defaultValue={dataFortutorialUpdate?.teacher} {...register("teacher")} size="sm" />
                                                <Input w="50%" placeholder="price..." defaultValue={dataFortutorialUpdate?.price} {...register("price")} size="sm" />
                                            </HStack>
                                        </FormControl>

                                        <FormControl p="2" border={"0px solid blue"}>
                                            <Textarea placeholder="description" size="lg" minH={130} defaultValue={dataFortutorialUpdate?.description} {...register("description")} />
                                        </FormControl>
                                        <FormControl p="1" border={"0px solid blue"}>
                                            <HStack>
                                                <Select {...register("backend_framework_option")} w="50%" size="sm" defaultValue={dataFortutorialUpdate?.backend_framework_option}>
                                                    <option value="">선택안함</option>
                                                    <option value="django_drf">django_drf</option>
                                                    <option value="spring_boot">spring_boot</option>
                                                    <option value="fast_api">fast_api</option>
                                                    <option value="nest_js">nest_js</option>
                                                    <option value="express">express</option>
                                                </Select>
                                                <Select {...register("frontend_framework_option")} w="50%" size="sm" defaultValue={dataFortutorialUpdate?.frontend_framework_option}>
                                                    <option value="">선택안함</option>
                                                    <option value="react">react</option>
                                                    <option value="svelte">svelte</option>
                                                    <option value="flutter">flutter</option>
                                                </Select>
                                            </HStack>
                                        </FormControl>

                                        <FormControl p="1" border={"0px solid blue"}>
                                            <HStack>
                                                <Input w="100%" placeholder="tutorial_url..." defaultValue={dataFortutorialUpdate?.tutorial_url} {...register("tutorial_url", { required: true, validate: validateUrl })} size="sm" />
                                                {errors.tutorial_url && <span>tutorial_url 의 형식이 유효하지 않습니다. </span>}
                                            </HStack>
                                        </FormControl>
                                        <FormControl w="100%" mt={2} border={"0px solid green"}>
                                            <Button type="submit" w="100%">
                                                Update {submitLoading ? <Spinner ml={2} /> : ""}
                                            </Button>
                                        </FormControl>
                                    </Box>
                                </Flex>
                            </form>
                            : "loading"}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ModalButtonForUpdateTutorialCard;

// 사용된 질문

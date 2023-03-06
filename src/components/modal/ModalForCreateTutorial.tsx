import React, { useRef, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Image,
    Flex,
    Text,
    FormControl,
    Input,
    Textarea,
    HStack,
    Select,
    useToast,
    Spinner,
} from "@chakra-ui/react";

// 11. react-hook-form 사용
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../../api";
import { createTutorial } from "../../apis/tutorial_api";

// # tutorial_images: FileList;
// # title: string;
// # price: string;
// # frontend_framework_option: string;
// # backend_framework_option: string;
// # description: string;
// # teacher: string;
// # tutorial_url: string;

type IFormData = {
    title: string;
    tutorial_images: FileList;
    teacher: string;
    price: string;
    description: string;
    frontend_framework_option: string;
    backend_framework_option: string;
    tutorial_url: string;
};

type Props = { refetchTutorialList: any };

const alt_image = "https://a0.muscache.com/im/pictures/21b7c945-10c9-481d-9e8e-04df36c6ec2c.jpg?im_w=1200";

function ModalForCreateTutorial({ refetchTutorialList }: Props) {
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

    const createTutorialMutation = useMutation(createTutorial, {
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

            createTutorialMutation.mutate({
                // tutorial_image: result.variants[0],
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

            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: tutorialImage,
            });
        },
    });

    const onSubmit = (data: IFormData) => {
        console.log("tutorial_images ", tutorialImage);
        if (tutorialImage) {
            mutation.mutate();
            setSubmitLoading(true);
        } else {
            alert("파일을 선택하지 않았습니다.");
            return;
        }
    };

    const validateUrl = (value: string | URL) => {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    }

    return (
        <>
            <Flex width="100%" border="0px solid red" justifyContent={"flex-end"}>
                <Button bgColor={"pink.100"} onClick={onOpen} size={"sm"}>tutorial 추가</Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
                <ModalOverlay />
                <ModalContent style={{ width: "1200px", height: "620px" }}>
                    <ModalCloseButton size={"sm"} />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Flex gap={2}>
                                <Box maxW="100%" borderWidth="0px" borderRadius="lg" overflow="hidden" boxShadow="md" w="100%">
                                    <Box border={"0px solid blue"}>
                                        <Image src={tutorialImage ? URL.createObjectURL(tutorialImage) : alt_image} w="100%" height={210} objectFit={"cover"} />
                                    </Box>
                                    <FormControl p="1" border={"0px solid blue"}>
                                        <HStack>
                                            <Input w="70%" placeholder="title..." {...register("title")} size="sm" />
                                            <input
                                                type="file"
                                                {...register("tutorial_images")}
                                                name="tutorial_images" // 필수 !!
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                                ref={inputRef}
                                                accept="image/*"
                                            />

                                            <Button w={"28%"} size="sm" onClick={handleButtonClick}>
                                                file
                                            </Button>
                                        </HStack>
                                    </FormControl>

                                    <FormControl p="1" border={"0px solid blue"}>
                                        <HStack>
                                            <Input w="50%" placeholder="teacher..." {...register("teacher")} size="sm" />
                                            <Input w="50%" placeholder="price..." {...register("price")} size="sm" />
                                        </HStack>
                                    </FormControl>

                                    <FormControl p="2" border={"0px solid blue"}>
                                        <Textarea placeholder="description" size="lg" minH={130} {...register("description")} />
                                    </FormControl>
                                    <FormControl p="1" border={"0px solid blue"}>
                                        <HStack>
                                            <Select {...register("backend_framework_option")} w="50%" size="sm">
                                                <option value="django_drf">django_drf</option>
                                                <option value="spring_boot">spring_boot</option>
                                                <option value="fast_api">fast_api</option>
                                                <option value="nest_js">nest_js</option>
                                                <option value="express">express</option>
                                            </Select>
                                            <Select {...register("frontend_framework_option")} w="50%" size="sm">
                                                <option value="react">react</option>
                                                <option value="svelte">svelte</option>
                                                <option value="flutter">flutter</option>
                                            </Select>
                                        </HStack>
                                    </FormControl>

                                    <FormControl p="1" border={"0px solid blue"}>
                                        <HStack>
                                            <Input w="100%" placeholder="tutorial_url..." defaultValue={"http://"} {...register("tutorial_url", { required: true, validate: validateUrl })} size="sm" />
                                            {errors.tutorial_url && <span>tutorial_url 의 형식이 유효하지 않습니다. </span>}
                                        </HStack>
                                    </FormControl>
                                    <FormControl w="100%" mt={2} border={"0px solid green"}>
                                        <Button type="submit" w="100%">
                                            Submit {submitLoading ? <Spinner ml={2} /> : ""}
                                        </Button>
                                    </FormControl>
                                </Box>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalForCreateTutorial;

// 사용된 질문

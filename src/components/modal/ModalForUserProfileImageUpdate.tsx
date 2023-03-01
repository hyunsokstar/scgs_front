import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Container,
    Flex,
    Avatar,
    Text,
    Box,
    Badge,
    useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../../api";
import { createProfilePhoto } from "../../apis/user_api";

type Props = {
    userPk: string | undefined;
    profile_image: string | undefined;
    setProfileImage: any;
};

function ModalForUserProfileImageUpdate({ userPk, profile_image, setProfileImage }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [originalImage, setOriginalImage] = useState<string | undefined>(profile_image);

    const [showForProfileUpdateButton, setShowForProfileUpdateButton] = useState<Boolean>(false);
    const [urlToImageUpload, setUrlToImageUpload] = useState<string>();
    // console.log("profile_image 1111111 : ", profile_image);
    const [fileToUpload, setFileToUpload] = useState<any>();
    // let fileToUpload: File;

    const toast = useToast();
    // let file_to_upload: any;

    const createProfilePhotoMutation = useMutation(createProfilePhoto, {
        onSuccess: (result) => {
            console.log("result : ", result);
            // setImage(result.file);
            // setProfileImage(result.file)
            setShowForProfileUpdateButton(false);
            toast({
                status: "success",
                title: "Profile Image uploaded!",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
        },
    });

    // 실제 이미지 업로드 + db 등록
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            console.log("result : ", result.variants[0]);
            const uploaded_image = result.variants[0];
            // setImage(uploaded_image);
            setProfileImage(uploaded_image);

            if (userPk) {
                createProfilePhotoMutation.mutate({
                    file: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
                    userPk,
                });
            } else {
                console.log("userPk 가 없습니다.");
            }
        },
    });

    // 이미지 업로드 url 가져오기 + 등록 취소 버튼 보이게 하기
    const getImageUploadUrlMutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            // console.log("data : ", data);

            setShowForProfileUpdateButton(true);
            setUrlToImageUpload(data.uploadURL);

            // uploadImageMutation.mutate({
            //     uploadURL: data.uploadURL,
            //     file: file_to_upload,
            // });
        },
    });

    // drag and drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // console.log("e : ", e);
        e.preventDefault();
        console.log("upload 할 파일 정보 : ", e.dataTransfer.files[0]);

        setFileToUpload(e.dataTransfer.files[0])
        const reader = new FileReader();
        reader.onload = () => {
            console.log("fileToUpload 1111111 : ", fileToUpload);
            setProfileImage(reader.result);
            setOriginalImage(profile_image);
            // setFileToUpload(e.dataTransfer.files[0]); // setState 는 즉시 변경 되는 값이 아니므로 이렇게 하면 안됨
            // fileToUpload = setFi e.dataTransfer.files[0];
            console.log("fileToUpload 22222222 : ", fileToUpload);

            getImageUploadUrlMutation.mutate();
        };
        reader.readAsDataURL(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    function updateProfileImageToDbAndCloud() {
        console.log("실제 이미지 업로드");
        console.log("fileToUpload : ", fileToUpload);

        if (urlToImageUpload && fileToUpload) {
            uploadImageMutation.mutate({
                uploadURL: urlToImageUpload,
                file: fileToUpload,
            });
        } else {
            console.log("file이 없습니다 : ", fileToUpload);
        }
    }

    // 취소
    function canCleSelectProfileImage() {
        console.log("set profile image with originalImage ", originalImage);
        setShowForProfileUpdateButton(false);
        setProfileImage(originalImage);
    }

    return (
        <Container textAlign={"center"}>
            <Button size="sm" colorScheme="twitter" width="80%" onClick={onOpen}>
                UPDATE
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex width="100%" height="100%">
                            <Flex flex={1} bg="red.200" direction={{ base: "column" }} alignItems={"center"} pt={2} position="relative">
                                {showForProfileUpdateButton ? (
                                    <Box position="absolute" top={0} right={0}>
                                        <Button size={"xs"} onClick={() => updateProfileImageToDbAndCloud()}>
                                            등록
                                        </Button>
                                        <Button size={"xs"} ml={2} mr={1} onClick={() => canCleSelectProfileImage()}>
                                            취소
                                        </Button>
                                    </Box>
                                ) : (
                                    ""
                                )}
                                {/* {profile_image ? profile_image : "hi"} */}
                                <Avatar
                                    size="2xl"
                                    name="John Doe"
                                    src={profile_image ? profile_image : "https://bit.ly/broken-link"}
                                    mb={4}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    draggable
                                />
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    John Doe
                                </Text>
                                <Text fontSize="md" mb={4}>
                                    Software Engineer
                                </Text>
                                <Box>
                                    <Badge colorScheme="green" mb={2}>
                                        React
                                    </Badge>
                                    <Badge colorScheme="purple" mb={2} ml={2}>
                                        Node.js
                                    </Badge>
                                    <Badge colorScheme="blue" mb={2} ml={2}>
                                        AWS
                                    </Badge>
                                </Box>
                            </Flex>
                            <Flex flex={2} bg="blue.200">
                                {/* 두 번째 자식 요소 */}
                            </Flex>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default ModalForUserProfileImageUpdate;

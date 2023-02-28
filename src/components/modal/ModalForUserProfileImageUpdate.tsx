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
};

function ModalForUserProfileImageUpdate({ userPk, profile_image }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [image, setImage] = useState<any>();
    const [fileToUpload, setFileToUpload] = useState<any>();

    // console.log("image : ", image);

    const toast = useToast();
    let file_to_upload: any;

    const createProfilePhotoMutation = useMutation(createProfilePhoto, {
        onSuccess: (result) => {
            console.log("result : ", result);
            setImage(result.file);
            
            toast({
                status: "success",
                title: "Profile Image uploaded!",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
        },
    });

    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            console.log("result : ", result.variants[0]);
            const uploaded_image = result.variants[0];
            // setImage(uploaded_image);

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

    const getImageUploadUrlMutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            // console.log("image for upload 아직 이미지 업로드전): ", image);
            // console.log("data (업로드 이미지 url 주소 얻어 왔는지 확인): ", data);

            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: file_to_upload,
            });
        },
    });

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("e : ", e);

        e.preventDefault();
        file_to_upload = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // setImage(reader.result);
            // setFileToUpload(file_to_upload)
            getImageUploadUrlMutation.mutate();
        };
        reader.readAsDataURL(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log("image : ", image);
    };

    return (
        <Container textAlign={"center"}>
            <Button size="sm" colorScheme="twitter" width="80%" onClick={onOpen}>
                모달 버튼
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex width="100%" height="100%">
                            <Flex flex={1} bg="red.200" direction={{ base: "column" }} alignItems={"center"} pt={2}>
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

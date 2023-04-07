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
  HStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../../api";
import { createProfilePhoto } from "../../apis/user_api";
import { IUser } from "../../types";

type Props = {
  // userPk: string | undefined;
  // profile_image: string | undefined;
  // setProfileImage?: any;
  loginUser: IUser;
};

function ModalForUserProfileImageUpdate({ loginUser }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileImage, setProfileImage] = useState<any>();

  const [originalImage, setOriginalImage] = useState<string | undefined>();
  // loginUser?.profileImages[0].file

  const [showForProfileUpdateButton, setShowForProfileUpdateButton] =
    useState<Boolean>(false);
  const [urlToImageUpload, setUrlToImageUpload] = useState<string>();
  // console.log("profile_image 1111111 : ", profile_image);
  // console.log("profile_image userPk : ", userPk);
  const [fileToUpload, setFileToUpload] = useState<any>();

  // console.log("loginUser : ", loginUser);

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
      const userPk = loginUser.pk;

      if (loginUser.pk) {
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
    // console.log("upload 할 파일 정보 : ", e.dataTransfer.files[0]);
    e.preventDefault();

    setFileToUpload(e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      // console.log("fileToUpload 1111111 : ", fileToUpload);
      setProfileImage(reader.result);
      setOriginalImage(profileImage);

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
      <Button size="xs" colorScheme="twitter" onClick={onOpen}>
        UPDATE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Use Profile Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex width="100%" height="100%">
              <Flex
                flex={1}
                bg="red.200"
                direction={{ base: "column" }}
                alignItems={"center"}
                pt={2}
                position="relative"
              >
                {showForProfileUpdateButton ? (
                  <Box position="absolute" top={0} right={0}>
                    <Button
                      size={"xs"}
                      onClick={() => updateProfileImageToDbAndCloud()}
                    >
                      등록
                    </Button>
                    <Button
                      size={"xs"}
                      ml={2}
                      mr={1}
                      onClick={() => canCleSelectProfileImage()}
                    >
                      취소
                    </Button>
                  </Box>
                ) : (
                  ""
                )}

                {profileImage ? (
                  <>
                    <Avatar
                      size="2xl"
                      name="John Doe"
                      src={
                        profileImage
                          ? profileImage
                          : "https://bit.ly/broken-link"
                      }
                      mb={4}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      draggable
                    />
                  </>
                ) : (
                  <>
                  <Avatar
                    size="2xl"
                    name="John Doe"
                    src={
                      loginUser.profile_image
                        ? loginUser.profile_image
                        : "https://bit.ly/broken-link"
                    }
                    mb={4}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    draggable
                  />
                  </>
                )}

                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {loginUser.username}
                </Text>
                <HStack>
                  {loginUser
                    ? loginUser.skill_for_frameWork.map((row) => {
                        return <Badge m={2}>{row.frame_work_name}</Badge>;
                      })
                    : ""}
                </HStack>
              </Flex>
              <Flex flex={2} bg="blue.200" p={2} flexDirection={"column"}>
                {/* 두 번째 자식 요소 */}
                <Box>이름 : {loginUser.name}</Box>
                <Box>이메일 : {loginUser.email}</Box>
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

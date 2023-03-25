import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Avatar,
  Text,
  Badge,
  Container,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ModalForUserProfileImageUpdate from "../components/modal/ModalForUserProfileImageUpdate";
import { IUserProfile } from "../types/user/user_types";
import { getProfile } from "../apis/user_api";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import { createProfilePhoto } from "../apis/user_api";

interface IProfileImage {
  file: string | undefined;
}

const UserProfilePage = () => {
  const { userPk } = useParams();
  const { isLoading, data: userProfileData } = useQuery<IUser>(
    [`user_profile2`, userPk],
    getProfile
  );
  const [profileImage, setProfileImage] = useState<any>();
  const [fileToUpload, setFileToUpload] = useState<any>();
  const [originalImage, setOriginalImage] = useState<any>();
  const [showForProfileUpdateButton, setShowForProfileUpdateButton] =
    useState<Boolean>(false);
  const [urlToImageUpload, setUrlToImageUpload] = useState<string>();
  const toast = useToast();

  console.log("userProfileData : ", userProfileData);

  // useEffect(() => {
  //   setProfileImage(userProfileData?.profileImages[0].file)
  // }, [userProfileData])

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("upload 할 파일 정보 : ", e.dataTransfer.files[0]);

    setFileToUpload(e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      console.log("fileToUpload 1111111 : ", fileToUpload);
      setProfileImage(reader.result);
      setOriginalImage(profileImage);
      //  setFileToUpload(e.dataTransfer.files[0]); // setState 는 즉시 변경 되는 값이 아니므로 이렇게 하면 안됨
      console.log("fileToUpload 22222222 : ", fileToUpload);

      getImageUploadUrlMutation.mutate();
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // db 등록
  const createProfilePhotoMutation = useMutation(createProfilePhoto, {
    onSuccess: (result) => {
      console.log("result : ", result);
      // setImage(result.file);
      setProfileImage(result.profile_image);
      setShowForProfileUpdateButton(false);
      toast({
        status: "success",
        title: "Profile Image uploaded!",
        isClosable: true,
      });
    },
  });

  // 실제 이미지 업로드
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result.variants[0]);
      const uploaded_image = result.variants[0];
      // setImage(uploaded_image);
      setProfileImage(uploaded_image);
      const userPk = userProfileData?.pk;

      if (userProfileData?.pk) {
        createProfilePhotoMutation.mutate({
          file: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
          userPk,
        });
      } else {
        console.log("userPk 가 없습니다.");
      }
    },
  });

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

  function canCleSelectProfileImage() {
    console.log("set profile image with originalImage ", originalImage);
    setShowForProfileUpdateButton(false);
    setProfileImage(originalImage);
  }

  return (
    <>
      {!isLoading && userProfileData ? (
        <Container maxW="78%" margin="auto" bgColor={"green.100"}>
          {/* {userProfileData ? userProfileData : ""} */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-start" }}
            justify="space-between"
            maxW={{ base: "100%", md: "1200px" }}
            m="0 auto"
            p={8}
          >
            <Box flex="1">
              <Flex
                flex={1}
                bg="green.200"
                direction={{ base: "column" }}
                alignItems={"center"}
                // pt={2}
                p={10}
                position="relative"
                border={"1px solid red"}
              >
                {showForProfileUpdateButton ? (
                  <Box position="absolute" top={0} right={0} zIndex={2}>
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
                  <Box>
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
                  </Box>
                ) : (
                  <Box>
                    <Avatar
                      size="2xl"
                      name="John Doe"
                      src={
                        userProfileData.profile_image
                          ? userProfileData.profile_image
                          : "https://bit.ly/broken-link"
                      }
                      mb={4}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      draggable
                    />
                  </Box>
                )}
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {userProfileData.username}
                </Text>
                {/* <Box>
                  {userProfileData.skill_for_frameWork.length
                    ? userProfileData.skill_for_frameWork.map((row) => {
                        console.log("row", row);

                        return <Badge m={2}>{row.frame_work_name}</Badge>;
                      })
                    : "no framewok"}
                </Box>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  name: {userProfileData?.name}
                </Text>
                <Text fontSize="md" mb={4}>
                  position:
                  {userProfileData?.position
                    ? userProfileData?.position.position_name
                    : "no position"}
                </Text> */}
              </Flex>

              <Box>
                {userProfileData?.skill_for_frameWork.map((row) => {
                  return (
                    <Box>
                      <Badge colorScheme="orange" mb={2}>
                        {row.frame_work_name}
                      </Badge>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box ml={{ md: 8 }} flex="2">
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                About Me
              </Text>
              <Text fontSize="md" mb={4}>
                {userProfileData?.about_me}
              </Text>
              <Text fontSize="md" mb={4}>
                {userProfileData?.email}
              </Text>
            </Box>
            <Box flex="1" w="100%" p={4} color="white" ml={5}>
              {/* <ModalForUserProfileImageUpdate setProfileImage={setProfileImage} userPk={userPk} profile_image={profileImage} /> */}
              <ModalForUserProfileImageUpdate loginUser={userProfileData} />
            </Box>
          </Flex>
        </Container>
      ) : (
        "loading"
      )}
    </>
  );
};

export default UserProfilePage;

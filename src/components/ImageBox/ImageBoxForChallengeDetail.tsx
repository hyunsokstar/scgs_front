import React, { useState } from "react";
import { Box, Image, Button, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../../api";
import { apiForUpdateChallengeMainImage } from "../../apis/challenge_api";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";

interface IPropTypes {
  selectedChallenge: ITypeForChallengeRow;
}

const ImageBoxForChallengeDetail = ({ selectedChallenge }: IPropTypes) => {
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast();

  // 썸네일 이미지 (미리 보기용)
  const [thumbNailImage, setThumbnailImage] = useState("");

  // 업로드할 이미지 파일 정보
  const [imageFileToUpload, setImageFileToUpload] = useState();

  // 업로드용 url
  const [uploadUrlToCloud, setUploadUrlToCloud] = useState("");

  const createProfilePhotoMutation = useMutation(
    apiForUpdateChallengeMainImage,
    {
      onSuccess: (result) => {
        console.log("result : ", result);
        // // setImage(result.file);
        // setProfileImage(result.profile_image);
        // setShowForProfileUpdateButton(false);
        toast({
          status: "success",
          title: "Profile Image uploaded!",
          description: result.message,
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  // 이미지를 클라우드에 업로드
  const mutationForImageUploadToCloud = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result.variants[0]);
      const uploaded_image = result.variants[0];
      console.log("uploaded_image : ", uploaded_image);

      createProfilePhotoMutation.mutate({
        challengeId: selectedChallenge.id,
        file: uploaded_image,
      });
    },

    onError: (error: any) => {
      console.error("Error occurred: ", error); // 에러 메시지 출력
    },
  });

  // 이미지 업로드 및 db 저장
  const uploadImageHandler = () => {
    // 이미지 업로드 뮤테이트
    if (uploadUrlToCloud && imageFileToUpload) {
      console.log("imageFileToUpload : ", imageFileToUpload);

      mutationForImageUploadToCloud.mutate({
        uploadURL: uploadUrlToCloud,
        file: imageFileToUpload,
      });
    } else {
      alert("업로드할 이미지가 없습니다");
    }
  };

  const cancleImageUpload = () => {
    // 이미지 선택 취소 함수
    // 이 함수를 구현해야 합니다.
    setThumbnailImage("");
    setUploadUrlToCloud("");
  };

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      // console.log("data : ", data);

      setUploadUrlToCloud(data.uploadURL);

      // uploadImageMutation.mutate({
      //     uploadURL: data.uploadURL,
      //     file: file_to_upload,
      // });
    },
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0]; // 드롭된 파일
    console.log("image dropped:", imageFile);

    // 미리 보기용 이미지 상태값으로 설정
    setThumbnailImage(URL.createObjectURL(imageFile));
    setImageFileToUpload(e.dataTransfer.files[0]);

    // 업로드할 이미지 파일 정보 상태값에 저장
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImageFileToUpload(reader.result);
    // };
    // reader.readAsDataURL(e.dataTransfer.files[0]);

    setIsDragging(false); // 드래그 상태 해제

    getImageUploadUrlMutation.mutate();
  };

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true); // 드래그 상태로 설정
  };

  const handleDragLeave = () => {
    setIsDragging(false); // 드래그 상태 해제
  };

  return (
    <Box w="100%" h="100%">
      {/* {uploadUrlToCloud ? uploadUrlToCloud : ""} */}
      {selectedChallenge.main_image
        ? selectedChallenge.main_image
        : "이미지 없음"}
      <Box
        border={`2px dashed ${isDragging ? "red" : "lightgray"}`} // 점선 스타일 및 색상 설정
        borderStyle={isDragging ? "dashed" : "solid"} // 드래그 중일 때 점선 스타일, 그 외에는 실선 스타일
        w="90%"
        height="90%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative" // 부모 요소를 relative로 설정
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        backgroundColor={isDragging ? "gray.200" : "transparent"} // 드래그 중일 때 배경색 변경
        cursor={isDragging ? "copy" : "pointer"} // 드래그 중일 때 커서 변경
      >
        {thumbNailImage ? (
          <>
            {/* 우측 상단에 버튼 추가 */}
            <Box position="absolute" top={0} right={0} zIndex={2}>
              <Button size={"xs"} onClick={() => uploadImageHandler()}>
                등록
              </Button>
              <Button
                size={"xs"}
                ml={2}
                mr={1}
                onClick={() => cancleImageUpload()}
              >
                취소
              </Button>
            </Box>
            {/* 업로드할 이미지 */}
            <Image
              src={thumbNailImage}
              alt="Uploaded Image"
              maxH="100%"
              maxW="100%"
            />
          </>
        ) : isDragging ? (
          "Drop the image"
        ) : (
          <Image
            src={selectedChallenge.main_image}
            alt="Uploaded Image"
            maxH="100%"
            maxW="100%"
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageBoxForChallengeDetail;

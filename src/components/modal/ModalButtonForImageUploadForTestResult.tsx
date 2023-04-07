import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Img,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../../api";

interface IProps {
  testPk: string | number;
}

const ModalButtonForImageUploadForTestResult = ({ testPk }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<any>("");
  const [urlToImageUpload, setUrlToImageUpload] = useState<any>();

  // 0407 st2
  const [imageFileToUpload, setImageFileToUpload] = useState<any>();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // 0407 st4
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result.variants[0]);
      const uploaded_image = result.variants[0];

      alert(uploaded_image);

      // setImage(uploaded_image);
      //   setProfileImage(uploaded_image);
      //   const userPk = loginUser.pk;
      //   if (test.pk) {
      //     createProfilePhotoMutation.mutate({
      //       file: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      //       userPk,
      //     });
      //   } else {
      //     console.log("userPk 가 없습니다.");
      //   }
    },
  });

  // 0407 st3
  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      // console.log("data : ", data);
      setUrlToImageUpload(data.uploadURL);
    },
  });

  // 0407
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("File dropped.");
    e.preventDefault();
    setIsDragging(false);

    // 0407 st1
    setImageFileToUpload(e.dataTransfer.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImageToUpload(reader.result);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);

    getImageUploadUrlMutation.mutate();
  };

  const saveTestResultImageHandler = () => {
    console.log("testPk for image upload : ", testPk);
    uploadImageMutation.mutate({
        uploadURL: urlToImageUpload,
        file: imageFileToUpload,
    })
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        colorScheme="green"
        borderRadius="md"
        _hover={{ bg: "green.200" }}
        onClick={onOpen}
      >
        <FaPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent="space-between">
            <Box>Test Result image Upload</Box>
            <Box>
              <Button
                variant="outline"
                colorScheme="red"
                size={"sm"}
                mr={0}
                onClick={onClose}
              >
                <FaTimes />
              </Button>
            </Box>
          </ModalHeader>
          <ModalBody>
            <Box>{urlToImageUpload ? urlToImageUpload : ""}</Box>
            <Box
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragging ? "2px dashed green" : "1px dotted blue",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* 미리보기 이미지 있을 경우 출력 처리 하기 1122*/}
              <Box width={"700px"} border="0px solid pink">
                {imageToUpload ? (
                  <Img
                    width={"100%"}
                    height={"300px"}
                    src={imageToUpload}
                    objectFit={"fill"}
                  />
                ) : (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>
                      {isDragging ? "파일 놓아주세요!" : "드래그 앤 드롭"}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="teal"
              ml={3}
              width="100%"
              borderRadius="full"
              _hover={{ bg: "teal.50" }}
              _active={{ bg: "teal.100" }}
              _focus={{ boxShadow: "none" }}
              fontFamily="sans-serif"
              fontWeight="semibold"
              onClick={() => saveTestResultImageHandler()}
            >
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForImageUploadForTestResult;

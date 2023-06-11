import { useState } from "react";
import {
  Box,
  IconButton,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import {
  createRefImageForTask,
  deleteOneRefImageForTask,
} from "../../apis/project_progress_api";
import { getUploadURL, uploadImage } from "../../api";

interface ReferImage {
  pk: any;
  image_url: string;
}

interface DragZoneForReferImagesProps {
  refer_images: ReferImage[];
  taskPk: any;
}

// 1122
const DragZoneForReferImagesForTask: React.FC<DragZoneForReferImagesProps> = ({
  refer_images,
  taskPk,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploadingForRefImage, setIsUploadingForRefImage] = useState(false);
  let imageFile: Blob | MediaSource;

  const deleteRefImageMutation = useMutation(
    (lef_image_pk: number) => {
      return deleteOneRefImageForTask(lef_image_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        // if (refetchForTaskDetail) {
        //   refetchForTaskDetail();
        // }
        queryClient.refetchQueries(["getTaskListForCheckedPksForImageSlide"]);

        // getTaskListForCheckedPksForImageSlide
        toast({
          title: "delete task url success !",
          status: "success",
        });
      },
      onError: (error) => {
        console.log("delete mutation has an error ", error);
        toast({
          title: `delete mutation has an error :  ${error}`,
          status: "error",
        });
      },
    }
  );

  const delete_lef_image_handler = (lef_image_pk: any) => {
    deleteRefImageMutation.mutate(lef_image_pk);
  };

  const createRefImageForTaskMutation = useMutation(createRefImageForTask, {
    onSuccess: (result) => {
      console.log("result : ", result);
      setIsUploadingForRefImage(false);
      // refetchForTaskDetail();
      queryClient.refetchQueries(["getTaskListForCheckedPksForImageSlide"]);

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
      console.log("result : ", result);
      console.log("result.variants[0] : ", result.variants[0]);

      createRefImageForTaskMutation.mutate({
        taskPk: taskPk,
        image_url: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      });
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      console.log("file to upload", imageFile);

      uploadImageMutation.mutate({
        uploadURL: result.uploadURL,
        file: imageFile,
      });
    },
  });

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsUploadingForRefImage(true);
    imageFile = event.dataTransfer.files[0];
    // setImageToUpload(imageFile)

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);

      // set_refer_images((prevImages: any) => [
      //   { image_url: imageUrl },
      //   ...prevImages,
      // ]);
    }

    getImageUploadUrlMutation.mutate();
  };

  const handleDragLeave = (event: any) => {
    // 드래그 떠날 시 Box 배경색을 초기화
    event.currentTarget.style = "";
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    // 드래그 오버 시 Box 배경색을 투명 회색으로 설정
    if (!event.currentTarget.textContent.includes("drag image")) {
      event.currentTarget.style.zIndex = "1";
      // event.currentTarget.style.opacity = 0.5;
      event.currentTarget.style.textAlign = "center";
      event.currentTarget.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    }
  };

  // 2244
  return (
    <>
      <Box>
        {isUploadingForRefImage && <Spinner size="md" color="blue.1000" />}
      </Box>
      <Box flex="3" border="0px solid green">
        <Box
          width="100%"
          overflowY="scroll"
          height="730px"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          // border="1px solid green"
        >
          <Box border="0px solid green" textAlign="center">
            {/* ModalButtonForShowReferImagesForTask component */}
          </Box>

          {refer_images && refer_images.length ? (
            refer_images.map((row: ReferImage) => (
              <a
                href={row.image_url}
                target="_blank"
                rel="noreferrer"
                key={row.pk}
              >
                <Box
                  position="relative"
                  zIndex="2"
                  paddingY={0}
                  _hover={{ border: "skyblue", opacity: 0.7 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <IconButton
                    icon={
                      <Box display="flex" justifyContent="center">
                        <FaTimes />
                      </Box>
                    }
                    position="absolute"
                    top="8px"
                    mt={0}
                    mr={2}
                    right={0}
                    size="sm"
                    zIndex={10}
                    display={isHovering ? "block" : "none"}
                    onClick={(e) => {
                      e.preventDefault();
                      delete_lef_image_handler(row.pk);
                    }}
                    aria-label=""
                    _hover={{ bg: "red.100" }}
                  />
                  <Image src={row.image_url} height="200px" width="100%" />
                </Box>
              </a>
            ))
          ) : (
            <Box>
              <Text>drag & drop</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DragZoneForReferImagesForTask;

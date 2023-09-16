import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../../api";
import { apiForCreateChallenge } from "../../apis/challenge_api";

// 폼 데이터의 타입 정의
interface FormData {
  title: string;
  subtitle: string;
  description: string;
}

interface IPropTypes {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFormForChallenge: React.FC<IPropTypes> = ({
  setIsOpen,
}: IPropTypes) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 파일 정보를 저장할 상태값
  const queryClient = useQueryClient();
  const toast = useToast();

  // 업로드용 url
  const [uploadUrlToCloud, setUploadUrlToCloud] = useState("");

  // 폼 데이터를 저장할 상태
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택 시 호출되는 함수
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file); // 파일 정보를 상태값에 저장
    }
  };

  const mutationForCreateChallenge = useMutation(apiForCreateChallenge, {
    onSuccess: (result) => {
      console.log("result : ", result);
      queryClient.refetchQueries(["apiForGetChallengeList"]);

      reset();
      setIsOpen(false);

      toast({
        status: "success",
        title: "create challenge success !",
        description: result.message,
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.error("Error occurred for create image: ", error); // 에러 메시지 출력
      toast({
        status: "error",
        title: "Error",
        description: error.response.data.message,
        duration: 2000,
        isClosable: true,
      });
      // 필요한 다른 에러 처리 작업 수행 가능
    },
  });

  const mutationForImageUploadToCloud = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result.variants[0]);
      const uploaded_image = result.variants[0];
      console.log("uploaded_image : ", uploaded_image);

      mutationForCreateChallenge.mutate({
        title: formData.title, // 폼 데이터에서 title 가져오기
        subtitle: formData.subtitle, // 폼 데이터에서 subtitle 가져오기
        description: formData.description, // 폼 데이터에서 description 가져오기
        main_image: uploaded_image,
      });
    },

    onError: (error: any) => {
      console.error("Error occurred: ", error); // 에러 메시지 출력
    },
  });

  const mutationForGetUrlToUploadImage = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      setUploadUrlToCloud(data.uploadURL);
      const uploadUrl = data.uploadURL;

      mutationForImageUploadToCloud.mutate({
        uploadURL: uploadUrl,
        file: selectedFile,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    // 폼 제출 시 파일 정보와 함께 데이터를 처리
    console.log("Data: ", data);
    console.log("Selected File: ", selectedFile);

    if (data && selectedFile) {
      // 데이터를 상태에 설정
      setFormData({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
      });

      mutationForGetUrlToUploadImage.mutate();
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input {...register("title")} />
          </FormControl>

          <FormControl>
            <FormLabel>Subtitle</FormLabel>
            <Input {...register("subtitle")} />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
          </FormControl>

          <FormControl>
            <FormLabel>Main Image</FormLabel>
            <Input type="file" onChange={onFileChange} />
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Image Preview"
                maxH="200px" // 이미지의 최대 높이를 조절할 수 있습니다.
              />
            )}
          </FormControl>

          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateFormForChallenge;

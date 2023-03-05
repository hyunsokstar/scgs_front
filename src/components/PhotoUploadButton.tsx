import { useMutation } from "@tanstack/react-query";
import { Box, Button, Container, FormControl, Heading, Input, VStack, useToast, Img, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
// import { getUploadURL } from "../api";
import { getUploadURL, uploadImage, createPhoto } from "../api";
import { useState } from "react";

type Props = {};

interface IForm {
    file: FileList;
}

function PhotoUploadButton({}: Props) {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const toast = useToast();
    const navigate = useNavigate();

    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image uploaded!",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
            reset();
        },
    });

    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            console.log("result : ", result);
            var roomPk = prompt("몇번째 방의 사진을 업로드?", "");

            if (roomPk) {
                createPhotoMutation.mutate({
                    description: "I love react",
                    file: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
                    roomPk,
                });
            }
            // upload 된 이미지 주소
            const uploaded_image = result.variants[0];
            setUploadedImageUrl(uploaded_image);
        },
    });

    const mutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            console.log("data : ", data);

            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        },
    });

    const onSubmit = (data: any) => {
        // console.log("file data : ", data);
        mutation.mutate();
    };

    return (
        <div>
            <Box
                pb={40}
                mt={0}
                px={{
                    base: 10,
                    lg: 40,
                }}
            >
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>

                        <Button type="submit" w="full" colorScheme={"red"}>
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
                <br />
                <Box alignContent={"Center"}>{uploadedImageUrl ? <Img src={uploadedImageUrl} /> : ""}</Box>
            </Box>
        </div>
    );
}

export default PhotoUploadButton;

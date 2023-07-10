import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  useToast,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StudyNoteContentFormData } from "../../types/study_note_type";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { apiForCreateStudyNoteContents } from "../../apis/study_note_api";

// 33
interface Props {
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
  refetch?: () => void;
}

// 1122
const CreateFormForStudyNoteForSlide = ({
  currentPage,
  study_note_pk,
  refetch,
}: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [note_content_content, set_note_content_content] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudyNoteContentFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const mutationForCreateStudyNote = useMutation(
    apiForCreateStudyNoteContents,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "welcome back!",
          status: "success",
        });

        if (refetch) {
          refetch();
        } else {
          queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        }

        reset();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  // submit
  const handleFormSubmit = async (formData: StudyNoteContentFormData) => {
    setIsLoading(true);
    console.log("formData : ", formData);

    mutationForCreateStudyNote.mutate({
      title: formData.title,
      file: formData.file,
      content: note_content_content,
      study_note_pk: formData.study_note_pk,
      current_page_number: formData.current_page_number,
      content_option: formData.content_option,
    });

    setIsLoading(false);
  };

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  // 2244
  return (
    <Box height={"100%"} border={"1px solid black"}>
      <Box>
        <FormControl display="none">
          <Input
            type="hidden"
            {...register("content_option")}
            value={"note_content"}
          />
        </FormControl>

        <FormControl>
          <Input
            type="hidden"
            {...register("study_note_pk")}
            value={study_note_pk}
          />
        </FormControl>

        <FormControl>
          <Input
            type="hidden"
            {...register("current_page_number")}
            value={currentPage}
          />
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter the title"
              {...register("title", { required: true })}
              isInvalid={errors.title != null}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>File</FormLabel>
            <Input
              type="text"
              placeholder="Enter the file name"
              {...register("file", { required: true })}
              isInvalid={errors.file != null}
            />
          </FormControl>
        </HStack>

        <FormControl mt={4}>
          <FormLabel>Content</FormLabel>
          <Box zIndex={9999}>
            <TinyMCEEditor
              onChange={handleContentChange}
              apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
            />
          </Box>
        </FormControl>
      </Box>
      <Box mt={5}>
        <Flex justify="space-between" w="100%">
          <Button
            variant="outline"
            colorScheme="teal"
            mr={2}
            _hover={{ backgroundColor: "teal.100" }}
            onClick={handleSubmit(handleFormSubmit)}
            isLoading={isLoading}
            p={3}
            w={"100%"}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateFormForStudyNoteForSlide;

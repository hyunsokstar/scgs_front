import React, { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createNoteContent,
  getTechNoteContentListByPk,
} from "../apis/tech_note_api";
import {
  ITypeForCreateTechNoteContent,
  TechNoteContentListType,
  TechNoteContentRowType,
} from "../types/tech_note_type";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import CardForTechNoteContent from "../components/CardForTechNoteContent";
import ModalButtonForCreateTechNoteContent2 from "../components/modal/ModalButtonForCreateTechNoteContent2";
import TinyMCEEditor from "../components/RichEditor/TinyMCEEditor";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableForTechNote from "../components/Table/TableForTechNote";

// rome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

const TechNoteContent = () => {
  const { note_content_fk } = useParams();
  const { handleSubmit, register } = useForm<ITypeForCreateTechNoteContent>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [note_content_content, set_note_content_content] = useState<string>("");

  console.log("notePk check : ", note_content_fk);

  const {
    data: techNoteContentListData,
    isLoading: isLodaingFortechNoteContentList,
    refetch: RefetchFortechNoteContentList,
  } = useQuery<TechNoteContentListType>(
    [
      "getTechNoteContentListByPk",
      note_content_fk,
      "getTechNoteContentListByPk",
    ],
    getTechNoteContentListByPk
  );

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  console.log("techNoteContentListData : ", techNoteContentListData);
  console.log(
    "techNoteContentListData.tech_note_title : ",
    techNoteContentListData?.tech_note_title
  );

  const createMutationForTechNoteContent = useMutation(createNoteContent, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["getTechNoteContentListByPk"]);

      toast({
        title: "welcome back!",
        status: "success",
      });

      //   requery getOneProjectTask
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = (data: ITypeForCreateTechNoteContent) => {
    console.log("data : ", data);

    createMutationForTechNoteContent.mutate({
      note_content_fk: note_content_fk,
      note_content_title: data.note_content_title,
      note_content_file: data.note_content_file,
      note_content_content: note_content_content,
    });
    
  };

  return (
    <VStack>
      <Box>tech note 주제: {techNoteContentListData?.tech_note_title}</Box>
      <Box width={"100%"}>
        <Flex>
          <Box flex={1}>
            <Text>Tech Note List</Text>
            <TableForTechNote />
          </Box>
          <Box flex={1}>
            <VStack>
              <Flex
                border="1px solid black"
                width={"100%"}
                justifyContent={"space-between"}
                py={3}
              >
                <Box>
                  <Button>create</Button>
                </Box>
              </Flex>
              <Box width={"100%"}>
                {techNoteContentListData &&
                techNoteContentListData.data.length !== 0 ? (
                  techNoteContentListData.data.map(
                    (row: TechNoteContentRowType) => {
                      return (
                        <Box>
                          <CardForTechNoteContent
                            pk={row.pk}
                            title={row.note_content_title}
                            file={row.note_content_file}
                            content={row.note_content_content}
                            created_at={row.created_at}
                          />
                        </Box>
                      );
                    }
                  )
                ) : (
                  <Box>
                    <Image src="https://www.shutterstock.com/image-vector/no-data-empty-concept-illustration-260nw-2134675761.jpg" />
                  </Box>
                )}
              </Box>

              <Box width={"100%"}>
                <Text
                  mt={10}
                  mb={2}
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="center"
                  _hover={{ color: "purple.600" }}
                  fontFamily="CustomHandwritingFont" // Replace with your custom handwriting font
                >
                  Note Content 입력
                </Text>

                <FormControl>
                  <FormLabel>title</FormLabel>
                  <Input
                    type="text"
                    {...register("note_content_title", {
                      required: "content_title is required",
                      maxLength: {
                        value: 50,
                        message: "content_title must be 50 characters or less",
                      },
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>file</FormLabel>
                  <Input
                    type="text"
                    {...register("note_content_file", {
                      required: "content_file is required",
                      maxLength: {
                        value: 50,
                        message: "content_title must be 50 characters or less",
                      },
                    })}
                  />
                </FormControl>

                <TinyMCEEditor
                  initialValue={note_content_content}
                  onChange={handleContentChange}
                  apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                />
                
                <Button
                  variant="outline"
                  colorScheme="pink"
                  size="md"
                  width={"100%"}
                  my={2}
                  fontWeight="medium"
                  _hover={{
                    bg: "pink.500",
                    borderColor: "pink.500",
                    color: "white",
                  }}
                  _active={{
                    bg: "pink.600",
                    borderColor: "pink.600",
                    color: "white",
                  }}
                  _focus={{ boxShadow: "outline" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default TechNoteContent;

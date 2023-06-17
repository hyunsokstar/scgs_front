// 00
import { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  VStack,
  HStack,
  Textarea,
  Avatar,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForEditModeForStudyNoteBriefingBoard } from "../../apis/study_note_api";

interface IProps {
  writer: any;
  comment: string;
  isUser: boolean;
  is_edit_mode: boolean;
  pk: number | string;
  refetch: () => void;
}

// 1122
const ListItemForChatBoard = ({
  pk,
  writer,
  comment,
  isUser,
  is_edit_mode,
  refetch,
}: IProps) => {
  const toast = useToast();

  const [isChecked, setIsChecked] = useState(false);
  const [commentTextForUpdate, setCommentTextForUpdate] = useState(comment);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  // console.log("writer : ", writer);

  const updateMutationForCommentEditMode = useMutation(
    apiForEditModeForStudyNoteBriefingBoard,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
          duration: 2000, // 2초 후에 사라짐
          isClosable: true,
        });
        refetch();
      },
    }
  );

  const EditModeHandler = (comment_pk: any) => {
    console.log("edit mode click check pk : ", comment_pk);
    updateMutationForCommentEditMode.mutate(comment_pk);
  };

  // 2244
  return (
    <HStack justifyContent={isUser ? "flex-start" : "flex-end"} width="100%">
      {isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}

      <Box
        // p={3}
        p={1}
        borderRadius="lg"
        bg={isUser ? "yellow.50" : "blue.100"}
        alignSelf={isUser ? "flex-start" : "flex-end"}
        border="3px solid black"
        // maxWidth="380px"
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        my={2}
      >
        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          border="0px solid green"
          width={"100%"}
          gap={2}
        >
          <Box>{isUser && <Avatar size="sm" src={writer.profile_image} />}</Box>
          <Box>
            <Text fontSize="lg">
              {is_edit_mode ? (
                <Box border={"0px solid purple"} >
                  <Textarea
                    width={"320px"}
                    bg={"blue.100"}
                    defaultValue={comment}
                    // maxWidth={"95%"}
                    onChange={(e) => setCommentTextForUpdate(e.target.value)}
                  />

                  <Box display={"flex"} justifyContent="flex-end" mt={1}>
                    <IconButton
                      aria-label="Confirm"
                      icon={<FaCheck />}
                      //   onClick={() => onEditConfirmHandler(pk)}
                      variant="outline"
                      colorScheme="green"
                      rounded="md"
                      size="xs"
                    />
                    <IconButton
                      aria-label="Cancel"
                      icon={<FaTimes />}
                      onClick={() => EditModeHandler(pk)}
                      variant="outline"
                      colorScheme="pink"
                      rounded="md"
                      size="xs"
                      ml={1}
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
                  {comment}
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="modify"
                    onClick={() => EditModeHandler(pk)}
                    variant="outline"
                    colorScheme="teal"
                    _hover={{ bg: "teal.400" }}
                    size="xs"
                    rounded="md"
                    ml={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    // onClick={() => onDeleteCommentHandler(pk)}
                    variant="outline"
                    colorScheme="teal"
                    _hover={{ bg: "teal.400" }}
                    size="xs"
                    rounded="md"
                    ml={1}
                  />
                </Box>
              )}
            </Text>
          </Box>
          <Box>
            {!isUser && <Avatar size="sm" src={writer.profile_image} />}
          </Box>
        </Flex>
      </Box>
      {!isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}
    </HStack>
  );
};

export default ListItemForChatBoard;

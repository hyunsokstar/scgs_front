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
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface IProps {
  writer: any;
  comment: string;
  isUser: boolean;
  is_edit_mode: boolean;
  pk: number | string;
}

const ListItemForChatBoard = ({
  pk,
  writer,
  comment,
  isUser,
  is_edit_mode,
}: IProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [commentTextForUpdate, setCommentTextForUpdate] = useState(comment);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  
  return (
    <HStack justifyContent={isUser ? "flex-start" : "flex-end"} width="100%">
      {isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}

      <VStack
        p={3}
        borderRadius="lg"
        bg={isUser ? "yellow.50" : "blue.100"}
        alignSelf={isUser ? "flex-start" : "flex-end"}
        border="1px solid black"
        maxWidth="380px"
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
                <Box>
                  <Textarea
                    width={"320px"}
                    bg={"blue.100"}
                    defaultValue={comment}
                    onChange={(e) => setCommentTextForUpdate(e.target.value)}
                  />

                  <Box display={"flex"} justifyContent="flex-end" mt={0}>
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
                      //   onClick={() => EditModeHandler(pk)}
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
                    // onClick={() => EditModeHandler(pk)}
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
      </VStack>
      {!isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}
    </HStack>
  );
};

export default ListItemForChatBoard;

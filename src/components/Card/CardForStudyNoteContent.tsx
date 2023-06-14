import {
  Box,
  Button,
  CloseButton,
  Input,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  Text,
  useToast,
  IconButton,
  Flex,
  Spacer,
  InputGroup,
  InputRightElement,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFordeleteOneStudyNoteContent,
  apiForOrderMinusOneForNoteContent,
  apiForOrderPlusOneForNoteContent,
} from "../../apis/study_note_api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import IconButtonForCopyText from "../IconButtonForCopyText";
import { CheckIcon } from "@chakra-ui/icons";
import CheckboxComponentForList from "../CheckBox/CheckboxComponentForList";
import { useEffect, useState } from "react";
import ModalButtonForUpdateStudyNoteContent from "../Button/ModalButtonForUpdateStudyNoteContent";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const PastelColor = {
  bg: "#C7E5F0",
  hoverBg: "#A6D8E7",
};

// 1122
const CardForStudyNoteContent = ({
  pk,
  title,
  file_name,
  content,
  writer,
  index,
  order,
  card_width,
  setCheckedValues,
  is_authority_for_note,
}: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const mutationForDeleteStudyNoteContent = useMutation(
    (pk: number) => {
      return apiFordeleteOneStudyNoteContent(pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "delete study note content 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteStudyNoteContentByPk = (pk: number) => {
    // console.log("pk check for delete : ", pk);
    // console.log("writer.username : ", writer.username);
    // console.log("loginUser.username : ", loginUser.username);

    const writer_name = writer.username;
    const login_user_name = loginUser.username;

    if (writer_name === login_user_name) {
      mutationForDeleteStudyNoteContent.mutate(pk);
    } else {
      alert(`작성자인 ${writer_name} 님만 삭제 가능 !!`);
    }
  };

  const mutation_for_order_plus_1_for_note_content = useMutation(
    (order_pk: number) => {
      return apiForOrderPlusOneForNoteContent(order_pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        window.location.reload();

        // queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "order update 성공!",
          status: "success",
        });
      },
    }
  );

  const mutation_for_order_minus_1_for_note_content = useMutation(
    (order_pk: number) => {
      return apiForOrderMinusOneForNoteContent(order_pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        window.location.reload();

        // queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "order update 성공!",
          status: "success",
        });
      },
    }
  );

  const order_plus_1_for_note_content = (order_pk: number) => {
    console.log("hi");
    mutation_for_order_plus_1_for_note_content.mutate(order_pk);
  };

  const order_minus_1_for_note_content = (order_pk: number) => {
    console.log("hi");
    mutation_for_order_minus_1_for_note_content.mutate(order_pk);
  };

  // 2244
  return (
    <Box
      borderRadius="lg"
      p="4"
      border={"2px solid red"}
      mb={2}
      w={card_width}
      id={`card-${order}`}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor={"red.100"}
        px={2}
      >
        <CheckboxComponentForList
          value={pk}
          setCheckedValues={setCheckedValues}
          defaultChecked={false}
          size={"lg"}
          border={"green"}
          colorScheme={"green"}
          mr={1}
        />

        <Text>step ({order})</Text>
        <Flex gap={1} ml={2} my={1}>
          {order !== 1 ? (
            <IconButton
              aria-label="up"
              variant="outline"
              icon={<FaChevronUp />}
              border={"1px solid blue"}
              // colorScheme="gray"
              // bg={PastelColor.bg}
              _hover={{ bg: PastelColor.hoverBg }}
              size={"sm"}
              onClick={() => order_minus_1_for_note_content(pk)}
            />
          ) : (
            ""
          )}
          <IconButton
            aria-label="up"
            variant="outline"
            icon={<FaChevronDown />}
            border={"1px solid blue"}
            // colorScheme="gray"
            // bg={PastelColor.bg}
            _hover={{ bg: PastelColor.hoverBg }}
            size={"sm"}
            onClick={() => order_plus_1_for_note_content(pk)}
          />
        </Flex>
        <Text ml={2}>title: {title}</Text>
        <Spacer />
        {/* delete button for study note content */}

        {writer.username === loginUser.username ? (
          <CloseButton
            size="sm"
            colorScheme="teal"
            onClick={() => deleteStudyNoteContentByPk(pk)}
          />
        ) : (
          "no"
        )}
      </Box>
      <Box my="4">
        <Table variant="simple">
          <Tbody>
            {/* <Tr>
              <Td w={"3%"}>title:</Td>
              <Td>
                <Input defaultValue={title} />
              </Td>
            </Tr> */}
            <Tr>
              <Td w={"3%"}>file:</Td>
              <Td position={"relative"}>
                {/* <Input defaultValue={file_name} /> */}
                <InputGroup>
                  {/* <Input defaultValue={file_name} /> */}
                  <Text>{file_name}</Text>
                  <InputRightElement>
                    <Box position={"absolute"} right={-6} top={-7} zIndex={1}>
                      <IconButtonForCopyText text={file_name} />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Td>
            </Tr>
            <Tr>
              <Td colSpan={2} position={"relative"}>
                <Box position={"absolute"} right={0} top={0} zIndex={1}>
                  <IconButtonForCopyText text={content} />
                </Box>
                {/* <Textarea defaultValue={content} h="300px" /> */}
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="space-between">
        {/* <Button variant="outline" colorScheme="teal">
          Comment
        </Button> */}
        {is_authority_for_note ? (
          <ModalButtonForUpdateStudyNoteContent
            button_text={"update for note content"}
            pk={pk}
            title={title}
            file_name={file_name}
            content={content}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default CardForStudyNoteContent;

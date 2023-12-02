import {
  Box,
  CloseButton,
  Text,
  useToast,
  Input,
  Spacer,
  InputGroup,
  InputRightElement,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFordeleteOneStudyNoteContent,
} from "../../apis/study_note_api";
import IconButtonForCopyText from "../IconButtonForCopyText";
import CheckboxComponentForList from "../CheckBox/CheckboxComponentForList";
import ModalButtonForUpdateStudyNoteContent from "../Button/ModalButtonForUpdateStudyNoteContent";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import IconButtonForCopyFileName from "../IconButtonForCopyFileName";
import IconButtonForCopyCode from "../IconButtonForCopyCode";

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
  checkedValues,
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


  // 2244
  return (
    <Box
      borderRadius="lg"
      p="4"
      border={"5px solid black"}
      mb={2}
      w={card_width}
      id={`card-${order}`}
      height={"550px"}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // bgColor={"blue.200"}
        bgColor={title.includes("#refer") ? "yellow.200" : "blue.200"}
        px={2}
        py={2}
      >
        <CheckboxComponentForList
          value={pk}
          checkedValues={checkedValues}
          setCheckedValues={setCheckedValues}
          defaultChecked={false}
          size={"lg"}
          border={"green"}
          colorScheme={"green"}
          mr={1}
        />

        <Text>step ({order})</Text>

        <Text ml={2}>{title}</Text>
        <Spacer />

        {writer.username === loginUser.username ? (
          <CloseButton
            size="sm"
            colorScheme="teal"
            onClick={() => deleteStudyNoteContentByPk(pk)}
          />
        ) : (
          ""
        )}
      </Box>
      <Box my={2}>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <InputGroup>
            <Input value={file_name} isTruncated />
            <InputRightElement>
              <Flex alignItems="center">
                <IconButtonForCopyText text={file_name} />
                <IconButtonForCopyFileName filePath={file_name} />
                <IconButtonForCopyCode code={content} />
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box
          minHeight={"370px"}
          maxHeight={"370px"}
          overflowY={"scroll"}
          dangerouslySetInnerHTML={{ __html: content }}
        ></Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display={"flex"} gap={2} alignItems={"center"} ml={2}>
          <Box>
            <Avatar size="sm" src={writer.profile_image} />
          </Box>
          <Box>{writer.username}</Box>
        </Box>

        {is_authority_for_note ? (
          <ModalButtonForUpdateStudyNoteContent
            button_text={"update content"}
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

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
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFordeleteOneStudyNoteContent,
  apiForOrderMinusOneForNoteContent,
  apiForOrderPlusOneForNoteContent,
} from "../../apis/study_note_api";
import IconButtonForCopyText from "../IconButtonForCopyText";
import CheckboxComponentForList from "../CheckBox/CheckboxComponentForList";
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

        toast({
          title: "order update 성공!",
          status: "success",
        });
      },
    }
  );

  // 2244
  return (
    <Box
      borderRadius="lg"
      p="4"
      border={"2px solid black"}
      mb={2}
      w={card_width}
      id={`card-${order}`}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor={"blue.200"}
        px={2}
        py={2}
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
        <Box mb={2}>
          <InputGroup>
            <Input value={file_name} isTruncated />
            <InputRightElement>
              <Box zIndex={1}>
                <IconButtonForCopyText text={file_name} />
              </Box>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box
          maxHeight={"390px"}
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

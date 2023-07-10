import { useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Text,
  useToast,
  Spacer,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteOneStudyNoteContent } from "../../apis/study_note_api";
import IconButtonForCopyText from "../IconButtonForCopyText";
import CheckboxComponentForList from "../CheckBox/CheckboxComponentForList";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import PlayerForYouTube from "../Player/PlayerForYouTube";
import ModalButtonForUpdateStudyNoteSubtitle from "../Button/ModalButtonForUpdateStudyNoteSubtitle";

// 1122
const CardForNoteSubTitleForPage = ({
  pk,
  title,
  writer,
  ref_url1,
  ref_url2,
  content,
  order,
  card_width,
  setCheckedValues,
  is_authority_for_note,
  youtube_url,
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
        if (data.message) {
          toast({
            title: "delete study note content 성공!",
            status: "success",
          });
        } else {
        }
      },
    }
  );

  const deleteStudyNoteContentByPk = (pk: number) => {
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
      border={"2px solid black"}
      mb={2}
      w={card_width}
      id={`card-${order}`}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor={"red.300"}
        px={2}
        py={5}
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
        <Box>step ({order})</Box>
        <Box ml={2}>{title}</Box>
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
      <Box
        my="2"
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        // border={"0px solid green"}
      >
        <InputGroup size="md">
          <Input value={ref_url1} isTruncated />
          <InputRightElement>
            <IconButtonForCopyText text={ref_url1} />
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md">
          <Input value={ref_url2} isTruncated />
          <InputRightElement>
            <IconButtonForCopyText text={ref_url2} />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box border={"1px solid green"} width={"100%"}>
        {youtube_url ? (
          youtube_url !== "" ? (
            <Box>
              <PlayerForYouTube youtubeUrl={youtube_url} />
            </Box>
          ) : (
            "??"
          )
        ) : (
          ""
        )}
      </Box>
      <Box
        bg="yellow.50" // 배경색을 원하는 파스텔톤 색상으로 설정
        width="100%" // 넓이를 100%로 설정
        minHeight="100px" // 높이를 200px로 설정
        whiteSpace="pre-wrap" // 줄바꿈을 위해 pre-wrap 값을 설정합니다
        p={2}
      >
        {content && <Text fontFamily="elegantFont">{content}</Text>}
      </Box>{" "}
      <Box display={"flex"} justifyContent={"flex-end"} p={2}>
        <Box>
          {is_authority_for_note ? (
            <ModalButtonForUpdateStudyNoteSubtitle
              modal_title={"update subtitle"}
              button_text={"update subtitle"}
              pk={pk}
              title={title}
              ref_url1={ref_url1}
              ref_url2={ref_url2}
              content={content}
              youtube_url={youtube_url}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardForNoteSubTitleForPage;

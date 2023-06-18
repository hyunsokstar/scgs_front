import {
  Box,
  CloseButton,
  Table,
  Tbody,
  Td,
  Tr,
  Text,
  useToast,
  Spacer,
  InputGroup,
  InputRightElement,
  Avatar,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteOneStudyNoteContent } from "../../apis/study_note_api";
import IconButtonForCopyText from "../IconButtonForCopyText";
import CheckboxComponentForList from "../CheckBox/CheckboxComponentForList";
import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import PlayerForYouTube from "../Player/PlayerForYouTube";

// 1122
const CardForStudyNoteContent = ({
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
      <Box my="4">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td w={"3%"}>ref_url1:</Td>
              <Td position={"relative"}>
                <InputGroup>
                  <Text>{ref_url1}</Text>
                  <InputRightElement>
                    <Box position={"absolute"} right={-3} top={-2} zIndex={1}>
                      <IconButtonForCopyText text={ref_url1} />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Td>
              <Td w={"3%"}>ref_url2:</Td>
              <Td position={"relative"}>
                <InputGroup>
                  <Text>{ref_url2}</Text>
                  <InputRightElement>
                    <Box position={"absolute"} right={-3} top={-2} zIndex={1}>
                      <IconButtonForCopyText text={ref_url2} />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display={"flex"} gap={2} alignItems={"center"} ml={2}>
          <Box>
            <Avatar size="sm" src={writer.profile_image} />
          </Box>
          <Box>{writer.username}</Box>
        </Box>
        <Box>
          {youtube_url !== "" ? (
            <Box>
              <PlayerForYouTube youtubeUrl={youtube_url} />
            </Box>
          ) : (
            "??"
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardForStudyNoteContent;

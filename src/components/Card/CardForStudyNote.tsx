import {
  Box,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { type_for_study_note_list_row } from "../../types/study_note_type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteOneStudyNote } from "../../apis/study_note_api";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { log } from "console";

const CardForStudyNote: React.FC<type_for_study_note_list_row> = ({
  pk,
  title,
  description,
  writer,
}) => {
  const cardBgColor = useColorModeValue("gray.100", "gray.700");
  const headerBgColor = useColorModeValue("gray.200", "gray.600");
  const bodyBgColor = useColorModeValue("gray.100", "gray.700");
  const footerBgColor = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const mutationForDeleteStudyNote = useMutation(
    (pk: number) => {
      return apiFordeleteOneStudyNote(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        // refetch_for_api_docu();
        queryClient.refetchQueries(["getStudyNoteList"]);

        toast({
          title: "delete api docu 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteStudyNoteButtonHandler = (pk: any, wirter: any) => {
    console.log("wirter : ", wirter);
    console.log("loginUser.username : ", loginUser.username);

    const login_user_name = loginUser.username;
    const writer_name = writer.username;

    if (login_user_name === writer_name) {
      alert("삭제 gogo");
      mutationForDeleteStudyNote.mutate(pk);
    } else {
      alert(`작성자인 ${writer_name}님만 삭제 가능 합니다 !`);
    }
  };

  const goToStudyNoteDetail = (pk: any) => {
    navigate(`/study-note/${pk}`);
  };

  return (
    <Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="410px"
        height="300px"
        margin="10px"
        bg={cardBgColor}
        boxShadow="md"
        transition="box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out"
        _hover={{
          borderColor: borderColor,
          boxShadow: "xl",
          transform: "translateY(-4px)",
        }}
        position={"relative"}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          bg={headerBgColor}
          px="2"
          py="1"
        >
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          {writer.username === loginUser.username ? (
            <IconButton
              aria-label="Close"
              icon={
                <CloseIcon
                  onClick={() => deleteStudyNoteButtonHandler(pk, writer)}
                />
              }
              variant="outline"
              size="sm"
              colorScheme="pink"
            />
          ) : (
            ""
          )}
        </Box>
        <Box
          p="2"
          bg={bodyBgColor}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
          border={"0px solid green"}
          _hover={{ bg: "blue.100" }}
          onClick={() => goToStudyNoteDetail(pk)}
        >
          <Text fontSize="sm">{description}</Text>

          <Text fontSize="sm" textAlign="right">
            {writer ? writer.username : "no user"}
          </Text>
        </Box>
        <Box
          position={"absolute"}
          p="2"
          bg={footerBgColor}
          bottom={0}
          w={"100%"}
        >
          <Text fontSize="sm" textAlign="right">
            {writer ? writer.username : "no user"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CardForStudyNote;

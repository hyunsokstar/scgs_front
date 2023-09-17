import React, { useState } from "react";

import {
  Avatar,
  Checkbox,
  Center,
  Flex,
  IconButton,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";
import ModalForChallengeDetail from "../modal/ModalForChallengeDetail";

interface ITypeForPropsForSuggestionList {
  challengeList: ITypeForChallengeRow[];
}

const ListForChallege: React.FC<ITypeForPropsForSuggestionList> = ({
  challengeList,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChange] =
    useState<ITypeForChallengeRow>();

  const handleTitleClick = (challenge: ITypeForChallengeRow) => {
    if (challenge) {
      // 선택된 제안이 존재하는 경우에만 모달을 열도록 합니다.
      setSelectedChange(challenge);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const mutationForDeleteCommentForSuggestion = useMutation(
  //   (suggestionPk: string | number) => {
  //     return apiForDeleteSuggestionForBoard(suggestionPk);
  //   },
  //   {
  //     onSettled: () => {
  //       // setSelectedItems([]);
  //     },
  //     onSuccess: (data) => {
  //       console.log("data : ", data);

  //       queryClient.refetchQueries(["apiForGetSuggestionListForBoard"]);

  //       toast({
  //         // title: "delete comment 성공!",
  //         status: "success",
  //         description: data.message,
  //         duration: 1800,
  //         isClosable: true,
  //       });
  //     },
  //   }
  // );

  // const handleDelete = (suggestionPk: number) => {
  //   mutationForDeleteCommentForSuggestion.mutate(suggestionPk);
  // };

  return (
    <VStack spacing={2} align="stretch">
      {challengeList ? (
        challengeList.map((challenge: any) => (
          <Flex
            key={challenge.id}
            borderWidth="1px"
            borderRadius="lg"
            p={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox size="sm" mr={2} />
            <Avatar
              name={
                challenge.writer?.username ? challenge.writer.username : "u"
              }
              src={challenge.writer.profile_image}
              size="sm"
            />
            <Text
              flex="1"
              pr={2}
              fontWeight="bold"
              color="teal.500"
              textAlign="center"
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => handleTitleClick(challenge)}
            >
              {challenge.title}
            </Text>
            <Spacer />
            <Text fontSize="sm" ml={2}>
              {challenge.created_at_formatted}
            </Text>
            {/* <ModalButtonForUpdatechallengeForBoard
                modal_title={"update challenge"}
                modal_size={"5xl"}
                button_text={"update challenge"}
                button_size={"md"}
                pk={challenge.id}
                title={challenge.title}
                content={challenge.content}
              />{" "} */}
            <IconButton
              aria-label={"삭제"}
              icon={<DeleteIcon />}
              size={"md"}
              _hover={{ bgColor: "red.100" }}
              variant="ghost"
              // onClick={() => handleDelete(challenge.id)}
            />{" "}
          </Flex>
        ))
      ) : (
        <Center h="50vh">
          <Text fontSize="xl" fontWeight="bold" color="gray.500">
            No challenges available
          </Text>
        </Center>
      )}

      {selectedChallenge ? (
        <ModalForChallengeDetail
          challengeId={selectedChallenge.id}
          selectedChallenge={selectedChallenge}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      ) : (
        ""
      )}
    </VStack>
  );
};

export default ListForChallege;

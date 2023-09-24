import React, { useState } from "react";

import { Center, Text, VStack, useToast, Grid, Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";
import ModalForChallengeDetail from "../modal/ModalForChallengeDetail";
import useUser from "../../lib/useUser";
import CardForChallengeList from "../Card/CardForChallengeList";

interface ITypeForPropsForSuggestionList {
  challengeList: ITypeForChallengeRow[];
}

const ListForChallege: React.FC<ITypeForPropsForSuggestionList> = ({
  challengeList,
}) => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChange] =
    useState<ITypeForChallengeRow>();
  const { userLoading, user: loginUser, isLoggedIn } = useUser();

  const handleTitleClick = (challenge: ITypeForChallengeRow) => {
    if (challenge && isLoggedIn) {
      // 선택된 제안이 존재하는 경우에만 모달을 열도록 합니다.
      setSelectedChange(challenge);
      setIsModalOpen(true);
    } else {
      toast({
        title: "warning ",
        status: "warning",
        description: "로그인 해야 설문에 참여 할수 있습니다.",
        duration: 1800,
        isClosable: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <VStack spacing={2} align="stretch">
      {challengeList ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {challengeList.map((challenge) => (
            <Box key={challenge.id} height={"500px"}>
              <CardForChallengeList
                key={challenge.id}
                challengeId = {challenge.id}
                username = {challenge.writer?.username}
                title={challenge.title}
                subtitle={challenge.subtitle}
                description={challenge.description}
                mainImage={challenge.main_image}
                evaluationCriterials={challenge.evaluation_criterials}
                createdAtFormatted={challenge.created_at_formatted}
                started_at={challenge.started_at}
                deadline={challenge.deadline}
                clickEvent={() => handleTitleClick(challenge)}
              />
            </Box>
          ))}
        </Grid>
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

import React from "react";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  Divider,
  Spinner, // 추가: Spinner 컴포넌트를 import
} from "@chakra-ui/react";
import ImageBoxForChallengeDetail from "../ImageBox/ImageBoxForChallengeDetail";
import {
  ITypeForChallengeDetail,
  ITypeForChallengeRow,
} from "../../types/type_for_challenge";
import ContentForChallenge from "../Content/ContentForChallenge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForGetDetailForChallenge } from "../../apis/challenge_api";
import TableForEvalutationResultListForChallenge from "../Table/TableForEvalutationResultListForChallenge";
import ButtonForRegisterChallenge from "../Button/ButtonForRegisterChallenge";

interface IPropTypes {
  selectedChallenge: ITypeForChallengeRow;
  isOpen: boolean;
  onClose: () => void;
  challengeId: number | string;
}

const ModalForChallengeDetail: React.FC<any> = ({
  selectedChallenge,
  challengeId,
  isOpen,
  onClose,
}: IPropTypes) => {
  const {
    isLoading: isLoadingForGetChallengeDetail,
    data: dataForChallengeDetail,
    refetch: refetchForGetChallengeDetail,
  } = useQuery<ITypeForChallengeDetail>(
    ["apiForGetDetailForChallenge", challengeId],
    apiForGetDetailForChallenge,
    {
      enabled: true,
    }
  );

  console.log("dataForChallengeDetail : ", dataForChallengeDetail);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent height={"100%"}>
        <ModalHeader>challengeDetail3 id: {challengeId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody border={"5px solid blue"} height={"100%"}>
          {isLoadingForGetChallengeDetail ? ( // 로딩 중일 때
            <Center height="40%">
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  Challenge detail data is loading
                </Text>
                <Spinner size="xl" color="blue.500" />
              </Box>
            </Center>
          ) : (
            // 로딩 중이 아닐 때
            <Flex width="100%" height="40%" gap={2}>
              <Box
                w="30%"
                height="100%"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                border="2px dashed blue"
              >
                <ImageBoxForChallengeDetail
                  selectedChallenge={dataForChallengeDetail}
                />
              </Box>

              {/* <Divider orientation="vertical" borderColor="gray.300" /> */}
              <Box
                w="70%"
                height="100%"
                p={2}
                // margin={2}
                textAlign="center" // 텍스트 가운데 정렬
                border="2px dashed blue"
              >
                <ContentForChallenge
                  selectedChallenge={dataForChallengeDetail}
                />
              </Box>
            </Flex>
          )}
          <Divider orientation="horizontal" borderColor="gray.300" />
          <Flex width="100%" height="60%" gap={2}>
            {/* <Box
              w="30%"
              height="100%"
              p={2}
              // margin={2}
              textAlign="center" // 텍스트 가운데 정렬
              border="2px dashed blue"
            >
              챌린지 메타 정보(기간, 상품, ranking )
            </Box> */}
            <Box
              w="100%"
              height="100%"
              p={2}
              // margin={2}
              textAlign="center" // 텍스트 가운데 정렬
              border="2px dashed blue"
            >
              <Box display={"flex"} justifyContent={"flex-end"} my2={2}>
                <ButtonForRegisterChallenge
                  challengeId={dataForChallengeDetail?.id}
                />
              </Box>

              {/* dataForChallengeDetail 를 테이블로 출력 헤더에 얼굴 몸매 무대 퍼포먼스 칼럼에 각각의 정보에 맞게 */}
              {dataForChallengeDetail?.evaluation_results ? (
                <TableForEvalutationResultListForChallenge
                  evaluationResults={dataForChallengeDetail.evaluation_results}
                />
              ) : (
                "no data for 평가 결과"
              )}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForChallengeDetail;

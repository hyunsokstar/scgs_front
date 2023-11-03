import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  VStack,
  HStack,
  Avatar,
  Spacer,
  List,
  ListItem,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  apiForCreateSurveyOptionForSurvey,
  apiForGetDetailForSurvey,
} from "../../apis/survey_api";
import useUser from "../../lib/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISurveyDetail } from "../../types/type_for_survey";
import InputFormForCreateSurveyOption from "../InputForm/InputFormForCreateSurvey";
import ListForSurveyOption from "../List/ListForSurveyOption";
import HorizontalBarForSurveyAnswerStatics from "../BarGraph/HorizontalBarForSurveyAnswerStatics";

interface ModalForSurveyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSurveyId: number | null;
}

// ...

const ModalForSurveyDetail: React.FC<ModalForSurveyDetailProps> = ({
  isOpen,
  onClose,
  selectedSurveyId,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { userLoading, user: loginUser, isLoggedIn } = useUser();
  const [newOption, setNewOption] = useState("");

  const { isLoading: isLoadingForSurveyDetail, data: dataForForSurveyDetail } =
    useQuery<ISurveyDetail>(
      ["apiForGetDetailForSurvey", selectedSurveyId],
      apiForGetDetailForSurvey,
      {
        enabled: true,
      }
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Survey Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedSurveyId !== null && dataForForSurveyDetail && (
            <Box>
              <VStack alignItems="flex-start" spacing={4}>
                <HStack spacing={4}>
                  <Avatar
                    size="lg"
                    name={
                      dataForForSurveyDetail?.writer?.username
                        ? dataForForSurveyDetail?.writer?.username
                        : "u"
                    }
                    src={dataForForSurveyDetail?.writer?.profile_image}
                  />
                  <Text fontSize="xl" fontWeight="bold">
                    {dataForForSurveyDetail.title}
                  </Text>
                  <Spacer />
                  <Text fontSize="sm" color="gray.500">
                    Created at:{" "}
                    {new Date(
                      dataForForSurveyDetail.created_at
                    ).toLocaleDateString()}
                  </Text>
                  <Spacer />
                </HStack>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  border={"1px dotted gray"}
                  gap={3}
                >
                  <Box width={"35%"}>
                    <InputFormForCreateSurveyOption
                      dataForForSurveyDetail={dataForForSurveyDetail}
                      selectedSurveyId={selectedSurveyId}
                      loginUserName={loginUser?.username}
                      writerUserName={
                        dataForForSurveyDetail?.writer?.username
                          ? dataForForSurveyDetail?.writer?.username
                          : "u"
                      }
                    />

                    <ListForSurveyOption
                      dataForForSurveyDetail={dataForForSurveyDetail}
                      surveyId={selectedSurveyId}
                    />
                  </Box>

                  {/* 결과 보기 by 그래프 */}
                  <Box width={"65%"}>
                    <VStack alignItems="flex-start" spacing={2}>
                      <Text fontSize="lg" fontWeight="bold">
                        답변 통계
                      </Text>
                      <HorizontalBarForSurveyAnswerStatics
                        count_for_options={
                          dataForForSurveyDetail?.count_for_options
                        }
                      />
                    </VStack>
                  </Box>
                </Box>
              </VStack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForSurveyDetail;

import React from "react";
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
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ISurvey, ISurveyOption } from "../../types/type_for_survey";
import { apiForGetDetailForSurvey } from "../../apis/survey_api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ModalForSurveyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSurveyId: number | null;
}

const ModalForSurveyDetail: React.FC<ModalForSurveyDetailProps> = ({
  isOpen,
  onClose,
  selectedSurveyId,
}) => {
  const { isLoading: isLoadingForSurveyDetail, data: dataForForSurveyDetail } =
    useQuery<ISurvey>(
      ["apiForGetDetailForSurvey", selectedSurveyId],
      apiForGetDetailForSurvey,
      {
        enabled: true,
      }
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Survey Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Render the details of the selected survey */}
          {selectedSurveyId !== null && dataForForSurveyDetail && (
            <Box>
              <VStack alignItems="flex-start" spacing={4}>
                {/* Writer Avatar and Title */}
                <HStack spacing={4}>
                  <Avatar
                    size="lg"
                    name={dataForForSurveyDetail?.writer?.username}
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
                </HStack>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  border={"1px dotted gray"}
                >
                  {/* Survey Options */}
                  <Box width={"50%"}>
                    <List spacing={2}>
                      {dataForForSurveyDetail.survey_options.map(
                        (option: ISurveyOption, index: number) => (
                          <ListItem key={option.id}>
                            <HStack justifyContent={"space-between"} p={1}>
                              <Box
                                fontSize="sm"
                                color="gray.500"
                                marginRight="1"
                              >
                                {index + 1}
                              </Box>
                              <Box>{option.content}</Box>
                              <Spacer />
                              <Button
                                size="sm"
                                variant={"outlined"}
                                border={"1px solid black"}
                              >
                                선택
                              </Button>
                            </HStack>
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>

                  {/* 결과 보기 by 그래프 */}
                  <Box width={"50%"}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          {
                            name: "1번",
                            count: dataForForSurveyDetail.count_for_1th_option,
                          },
                          {
                            name: "2번",
                            count: dataForForSurveyDetail.count_for_2th_option,
                          },
                          {
                            name: "3번",
                            count: dataForForSurveyDetail.count_for_3th_option,
                          },
                          {
                            name: "4번",
                            count: dataForForSurveyDetail.count_for_4th_option,
                          },
                          {
                            name: "5번",
                            count: dataForForSurveyDetail.count_for_5th_option,
                          },
                        ]}
                        layout="vertical" // 이 부분을 추가하여 그래프 방향을 세로로 변경
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" /> {/* X 축을 숫자 형태로 변경 */}
                        <YAxis dataKey="name" type="category" />{" "}
                        {/* Y 축을 카테고리 형태로 변경 */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
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

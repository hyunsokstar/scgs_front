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
import useUser from "../../lib/useUser";

interface ModalForSurveyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSurveyId: number | null;
}

// 1122
const ModalForSurveyDetail: React.FC<ModalForSurveyDetailProps> = ({
  isOpen,
  onClose,
  selectedSurveyId,
}) => {
  const toast = useToast();

  const { userLoading, user, isLoggedIn } = useUser();
  const [newOption, setNewOption] = useState("");

  const { isLoading: isLoadingForSurveyDetail, data: dataForForSurveyDetail } =
    useQuery<ISurvey>(
      ["apiForGetDetailForSurvey", selectedSurveyId],
      apiForGetDetailForSurvey,
      {
        enabled: true,
      }
    );

  // 보기 추가 버튼 클릭 핸들러 함수
  const handleAddView = () => {
    console.log("새로운 옵션:", newOption);

    if (newOption.length === 0) {
      // 글자수가 0이면 Toast 메시지 표시
      toast({
        title: "추가할 보기를 입력해주세요",
        status: "error",
        duration: 3000, // 메시지 자동 닫힘 시간 (3초)
        isClosable: true,
        position: "top", // 화면 상단에 표시
      });
      return;
    }

    if (dataForForSurveyDetail?.survey_options.length >= 5) {
      alert("보기를 5개 이상 입력 할수 없습니다");
      return;
    }
    // newOption 초기화
    setNewOption("");
  };

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
                  <Spacer />
                </HStack>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  border={"1px dotted gray"}
                >
                  {/* Survey Options */}
                  <Box width={"50%"}>
                    <Box>
                      <InputGroup my={1}>
                        <Input
                          placeholder="addone"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddView();
                            }
                          }}
                        />

                        <InputRightElement width="auto">
                          {user?.username ===
                          dataForForSurveyDetail?.writer?.username ? (
                            <Button
                              colorScheme="teal"
                              size="sm"
                              _hover={{ bg: "teal.500" }}
                              m={1}
                              onClick={handleAddView}
                            >
                              보기 추가
                            </Button>
                          ) : (
                            <Box>""</Box>
                          )}
                        </InputRightElement>
                      </InputGroup>
                    </Box>

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

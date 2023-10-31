import React from "react";
import {
  Avatar,
  Box,
  Button,
  Image,
  Text,
  Stack,
  Badge,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import useUser from "../../lib/useUser";
import { DeleteIcon } from "@chakra-ui/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteChallengeByPk } from "../../apis/challenge_api";
import ModalButtonForUpdateChallenge from "../modal/ModalButtonForUpdateChallenge";

interface EvaluationCriterion {
  id: number;
  item_description: string;
}

interface CardProps {
  challengeId: string | number;
  title: string;
  subtitle: string;
  description: string;
  mainImage: string | null;
  evaluationCriterials: EvaluationCriterion[];
  createdAtFormatted: string;
  clickEvent: any;
  started_at: string;
  deadline: string;
  username: string;
  profile_image: string;
  count_for_challenge_results: number;
}

// 이미지 컨테이너 스타일
const imageContainerStyle = {
  position: "relative",
  overflow: "hidden",
  height: "50%",
  borderRadius: "5px",
};

// 이미지 스타일
const imageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  objectFit: "fill",
  border: "2px solid black",
};

function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// D-day를 계산하는 함수
function calculateDday(deadline: string): string {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  // 날짜 차이 계산
  const timeDifference = deadlineDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // D-day 반환
  return daysDifference > 0 ? `D-${daysDifference}` : "마감";
}

const CardForChallengeList: React.FC<CardProps> = ({
  challengeId,
  title,
  subtitle,
  description,
  mainImage,
  evaluationCriterials,
  clickEvent,
  started_at,
  deadline,
  username,
  profile_image,
  count_for_challenge_results
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { userLoading, user: loginUser, isLoggedIn } = useUser();

  const formattedStartedAt = formatDateString(started_at);
  const formattedDeadline = formatDateString(deadline);
  const dday = calculateDday(deadline); // D-day 계산 추가

  const mutationForDeleteChallenge = useMutation(
    (challengeId: string | number) => {
      return apiForDeleteChallengeByPk(challengeId);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetChallengeList"]);

        toast({
          title: "Delete Challenge success!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteChallengeHandler = (challengeId: string | number) => {
    mutationForDeleteChallenge.mutate(challengeId);
  };

  return (
    <Box
      height="100%" // 전체 Box 크기 350px로 설정
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={0.5}
      position="relative"
      border={"2px solid green"}
    >
      {/* 이미지 컨테이너 */}
      <Box style={imageContainerStyle}>
        {mainImage ? (
          <Image src={mainImage} alt={title} style={imageStyle} />
        ) : (
          <Image
            src={
              "https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"
            }
            alt={title}
            style={imageStyle}
          />
        )}
      </Box>

      {/* 텍스트 내용 컨테이너 */}
      <Box mt="2" height="60%">
        <Box display={"flex"} gap={2}>
          <Avatar size="md" name={username} src={profile_image || ""} />
          <Text fontSize={"xl"}>{title}</Text>
          <Spacer />
          <Button
            onClick={clickEvent}
            variant={"outline"}
            border={"1px solid black"}
            size={"sm"}
          >
            detail
          </Button>

          {loginUser?.username === username ? (
            <>
              <IconButton
                icon={<DeleteIcon />}
                variant={"outline"}
                size={"sm"}
                onClick={() => deleteChallengeHandler(challengeId)}
                aria-label={""}
              />

              <ModalButtonForUpdateChallenge
                challengeId={challengeId}
                title={title}
                subtitle={subtitle}
                description={description}
                started_at={started_at}
                deadline={deadline}
              />
            </>
          ) : (
            ""
          )}
        </Box>
        <Box display={"flex"} gap={2}>
          <Text color="gray.500">
            기간: {formattedStartedAt} ~ {formattedDeadline}
          </Text>
          <Spacer />
          <Text>Dday: {dday}</Text>
        </Box>
        <Box height={"45%"} border={"1px solid lightgray"}>
          {evaluationCriterials && evaluationCriterials.length > 0 && (
            <Stack mt={0} spacing={0} overflowY={"scroll"} height={"100%"} gap={1} p={1}>
              {evaluationCriterials.map((criterion, index) => (
                <Box display={"flex"} gap={2}>
                  <Button variant={"outline"} size={"xs"}>
                    {index + 1}
                  </Button>
                  <Badge key={criterion.id} colorScheme="teal">
                    {criterion.item_description}
                  </Badge>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} m={2}>
          <Text>참가자수: {count_for_challenge_results}명</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CardForChallengeList;

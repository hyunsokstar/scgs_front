import React from "react";
import {
  Box,
  Button,
  Image,
  Text,
  Stack,
  Badge,
  Spacer,
} from "@chakra-ui/react";

interface EvaluationCriterion {
  id: number;
  item_description: string;
}

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string | null;
  evaluationCriterials: EvaluationCriterion[];
  createdAtFormatted: string;
  clickEvent: any;
  started_at: string;
  deadline: string;
}

// 이미지 컨테이너 스타일
const imageContainerStyle = {
  position: "relative",
  overflow: "hidden",
  height: "50%", // 이미지 컨테이너 높이 40%
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
  return `${day}-${month}-${year}`;
}

const CardForChallengeList: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  mainImage,
  evaluationCriterials,
  createdAtFormatted,
  clickEvent,
  started_at,
  deadline,
}) => {
  const formattedStartedAt = formatDateString(started_at);
  const formattedDeadline = formatDateString(deadline);

  return (
    <Box
      height="100%" // 전체 Box 크기 350px로 설정
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      position="relative"
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
          <Text fontSize={"3xl"}>{title}</Text>
          <Spacer />
          <Button
            onClick={clickEvent}
            variant={"outline"}
            border={"1px solid black"}
            size={"sm"}
          >
            detail
          </Button>
        </Box>
        <Text color="gray.500">{subtitle}</Text>
        <Text color="gray.500">시작: {formattedStartedAt}</Text>
        <Text color="gray.500">마감: {formattedDeadline}</Text>
        <Box>
          {evaluationCriterials.length > 0 && (
            <Stack mt={2} spacing={0} overflowY={"scroll"} height={"100px"}>
              {evaluationCriterials.map((criterion, index) => (
                <Box>
                  {index + 1}
                  <Badge key={criterion.id} colorScheme="teal">
                    {criterion.item_description}
                  </Badge>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} m={2}>
          {/* <Button onClick={clickEvent}>입장</Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CardForChallengeList;

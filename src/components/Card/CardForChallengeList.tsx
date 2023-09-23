import React from "react";
import { Box, Button, Image, Text, Stack, Badge } from "@chakra-ui/react";

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
};

const CardForChallengeList: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  mainImage,
  evaluationCriterials,
  createdAtFormatted,
  clickEvent,
}) => {
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
        {mainImage && <Image src={mainImage} alt={title} style={imageStyle} />}
      </Box>

      {/* 텍스트 내용 컨테이너 */}
      <Box mt="2" height="60%">
        {" "}
        {/* 텍스트 내용 컨테이너 높이 60% */}
        <Box fontWeight="semibold" as="h4" lineHeight="tight">
          {title}
        </Box>
        <Text color="gray.500">{subtitle}</Text>
        <Text>{description}</Text>
        <Text color="gray.500">작성일: {createdAtFormatted}</Text>
        <Box>
          {evaluationCriterials.length > 0 && (
            <Stack mt={2} spacing={2}>
              {evaluationCriterials.map((criterion) => (
                <Badge key={criterion.id} colorScheme="teal">
                  {criterion.item_description}
                </Badge>
              ))}
            </Stack>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} m={2}>
          <Button onClick={clickEvent}>입장</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardForChallengeList;

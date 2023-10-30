import { Grid, Box, Text, Button, IconButton } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { FaHeart, FaBookmark } from "react-icons/fa";

// 가상 로드맵 데이터 생성
const generateFakeRoadmapData = (count) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.words();
    const spec = faker.lorem.sentence();
    const image = faker.internet.avatar(); // 가상 이미지 URL 생성

    // 가상 좋아요 숫자와 즐겨찾기 숫자
    const likes = faker.datatype.number(100);
    const bookmarks = faker.datatype.number(50);

    data.push({ title, spec, image, likes, bookmarks });
  }

  return data;
};

const roadmapData = generateFakeRoadmapData(8); // 8개의 가상 데이터 생성

const CardListForRoadMap = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {roadmapData.map((data, index) => (
        <Box
          key={index}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
        >
          <img
            src={data.image}
            alt={data.title}
            style={{ height: "40%", width: "100%", objectFit: "cover" }}
          />
          <Box p="4">
            <Text fontWeight="semibold" fontSize="lg">
              {data.title}
            </Text>
            <Text color="gray.600">{data.spec}</Text>
          </Box>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p="4"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
          >
            <Box display="flex">
              <IconButton
                icon={<FaHeart />}
                variant="outline"
                colorScheme="blue"
                aria-label="like"
                size="sm"
                mr={2}
              />
              <Text fontSize="sm">{data.likes}</Text>
              <IconButton
                icon={<FaBookmark />}
                variant="outline"
                colorScheme="blue"
                aria-label="bookmark"
                size="sm"
                ml={4}
                mr={2}
              />
              <Text fontSize="sm">{data.bookmarks}</Text>
            </Box>
            <Box display={"flex"} gap={2}>
              <Button variant="outline" colorScheme="blue" flex={1}>
                Register
              </Button>
              <Button variant="outline" colorScheme="blue" flex={1}>
                Enter
              </Button>
            </Box>
          </Box>
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
            opacity="0"
            transition="opacity 0.3s"
            _hover={{ opacity: 0.5, bg: "black" }}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default CardListForRoadMap;

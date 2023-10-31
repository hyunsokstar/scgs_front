import {
  Grid,
  Box,
  Text,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { DataTypeForRoadMapList } from "../../types/study_note_type";
import PaginationComponent from "../PaginationComponent";
import useUser from "../../lib/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteRoadMap } from "../../apis/study_note_api";

// 가상 로드맵 데이터 생성
// const generateFakeRoadmapData = (count: number) => {
//   const data = [];

//   for (let i = 0; i < count; i++) {
//     const title = faker.lorem.words();
//     const spec = faker.lorem.sentence();
//     const image = faker.internet.avatar(); // 가상 이미지 URL 생성

//     // 가상 좋아요 숫자와 즐겨찾기 숫자
//     const likes = faker.datatype.number(100);
//     const bookmarks = faker.datatype.number(50);

//     data.push({ title, spec, image, likes, bookmarks });
//   }

//   return data;
// };

// const roadmapData = generateFakeRoadmapData(8); // 8개의 가상 데이터 생성

interface IProps {
  dataForRoadMap: DataTypeForRoadMapList;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const CardListForRoadMap = ({
  dataForRoadMap,
  pageNum,
  setPageNum,
}: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { userLoading, user: loginUser, isLoggedIn } = useUser();

  // mutationForDeleteRoadMap
  const mutationForDeleteRoadMap = useMutation(
    (roadMapId: string | number) => {
      return apiForDeleteRoadMap(roadMapId);
    },
    {
      onSettled: () => {
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetRoloadMapList"]);

        toast({
          // title: "delete comment 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  // console.log("loginUser.username : ", loginUser.username);
  const deleteHandlerForRoadMap = (roadMapId: number) => {
    console.log("id to delete : ", roadMapId);
    mutationForDeleteRoadMap.mutate(roadMapId);
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {dataForRoadMap.listForRoadMap.map((data, index) => (
          <Box
            key={index}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
          >
            {isLoggedIn &&
            loginUser &&
            data.writer &&
            data.writer.username === loginUser.username ? (
              <Button
                variant={"outline"}
                position={"absolute"}
                top={1}
                right={1}
                border={"1px solid blue"}
                zIndex={1}
                size={"sm"}
                onClick={() => deleteHandlerForRoadMap(data.id)}
              >
                X
              </Button>
            ) : (
              ""
            )}

            <img
              src={
                "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
              }
              alt={data.title}
              style={{ height: "40%", width: "100%", objectFit: "cover" }}
            />
            <Box p="4">
              <Text fontWeight="semibold" fontSize="lg">
                {data.title}
              </Text>
              <Text color="gray.600">{data.sub_title}</Text>
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
              flexWrap="wrap" // flex-wrap 추가
              gap={2}
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
                <Text fontSize="sm">2</Text>
                <IconButton
                  icon={<FaBookmark />}
                  variant="outline"
                  colorScheme="blue"
                  aria-label="bookmark"
                  size="sm"
                  ml={4}
                  mr={2}
                />
                <Text fontSize="sm">1</Text>
              </Box>
              <Box display={"flex"} gap={2}>
                <Button variant="outline" colorScheme="blue" flex={1}>
                  Register()
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
            />
          </Box>
        ))}
      </Grid>
      {dataForRoadMap.listForRoadMap ? (
        <Box maxW="100%" bg="blue.100" color="red.500" mt={2}>
          <PaginationComponent
            total_page_num={dataForRoadMap.totalCount}
            task_number_for_one_page={dataForRoadMap.perPage}
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default CardListForRoadMap;

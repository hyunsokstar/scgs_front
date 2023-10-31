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
import ModalButtonForRegisterRoadMap from "../../routes/ModalButtonForRegisterRoadMap";

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
      onSettled: () => {},
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
      <Grid templateColumns="repeat(4, 1fr)" gap={4} height={"60%"}>
        {dataForRoadMap.listForRoadMap.map((data, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            // height={"50%"}
            border={"5px solid green"}
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
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="white"
              flexWrap="wrap" // flex-wrap 추가
              gap={2}
              position={"absolute"}
              border={"2px solid red"}
              bottom={0}
              width={"100%"}
              p={2}
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
                <ModalButtonForRegisterRoadMap button_text={"register"} />

                <Button
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => {
                    console.log("button click !");
                  }}
                >
                  Enter
                </Button>
              </Box>
            </Box>
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

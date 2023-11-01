import React from "react";
import useUser from "../../lib/useUser";
import { Box, Button, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart, FaBookmark } from "react-icons/fa";
import ModalButtonForRegisterRoadMap from "../../routes/ModalButtonForRegisterRoadMap";
import ModalButtonForRoadMapDetail from "../modal/ModalButtonForRoadMapDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteRoadMap } from "../../apis/study_note_api";
import { RowTypeForRoadmapList } from "../../types/study_note_type";

interface IProps {
  listForRoadMap: RowTypeForRoadmapList[];
}

const CardForRoadMapList = ({ listForRoadMap }: IProps) => {
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
      {listForRoadMap.map((data, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
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

              <ModalButtonForRoadMapDetail
                roadMapId={data.id}
                button_text={"RoadMap Detail"}
                roadMapTitle={data.title}
                roadMapSubTitle={data.sub_title}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default CardForRoadMapList;

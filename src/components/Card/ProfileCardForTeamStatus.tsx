import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Grid,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { GrTask, GrKeyboard } from "react-icons/gr";
import { FcPlanner } from "react-icons/fc";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  id: number;
  profile_image: string;
  username: string;
  position: string | null;
  status: string;
  total_count_for_task: number;
  count_for_uncompleted_task: number;
  count_for_completed_task: number;
  total_count_for_task_for_today: number;
  count_for_uncompleted_task_for_today: number;
  count_for_completed_task_for_today: number;
  total_rewards: number;
  currentTask: string;
}

export const ProfileCardForTeamStatus: React.FC<any> = ({
  id,
  profile_image,
  username,
  position,
  status,
  total_count_for_task,
  count_for_uncompleted_task,
  count_for_completed_task,
  total_count_for_task_for_today,
  count_for_uncompleted_task_for_today,
  count_for_completed_task_for_today,
  total_rewards,
  currentTask,
}) => {

  return (
    <Box
      maxW="sm"
      mx={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      height={"100%"}
    >
      <Box width={"100%"} border={"1px solid green"}>
        {profile_image ? (
          <Image
            src={profile_image}
            style={{ width: "520px", height: "220px", objectFit: "cover" }}
            alt={username}
          />
        ) : (
          <Image
            style={{ width: "500px", height: "220px", objectFit: "cover" }}
            src={
              "https://i.namu.wiki/i/Xs9CYSwgkCiuPpWsF2SzzKOQc41SQo3X87mZn6uc6Zrm62y3wMGgI2SWbaVv5bipvRExh5zv8evHR5dekKZKbA.webp"
            }
            alt={username}
          />
        )}
      </Box>

      <Box p="6">
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="baseline"
        >
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            mr={2}
          >
            {username}
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {position}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {status}
          </Box>
          {/* <Spacer /> */}
        </Box>

        <Box mt={2}>
          <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={3}>
            <Text>전체</Text>
            <Text>오늘</Text>
            <Box>
              <Text fontSize="sm">total: {total_count_for_task}</Text>
              <Text fontSize="sm">비완료: {count_for_uncompleted_task}</Text>
              <Text fontSize="sm">완료 : {count_for_completed_task}</Text>
            </Box>
            <Box>
              <Text fontSize="sm">total: {total_count_for_task_for_today}</Text>
              <Text fontSize="sm">
                비완료: {count_for_uncompleted_task_for_today}
              </Text>
              <Text fontSize="sm">
                완료 : {count_for_completed_task_for_today}
              </Text>
            </Box>

            <text>상금 총계</text>
            <Text fontSize="sm">{total_rewards} 원</Text>
          </Grid>
          <Box mt={2}>
            <Text fontSize="md">in progress: {currentTask}</Text>
          </Box>

          <Box textAlign={"right"} mt={3}>
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
              <Link to={`/team-status/${id}`}>
                <IconButton
                  variant={"outline"}
                  aria-label="Task"
                  icon={<GrTask />}
                  size={"md"}
                />
              </Link>
              <IconButton
                variant={"outline"}
                aria-label="Planner"
                icon={<FcPlanner />}
                size={"md"}
              />
              <IconButton
                variant={"outline"}
                aria-label="Shortcut"
                icon={<GrKeyboard />}
                size={"md"}
              />
              <IconButton
                variant={"outline"}
                aria-label="Telegram"
                icon={<TbBrandTelegram />}
                size={"md"}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

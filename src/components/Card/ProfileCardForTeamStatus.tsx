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

interface ProfileCardProps {
  imageUrl: string;
  username: string;
  role: string;
  taskCountForToday: number;
  status: string;
  count_for_uncompleted_task: number;
  count_for_completed_task: number;
  total_rewards: number;
  currentTask: string;
  ability_score: number;
}

export const ProfileCardForTeamStatus: React.FC<ProfileCardProps> = ({
  imageUrl,
  username,
  role,
  status,
  taskCountForToday,
  count_for_uncompleted_task,
  count_for_completed_task,
  total_rewards,
  currentTask,
  ability_score,
}) => {
  return (
    <Box
      maxW="sm"
      my={2}
      mx={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={imageUrl} alt={username} />

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
            {role}
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
            <Text fontSize="sm">업무 총계 : {taskCountForToday} 개</Text>
            <Text fontSize="sm">today : {taskCountForToday} 개</Text>
            <Text fontSize="sm">비완료: {count_for_uncompleted_task}</Text>
            <Text fontSize="sm">완료: {count_for_completed_task}</Text>
            <Text fontSize="sm">능력치: {ability_score} 점</Text>
            <Text fontSize="sm">상금: {total_rewards} 원</Text>
          </Grid>

          <Box mt={2}>
            <Text fontSize="md">작업중: {currentTask}</Text>
          </Box>

          <Box textAlign={"right"} mt={5}>
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
              <IconButton
                variant={"outline"}
                aria-label="Task"
                icon={<GrTask />}
                size={"md"}
              />
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

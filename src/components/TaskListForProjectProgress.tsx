import React, { ReactElement, useState } from 'react'
import {
    List, ListItem, ListIcon,
    Flex, Checkbox, Text, useColorModeValue,
    Container, Grid, GridItem, Box,
    IconButton, HStack, VStack,
    useToast
} from "@chakra-ui/react"
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { ITypeForProjectProgressList } from '../types/project_progress/project_progress_type'
import { FaTrash } from "react-icons/fa";
import StarRating from './StarRating';
import { useMutation } from '@tanstack/react-query';
import SlideToggleButton from './SlideToggleButton';
interface IProps {

}

function TaskListForProjectProgress({ ProjectProgressList, totalPageCount }: ITypeForProjectProgressList): ReactElement {
    const completedColor = useColorModeValue("green.500", "green.300");
    const inProgressColor = useColorModeValue("orange.500", "orange.300");

    const handleSlideToggleChange = (checked: boolean) => {
        console.log(`SlideToggle is now ${checked ? "on" : "off"}`);
    };

    return (
        <Container border={"2px solid blue"} maxWidth={"100%"}>
            <Box>
                <Text
                    as="h2"
                    fontSize="2xl"
                    fontWeight="bold"
                    fontFamily="heading"
                    mb="4"
                >
                    project task status
                </Text>
            </Box>

            <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                <Box>비완료</Box>
                <GridItem colSpan={1} border={"1px solid red"}>
                    <List>
                        {ProjectProgressList && ProjectProgressList.map((task) => {
                            // console.log("task.task_status : ", task.task_status);

                            if (task.task_status === "uncomplete") {
                                // console.log("미완료 task 임");

                                return (
                                    <ListItem key={task.pk} height={14}>
                                        <Flex justifyContent={"space-between"} alignItems={"center"} mb={1}>
                                            <Box flex={1} border={"1px solid yellow"}>
                                                <HStack ml={2}>
                                                    <Checkbox mr={3} />
                                                    <Text>{task.writer} </Text>
                                                </HStack>
                                            </Box>
                                            <Box flex={2.5} border={"1px solid blue"}>
                                                <VStack>
                                                    <Text fontSize="sm" fontWeight="bold">{task.task}</Text>
                                                </VStack>
                                            </Box>
                                            <Box flex={1}>
                                                <StarRating initialRating={task.importance} />
                                            </Box>
                                            <Box flex={1.5} border={"1px solid blue"}>
                                                <Flex>
                                                    <Box flex={1} textAlign={"center"}>
                                                        <Text>시작</Text>
                                                    </Box>
                                                    <Box flex={3}>
                                                        <Text>
                                                            {task.started_at_formatted}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                                <Flex>
                                                    <Box flex={1} textAlign={"center"}>
                                                        <Text>경과</Text>
                                                    </Box>
                                                    <Box flex={3}>
                                                        <Text>
                                                            {task.elapsed_time_from_started_at}
                                                        </Text>
                                                    </Box>
                                                </Flex>

                                                {/* <VStack>
                                                    <HStack>
                                                        <Text>시작</Text>
                                                        <Text>
                                                            {task.started_at_formatted}
                                                        </Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text>경과</Text>
                                                        <Text>
                                                            {task.elapsed_time_from_started_at}
                                                        </Text>
                                                    </HStack>
                                                </VStack> */}
                                            </Box>
                                            <Box flex={0.5} textAlign={"end"} border={"1px solid green"}>
                                                <SlideToggleButton onChange={() => {
                                                    console.log("onChange 클릭");
                                                }}
                                                    checked={false} />
                                            </Box>
                                            <Box flex={0.2} alignItems={"center"} >
                                                <IconButton
                                                    aria-label="삭제"
                                                    icon={<FaTrash />}
                                                    variant="ghost"
                                                />
                                            </Box>
                                        </Flex>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </GridItem>
                <GridItem colSpan={1} border={"1px solid purple"}>
                    <Box>완료</Box>

                    <List>
                        {ProjectProgressList && ProjectProgressList.map((task) => {
                            if (task.task_status === "completed") {
                                return (
                                    <ListItem key={task.pk}>
                                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                                            <Box flex={1}>
                                                <HStack>
                                                    <Checkbox mr={3} />
                                                    <Text>{task.writer} </Text>
                                                </HStack>
                                            </Box>
                                            <Box flex={1}>
                                                <Text fontSize="lg" fontWeight="bold">{task.task}</Text>
                                            </Box>
                                            <Box flex={1}>
                                                <StarRating initialRating={task.importance} />
                                            </Box>
                                            <Box flex={1}>
                                                <IconButton
                                                    aria-label="삭제"
                                                    icon={<FaTrash />}
                                                    variant="ghost"
                                                />
                                            </Box>
                                        </Flex>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </GridItem>
            </Grid>


        </Container>
    )
}

export default TaskListForProjectProgress
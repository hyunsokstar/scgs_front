import React, { ReactElement, useState } from 'react'
import {
    List, ListItem, ListIcon,
    Flex, Checkbox, Text, useColorModeValue,
    Container, Grid, GridItem, Box,
    IconButton, HStack, VStack,
    useToast
} from "@chakra-ui/react"
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { IResponseTypeForProjectTaskUpdate, ITypeForProjectProgressList } from '../types/project_progress/project_progress_type'
import { FaTrash } from "react-icons/fa";
import StarRating from './StarRating';
import { useMutation } from '@tanstack/react-query';
import SlideToggleButton from './SlideToggleButton';
import { updateProjectImportance, updateProjectTaskCompleted } from '../apis/project_progress_api';
interface IProps {

}



function TaskListForProjectProgress({ ProjectProgressList, totalPageCount, pageProgressListRefatch }: ITypeForProjectProgressList): ReactElement {
    const completedColor = useColorModeValue("green.500", "green.300");
    const inProgressColor = useColorModeValue("orange.500", "orange.300");

    const handleSlideToggleChange = (checked: boolean) => {
        console.log(`SlideToggle is now ${checked ? "on" : "off"}`);
    };
    const toast = useToast();

    const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
        onSuccess: ((result: any) => {
            console.log("result : ", result);
            if (pageProgressListRefatch) {
                pageProgressListRefatch();
            }
            toast({
                status: "success",
                title: "task status update success",
                description: result.message,
            });
        })
    });

    const updateHandlerForTaskStatus = (taskPk: string) => {
        updateProjectTaskMutations.mutate(taskPk);
        console.log("update 핸들러 for task_status check pk : ", taskPk);
    }

    const updateMutationForProjectImportance = useMutation(updateProjectImportance, {
        onSuccess: ((result: any) => {
            // console.log("result : ", result);
            if (pageProgressListRefatch) {
                pageProgressListRefatch();
            }
            toast({
                status: "success",
                title: "task status update success",
                description: result.message,
            });
        }),
        onError: ((err) => {
            console.log("error : ", err);

        })
    });


    const onChangeForStarRatingHandler = ({ taskPk, star_count }: any) => {
        console.log("on change parameter : "+ taskPk , star_count);
        updateMutationForProjectImportance.mutate({ taskPk, star_count });
    }

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

                            if (!task.task_completed) {
                                // console.log("미완료 task 임");

                                return (
                                    <ListItem key={task.pk} height={14}>
                                        <Flex justifyContent={"space-between"} alignItems={"center"} mb={1}>
                                            <Box flex={1} border={"0px solid yellow"}>
                                                <HStack ml={2}>
                                                    <Checkbox mr={3} />
                                                    <Text>{task.writer} </Text>
                                                </HStack>
                                            </Box>
                                            <Box flex={2.5} border={"0px solid blue"}>
                                                <VStack>
                                                    <Text fontSize="sm" fontWeight="bold">{task.task}</Text>
                                                </VStack>
                                            </Box>
                                            <Box flex={1}>
                                                <StarRating initialRating={task.importance} taskPk={task.pk} onChangeForStarRatingHandler={onChangeForStarRatingHandler} />
                                            </Box>
                                            <Box flex={1.5} border={"0px solid blue"}>
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


                                            </Box>

                                            {/* task_completed update */}
                                            <Box flex={0.5} textAlign={"end"} border={"0px solid green"}>
                                                <SlideToggleButton
                                                    onChange={() => { updateHandlerForTaskStatus(task.pk) }}
                                                    checked={task.task_completed}
                                                />
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

                <GridItem colSpan={1}>
                    <Box>완료</Box>

                    <List border={"1px solid purple"}>
                        {ProjectProgressList && ProjectProgressList.map((task) => {
                            if (task.task_completed === true) {
                                return (
                                    <ListItem key={task.pk} height={14}>
                                        <Flex justifyContent={"space-between"} alignItems={"center"} mb={1}>
                                            <Box flex={1} border={"0px solid yellow"}>
                                                <HStack ml={2}>
                                                    <Checkbox mr={3} />
                                                    <Text>{task.writer} </Text>
                                                </HStack>
                                            </Box>
                                            <Box flex={2.5} border={"0px solid blue"}>
                                                <VStack>
                                                    <Text fontSize="sm" fontWeight="bold">{task.task}</Text>
                                                </VStack>
                                            </Box>
                                            <Box flex={1}>
                                                <StarRating taskPk={task.pk} initialRating={task.importance} onChangeForStarRatingHandler={onChangeForStarRatingHandler} />
                                            </Box>
                                            <Box flex={1.5} border={"0px solid blue"}>
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


                                            </Box>

                                            {/* 완료 체크 버튼 */}
                                            <Box flex={0.5} textAlign={"end"} border={"0px solid green"}>
                                                <SlideToggleButton
                                                    onChange={() => { updateHandlerForTaskStatus(task.pk) }}
                                                    checked={task.task_completed}
                                                />
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
            </Grid>


        </Container>
    )
}

export default TaskListForProjectProgress
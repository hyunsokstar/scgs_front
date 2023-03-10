import { Box, Button, Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { ReactElement, useState } from 'react'
import { getProjectProgressList } from '../apis/project_progress_api';
import { ITypeForProjectProgressList } from '../types/project_progress/project_progress_type';
import ModalButtonForAddProjectTask from './modal/ModalButtonForAddProjectTask';
import ModalForAddProjectTask from './modal/ModalButtonForAddProjectTask';
import TaskListForProjectProgress from './TaskListForProjectProgress';

interface Props {

}

function ProjectProgressList({ }: Props): ReactElement {
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);

    const {
        isLoading,
        data: pageProgressListData,
        refetch: pageProgressListRefatch,
    } = useQuery<ITypeForProjectProgressList>([
        "project_progress_list", currentPageNum],
        getProjectProgressList, {
        enabled: true,
    });
    console.log("pageProgressListData : ", pageProgressListData);

    return (
        <Container maxW={"100%"} border={"1px solid purple"} px={0}>
            <Box textAlign={"right"} m={2}>
                <ModalButtonForAddProjectTask pageProgressListRefatch={pageProgressListRefatch} />
            </Box>
            <Box>
                {!isLoading && pageProgressListData ?
                    <TaskListForProjectProgress ProjectProgressList={pageProgressListData.ProjectProgressList} totalPageCount={pageProgressListData.totalPageCount} />
                    : ""
                }
            </Box>
        </Container>
    )
}

export default ProjectProgressList

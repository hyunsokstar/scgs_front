import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import CompletedProjectTaskList from '../components/CompletedProjectTaskList'
import UncompletedProjectTaskList from '../components/UncompletedProjectTaskList'

interface Props {
    
}

function ProjectAdminPage({}: Props): ReactElement {
    return (
        <VStack gap={2}>
            <UncompletedProjectTaskList />         
            <CompletedProjectTaskList />
        </VStack>
    )
}

export default ProjectAdminPage

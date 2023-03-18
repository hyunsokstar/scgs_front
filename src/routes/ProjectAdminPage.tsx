import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import CompletedProjectTaskList from '../components/CompletedProjectTaskList'
import UncompletedProjectTaskList from '../components/UncompletedProjectTaskList'

interface Props {
    
}

function ProjectAdminPage({}: Props): ReactElement {
    return (
        <Box>
            <UncompletedProjectTaskList />            
            <CompletedProjectTaskList />
        </Box>
    )
}

export default ProjectAdminPage

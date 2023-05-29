import { Box } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';

interface Props {
    
}

const ExtraTaskDetailPage = (props: Props) => {
  const { taskPk } = useParams();

    return (
        <Box>
            extra task for {taskPk}
        </Box>
    )
}

export default ExtraTaskDetailPage

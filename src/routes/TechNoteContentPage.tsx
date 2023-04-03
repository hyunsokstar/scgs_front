import { Box } from '@chakra-ui/react'
import React from 'react'
import TechNoteContent from './TechNoteContent'

interface Props {
    
}

const TechNoteContentPage = (props: Props) => {
    return (
        <Box border="1px solid green" width={"100%"} mx={"auto"}>
            <TechNoteContent />
        </Box>
    )
}

export default TechNoteContentPage

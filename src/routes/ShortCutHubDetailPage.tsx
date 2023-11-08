import React from 'react'
import { Box } from '@chakra-ui/react'
import { useParams } from "react-router-dom";

type Props = {}

const ShortCutHubDetailPage = (props: Props) => {
    const { hubPk } = useParams();

    return (
        <Box>ShortCutHubDetailPage {hubPk}</Box>
    )
}

export default ShortCutHubDetailPage
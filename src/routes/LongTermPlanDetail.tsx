import { Box } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

interface Props {
}

const LongTermPlanDetail = (props: Props) => {
  const { planPk } = useParams();

    return (
        <Box>
            LongTermPlanDetail for {planPk}
        </Box>
    )
}

export default LongTermPlanDetail
import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import TutorialList from '../components/TutorialList'


type Props = {}

function TutorialAdmin({}: Props) {
  return (
    <Container maxWidth={"80%"} mx={"auto"}>
      <TutorialList />
    </Container>
  )
}

export default TutorialAdmin
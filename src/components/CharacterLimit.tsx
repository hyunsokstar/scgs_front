import React, { ReactElement } from 'react'
import { Text, Box } from "@chakra-ui/react";


interface IProps {
    text: string;
    maxLength: number;
}


function CharacterLimit({ text, maxLength }: IProps) {
    if (text.length <= maxLength) {
        return <Text>{text}</Text>;
    } else {
        return (
            <Box>
                <Text fontSize={"14px"}>
                    {text.slice(0, maxLength)}&hellip;
                </Text>
            </Box>
        );
    }
}

export default CharacterLimit

import { Grid, Box, Text, Avatar, Flex } from '@chakra-ui/react';
import React from 'react';
import { ITypeForDataForShortCutHub } from '../../types/type_for_shortcut';

type IProps = {
    dataForShortCutHub: ITypeForDataForShortCutHub
};

const CardListForShortCutHub = ({ dataForShortCutHub }: IProps) => {
    return (
        <Box p={2}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {dataForShortCutHub.listForShortCutHub.map((shortcut_hub, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
                        {/* 카드 헤더 */}
                        <Box p={4} borderBottom="1px solid #E2E8F0">
                            <Text fontSize="xl" fontWeight="bold">{shortcut_hub.title}</Text>
                        </Box>
                        {/* 카드 바디 */}
                        <Box p={4}>
                            <Text color="gray.600" mb={4}>{shortcut_hub.description}</Text>
                        </Box>
                        {/* 카드 푸터 */}
                        <Box p={4} borderTop="1px solid #E2E8F0">
                            <Flex alignItems="center">
                                <Avatar size="sm" name={shortcut_hub.writer.username} src={shortcut_hub.writer.profile_image} mr={2} />
                                <Text>{shortcut_hub.writer.username}</Text>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default CardListForShortCutHub;
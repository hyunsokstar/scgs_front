import React from "react";
import { Box, Flex, Text, useDisclosure, IconButton, Stack, Collapse, Icon, Link, Button, Container } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function SampleHeader() {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Container maxW="80%">
            <Box>
                <Text fontStyle="display" height="50px" fontSize={50} mb={10}>
                    WorkSpace For FullStack Developers !!
                </Text>
            </Box>
            <Box bg="blue.600">
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                        <IconButton icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} size={"md"} onClick={onToggle} aria-label={"Open Menu"} />
                    </Box>

                    <Box>
                        <Stack direction={"row"} align="center" display={{ base: "none", md: "flex" }} gap={10}>
                            <Link href="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    ToDo
                                </Text>
                            </Link>
                            <Link href="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    유저
                                </Text>
                            </Link>
                            <Link href="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    채팅
                                </Text>
                            </Link>
                            <Link href="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    뮤직
                                </Text>
                            </Link>
                            <Link href="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    쇼핑
                                </Text>
                            </Link>
                        </Stack>
                    </Box>
                    <Box>로그인 버튼/ 회원 가입 버튼</Box>
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <Box pb={4}>
                        <Stack direction={"row"} spacing={4} align="center" mb={4} mt={4}>
                            <Link href="/">유저</Link>
                            <Link href="/">설문</Link>
                            <Link href="/">QA</Link>
                            <Link href="/">채팅</Link>
                        </Stack>
                    </Box>
                </Collapse>
            </Box>
        </Container>
    );
}

export default SampleHeader;

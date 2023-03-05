import React from "react";
import {
    Box,
    Flex,
    Text,
    useDisclosure,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Button,
    Container,
    useColorMode,
    useColorModeValue,
    useToast,
    LightMode,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
    HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FaMoon, FaSun } from "react-icons/fa";
import useUser from "../lib/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { logOut } from "../api";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function SampleHeader() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const { userLoading, isLoggedIn, user } = useUser();

    console.log("user : ", user);

    const queryClient = useQueryClient();

    const toast = useToast();

    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const { isOpen: isOpen2, onToggle: onToggle2 } = useDisclosure();

    const onLogOut = async () => {
        const toastId = toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            position: "bottom-right",
        });

        const data = await logOut();
        queryClient.refetchQueries(["me"]);

        console.log(data);

        setTimeout(() => {
            toast.update(toastId, {
                status: "success",
                title: "Done!",
                description: "See you later!",
            });
        }, 0);
    };

    return (
        <Container maxW="80%">
            <Box>
                <Text fontStyle="display" height="50px" fontSize={50} mb={10}>
                    WorkSpace For FullStack Developers !!
                </Text>
            </Box>
            <Box bgColor={"gray.600"}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Box p={2}>
                        <IconButton icon={isOpen1 ? <CloseIcon /> : <HamburgerIcon />} size={"md"} onClick={onToggle1} aria-label={"Open Menu"} colorScheme={"cyan"} />
                        {!userLoading && user?.admin_level && user?.admin_level > 2 ? (
                            <IconButton icon={isOpen2? <CloseIcon /> : <HamburgerIcon />} size={"md"} onClick={onToggle2} aria-label={"Open Menu"} colorScheme={"orange"} ml={2} />
                        ) : (
                            ""
                        )}
                    </Box>

                    <Box>
                        <Stack direction={"row"} align="center" display={{ base: "none", md: "flex" }} gap={10}>
                            <Link to="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    ToDo
                                </Text>
                            </Link>
                            <Link to="/users">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    유저
                                </Text>
                            </Link>
                            <Link to="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    채팅
                                </Text>
                            </Link>
                            <Link to="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    뮤직
                                </Text>
                            </Link>
                            <Link to="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    쇼핑
                                </Text>
                            </Link>
                            <Link to="/">
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    Team
                                </Text>
                            </Link>
                        </Stack>
                    </Box>
                    <HStack>
                        <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />

                        {!userLoading ? (
                            !isLoggedIn ? (
                                <Container p={2}>
                                    <Button onClick={onLoginOpen}>로그인</Button>
                                    <LightMode>
                                        <Button ml={2} colorScheme={"red"} onClick={onSignUpOpen}>
                                            회원 가입
                                        </Button>
                                    </LightMode>
                                </Container>
                            ) : (
                                <Box>
                                    <HStack mr={2}>
                                        <Text color={"orange.500"} fontSize={"2xl"}>
                                            {user?.username} ({user?.admin_level}) 님
                                        </Text>
                                        <Menu>
                                            <MenuButton>
                                                <Avatar name={user?.name} size={"md"} />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </Box>
                            )
                        ) : null}
                    </HStack>
                </Flex>
                <Collapse in={isOpen1} animateOpacity>
                    <Box pb={4}>
                        <Stack direction={"row"} spacing={4} align="center" mb={4} mt={4}>
                            <Link to="/">유저</Link>
                            <Link to="/">설문</Link>
                            <Link to="/">QA</Link>
                            <Link to="/">채팅</Link>
                        </Stack>
                    </Box>
                </Collapse>
                <Collapse in={isOpen2} animateOpacity>
                    <Box pb={4}>
                        <Stack direction={"row"} spacing={4} align="center" mb={4} mt={4}>
                            <Link to="/">tutorial admin</Link>
                            <Link to="/">survey admin</Link>
                            <Link to="/">qa admin</Link>
                            <Link to="/">task admin</Link>
                        </Stack>
                    </Box>
                </Collapse>
            </Box>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Container>
    );
}

export default SampleHeader;

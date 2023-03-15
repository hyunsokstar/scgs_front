import { useState } from "react";
import {
    Spacer,
    Box,
    Flex,
    Text,
    useDisclosure,
    IconButton,
    Stack,
    Collapse,
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
    Heading,
    Select,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import useUser from "../../lib/useUser";
import { logOut } from "../../api";
import { NavLink, useNavigate } from "react-router-dom";

import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";

import styles from "./SelectBox.module.css";

const TestHeader = () => {
    const [active, setActive] = useState("home");
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const navigate = useNavigate();

    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();

    const queryClient = useQueryClient();

    const handleItemClick = (itemName: string) => {

        if (itemName === "project_admin") {
            setSelectedValue("/")
        }
        setActive(itemName);
    };

    const { userLoading, isLoggedIn, user } = useUser();
    const [selectedValue, setSelectedValue] = useState("en");

    // 컴퍼넌트 함수
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

    let activeStyle = {
        fontSize: "lg",
        fontWeight: "bold",
        color: "black"
    };

    let unactiveStyle = {
        fontSize: "lg",
        fontWeight: "bold",
        color: "gray"
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`Selected value: ${e.target.value}`);
        const url = e.target.value

        if (url == "default") {
            setSelectedValue(url)
            return;
        } else {
            setSelectedValue(url)
            navigate(url)
        }


    };

    const homeButtonHandler = () => {
        console.log("home button 클릭");
        handleItemClick("home")
        setSelectedValue("/")
        navigate("/");
    };

    return (
        <Box maxW={"100%"}>

            <Flex as="header" align="center" justify="space-between" p="1rem" bg="blue.300">
                <Box display={"flex"} gap={6} alignItems={"center"}>
                    <Box fontWeight={active === "home" ? "bold" : "normal"} fontSize="2xl" color="teal.500">
                        <Text
                            _hover={{
                                bg: "blue.200"
                            }}
                            color={active === "home" ? "blue.500" : "blue.500"}
                            onClick={homeButtonHandler}
                        >
                            Home
                        </Text>
                    </Box>

                    <HStack>

                        <Select
                            value={selectedValue}
                            className={styles.select}
                            onChange={handleChange}
                            width={"140px"}
                            backgroundColor="blue.200"
                            _focus={{
                                boxShadow: "none",
                            }}
                        >
                            <option value="default">업무 관리</option>
                            <option value="/project-admin">project-admin</option>
                        </Select>

                        <Select
                            value={selectedValue}
                            className={styles.select}
                            onChange={handleChange}
                            width={"140px"}
                            backgroundColor="blue.200"
                            _focus={{
                                boxShadow: "none",
                            }}
                        >
                            <option value="default">랭킹</option>
                            <option value="/tutorials">tutorial</option>
                        </Select>

                        <Select
                            value={selectedValue}

                            className={styles.select}
                            onChange={handleChange}
                            width={"140px"}
                            backgroundColor="blue.200"
                            _focus={{
                                boxShadow: "none",
                            }}
                            _hover={{
                                bg: "blue.200",
                            }}
                        >
                            <option value="default">
                                클론 코딩
                            </option>
                            <option value="gayou">
                                gayou clone
                            </option>

                        </Select>

                        <Select
                            value={selectedValue}
                            className={styles.select}
                            onChange={handleChange}
                            width={"150px"}
                            backgroundColor="blue.200"
                            _focus={{
                                boxShadow: "none",
                            }}
                            _hover={{
                                bg: "blue.200",
                            }}
                        >
                            <option value="default">
                                테스트 컴퍼넌트
                            </option>
                            <option value="/test-data-grid">
                                data-grid 샘플
                            </option>
                            <option value="/data-grid/users">
                                유저 리스트(by react data-grid)
                            </option>

                        </Select>

                    </HStack>

                </Box>
                <Box>
                    <NavLink
                        to="/project_admin"
                        // style={({ isActive }) =>
                        //     isActive ? activeStyle : unactiveStyle
                        // }
                        onClick={() => handleItemClick("project_admin")}
                    >
                        <Text fontWeight={active === "project_admin" ? "bold" : "normal"}>
                            project_admin
                        </Text>
                    </NavLink>
                </Box>
                <Box py={1}>
                    <HStack>
                        <IconButton
                            onClick={toggleColorMode}
                            variant={"outline"}
                            aria-label="Toggle dark mode"
                            icon={<Icon color="yellow" />}
                            bgColor={"green.500"}
                            _hover={{ bg: "teal.200" }}
                            size={"sm"}
                        />

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
                                                <Avatar name={user?.name} size={"sm"} />
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
                </Box>
            </Flex>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Box>
    );
};

export default TestHeader;
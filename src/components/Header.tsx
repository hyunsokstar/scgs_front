import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

import {
    Box,
    Button,
    HStack,
    Stack,
    IconButton,
    LightMode,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    Avatar,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    useToast,
    Select,
} from "@chakra-ui/react";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import HeadMenus from "./HeadMenus";
import { ChevronDownIcon } from "@chakra-ui/icons";
// HeadMenus

export default function Header() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const { userLoading, isLoggedIn, user } = useUser();

    const queryClient = useQueryClient();

    const toast = useToast();

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
        <Stack
            justifyContent={"space-between"}
            py={5}
            px={40}
            borderBottomWidth={1}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 3,
                md: 0,
            }}
        >
            <Box color={logoColor}>
                {/* <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link> */}
                {/* <img src="https://www.scgs.co.kr/img/logo.png" alt="" /> */}
            </Box>
            <HStack spacing={2}>
                {/* <Box>
          <Link to="/estimate_require">견적 문의</Link>
        </Box> */}

                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition="all 0.2s"
                        borderRadius="md"
                        borderWidth="1px"
                        _hover={{ bg: "gray.400" }}
                        _expanded={{ bg: "blue.400" }}
                        _focus={{ boxShadow: "outline" }}
                    >
                        견적 <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link to="/estimates">견적 요청 리스트</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/estimate_require">견적 문의</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>

                <HeadMenus />

                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />

                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>로그인</Button>
                            <LightMode>
                                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                                    회원 가입
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                            </MenuButton>
                            <MenuList>
                                {user?.is_host ? (
                                    <Link to="/rooms/upload">
                                        <MenuItem>Upload room</MenuItem>
                                    </Link>
                                ) : null}
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>

            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}

import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  Container,
  LightMode,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOutApi } from "../../api";
import useUser from "../../lib/useUser";
import { login, logout } from "../../reducers/userSlice";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const toast = useToast();

  const location = useLocation();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { userLoading, isLoggedIn, user } = useUser();
  const [isHomePage, setIsHomePage] = useState(false);

  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
      position: "bottom-right",
    });

    const data = await logOutApi();
    dispatch(logout());
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

  const homeButtonHandler = () => {
    navigate("/");
    setIsHomePage(location.pathname === "/");
  };

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location.pathname]);

  let activeStyle = {
    fontSize: "lg",
    fontWeight: "bold",
    color: "yellow",
  };

  let unactiveStyle = {
    fontSize: "lg",
    fontWeight: "bold",
    color: "white",
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(login(user));
    }
  }, []);


   const goToUserProfile = (userPk:any) => {
    navigate(`users/${userPk}`);
  }

  return (
    <>
      <Flex
        as="nav"
        bg="gray.800"
        py={2}
        px={1.5}
        align="center"
        justify="space-between"
        my={1}
      >
        <Box display="flex" alignItems="center" onClick={homeButtonHandler}>
          <Icon
            as={AiFillHome}
            color={isHomePage ? "yellow.300" : "white"}
            boxSize="3rem"
            mr="1rem"
          />
        </Box>

        <NavLink
          to="/my_task"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            My Task
          </Text>
        </NavLink>

        <NavLink
          to="/project_admin"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Project Task
          </Text>
        </NavLink>

        <NavLink
          to="/task-status"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Task Status
          </Text>
        </NavLink>

        <NavLink
          to="/qa-page"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Q&A
          </Text>
        </NavLink>

        <NavLink
          to="/tech-note"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Tech Note
          </Text>
        </NavLink>

        <NavLink
          to="/tutorials"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Tutorial
          </Text>
        </NavLink>

        <NavLink
          to="/site-manual"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "white", transform: "scale(1.1)" }}
          >
            Site Manual
          </Text>
        </NavLink>

        <Box>
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
                      <Avatar src={user?.profile_image}  size={"sm"} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={()=> goToUserProfile(user?.pk)}>유저 프로필</MenuItem>
                      <MenuItem onClick={onLogOut}>Log out</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Box>
            )
          ) : null}
        </Box>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
};

export default Header;

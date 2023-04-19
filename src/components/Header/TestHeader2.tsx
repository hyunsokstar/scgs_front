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
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getMe, logOutApi } from "../../api";
import useUser from "../../lib/useUser";
import { login, logout } from "../../reducers/userSlice";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RootState } from "../../store";

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

  const { userLoading, user, isLoggedIn } = useUser();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { loginUser } = useSelector((state: RootState) => state.loginInfo);
  const [isHomePage, setIsHomePage] = useState(false);

  // useEffect(()=> {
  //   getMe()
  // },[])

  const mutationForLogout = useMutation(
    () => {
      return logOutApi();
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (res) => {
        console.log("res for logout: ", res);

        if(res.logout_succes){
          dispatch(logout())
        }

        queryClient.refetchQueries(["me"]);

        toast({
          title: "logout 성공!",
          status: "success",
        });
      },
    }
  );

  // const logout = () => {
  //   mutationForLogout.mutate();
  // };

  const onLogOut = async () => {
    // const toastId = toast({
    //   title: "Login out...",
    //   description: "Sad to see you go...",
    //   status: "loading",
    //   position: "bottom-right",
    // });

    // logOutApi
    mutationForLogout.mutate();

    await dispatch(logout());
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

  // useEffect(() => {
  //   queryClient.refetchQueries(["me"]);
  //   if (isLoggedIn) {
  //     dispatch(login(user));
  //   } else {
  //   }
  // }, []);

  const goToUserProfile = (userPk: any) => {
    navigate(`users/${userPk}`);
  };

  return (
    <>
      <Flex
        as="nav"
        height={"60px"}
        bg="gray.800"
        px={1.5}
        align="center"
        justify="space-between"
        my={1}
        mb={1}
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
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
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
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
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
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Task Status
          </Text>
        </NavLink>

        <NavLink
          to="/test-board"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Test Board
          </Text>
        </NavLink>

        <NavLink
          to="/task-statics"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Task Statics
          </Text>
        </NavLink>

        <NavLink
          to="/api-docu"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Api Docu
          </Text>
        </NavLink>

        <NavLink
          to="/shortcut"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            ShortCut
          </Text>
        </NavLink>

        <NavLink
          to="/shortcut2"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            ShortCut2
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
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Tech Note
          </Text>
        </NavLink>

        {/* <NavLink
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
        </NavLink> */}

        {/* <NavLink
          to="/site-manual"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Site Manual
          </Text>
        </NavLink> */}

        <Box>
          {/* <Box color={"white"}>{isLoggedIn ? "true" : "false"} </Box> */}
          {!isLoggedIn || logoutSuccess === true ? (
            <Container p={2}>
              {/* <Box color={"white"}>{loginUser.username}</Box> */}
              <Button onClick={onLoginOpen} size={"md"}>
                로그인
                {/* {isLoggedIn ? "true" : "false"} */}
              </Button>
              <LightMode>
                <Button
                  ml={2}
                  colorScheme={"red"}
                  onClick={onSignUpOpen}
                  size={"md"}
                >
                  회원 가입
                </Button>
              </LightMode>
            </Container>
          ) : (
            <Box>
              {/* <Box color={"white"}>{loginUser.username}</Box>
              <Box color={"white"}>{isLoggedIn}</Box> */}

              <HStack mr={2}>
                <Text color={"orange.500"} fontSize={"2xl"}>
                  {/* {user?.username} ({user?.admin_level}) 님 */}
                </Text>
                <Menu>
                  <MenuButton>
                    <Avatar src={user?.profile_image} height="44px" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => goToUserProfile(user?.pk)}>
                      유저 프로필
                    </MenuItem>
                    <MenuItem onClick={onLogOut}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Box>
          )}
        </Box>
      </Flex>
      <LoginModal
        setLogOutSuccess={setLogoutSuccess}
        isOpen={isLoginOpen}
        onClose={onLoginClose}
      />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
};

export default Header;

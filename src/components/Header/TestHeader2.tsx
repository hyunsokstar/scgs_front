import {
  Box,
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

        if (res.logout_succes) {
          dispatch(logout());
        }

        queryClient.refetchQueries(["me"]);

        toast({
          title: "logout 성공!",
          status: "success",
        });
      },
    }
  );

  const onLogOut = async () => {
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

  const goToUserProfile = (userPk: any) => {
    navigate(`users/${userPk}`);
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          // base: "2fr", // 변경된 부분: 모바일 화면에서 컬럼당 하나로 설정
          xl: "repeat(8, 1fr)",
          lg: "repeat(8, 1fr)",
          md: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          base: "repeat(2, 1fr)",
        }}
        justifyItems="center" // 가운데 정렬
        alignItems="center" // 수직 가운데 정렬
        // height={"120px"}
        // height={["640px", "620px", "540px", "540px", "120px"]}
        border={"1px solid gray"}
        bg="gray.800"
        overflowY={"scroll"}
        gap={2}
        py={2}
        width={"100%"}
        // flex={1}
      >
        <Box display="flex" alignItems="center" onClick={homeButtonHandler}>
          <Icon
            as={AiFillHome}
            color={isHomePage ? "yellow.300" : "white"}
            boxSize="3rem"
            mr="1rem"
          />
        </Box>

        {/* <NavLink
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
        </NavLink> */}

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
          to="/team-status"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Team Status
          </Text>
        </NavLink>

        <NavLink
          to="/today-task-status"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Today Status
          </Text>
        </NavLink>

        <NavLink
          to="/task-log"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Task Log
          </Text>
        </NavLink>

        {/* <NavLink
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
        </NavLink> */}

        <NavLink
          to="/long-term-plan"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            long term plan
          </Text>
        </NavLink>

        {/* <NavLink
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
        </NavLink> */}

        <NavLink
          to="/study-note"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Note
          </Text>
        </NavLink>

        {/* <NavLink
          to="/team-management"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Team Management
          </Text>
        </NavLink>

        <NavLink
          to="/data-grid/users"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            mr={{ base: 0, md: "1rem" }}
            cursor="pointer"
            _hover={{ color: "blue.100", transform: "scale(1.1)" }}
          >
            Members Table
          </Text>
        </NavLink> */}

        <Box>
          {!isLoggedIn || logoutSuccess === true ? (
            <Container p={2}>
              <Button onClick={onLoginOpen} size={"md"}>
                로그인
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
              <HStack mr={2}>
                <Text color={"orange.500"} fontSize={"2xl"}></Text>
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
      </Box>
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

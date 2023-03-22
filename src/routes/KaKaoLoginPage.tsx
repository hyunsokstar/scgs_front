import { Box, Image, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { register, handleSubmit, errors } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    setIsLoading(true);
    // 로그인 처리
    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="78vh"
      bg={"ThreeDDarkShadow"}
      mt={0}
    >
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        backgroundColor="white.100"
        borderRadius="xl"
        boxShadow="md"
        width="57%"
        height="87%"
        overflow="hidden"
      >
        <Box width="70%" height={"100%"} position="relative">
          <Image
            src="https://i.ytimg.com/vi/9DmorFYl44M/maxresdefault.jpg"
            alt="animation"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            width="100%"
            height="100%"
            objectFit="fill"
            border={"0px solid blue"}
          />
        </Box>
        <Box
          width="50%"
          backgroundColor={"chakra-subtle-bg"}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          padding="10"
          height="100%"
          border={"0px solid blue"}
          // my={10}
        >
          <Text
            fontSize="50px"
            fontWeight="bold"
            fontFamily="sans-serif"
            color="#333"
            letterSpacing="2px"
            textTransform="uppercase"
          >
            로그인
          </Text>
          <Box as="form">
            <Input
              name="email"
              placeholder="이메일"
              mb={4}
              // ref={register({ required: true })}
              // isInvalid={!!errors.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              mb={4}
              // ref={register({ required: true })}
              // isInvalid={!!errors.password}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              width="100%"
              backgroundColor="teal.300"
              _hover={{ backgroundColor: "teal.500" }}
              color="white"
            >
              로그인
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

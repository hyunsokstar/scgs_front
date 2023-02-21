import {
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";

interface Props {}

interface IForm {
  title: string;
  product: string;
  manager: string;
  email: string;
  phone_number: string;
  estimate_content: string;
  completion_status: string;
}

function EstimateRequest({}: Props): ReactElement {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();

  const onSubmit = (data: any) => {
    console.log("data : ", data);
  };

  return (
    <div>
      <Container maxW="container.md" bg="white.200" color="#262626">
        <Text fontSize="5xl" mb={1}>
          견적 문의
        </Text>
        <VStack gap={2} as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <HStack>
              <FormLabel>제목</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>제품</FormLabel>
              <Input
                type="text"
                {...register("product", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>담당자</FormLabel>
              <Input
                type="text"
                {...register("manager", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>이메일</FormLabel>
              <Input
                type="text"
                {...register("email", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>연락처</FormLabel>
              <Input
                type="text"
                {...register("phone_number", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>내용</FormLabel>
              <Textarea
                placeholder="내용"
                {...register("estimate_content", {
                  required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>처리 여부</FormLabel>
              <RadioGroup>
                <HStack>
                  <Radio value="uncomplete" {...register("completion_status")}>
                    처리전
                  </Radio>
                  <Radio value="complete" {...register("completion_status")}>
                    처리 완료
                  </Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </FormControl>
          <Divider mt={2} mb={3} />
          <FormControl>
            <HStack>
              <FormLabel>메모</FormLabel>
              <Textarea placeholder="메모" />
            </HStack>
          </FormControl>

          <FormControl>
            <Button
              m={"auto"}
              mt={5}
              w={"100%"}
              colorScheme="green"
              type="submit"
            >
              수정
            </Button>
          </FormControl>
        </VStack>
        
      </Container>
    </div>
  );
}

export default EstimateRequest;

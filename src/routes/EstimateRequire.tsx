import { useMutation, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단

import {
  Container,
  useToast,
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
import { insertEstimateRequire } from "../api";
import { useNavigate } from "react-router-dom";
import { EstimateRequire } from "../types";

interface Props {}

// interface IForm {
//   title: string;
//   product: string;
//   manager: string;
//   email: string;
//   phone_number: string;
//   estimate_content: string;
//   estimate_require_completion: string;
//   memo: string;
// }

function EstimateRequireForm({}: Props): ReactElement {
  const { register, handleSubmit, watch, reset } = useForm<EstimateRequire>();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = ({
    title,
    product,
    manager,
    email,
    phone_number,
    content,
    estimate_require_completion,
    memo,
  }: EstimateRequire) => {
    mutation.mutate({
      title,
      product,
      manager,
      email,
      phone_number,
      content,
      estimate_require_completion,
      memo,
    });
  };

  const mutation = useMutation(insertEstimateRequire, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      navigate('/estimates')
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

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
                {...register("content", {
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
                  <Radio
                    value="uncomplete"
                    {...register("estimate_require_completion")}
                  >
                    처리전
                  </Radio>
                  <Radio
                    value="complete"
                    {...register("estimate_require_completion")}
                  >
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
              견적 요청 저장
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </div>
  );
}

export default EstimateRequireForm;

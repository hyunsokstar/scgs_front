import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단

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
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import {
  getOneEstimate,
  insertEstimateRequire,
  updateEstimateRequire,
} from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { EstimateRequire, EstimateRequireForm, IRoomDetail } from "../types";

import { VisuallyHidden, VisuallyHiddenInput } from "@chakra-ui/react";

interface Props {}

function EstimateDetail({}: Props): ReactElement {
  const { estimatePk } = useParams();
  // const { estimatePk } = useParams();

  const { register, handleSubmit, watch, reset } =
    useForm<EstimateRequireForm>();

  const { data: estimateData, isLoading: isEstimateDataLoading } =
    useQuery<EstimateRequire>(
      [`getOneEstimate`, estimatePk, `estimate_detail`],
      getOneEstimate
    );

  // console.log("estimateData : ", estimateData);
  console.log("watch", watch());

  const toast = useToast();
  const navigate = useNavigate();

  // 에러 메세지
  // '({ title, product, manager, email, phone_number, content, estimate_require_completion, memo, }: EstimateRequireForm, { estimatePk }: any) => Promise<any>'
  // 형식의 인수는 'MutationKey' 형식의 매개 변수에 할당될 수 없습니다.
  const mutation = useMutation(updateEstimateRequire, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      // navigate("/estimates");
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = ({
    estimatePk,
    title,
    product,
    manager,
    email,
    phone_number,
    content,
    estimate_require_completion,
    memo,
  }: EstimateRequireForm) => {
    console.log("estimatePk : ", estimatePk);
    console.log("estimate_require_completion : ", estimate_require_completion);

    mutation.mutate({
      estimatePk,
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

  return (
    <div>
      <Container maxW="container.md" bg="white.200" color="#262626" mt={2}>
        <Text fontSize="5xl" mb={1}>
          견적 문의
        </Text>
        <VStack gap={2} as="form" onSubmit={handleSubmit(onSubmit)}>
          <VisuallyHidden>
            <FormControl>
              <HStack>
                <Input
                  type="text"
                  {...register("estimatePk", {
                    // required: "Please write a username",
                    required: "Please write a username",
                  })}
                  defaultValue={estimatePk}
                />
              </HStack>
            </FormControl>
          </VisuallyHidden>

          <FormControl>
            <HStack>
              <FormLabel>제목 {estimateData?.title}</FormLabel>
              {/* <Input
                type="text"
                {...register("title", {})}
                defaultValue={estimateData?.title}
              /> */}

              <Editable defaultValue={estimateData?.title}>
                <EditablePreview />
                <EditableInput
                  {...register("title", {})}
                  value={estimateData?.title}
                />
              </Editable>
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>제품</FormLabel>
              <Input
                type="text"
                {...register("product", {
                  // required: "Please write a username",
                })}
                defaultValue={estimateData?.product}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>담당자</FormLabel>
              <Input
                type="text"
                {...register("manager", {
                  // required: "Please write a username",
                })}
                defaultValue={estimateData?.manager}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>이메일</FormLabel>
              <Input
                type="text"
                {...register("email", {
                  // required: "Please write a username",
                })}
                defaultValue={estimateData?.email}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>연락처</FormLabel>
              <Input
                type="text"
                {...register("phone_number", {
                  // required: "Please write a username",
                })}
                defaultValue={estimateData?.phone_number}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>내용</FormLabel>
              <Textarea
                defaultValue={estimateData?.content}
                placeholder="내용"
                {...register("content", {
                  // required: "Please write a username",
                })}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <HStack>
              <FormLabel>
                처리 여부
                {estimateData?.estimate_require_completion}
              </FormLabel>
              <RadioGroup
                defaultValue={
                  estimateData?.estimate_require_completion === "complete"
                    ? "complete"
                    : "uncomplete"
                }
              >
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
              <Textarea
                placeholder="메모"
                defaultValue={estimateData?.memo}
                // {...register("memo")}
              />
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
              견적 요청 수정
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </div>
  );
}

export default EstimateDetail;

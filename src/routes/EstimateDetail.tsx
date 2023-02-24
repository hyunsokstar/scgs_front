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
import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getOneEstimate, insertEstimateRequire, updateEstimateRequire } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { EstimateRequire, EstimateRequireForm, IRoomDetail } from "../types";

import { VisuallyHidden, VisuallyHiddenInput } from "@chakra-ui/react";
import EstimateDetailForm from "../components/EstimateDetailForm";
import axios from "axios";

interface Props {}

function EstimateDetail({}: Props): ReactElement {
    const { estimatePk } = useParams();
    const { data: estimateData, isLoading: isEstimateDataLoading } = useQuery<EstimateRequire>([`getOneEstimate`, estimatePk, `estimate_detail`], getOneEstimate);
    
    const { register, handleSubmit, watch, reset } = useForm<EstimateRequireForm>();
    console.log("watch", watch());

    const toast = useToast();
    const navigate = useNavigate();

    // 에러 메세지
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

    const onSubmit = ({ estimatePk, title, product, manager, email, phone_number, content, estimate_require_completion, memo }: EstimateRequireForm) => {
        console.log("estimatePk : ", estimatePk);
        console.log("estimate_require_completion : ", estimate_require_completion);

        mutation.mutate({
            ...estimateData,
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
            <>
                {estimateData ? (
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
                                    <Input
                                        type="text"
                                        defaultValue={estimateData?.title}
                                        {...register("title", {
                                            required: false,
                                        })}
                                    />
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <HStack>
                                    <FormLabel>제품</FormLabel>
                                    <Input
                                        defaultValue={estimateData?.product}
                                        type="text"
                                        {...register("product", {
                                            required: false,
                                        })}
                                    />
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <HStack>
                                    <FormLabel>담당자</FormLabel>
                                    <Input
                                        type="text"
                                        defaultValue={estimateData?.manager}
                                        {...register("manager", {
                                            required: false,
                                        })}
                                    />
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <HStack>
                                    <FormLabel>이메일</FormLabel>
                                    <Input
                                        type="text"
                                        defaultValue={estimateData?.email}
                                        {...register("email", {
                                            required: false,
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
                                            required: false,
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
                                        {...register("content", {
                                            required: false,
                                        })}
                                        placeholder="내용"
                                    />
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <HStack>
                                    <FormLabel>
                                        처리 여부
                                        {estimateData?.estimate_require_completion}
                                    </FormLabel>
                                    <RadioGroup defaultValue={estimateData?.estimate_require_completion === "complete" ? "complete" : "uncomplete"}>
                                        <HStack>
                                            <Radio {...register("estimate_require_completion")} value="uncomplete">
                                                처리전
                                            </Radio>
                                            <Radio {...register("estimate_require_completion")} value="complete">
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
                                    <Textarea placeholder="메모" defaultValue={estimateData?.memo} {...register("memo", { required: false })} />
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <Button m={"auto"} mt={5} w={"100%"} colorScheme="green" type="submit">
                                    견적 요청 수정
                                </Button>
                            </FormControl>
                        </VStack>
                    </Container>
                ) : (
                    ""
                )}
            </>
        </div>
    );
}

export default EstimateDetail;

import { FormControl, FormLabel, HStack, Input, VisuallyHidden, VStack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { EstimateRequire, EstimateRequireForm } from "../types";

type Props = {
    data?: EstimateRequire;
};

const EstimateDetailForm = ({ data }: Props) => {
    const { register, handleSubmit, watch, reset } = useForm<EstimateRequire>({
        // mode: "onSubmit",
        // estimatePk, title, product, manager, email, phone_number, content, estimate_require_completion, memo
        defaultValues: {
            title: data?.title,
            // product: estimateData?.product,
            // email: estimateData?.email,
            // manager: estimateData?.manager,
            // phone_number: estimateData?.phone_number,
            // content: estimateData?.content,
            // estimate_require_completion: estimateData?.estimate_require_completion,
            // memo: estimateData?.memo,
        },
    });

    return (
        <div>
            <VStack gap={2} as="form">
                {/* <VisuallyHidden>
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
                </VisuallyHidden> */}

                <FormControl>
                    <HStack>
                        <FormLabel>제목</FormLabel>
                        <Input
                            type="text"
                            // defaultValue={estimateData?.title}
                            {...register("title", {
                                required: false,
                            })}
                        />
                    </HStack>
                </FormControl>
            </VStack>
        </div>
    );
};

export default EstimateDetailForm;

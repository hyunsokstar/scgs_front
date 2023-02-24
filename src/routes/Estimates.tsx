import { Button, Container, useToast } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOneEstimates, getEstimates } from "../api";

interface Props {}

interface IEstimateRequire {
    pk: number;
    title: string;
    product: string;
    manager: string;
    email: string;
    phone_number: string;
    estimate_content: string;
    content: string;
    estimate_require_completion: string;
}

function Estimates({}: Props): ReactElement {
    const {
        isLoading,
        data: estimateList,
        refetch:estimateListRefatch,
    } = useQuery<IEstimateRequire[]>(["estimates"], getEstimates, {
        enabled: true,
    });

    const toast = useToast();

    const deleteMutation = useMutation(
        (pk: number) => {
            return deleteOneEstimates(pk);
        },
        {
            onSuccess: (data) => {
                estimateListRefatch();
            },
        }
    );

    const deleteHandelr = (pk: number) => {
        const response = deleteMutation.mutate(pk);
        console.log("response :", response);
        // estimateListRefatch();

        toast({
            title: "delete 성공!",
            status: "success",
        });
    };

    console.log("견적 요청 리스트 데이터 : ", estimateList);

    return (
        <div>
            <Container maxW="80%" bg="green.100" color="#262626" mt={5}>
                <Text fontSize="5xl" mb={2} color="blue">
                    견적 문의
                </Text>
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>제목</Th>
                                <Th>제품</Th>
                                <Th>담당자(이메일)</Th>
                                <Th>phone</Th>
                                <Th>내용</Th>
                                <Th>삭제</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {estimateList?.map((row: IEstimateRequire) => {
                                return (
                                    <Tr>
                                        <Td>{row.title}</Td>
                                        <Td>{row.product}</Td>
                                        <Td>{row.manager}</Td>
                                        <Td>{row.phone_number}</Td>
                                        <Td>{row.content}</Td>
                                        <Td>
                                            <Button onClick={() => deleteHandelr(row.pk)}>Delete</Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                        {deleteMutation.isError && <p style={{ color: "red" }}>Error deleting the post</p>}
                        {deleteMutation.isLoading && <p style={{ color: "yellow" }}>Deleting the post</p>}
                        {deleteMutation.isSuccess && <p style={{ color: "green" }}>Deleted the post</p>}
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default Estimates;

import { Box, Button, Checkbox, Container, Flex, useToast } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEstimateListForCheck, deleteOneEstimates, getEstimates } from "../api";
import PaginationComponent from "../components/PaginationComponent";

interface Props {}

// interface IEstimateRequire {}

interface IEstimateRequire {
    data: [
        {
            pk: number;
            title: string;
            product: string;
            manager: string;
            email: string;
            phone_number: string;
            estimate_content: string;
            content: string;
            estimate_require_completion: string;
            total_count: number;
        }
    ];
    total_count: number;
}

interface IEstimateRow {
    pk: number;
    title: string;
    product: string;
    manager: string;
    email: string;
    phone_number: string;
    estimate_content: string;
    content: string;
    estimate_require_completion: string;
    total_count: number;
}

function Estimates({}: Props): ReactElement {
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const {
        isLoading,
        data: estimateList,
        refetch: estimateListRefatch,
    } = useQuery<IEstimateRequire>(["estimates", currentPageNum], getEstimates, {
        enabled: true,
    });
    // console.log("estimateList at front : ", estimateList);
    // console.log("estimateList.data at front : ", estimateList?.data);

    const toast = useToast();

    const deleteMutation = useMutation(
        (pk: number) => {
            return deleteOneEstimates(pk);
        },
        {
            onSettled: () => {
                // setSelectedItems([]);
            },
            onSuccess: (data) => {
                setSelectedItems([]);
                // estimateListRefatch();
            },
        }
    );

    const deleteMutationForCheck = useMutation(
        (ids_to_delete: number[]) => {
            return deleteEstimateListForCheck(ids_to_delete);
        },
        {
            onSuccess: (data) => {
                console.log("selectedItems : ", selectedItems);
                console.log("data : ", data);
                setSelectedItems([]);

                estimateListRefatch();
                toast({
                    title: "delete for checkbox 성공!",
                    status: "success",
                });
            },
        }
    );

    // const deleteMutationForChekcBox = useMutation(
    //     () => {
    //         return deleteEstimateListForCheck(selectedItems);
    //     },
    //     {
    //         onSuccess: (data) => {
    //             estimateListRefatch();
    //         },
    //     }
    // );

    const deleteHandelr = (pk: number) => {
        const response = deleteMutation.mutate(pk);
        console.log("response :", response);

        toast({
            title: "delete 성공!",
            status: "success",
        });
    };

    const deleteEstimateHandelrForCheckBox = () => {
        const response = deleteMutationForCheck.mutate(selectedItems);
        setSelectedItems([]);
        // console.log("response : ", response);
    };

    function handleCheckboxChange(id: number) {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <div>
            <Container maxW="80%" mt={5}>
                <Text fontSize="5xl" mb={2} color="blue">
                    견적 문의
                </Text>
                <Flex justifyContent="flex-end">
                    <Button bgColor={"red.200"} onClick={() => deleteEstimateHandelrForCheckBox()}>
                        삭제
                    </Button>
                </Flex>
                {selectedItems ? selectedItems : ""}
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox />
                                </Th>
                                <Th>id</Th>
                                <Th>제목</Th>
                                <Th>제품</Th>
                                <Th>담당자(이메일)</Th>
                                <Th>phone</Th>
                                <Th>내용</Th>
                                <Th>삭제</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {estimateList?.data.map((row: IEstimateRow) => {
                                return (
                                    <Tr>
                                        <Td>
                                            <input type="checkbox" value={row.pk} checked={selectedItems.includes(row.pk)} onChange={() => handleCheckboxChange(row.pk)} />
                                        </Td>
                                        <Td>{row.pk}</Td>
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

            {!isLoading ? (
                <Container maxW="80%" bg="blue.100" color="red.500" mt={2}>
                    <PaginationComponent current_page_num={currentPageNum} total_page_num={estimateList?.total_count} setCurrentPageNum={setCurrentPageNum} />
                </Container>
            ) : (
                ""
            )}
        </div>
    );
}

export default Estimates;

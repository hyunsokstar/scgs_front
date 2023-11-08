import { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    IconButton,
    Box,
    Avatar,
    useToast,
    Tag,
    TagLabel,
    Text,
    Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import {
    apiForGetShortCutListForRegisterToHub,
    apiFordeleteShortcut,
} from "../../apis/api_for_shortcut";
import ModalButtonForInsertShortCut from "../modal/ModalButtonForInsertShortCut";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalButtonForUpdateShortCut from "../modal/ModalButtonForUpdateShortCut";
import { Shortcut, ShortcutsResponse } from "../../types/type_for_shortcut";
import PaginationComponent from "../PaginationComponent";
import { Link } from "react-router-dom";

const favorite_color = ["blue", "red", "orange", "red", "purple"];

interface IProps {
    shortcut_hub_id: number
    checkedIdsForShortCutToRegisterToHub: number[];
    setCheckedIdsForShortCutToRegisterToHub: React.Dispatch<React.SetStateAction<number[]>>;
}

// 1122
const TableForCandidateShortCutListForHub = ({
    shortcut_hub_id,
    checkedIdsForShortCutToRegisterToHub,
    setCheckedIdsForShortCutToRegisterToHub
}: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const [currentPageNum, setCurrentPageNum] = useState<number>(1);

    const {
        isLoading: loading_for_shorcut_list,
        data: data_for_shortcut,
        refetch: refetch_for_shortcut_data,
    } = useQuery<ShortcutsResponse>(
        ["get_shortcut_list_for_register_to_hub", shortcut_hub_id, currentPageNum],
        apiForGetShortCutListForRegisterToHub
    );

    const [filteredData, setFilteredData] = useState(
        data_for_shortcut?.shortcut_list
    );
    const [filterValueForTag, setFilterValueForTag] = useState<any>();
    const [filterValueForShortcut, setFilterValueForShortcut] = useState<any>();


    console.log("data_for_shortcut : ", data_for_shortcut);
    console.log("filteredData : ", filteredData);

    useEffect(() => {
        setFilteredData(data_for_shortcut?.shortcut_list);
    }, [data_for_shortcut?.shortcut_list]);

    const mutationForDeleteShortCut = useMutation(
        (shorcut_pk: number) => {
            return apiFordeleteShortcut(shorcut_pk);
        },
        {
            onSettled: () => {
                // setSelectedItems([]);
            },
            onSuccess: (data) => {
                console.log("data : ", data);

                // refetch_for_api_docu();
                queryClient.refetchQueries(["get_shortcut_list"]);

                toast({
                    title: "delete api docu 성공!",
                    status: "success",
                });
            },
        }
    );

    const deleteHandlerForShortCut = (pk: number) => {
        console.log("hi");
        mutationForDeleteShortCut.mutate(pk);
    };

    const handleFilterChangeForTag = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setFilterValueForTag(value);
        updateFilteredDataForTag(value);
    };

    const updateFilteredDataForTag = (filterValueForTag: string) => {
        if (filterValueForTag !== "") {
            const filteredData = data_for_shortcut?.shortcut_list.filter((item) => {
                const tag_names = item.tags.map((tag) => tag.name);
                if (tag_names.includes(filterValueForTag)) {
                    return item;
                }
            });
            setFilteredData(filteredData);
        } else {
            setFilteredData(data_for_shortcut?.shortcut_list);
            console.log("filterValueForTag : ", filterValueForTag);
        }
    };

    const handleFilterChangeForShortcut = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setFilterValueForShortcut(value);
        updateFilteredDataForShortcut(value);
    };

    const updateFilteredDataForShortcut = (filterValueForTag: string) => {
        if (filterValueForTag !== "") {
            const filteredData = data_for_shortcut?.shortcut_list.filter((item) =>
                item.shortcut
                    .toLowerCase()
                    .includes(filterValueForShortcut.toLowerCase())
            );
            setFilteredData(filteredData);
        } else {
            setFilteredData(data_for_shortcut?.shortcut_list);
            console.log("filterValueForTag : ", filterValueForTag);
        }
    };

    const handleRowCheck = (rowId: number) => {
        let updatedIds = [...checkedIdsForShortCutToRegisterToHub];
        if (checkedIdsForShortCutToRegisterToHub.includes(rowId)) {
            updatedIds = updatedIds.filter((id) => id !== rowId);
        } else {
            updatedIds.push(rowId);
        }
        setCheckedIdsForShortCutToRegisterToHub(updatedIds);
    };


    // 2244
    if (loading_for_shorcut_list || !data_for_shortcut) {
        return <Box>Loading for shortcut list..</Box>;
    }

    // 체크 박스 상태 설정
    const isAllChecked =
        data_for_shortcut &&
        data_for_shortcut.shortcut_list.length > 0 &&
        checkedIdsForShortCutToRegisterToHub.length ===
        data_for_shortcut.shortcut_list.length;

    // 전체 체크 이벤트 설정
    const handleAllCheck = () => {
        if (isAllChecked) {
            setCheckedIdsForShortCutToRegisterToHub([]);
        } else {
            const allIds = data_for_shortcut.shortcut_list.map(
                (row: any) => row.id
            );
            setCheckedIdsForShortCutToRegisterToHub(allIds);
        }
    };

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            py={2}
            border={"1px solid green"}
        >
            <Text fontFamily="heading" fontSize="3xl" color="black">
                Table For Candidate ShortcutList <br />
                shortcut_hub_id : {shortcut_hub_id}
                {checkedIdsForShortCutToRegisterToHub.map((id) => {
                    return (
                        <Box>{id}</Box>
                    )

                })}
            </Text>{" "}
            {filterValueForTag}
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                border={"0px solid green"}
                gap={3}
            >
                <Box>
                    <Text>shortcut</Text>
                    <Input
                        size="xs"
                        variant="outline"
                        bg="blue.50"
                        borderColor="gray.300"
                        _focus={{ border: "1px solid blue", boxShadow: "none" }}
                        _hover={{ bg: "green.50", borderColor: "black" }}
                        _placeholder={{ color: "black" }}
                        id="url"
                        w={"300px"}
                        value={filterValueForShortcut}
                        onChange={handleFilterChangeForShortcut}
                    />
                </Box>
                <Box>
                    <Text>tag</Text>
                    <Input
                        size="xs"
                        variant="outline"
                        bg="blue.50"
                        borderColor="gray.300"
                        _focus={{ border: "1px solid blue", boxShadow: "none" }}
                        _hover={{ bg: "green.50", borderColor: "black" }}
                        _placeholder={{ color: "black" }}
                        id="url"
                        w={"300px"}
                        value={filterValueForTag}
                        onChange={handleFilterChangeForTag}
                    />
                </Box>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} w={"100%"} pr={2}>
                <ModalButtonForInsertShortCut />
            </Box>
            <Table size="sm" variant="simple" colorScheme="teal" w={"90%"}>
                <Thead>
                    <Tr>
                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            {/* 1108 todo */}
                            <Checkbox onChange={handleAllCheck} isChecked={isAllChecked} />
                        </Th>
                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            Writer
                        </Th>

                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            description(click)
                        </Th>

                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            Classification
                        </Th>
                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            Tags
                        </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredData?.map((shortcut: Shortcut, index: number) => (
                        <Tr key={shortcut.id}>
                            <Td>
                                <Checkbox
                                    isChecked={checkedIdsForShortCutToRegisterToHub.includes(shortcut.id)}
                                    onChange={() => handleRowCheck(shortcut.id)}
                                />                            </Td>
                            <Td>
                                {/* <Text>{shortcut?.writer.username}</Text> */}

                                {shortcut.writer !== null ? (
                                    <Avatar
                                        size={"sm"}
                                        // src={shortcut.writer.profile_image}
                                        src={
                                            shortcut.writer.profile_image !== null
                                                ? shortcut.writer.profile_image
                                                : "https://bit.ly/broken-link"
                                        }
                                        name="user-avatar"
                                        borderRadius="full"
                                    />
                                ) : (
                                    <Text>no writer</Text>
                                )}
                            </Td>

                            {/* <Td>{shortcut.description}</Td> */}

                            <Td>
                                <Box
                                    as={Link}
                                    to={`/shortcut/${shortcut.id}`}
                                    textDecoration="none"
                                    color="black"
                                    _hover={{
                                        textDecoration: "underline",
                                        color: "blue",
                                    }}
                                >
                                    {shortcut.description}({shortcut.related_shortcut_count})
                                </Box>
                            </Td>
                            <Td>{shortcut.description}</Td>
                            <Td>
                                {shortcut.tags && shortcut.tags.length > 0
                                    ? shortcut.tags.map((tag, i) => {
                                        return (
                                            <Box>
                                                <Tag
                                                    size="sm"
                                                    colorScheme={favorite_color[i]}
                                                    variant="outline"
                                                    _hover={{ colorScheme: "green", bg: "#C2F1E7" }}
                                                    mr={1}
                                                    mb={1}
                                                >
                                                    <TagLabel>{tag.name}</TagLabel>
                                                </Tag>
                                            </Box>
                                        );
                                    })
                                    : "no tags"}
                            </Td>
                            <Td>
                                <Box display={"flex"} gap={1}>
                                    {/* {shortcut.classification} */}
                                    <ModalButtonForUpdateShortCut shortcutObj={shortcut} />

                                    <IconButton
                                        aria-label="Delete"
                                        variant="outline"
                                        size="xs"
                                        icon={<DeleteIcon />}
                                        colorScheme="pink"
                                        onClick={() => deleteHandlerForShortCut(shortcut.id)}
                                    />
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Box maxW="100%" bg="blue.100" color="red.500" mt={2}>
                <PaginationComponent
                    current_page_num={currentPageNum}
                    // task_number_for_one_page={data_for_shortcut.task_number_for_one_page}
                    total_page_num={data_for_shortcut.totalCount}
                    setCurrentPageNum={setCurrentPageNum}
                />
            </Box>
        </Box>
    );
};

export default TableForCandidateShortCutListForHub;

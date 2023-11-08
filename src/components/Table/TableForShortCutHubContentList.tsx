import React from 'react';
import { Avatar, Text, Box, Table, Thead, Tbody, Tr, Th, Td, Checkbox, TagLabel, Tag, IconButton, useToast } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { apiForShortCutHubContentList, apiFordeleteShortcut } from '../../apis/api_for_shortcut';
import ModalButtonForUpdateShortCut from '../modal/ModalButtonForUpdateShortCut';
import { DeleteIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";


type TableData = {
    id: number;
    name: string;
    description: string;
};

type Props = {
    shortcut_hub_id: number;
    data: TableData[];
};

const favorite_color = ["blue", "red", "orange", "red", "purple"];


const TableForShortCutHubContentList: React.FC<Props> = ({ shortcut_hub_id, data }) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    // 난 나야
    const {
        isLoading: isLoadingForShortCutHubContent,
        data: dataForShortCutHubContent,
        refetch: refetchForShortCutHubContentData,
    } = useQuery<any>(
        ["apiForGetShortcutHubContentList", shortcut_hub_id],
        apiForShortCutHubContentList,
        {
            enabled: true,
        }
    );

    console.log("dataForShortCutHubContent : ", dataForShortCutHubContent);

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

    if(!dataForShortCutHubContent){
        return (<Box>Loading ..</Box>)
    }

    return (
        <Box width={"100%"} border={"1px solid black"}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                            <Checkbox />
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
                    {dataForShortCutHubContent.listForShortCutHubContent.map((hub_content: any, index: number) => (
                        <Tr key={hub_content.shortcut.id}>
                            <Td>
                                <Checkbox />
                            </Td>
                            <Td>
                                {/* <Text>{shortcut?.writer.username}</Text> */}

                                {hub_content.shortcut.writer !== null ? (
                                    <Avatar
                                        size={"sm"}
                                        // src={shortcut.writer.profile_image}
                                        src={
                                            hub_content.shortcut.writer.profile_image !== null
                                                ? hub_content.shortcut.writer.profile_image
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
                                    to={`/shortcut/${hub_content.shortcut.id}`}
                                    textDecoration="none"
                                    color="black"
                                    _hover={{
                                        textDecoration: "underline",
                                        color: "blue",
                                    }}
                                >
                                    {hub_content.shortcut.description}({hub_content.shortcut.related_shortcut_count})
                                </Box>
                            </Td>
                            <Td>{hub_content.shortcut.description}</Td>
                            <Td>
                                {hub_content.shortcut.tags && hub_content.shortcut.tags.length > 0
                                    ? hub_content.shortcut.tags.map((tag:any, i:number) => {
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
                                    <ModalButtonForUpdateShortCut shortcutObj={hub_content.shortcut} />

                                    <IconButton
                                        aria-label="Delete"
                                        variant="outline"
                                        size="xs"
                                        icon={<DeleteIcon />}
                                        colorScheme="pink"
                                        onClick={() => deleteHandlerForShortCut(hub_content.shortcut.id)}
                                    />
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TableForShortCutHubContentList;

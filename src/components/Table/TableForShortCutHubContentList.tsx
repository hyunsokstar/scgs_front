import React, { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd"; import { Avatar, Text, Box, Table, Thead, Tbody, Tr, Th, Td, Checkbox, TagLabel, Tag, IconButton, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForReorderingForShortCutHubContentList, apiForShortCutHubContentList, apiFordeleteShortcut, apiFordeleteShortcutHubContent } from '../../apis/api_for_shortcut';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { IDataTypeForShortCutHubContent, IRowForShortCutHubContentList } from '../../types/type_for_shortcut';

const favorite_color = ["blue", "red", "orange", "red", "purple"];

const grid = 8
const getItemStyle = (
    draggableStyle: any,
    isDragging: boolean
): React.CSSProperties => ({
    userSelect: "none",
    padding: grid * 2,
    marginBottom: grid,
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle,
});

type TableData = {
    id: number;
    name: string;
    description: string;
};

type IProps = {
    shortcut_hub_id: number;
    data: TableData[];
};

const TableForShortCutHubContentList: React.FC<IProps> = ({ shortcut_hub_id, data }) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const [listForShortCutHubContent, setListForShortCutHubContent] = useState<IRowForShortCutHubContentList[]>();

    const {
        isLoading: isLoadingForShortCutHubContent,
        data: dataForShortCutHubContent,
        refetch: refetchForShortCutHubContentData,
    } = useQuery<IDataTypeForShortCutHubContent>(
        ["apiForGetShortcutHubContentList", shortcut_hub_id],
        apiForShortCutHubContentList,
        {
            enabled: true,
        }
    );

    // alert("shortcut_hub_id : " + shortcut_hub_id)
    console.log("dataForShortCutHubContent : ", dataForShortCutHubContent);

    const mutationForDeleteShortCutHubContent = useMutation(
        (hub_content_id: number) => {
            return apiFordeleteShortcutHubContent(hub_content_id);
        },
        {
            onSettled: () => {
                // setSelectedItems([]);
            },
            onSuccess: (data) => {
                console.log("data : ", data);

                queryClient.refetchQueries(["apiForGetShortcutHubContentList"]);
                queryClient.refetchQueries(["get_shortcut_list_for_register_to_hub"]);

                toast({
                    title: "delete shortcut 성공!",
                    status: "success",
                });
            },
        }
    );

    const deleteHandlerForShortCutHubContent = (id: number) => {
        mutationForDeleteShortCutHubContent.mutate(id);
    };

    const reorder = (
        list: IRowForShortCutHubContentList[],
        startIndex: number,
        endIndex: number
    ): IRowForShortCutHubContentList[] => {
        const result = Array.from(list);

        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        console.log("result : ", result);

        return result;
    };

    const mutationForShortCutHubContentList =
        useMutation(apiForReorderingForShortCutHubContentList, {
            onSuccess: (result: any) => {
                console.log("result : ", result);
                queryClient.refetchQueries(["apiForGetShortcutHubContentList"]);

                toast({
                    status: "success",
                    title:
                        "ReOrder For ShortcutHubContentList success",
                    description: result.message,
                });
            },
        });

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        console.log(
            "listForShortCutHubContent: ",
            listForShortCutHubContent
        );

        let newItems;
        if (listForShortCutHubContent) {
            newItems = reorder(
                listForShortCutHubContent,
                result.source.index,
                result.destination.index
            );
        } else {
            newItems = listForShortCutHubContent
        }

        console.log("newItems: ", newItems);

        if (newItems) {
            const reorderedShortCutHubList = newItems.map((item, index) => ({
                ...item,
                hub_content_id: item.id,
                order: index + 1, // Assuming 'order' starts from 1
            }));

            console.log("reorderedShortCutHubList : ", reorderedShortCutHubList);
            mutationForShortCutHubContentList.mutate({
                shortcut_hub_id,
                reorderedShortCutHubList
            })

        }


        setListForShortCutHubContent(newItems);

    };

    useEffect(() => {
        if (dataForShortCutHubContent) {
            setListForShortCutHubContent(dataForShortCutHubContent.listForShortCutHubContent)
        }
    }, [dataForShortCutHubContent])

    if (!dataForShortCutHubContent) {
        return (<Box>Loading..</Box>)
    }

    return (
        <Box width={"100%"} border={"1px solid black"}>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <Box
                            ref={provided.innerRef}
                            width={"100%"}
                            border={"2px solid red"}
                        >

                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                                            <Checkbox />
                                        </Th>
                                        <Th fontFamily="monospace" fontSize="lg" color="teal.500">
                                            Order
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


                                    {listForShortCutHubContent ? listForShortCutHubContent.map((hub_content: IRowForShortCutHubContentList, index: number) => (
                                        <Draggable
                                            key={String(hub_content.id)}
                                            {...hub_content}
                                            draggableId={String(hub_content.id)}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <Tr key={hub_content.shortcut.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        provided.draggableProps.style,
                                                        snapshot.isDragging
                                                    )}
                                                >
                                                    <Td>
                                                        <Checkbox />
                                                    </Td>
                                                    <Td>
                                                        {hub_content.order}
                                                    </Td>
                                                    <Td>
                                                        {hub_content.shortcut.writer !== null ? (
                                                            <Avatar
                                                                size={"sm"}
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
                                                            ? hub_content.shortcut.tags.map((tag: any, i: number) => {
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
                                                            <IconButton
                                                                aria-label="Delete"
                                                                variant="outline"
                                                                size="xs"
                                                                icon={<DeleteIcon />}
                                                                colorScheme="pink"
                                                                onClick={() => deleteHandlerForShortCutHubContent(hub_content.id)}
                                                            />
                                                        </Box>
                                                    </Td>
                                                </Tr>
                                            )}
                                        </Draggable>
                                    )) : "no data"}

                                </Tbody>
                            </Table>
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};


export default TableForShortCutHubContentList;
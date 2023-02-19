import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsersList } from "../api";
import { IUsersForUserList } from "../types";
import UserInfoModifyModal from "./UserInfoModifyModal";

function UsersList() {
    const { isLoading, data } = useQuery<IUsersForUserList[]>(["users"], getUsersList);
    const { isOpen: isUserModifyModalOpen, onClose: onUserModifyModalClose, onOpen: onUserModifyModalOpen } = useDisclosure();

    return (
        <div>
            <Box>
                <Text fontSize="5xl" mb={5}>
                    {" "}
                    유저 리스트{" "}
                </Text>
                <TableContainer mb={20}>
                    <Table variant="simple">
                        {/* <TableCaption>유저 리스트</TableCaption> */}

                        <Thead>
                            <Tr>
                                <Th>userName</Th>
                                <Th>avatar</Th>
                                <Th>is_host</Th>
                                <Th>gender</Th>
                                <Th>language</Th>
                                <Th>수정</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((user: IUsersForUserList) => {
                                return (
                                    <Tr>
                                        <Td>{user.username}</Td>
                                        <Td>{user.avatar}</Td>
                                        <Td>{user.is_host ? "owner":"client"}</Td>
                                        <Td>{user.gender}</Td>
                                        <Td>{user.language}</Td>
                                        <Td>
                                            {/* <Button onClick={onUserModifyModalOpen}>수정</Button> */}
                                            <UserInfoModifyModal isOpen={isUserModifyModalOpen} onClose={onUserModifyModalClose} user={user} />
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default UsersList;

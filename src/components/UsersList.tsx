import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, useDisclosure, Image, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getUsersList } from "../api";
import { IUsersForUserList } from "../types";
import ModalButtonForInsertUser from "./ModalButtonForInsertUser";
import UserInfoDeleteModal from "./UserInfoDeleteModal";
import UserInfoModifyModal from "./UserInfoModifyModal";

function UsersList() {
    const { isLoading, data } = useQuery<IUsersForUserList[]>(["users"], getUsersList);
    const { isOpen: isUserModifyModalOpen, onClose: onUserModifyModalClose, onOpen: onUserModifyModalOpen } = useDisclosure();
    const { isOpen: isUserDeleteModalOpen, onClose: onUserDeleteModalClose, onOpen: onUserDeleteModalOpen } = useDisclosure();

    return (
        <div>
            <Box>
                <TableContainer mb={20} marginX={40}>
                    <Text fontSize="5xl" mb={5}>
                        유저 목록{" "}
                    </Text>

                    <Box textAlign={"right"} mb={5} mr={5}>
                        <ModalButtonForInsertUser />
                    </Box>

                    <Table variant="simple" size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>pk</Th>
                                <Th>userName</Th>
                                <Th>avatar</Th>
                                <Th>수정</Th>
                                <Th>삭제</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((user: IUsersForUserList) => {
                                return (
                                    <Tr>
                                        <Td>{user.pk}</Td>
                                        {/* <Td>{user.username}</Td> */}
                                        <Td>
                                            <Link to={`users/${user.pk}`}>{user.username}</Link>
                                        </Td>
                                        {/* <Td>{user.username}</Td> */}
                                        {/* <Td><img src={user.avatar} /></Td> */}

                                        {/* <img src={user.avatar} /> */}
                                        <Td>
                                            <Image
                                                boxSize="80px"
                                                objectFit="cover"
                                                src={user.avatar ? user.avatar : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"}
                                                alt="Dan Abramov"
                                            />
                                        </Td>
                                        <Td>
                                            {/* 수정 */}
                                            <UserInfoModifyModal isOpen={isUserModifyModalOpen} onClose={onUserModifyModalClose} user={user} />
                                        </Td>
                                        <td>
                                            {/* <Button>삭제</Button> */}
                                            <UserInfoDeleteModal isOpen={isUserDeleteModalOpen} onClose={onUserDeleteModalClose} user={user} />
                                        </td>
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

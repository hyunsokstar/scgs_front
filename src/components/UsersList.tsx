import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, useDisclosure, Image, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getUsersList } from "../apis/user_api";
import { IUsersForUserList } from "../types";
import ModalButtonForInsertUser from "./ModalButtonForInsertUser";
import UserInfoDeleteModal from "./UserInfoDeleteModal";
import UserInfoModifyModal from "./UserInfoModifyModal";

function UsersList() {
    const { isLoading, data: usersData } = useQuery<IUsersForUserList[]>(["users_list2"], getUsersList);
    const { isOpen: isUserModifyModalOpen, onClose: onUserModifyModalClose, onOpen: onUserModifyModalOpen } = useDisclosure();
    const { isOpen: isUserDeleteModalOpen, onClose: onUserDeleteModalClose, onOpen: onUserDeleteModalOpen } = useDisclosure();
    console.log("usersData 22 : ", usersData);

    return (
        <div>
            <Box bgColor={"blue.100"}>
                <TableContainer>
                    <Text fontSize="5xl" mb={5} textAlign={"center"} mt={3}>
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
                            {!isLoading && usersData
                                ? usersData.map((user: IUsersForUserList) => {
                                      console.log("user row: ", user);

                                      return (
                                          <Tr>
                                              <Td>{user.pk}</Td>
                                              <Td>
                                                  <Link to={`/users/${user.pk}`}>
                                                      <Text fontFamily={"sans-serif"} color={"blue.1000"} _hover={{ color: "red" }}>
                                                          {user.username}
                                                      </Text>
                                                  </Link>
                                              </Td>
                                              <Td>
                                                  <Image
                                                      boxSize="60px"
                                                      objectFit="cover"
                                                        src={user?.profileImages.length ? user?.profileImages[0].file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5SA0AfZTXQCmKrqom8yfEN7Gm3tiT0s11dQ&usqp=CAU"}
                                                      alt="Dan Abramov"
                                                  />
                                              </Td>
                                              <Td>
                                                  <UserInfoModifyModal isOpen={isUserModifyModalOpen} onClose={onUserModifyModalClose} user={user} />
                                              </Td>
                                              <td>
                                                  <UserInfoDeleteModal isOpen={isUserDeleteModalOpen} onClose={onUserDeleteModalClose} user={user} />
                                              </td>
                                          </Tr>
                                      );
                                  })
                                : "loading"}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default UsersList;
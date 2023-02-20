import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  useDisclosure,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsersList } from "../api";
import { IUsersForUserList } from "../types";
import UserInfoModifyModal from "./UserInfoModifyModal";

function UsersList() {
  const { isLoading, data } = useQuery<IUsersForUserList[]>(
    ["users"],
    getUsersList
  );
  const {
    isOpen: isUserModifyModalOpen,
    onClose: onUserModifyModalClose,
    onOpen: onUserModifyModalOpen,
  } = useDisclosure();

  return (
    <div>
      <Box>
        <TableContainer mb={20} marginX={40}>
          <Text fontSize="5xl" mb={5}>
            유저 리스트{" "}
          </Text>
          <Button float={"right"} mr={5} mb={10} colorScheme="orange">
            유저 등록
          </Button>
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
                <Th>삭제</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((user: IUsersForUserList) => {
                return (
                  <Tr>
                    <Td>{user.username}</Td>
                    {/* <Td><img src={user.avatar} /></Td> */}

                    {/* <img src={user.avatar} /> */}
                    <Td>
                      <Image
                        boxSize="80px"
                        objectFit="cover"
                        src={
                          user.avatar
                            ? user.avatar
                            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                        }
                        alt="Dan Abramov"
                      />
                    </Td>
                    <Td>{user.is_host ? "owner" : "client"}</Td>
                    <Td>{user.gender}</Td>
                    <Td>{user.language}</Td>
                    <Td>
                      <UserInfoModifyModal
                        isOpen={isUserModifyModalOpen}
                        onClose={onUserModifyModalClose}
                        user={user}
                      />
                    </Td>
                    <td>
                      <Button>삭제</Button>
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

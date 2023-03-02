import { Container } from "@chakra-ui/react";
import React from "react";
import UsersList from "../../components/UsersList";

type Props = {};

function UsersPage({}: Props) {
    return (
        <>
            <Container maxW="80%">
                <UsersList />
            </Container>
        </>
    );
}

export default UsersPage;

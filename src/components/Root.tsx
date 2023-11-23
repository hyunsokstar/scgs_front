import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CommonHeader from "./Header/CommonHeader";
// import TestHeader from "./TestHeader/TestHeader";

export default function Root() {
    return (
        <Box width={"100%"} border={"0px solid red"} px={"30px"} mt={1}>
            <Box width={"100%"} mx={"auto"} px={0} border={"0px solid green"}>
                <CommonHeader />
                <Outlet />
            </Box>
            <ReactQueryDevtools />
        </Box>
    );
}

import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SampleHeader from "./SampleHeader";
import TestHeader from "./TestHeader/TestHeader";

export default function Root() {
    return (
        <Box>
            <Box maxW="90%" mx={"auto"} px={2}>
                {/* <SampleHeader /> */}
                <TestHeader />
                <Outlet />
            </Box>
            <ReactQueryDevtools />
        </Box>
    );
}

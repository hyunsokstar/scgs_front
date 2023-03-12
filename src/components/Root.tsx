import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SampleHeader from "./SampleHeader";
import TestHeader from "./TestHeader";

export default function Root() {
    return (
        <Box>
            <Box maxW="80%" mx={"auto"}>
                {/* <SampleHeader /> */}
                <TestHeader />
                <Outlet />
            </Box>
            <ReactQueryDevtools />
        </Box>
    );
}

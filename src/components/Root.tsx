import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SampleHeader from "./SampleHeader";

export default function Root() {
    return (
        <Box>
            <Box maxW="95%" mx={"auto"}>
                <SampleHeader />
                <Outlet />
            </Box>
            <ReactQueryDevtools />
        </Box>
    );
}

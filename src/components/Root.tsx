import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../backup/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SampleHeader from "./SampleHeader";

export default function Root() {
    return (
        <Box>
            {/* <Header /> */}
            <SampleHeader />
            <Outlet />
            <ReactQueryDevtools />
        </Box>
    );
}

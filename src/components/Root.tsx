import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SampleHeader from "./SampleHeader";
import TestHeader2 from "./Header/TestHeader2";
// import TestHeader from "./TestHeader/TestHeader";

export default function Root() {
    return (
        <Box width={"100%"} border={"0px solid red"} px={"60px"} mt={1}>
            <Box width={"100%"} mx={"auto"} px={0} border={"0px solid green"}>
                <TestHeader2 />
                <Outlet />
            </Box>
            <ReactQueryDevtools />
        </Box>
    );
}

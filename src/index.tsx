import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ChakraProvider } from "@chakra-ui/react";

//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    // <React.StrictMode>
    //     <ChakraProvider>
    //         <RouterProvider router={router} />
    //     </ChakraProvider>
    // </React.StrictMode>
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

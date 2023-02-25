import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, HStack, Input, Spacer, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

type Props = {
    current_page_num: number;
    total_page_num?: number;
    setCurrentPageNum: (value: number) => void;
};

function PaginationComponent({ current_page_num, setCurrentPageNum, total_page_num }: Props) {
    const [pageNumForMove, setPageNumForMove] = useState<number>(current_page_num);
    const pageNumInput = useRef<any>();

    const pageMinusHandler = (current_page_num: number) => {
        setCurrentPageNum(current_page_num - 1);
        if (current_page_num > 0) {
        } else {
            alert("첫 페이지 입니다");
        }
    };

    const pagePlusHandler = (current_page_num: number) => {
        if (total_page_num !== undefined && current_page_num < total_page_num) {
            setCurrentPageNum(current_page_num + 1);
        } else {
            alert("마지막 페이지 입니다");
        }
    };

    // const handleInputForPageMove = (e: any) => {
    //     setPageNumForMove(e.target.value);
    // };

    const moveToPageForInputNum = () => {
        console.log("pageNumInput.current.value : ", pageNumInput.current.value);

        let page_num_to_move = pageNumInput.current.value;
        console.log("page_num_to_move", page_num_to_move);

        if (total_page_num !== undefined) {
            if (page_num_to_move <= 0) {
                alert("page는 0 이하일수 없습니다.");
                return;
            }

            if (pageNumForMove > total_page_num) {
                alert("total page 보다 큰 페이지로 이동할수 없습니다.");
                return;
            }

            if (total_page_num !== undefined && page_num_to_move < total_page_num) {
                setCurrentPageNum(pageNumInput.current.value);
            }
        }
    };

    return (
        <Flex height={12}>
            <Spacer />
            <HStack>
                <Box>
                    <Button mr={2} onClick={() => pageMinusHandler(current_page_num)}>
                        <ArrowBackIcon />
                    </Button>
                </Box>
                <Box>
                    <Input width={12} value={current_page_num} />
                    <Spacer />
                </Box>
                <Box>
                    <Button onClick={() => pagePlusHandler(current_page_num)}>
                        <ArrowForwardIcon />
                    </Button>
                </Box>
                <Box>
                    {current_page_num}/{total_page_num}
                </Box>
            </HStack>
            <Spacer />
            <Box>
                <HStack mt={1}>
                    <Input width={12} defaultValue={current_page_num} onChange={(e: any) => setPageNumForMove(e.target.value)} ref={pageNumInput} />
                    <Button onClick={moveToPageForInputNum}>Go</Button>
                </HStack>
            </Box>
            <Spacer />
        </Flex>
    );
}

export default PaginationComponent;

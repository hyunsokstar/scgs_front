import { Flex, HStack, Spacer } from "@chakra-ui/react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

type Props = {
    current_page_num: number;
    total_page_num: number | undefined;
    setCurrentPageNum: (value: number) => void;
};

function PaginationComponent({ current_page_num, setCurrentPageNum, total_page_num }: Props) {
    // return <Pagination current={current_page_num} total={total_page_num} pageSize={3} onChange={setCurrentPageNum} />;
    return (
        <Flex height={12}>
            <Spacer />
            <HStack>
                <Pagination current={current_page_num} total={total_page_num} pageSize={3} onChange={setCurrentPageNum} />
            </HStack>
            <Spacer />
            {/* <Spacer /> */}
        </Flex>
    );
}

export default PaginationComponent;

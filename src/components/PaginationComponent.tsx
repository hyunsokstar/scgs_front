import { Flex, HStack, Spacer } from "@chakra-ui/react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Select from 'rc-select';
import localeInfo from "../../src/locale/en_US";

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
                <Pagination
                    selectComponentClass={Select}
                    current={current_page_num}
                    total={total_page_num}
                    defaultPageSize={3}
                    onChange={setCurrentPageNum}
                    locale={localeInfo}
                    showQuickJumper
                    // showSizeChanger
                />
            </HStack>
            <Spacer />
            {/* <Spacer /> */}
        </Flex>
    );
}

export default PaginationComponent;

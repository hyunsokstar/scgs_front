import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchInputForShortcutHubPage from '../components/Input/SearchInputForShortcutHubPage';
import CardListForShortCutHub from '../components/Card/CardListForShortCutHub';
import { useQuery } from "@tanstack/react-query";
import { apiForShortCutHubList } from '../apis/api_for_shortcut';
import { ITypeForDataForShortCutHub } from '../types/type_for_shortcut';

// export type rowTypeForShortCutHubList = {
//     id: number;
//     title: string;
//     description: string;
//     writer: WriterType;
//     created_at: string;
//   }
  
//   export type ITypeForDataForShortCutHub = {
//     listForShortCutHub: rowTypeForShortCutHubList[]
//     totalCountForShortCutHub: number;
//     perPageForShortCutHub: number;
//   }


type Props = {};

const ShortCutHubPage: React.FC<Props> = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [pageNum, setPageNum] = useState(1);

    const {
        isLoading: isLoadingForShortcut,
        data: dataForShortCutHub,
        refetch: refetchForShortCutHubData,
    } = useQuery<ITypeForDataForShortCutHub>(
        ["apiForGetShortcutHubList", pageNum],
        apiForShortCutHubList,
        {
            enabled: true,
        }
    );

    // 검색 이벤트
    const handleSearch = (value: string) => {
        console.log('검색 버튼이 클릭되었습니다.');
        console.log('검색어:', value);
    };

    // 검색 인풋 핸들러
    const handleInputChange = (value: string) => {
        setSearchValue(value);
    };

    console.log("dataForShortCutHubData : ", dataForShortCutHub);

    if (!dataForShortCutHub) {
        return (<Box>loading..</Box>)
    }

    return (
        <Box display="flex" width="100%">
            {/* 왼쪽 2 */}
            <Box flex="2" bg="lightgrey" border={"1px dotted black"} m={2}>
                <CardListForShortCutHub dataForShortCutHub={dataForShortCutHub} />
            </Box>

            {/* 오른쪽 1 */}
            <Box flex="1" bg="lightgreen" border={"1px dotted black"} m={2}>
                <Flex justifyContent="flex-end">
                    <SearchInputForShortcutHubPage
                        searchValue={searchValue}
                        onSearch={handleSearch}
                        onInputChange={handleInputChange}
                    />
                </Flex>
            </Box>
        </Box>
    );
};

export default ShortCutHubPage;
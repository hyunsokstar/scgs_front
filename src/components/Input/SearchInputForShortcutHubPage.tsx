import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';

interface SearchInputProps {
    searchValue: string;
    onSearch: (value: string) => void;
    onInputChange: (value: string) => void;
}

const SearchInputForShortcutHubPage: React.FC<SearchInputProps> = ({ searchValue, onSearch, onInputChange }) => {
    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchValue);
        }
    };

    return (
        <InputGroup size="sm">
            <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleEnter}
            />
            <InputRightElement>
                <IconButton
                    aria-label="Search"
                    icon={<SearchIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={handleSearch}
                />
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchInputForShortcutHubPage;

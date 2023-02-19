import React, { ReactElement } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

interface Props {

}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

function HeadMenus({ }: Props): ReactElement {
    return (
        <div>

            <Menu>
                <MenuButton>Service</MenuButton>
                <MenuList>
                    <MenuItem as="a" href="building_management">건물 종합 관리</MenuItem>
                    <MenuItem>공사 관리</MenuItem>
                </MenuList>
            </Menu>

        </div>
    )
}

export default HeadMenus
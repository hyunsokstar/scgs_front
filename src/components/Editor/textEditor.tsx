import { Input } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface Props {
    
}

function TextEditor({}: Props): ReactElement {
    return (
        <div>
            <Input placeholder='"아무거나 입력'/>
        </div>
    )
}

export default TextEditor
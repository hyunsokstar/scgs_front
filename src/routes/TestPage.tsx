import React, { ReactElement } from 'react'
import TestCard from '../components/TestCard/TestCard'

const image_array = [
    { image_url: "https://a0.muscache.com/im/pictures/f18bc1db-e914-4931-aa9f-8f3a03bc22c2.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/fe92456e-6d0b-4758-a0fa-bb80bf4f4ac1.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/miso/Hosting-614812324007668898/original/c4465c6c-e664-4a7d-a313-1282656e423e.jpeg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/ad1357d0-306c-41b9-a96b-4934f3966ae5.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/8340b03d-6405-4a61-ac8a-fc9d9d445f0f.jpg?im_w=720" },
];

interface Props {

}

function TestPage({ }: Props): ReactElement {
    return (
        <div>
            <TestCard imageUrl={image_array[0].image_url} />

        </div>
    )
}

export default TestPage

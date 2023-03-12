import { Box, Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import TestSlide from '../components/test/TestSlide'

interface Props {

}

const sampleImages = [
    "https://gayou.co.kr/data/file/sliders/2039101916_6c8NQ0w3_5eabde665c90a580b6224d30a23add663761a16b.png",
    "https://gayou.co.kr/data/file/sliders/2039101916_YvEBqTJy_9634dda2f61879adafdc800f2716da8a46e0b451.png",
    "https://gayou.co.kr/data/file/sliders/2039101916_euIvNYoS_8bcdf096698f9856e7a9776a7445082ca71c157c.png",
    "https://gayou.co.kr/data/file/sliders/2039121330_Pr4uL7Uq_3d0679f38a9c703a694835458b14bca4f989931f.png",
    "https://gayou.co.kr/data/file/sliders/2039101916_6c8NQ0w3_5eabde665c90a580b6224d30a23add663761a16b.png",
    "https://gayou.co.kr/data/file/sliders/2039101916_roxNGWZk_47809c070c777a21f3648c9c72527dee9d483043.png"
]

function TestPageForGayou({ }: Props): ReactElement {
    return (
        <Box>
            <TestSlide images={sampleImages} />
        </Box>
    )
}

export default TestPageForGayou

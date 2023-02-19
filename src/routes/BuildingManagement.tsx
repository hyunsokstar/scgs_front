import React, { ReactElement } from 'react'
import { Box, Divider } from "@chakra-ui/react"


import { Grid, GridItem } from '@chakra-ui/react'
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";

import { Tabs, TabList, TabPanels, Tab, TabPanel, Image, Stack } from '@chakra-ui/react'

interface Props {

}

interface IPhoto {
    pk: string;
    file: string;
    description: string;
}

interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IPhoto[];
}

function BuildingManagement({ }: Props): ReactElement {

    const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);


    return (
        <div>
            <Box ml={100} mr={100} border='10px' borderColor='red.200'>
                <Box>
                    One Stop Total Service (종합서비스)
                </Box>
                <Box>
                    기존 관리방식을 탈피하여 One Stop Service로 고객의 Needs와 고유목적을 달성할 수 있도록 건물관리에 있어
                    최적의 상태를 유지하며, 경제성, 효율성, 기능성을 보장하고
                    건물관리와 부동산에 대한 종합적인 서비스를 제공드리고 있습니다.
                </Box>

                <Divider />

                <Grid
                    templateAreas={`
                    "header header"
                    "menu1 content1"
                    "menu2 content2"
                    "menu3 content3"
                    "menu4 content4"
                    "menu5 content5"
                  `}
                    gridTemplateRows={'1fr 1fr 1fr 1fr 1fr'}
                    gridTemplateColumns={'1fr 2fr'}
                    h='200px'
                    gap='1'
                    color='blackAlpha.700'
                    fontWeight='bold'
                // ml={10}
                // mr={10}
                >
                    <GridItem pl='2' mt={10} bg='orange.300' area={'header'}>
                        주요 서비스
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'menu1'}>
                        Management
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'menu2'}>
                        Facility
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'menu3'}>
                        SECURITY
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'menu4'}>
                        MAINTENANCE
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'menu5'}>
                        CLEANING
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'content1'}>
                        관리비관리, 회계/세무외 자산관리, 인력관리
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'content2'}>
                        건물관리, 에너지절감모니터링, 전기조명, 기계시설, 영선등
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'content3'}>
                        경비/보안업무, 화재예방감시 , CCTV설치/운영
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'content4'}>
                        주차장관리, 승강기유지관리, 소방용설비, 정화조관리
                    </GridItem>
                    <GridItem pl='2' bg='white.300' area={'content5'}>
                        건물환경 유지, 건물내.외부방역/소독업무, 조경시설
                    </GridItem>
                </Grid>

                <br />
                <h2>담당자</h2>
                <h4>문의 : 김용국 팀장
                    연락처 : 02)3660-8343 / kimyk@seoulgas.co.kr
                </h4>

                <br /><br />

                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>부동산자산관리</Tab>
                        <Tab>시설관리</Tab>
                        <Tab>보안관리</Tab>
                        <Tab>미화관리</Tab>
                        <Tab>견적문의</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel display='flex' mt='2' alignItems='center'>
                            {/* <Box display='flex' mt='2' alignItems='center'> */}

                            <Grid templateColumns={"1fr 2fr"} gap={6}>
                                <GridItem w='100%' bg='gray.200'>
                                    <Image boxSize='400px' src='https://www.scgs.co.kr/images/snn/images/sub/service01.jpg' alt='Dan Abramov' />
                                </GridItem>
                                <GridItem w='100%' bg='gray.200' >
                                    부동산자산관리
                                    asdfasdfa
                                </GridItem>
                            </Grid>


                        </TabPanel>
                        <TabPanel display='flex' mt='2' alignItems='center'>
                            <Grid templateColumns={"1fr 2fr"} gap={6}>
                                <GridItem w='100%' bg='gray.200'>
                                    <Image boxSize='400px' src='https://www.scgs.co.kr/images/snn/images/sub/service02.jpg' alt='Dan Abramov' />
                                </GridItem>
                                <GridItem w='100%' bg='gray.200' >
                                    부동산자산관리
                                    asdfasdfa
                                </GridItem>
                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                {/* <br /><br /><br /><br /><br /> */}

                <Grid
                    mt={10}
                    // px={40}
                    columnGap={4}
                    rowGap={8}
                    gap={10}
                    // templateColumns={"repeat(5, 1fr)"}
                    templateColumns={{
                        sm: "1fr",
                        md: "1fr 1fr",
                        lg: "repeat(3, 1fr)",
                        xl: "repeat(4, 1fr)",
                        "2xl": "repeat(5, 1fr)",
                    }}
                >
                    {isLoading ? (
                        <>
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                        </>
                    ) : null}
                    {data?.map((room) => (
                        <Room
                            pk={room.pk}
                            imageUrl={
                                room.photos[0] ? room.photos[0]?.file : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                            }
                            name={room.name}
                            rating={room.rating}
                            city={room.city}
                            country={room.country}
                            price={room.price}
                        />
                    ))}
                </Grid>

            </Box>
        </div>
    )
}

export default BuildingManagement

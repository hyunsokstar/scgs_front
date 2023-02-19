import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Box, Grid, Heading, Skeleton, Image, GridItem, HStack, VStack, Text, Avatar, Container } from "@chakra-ui/react";
// import { getRoom } from "../api";
// import { IRoomDetail } from "../types";

import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { FaStar } from "react-icons/fa";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews);
    const [dates, setDates] = useState<Date>();
    console.log("date : ", dates);

    return (
        <Box mt={10} px={{ base: 10, lg: 40 }}>
            <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
                <Heading>{data?.name}</Heading>
            </Skeleton>{" "}
            <Grid gap={2} height="60vh" templateRows={"repeat(2, 1fr)"} templateColumns={"repeat(4, 1fr)"} mt={8} rounded="xl" overflow={"hidden"}>
                {[0, 1, 2, 3, 4].map((index) => {
                    if (data?.photos[index]?.file !== undefined) {
                        return (
                            <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={"hidden"} key={index}>
                                <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                                    <Image w="100%" h="100%" objectFit={"cover"} src={data?.photos[index]?.file} alt="" />
                                </Skeleton>
                            </GridItem>
                        );
                    } else {
                        return (
                            <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={"hidden"} key={index}>
                                <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                                    <Image
                                        w="100%"
                                        h="100%"
                                        objectFit={"cover"}
                                        src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                        alt=""
                                    />
                                </Skeleton>
                            </GridItem>
                        );
                    }
                })}
            </Grid>
            <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} height={"30px"}>
                        <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} height={"30px"}>
                        <HStack justifyContent={"flex-start"} w="100%">
                            <Text>
                                {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>∙</Text>
                            <Text>
                                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
            </HStack>
            <Box mt={10}>
                <Heading fontSize={"2xl"}>
                    <HStack>
                        <FaStar /> <Text>{data?.rating}</Text>
                        <Text>∙</Text>
                        <Text>
                            {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
                        </Text>
                    </HStack>
                </Heading>
                <Container mt={16} maxW="container.lg" marginX="none">
                    <Grid gap={10} templateColumns={"1fr 1fr"}>
                        <Box>
                            {reviewsData?.map((review, index) => (
                                <VStack alignItems={"flex-start"} key={index}>
                                    <HStack>
                                        <Avatar name={review.user.name} src={review.user.avatar} size="md" />

                                        <VStack spacing={0} alignItems={"flex-start"}>
                                            <Heading fontSize={"md"}>{review.user.name}</Heading>
                                            <HStack spacing={1}>
                                                <FaStar size="12px" />
                                                <Text>{review.rating}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                    <Text>{review.payload}</Text>
                                </VStack>
                            ))}
                        </Box>
                        <Box>
                            <Calendar
                                onChange={setDates}
                                // value={value}
                                prev2Label={null} // 년도 앞으로 버튼 없애기
                                next2Label={null} // 년도 뒤로 버튼 없애기
                                minDetail="month" // 년도 선택 금지
                                minDate={new Date()} // 현시점 이후 선택 가능 하도록 하기
                                maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)} // 선택 가능 범위 제한 하기 (밀리 세컨즈 단위로 계산, 현시점에서 6개월 정도)
                                selectRange // 선택한 두 범위 사이 색 칠해지도록
                            />{" "}
                            <br />
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

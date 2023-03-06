import { Box, Text, Image, Flex, Button, IconButton, Container, Badge, HStack, VStack, Icon } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTutorialsList } from "../../apis/tutorial_api";
import { ITutorialListType } from "../../types/tutorial_type";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import useUser from "../../lib/useUser";
import ModalForCreateTutorial from "../modal/ModalForCreateTutorial";
import ModalButtonForUpdateTutorialCard from "../modal/ModalButtonForUpdateTutorialCard";
import DeleteButtonForTutorial from "../DeleteButtonForTutorial";


const alt_image = "https://a0.muscache.com/im/pictures/21b7c945-10c9-481d-9e8e-04df36c6ec2c.jpg?im_w=1200";


const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return <IconButton style={{ backgroundColor: "red", position: "absolute", top: "220px", right: "-39px" }} aria-label="previous" icon={<ArrowRightIcon />} onClick={onClick} />;
};

function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <IconButton
            style={{ backgroundColor: "red", position: "absolute", top: "220px", left: "-39px" }}
            aria-label="previous"
            icon={<ArrowLeftIcon zIndex={5} />}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    dotsClass: "slick-dots my-dots-class",

    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 1224,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
};

const TutorialList = () => {
    const { userLoading, isLoggedIn, user } = useUser();

    const {
        isLoading: tutorialListDataLoading,
        data: tutorialListData,
        refetch: refetchTutorialList,
    } = useQuery<ITutorialListType>(["tutorials"], getTutorialsList, {
        enabled: true,
    });

    console.log("tutorialListData : ", tutorialListData);

    return (
        <Container maxW={"100%"} height={540} bgColor={"gray.100"} border={"2px solid blue"}>

            <Box border={"0px solid red"} >
                {user && user.admin_level > 0 ? (
                    <Box border={"0px solid green"} width="97%" mx={"auto"} mt={1} mr={0}>
                        <ModalForCreateTutorial refetchTutorialList={refetchTutorialList} />

                    </Box>
                ) : (
                    ""
                )}

                {!tutorialListDataLoading && tutorialListData && tutorialListData.length ? (
                    <Slider {...settings}>
                        {tutorialListData?.map((tutorial) => (
                            <HStack>

                                <Box ml={1.5} mb={1} border={"0px solid blue"} width={"80%"}>
                                    <Flex justifyContent={"flex-end"}>
                                        <ModalButtonForUpdateTutorialCard
                                            tutorialPk={tutorial.pk}
                                            refetchTutorialList={refetchTutorialList}
                                        />
                                        <DeleteButtonForTutorial
                                            tutorialPk={tutorial.pk}
                                            refetchTutorialList={refetchTutorialList}
                                        />
                                    </Flex>

                                </Box>
                                <Box borderWidth="1px" borderRadius="lg" width={"80%"} height={"100%"} border="1px solid black" >
                                    <Box border={"1px solid green"}>

                                        <Box border={"1px solid blue"}>
                                            <Image
                                                src={tutorial.tutorial_image ? tutorial.tutorial_image : alt_image}
                                                alt={tutorial.tutorial_image}
                                                objectFit={"fill"}
                                                height={220}
                                                width={1100}
                                            />
                                        </Box>
                                        <Box border="0px solid black" height={200} position={"relative"}>
                                            <Flex justify="space-between" align="center" p={1}>
                                                <Text fontSize={"16px"} as="h3" fontWeight="bold">
                                                    {tutorial.title}
                                                </Text>
                                                <Text fontWeight="bold">{tutorial.price}</Text>
                                            </Flex>
                                            <Box overflow="hidden" textOverflow="ellipsis" border="0px solid black" height={20} p={1}>
                                                <Text mt="2" fontSize="md">
                                                    {tutorial.description}
                                                </Text>
                                            </Box>
                                            <Box border={"1px solid blue"} position={"absolute"} bottom={0} width={"100%"}>
                                                <HStack p={1}>
                                                    <Box border={"0px solid blue"}>
                                                        by {tutorial.teacher}
                                                    </Box>
                                                    <Box>
                                                        <Badge size="sm" ml={0}>{tutorial.backend_framework_option}</Badge>
                                                        <Badge size="sm" ml={0}>{tutorial.frontend_framework_option}</Badge>
                                                    </Box>
                                                </HStack>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </HStack>
                        ))}
                    </Slider>
                ) : (
                    <Box w="200px" h="100px" bg="blue.500">
                        "Loading"
                    </Box>
                )}
            </Box>
        </Container >
    );
};

export default TutorialList;
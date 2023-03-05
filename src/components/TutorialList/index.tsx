import { Box, Text, Image, Flex, Button, IconButton, Container, Badge } from "@chakra-ui/react";
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
    slidesToShow: 3,
    slidesToScroll: 3,
    dotsClass: "slick-dots my-dots-class",
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
        <Container maxW={"100%"} height={540} bgColor={"gray.300"} border="0px solid red" mx={"auto"}>
            {user && user.admin_level > 2 ? (
                <Box border={"1px solid green"} width="100%" display="flex" justifyContent="flex-end">
                    {/* <Button variant="solid" colorScheme="red" mr={3} mt={2}>
                        tutorial 추가
                    </Button> */}
                    <ModalForCreateTutorial />
                </Box>
            ) : (
                ""
            )}

            <Box>
                {!tutorialListDataLoading ? (
                    <Slider {...settings}>
                        {tutorialListData?.map((tutorial) => (
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width={"80%"} height={"100%"} border="0px solid black" p={5}>
                                <Box border={"1px solid green"} position={"relative"}>
                                    <Box border={"1px solid blue"}>
                                        <Image
                                            src={tutorial.tutorial_image ? tutorial.tutorial_image : alt_image}
                                            alt={tutorial.tutorial_image}
                                            objectFit={"fill"}
                                            height={220}
                                            width={1100}
                                        />
                                    </Box>
                                    <Box p="2" border="0px solid black" height={200}>
                                        <Flex justify="space-between" align="center">
                                            <Text fontSize={"20px"} as="h3" fontWeight="bold">
                                                {tutorial.title}
                                            </Text>
                                            <Text fontWeight="bold">$20</Text>
                                        </Flex>
                                        <Box overflow="hidden" textOverflow="ellipsis" border="0px solid black" height={20}>
                                            <Text mt="2" fontSize="md">
                                                {tutorial.description}
                                            </Text>
                                        </Box>
                                        <Flex mt={12}>
                                            <Box w="50%" border={"0px solid blue"}>
                                                by {tutorial.teacher}
                                            </Box>
                                            <Box w="50%">
                                                <Badge size="sm" ml={2}>{tutorial.backend_framework_option}</Badge>
                                                <Badge size="sm" ml={2}>{tutorial.frontend_framework_option}</Badge>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                ) : (
                    "Loading"
                )}
            </Box>
        </Container>
    );
};

export default TutorialList;

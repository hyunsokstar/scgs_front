import { Box, Text, Card, Image, CardBody, Flex, Heading, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const images = [
    {
        id: 1,
        src: "https://a0.muscache.com/im/pictures/21b7c945-10c9-481d-9e8e-04df36c6ec2c.jpg?im_w=1200",
        alt: "image 1",
    },
    {
        id: 2,
        src: "https://a0.muscache.com/im/pictures/5b6242a9-8832-432b-ac79-38de2a3d0b0d.jpg?im_w=960",
        alt: "image 2",
    },
    {
        id: 3,
        src: "https://a0.muscache.com/im/pictures/de391628-f988-40dc-9916-8d1ac6e2f3c6.jpg?im_w=1200",
        alt: "image 3",
    },
    {
        id: 4,
        src: "https://a0.muscache.com/im/pictures/e3b75baa-3593-4e9d-9f5a-8a82b337d57a.jpg?im_w=1200",
        alt: "image 1",
    },
    {
        id: 5,
        src: "https://a0.muscache.com/im/pictures/bdaa5260-6f82-4af0-b7f1-24ad4994223f.jpg?im_w=720",
        alt: "image 2",
    },
    {
        id: 6,
        src: "https://a0.muscache.com/im/pictures/0cc77627-1a6b-40c4-b4af-2ef94ee2ddf1.jpg?im_w=720",
        alt: "image 3",
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const ImageSlide = () => {
    return (
        <Box p={4} bgColor={"gray.300"} pl={20} pr={20} pb={10}>
            {/* <Text fontSize="xl" fontWeight="bold" mb={4} textAlign={"center"}>
        Image Slider
      </Text> */}
            <Slider {...settings}>
                {images.map((image) => (
                    // <Box key={image.id} textAlign="center">
                    //     <Card maxW={800} height={380} ml={"auto"} mr={"auto"} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    //         <Image src={image.src} alt={image.alt} width={"100%"} height={"90%"} objectFit={"fill"} />
                    //         <CardBody >
                    //           <Link to="/users">유저 리스트</Link>
                    //         </CardBody>
                    //     </Card>
                    // </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width={"80%"} height={"35%"} padding={3}>
                        <Image src={image.src} alt={image.alt} objectFit={"cover"} height={250} width={1100} />
                        <Box p="6">
                            <Flex justify="space-between" align="center">
                                <Heading as="h2" fontWeight="bold">
                                    Card Title
                                </Heading>
                                <Text fontWeight="bold">$20</Text>
                            </Flex>
                            <Text mt="4" fontSize="md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus urna nec eros facilisis, at facilisis nisl rutrum.
                            </Text>
                            <Button mt="6" colorScheme="blue">
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ImageSlide;

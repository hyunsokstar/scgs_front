import React, { useState } from 'react';
import Slider from 'react-slick';
import { Box, Button, IconButton, Img } from '@chakra-ui/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
// import './ImageSlider.css';

type ImageSliderProps = {
    images: string[];
};

const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        // <IconButton
        //     style={{ backgroundColor: "red", position: "absolute", top: "45%", right: "120px" }}
        //     aria-label="previous"
        //     icon={<ArrowRightIcon />}
        //     onClick={onClick}
        // />
        <IconButton
            aria-label="Arrow Right Icon Button"
            icon={<ArrowRightIcon />}
            bg="transparent"
            fontSize="50px"
            _hover={{ fontWeight: "bold", color: "blue.1000", backgroundColor: "gray.100" }}
            style={{ position: "absolute", top: "40%", right: "120px", width: "58px", height: "58px" }}
            onClick={onClick}
            zIndex={2}
        />
    );
};

function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <IconButton
            aria-label="Arrow Left Icon Button"
            icon={<ArrowLeftIcon />}
            bg="transparent"
            fontSize="50px"
            _hover={{ fontWeight: "bold", color: "blue.1000", backgroundColor: "gray.100" }}
            style={{ position: "absolute", top: "40%", left: "120px", width: "58px", height: "58px" }}
            onClick={onClick}
            zIndex={2}
        />
    );
}

const TestSlide: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => {
            setCurrentIndex(next);
        },
        centerMode: true,
        centerPadding: '200px',
        style: { margin: "0 20px" },
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const handleImageChange = (index: number) => {
        setCurrentIndex(index);
    };

    const slideStyles = (index: number) => {
        if (index === currentIndex) {
            return {};
        } else if (index < currentIndex) {
            return {
                filter: "blur(2px)",
                opacity: 0.5,
            };
        } else {
            return {
                filter: "blur(2px)",
                opacity: 0.5,
            };
        }
    };


    return (
        <Box position="relative" mt={3}>

            <Slider {...settings}>
                {images && images.map((image, index) => (
                    <Box
                        mx={"auto"}
                        border={"0px solid blue"}
                    >
                        <Box
                            mx={"auto"}
                            border={"1px solid pink"}
                            width={"717px"}
                            height={"386px"}
                            borderRadius="xl"
                            overflow="hidden"
                        >
                            <Img
                                style={slideStyles(index)}
                                src={image}
                                alt={`image-${index}`}
                                onClick={() => handleImageChange(index)}
                                objectFit={"cover"}
                            />

                        </Box>
                    </Box>
                ))}
            </Slider>

            <Box
                position="absolute"
                bottom="1rem"
                left="50%"
                transform="translateX(-50%)"
                fontWeight="bold"
            >
                {currentIndex + 1} / {images.length}
            </Box>
        </Box>
    );
};

export default TestSlide;

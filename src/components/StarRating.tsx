import { useState } from "react";
import { Flex, IconButton, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
    initialRating?: number;
};

const StarRating = ({ initialRating = 0 }: Props) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (newRating: number) => {
        setRating(newRating);
    };

    return (
        <Flex>
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                const isSelected = rating >= starRating;
                return (
                    <IconButton
                        key={index}
                        aria-label={`rating-${starRating}`}
                        size="sm"
                        onClick={() => handleClick(starRating)}
                        ml={1}
                        icon={
                            <Icon
                                as={StarIcon}
                                w={3}
                                h={3}
                                color={isSelected ? "teal.500" : "gray.300"}
                            />
                        }
                    />
                );
            })}
        </Flex>
    );
};

export default StarRating;
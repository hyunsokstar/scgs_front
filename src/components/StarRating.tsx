import { useState } from "react";
import { Flex, IconButton, Icon, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  initialRating?: number | string;
  taskPk: string | number;
  onChangeForStarRatingHandler?: ({ taskPk, newRating }: any) => void;
};

const StarRating = ({
  initialRating = 0,
  taskPk,
  onChangeForStarRatingHandler,
}: Props) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (star_count: any) => {
    console.log("taskPk, newRating for handle click", taskPk, star_count);

    if (onChangeForStarRatingHandler) {
      onChangeForStarRatingHandler({ taskPk, star_count });
      setRating(star_count);
    }
  };

  return (
    <Box display="flex" w={"80px"}>
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
            bgColor={"green.100"}
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
    </Box>
  );
};

export default StarRating;

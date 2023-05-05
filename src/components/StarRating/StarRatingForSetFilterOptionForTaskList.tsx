import { useState } from "react";
import { Box, IconButton, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  initialRating?: number | string;
  rating: number
  setRating: any
};

const StarRatingForSetFilterOptionForTaskList = ({
  initialRating = 1,
  rating,
  setRating,
}: Props) => {

  const handleClick = (star_count: number) => {
    setRating(star_count);
  };

  return (
    <Box display="flex">
      {[...Array(5)].map((_, index: number) => {
        const starRating = index + 1;
        const isSelected = rating >= starRating;

        return (
          <IconButton
            icon={<StarIcon color={isSelected ? "teal.500" : "gray.300"} />}
            onClick={() => handleClick(starRating)}
            aria-label={`Select ${starRating} star`}
            mr={1}
          />
        );
      })}
    </Box>
  );
};

export default StarRatingForSetFilterOptionForTaskList;


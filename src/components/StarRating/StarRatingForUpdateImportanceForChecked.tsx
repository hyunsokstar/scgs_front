import { useState } from "react";
import { Box, IconButton, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  initialRating?: number | string;
  checkedRowPks: number[];
  rating: number;
  setRating: any;
  button_size: string;
};

const StarRatingForUpdateImportanceForChecked = ({
  initialRating = 1,
  rating,
  setRating,
  checkedRowPks,
  button_size = "md",
}: Props) => {
  const handleClick = (star_count: number) => {
    // console.log("checkedRowPks : ", checkedRowPks);
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
            size={button_size}
            mr={1}
          />
        );
      })}
    </Box>
  );
};

export default StarRatingForUpdateImportanceForChecked;

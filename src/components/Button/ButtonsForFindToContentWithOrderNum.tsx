import { Box, Button } from "@chakra-ui/react";

interface Props {
  numCards: number | undefined;
  handleMoveToClick: (order: number) => void;
}

const ButtonsForFindToContentWithOrderNum = ({
  numCards,
  handleMoveToClick,
}: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      flexWrap={"wrap"}
      gap={2}
      px={2}
    >
      {[...Array(numCards)].map((_, i: number) => (
        <Button
          key={`button_for_${i}`}
          size={"sm"}
          variant={"outline"}
          _hover={{ bg: "rgba(0, 0, 255, 0.2)" }}
          onClick={() => handleMoveToClick(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </Box>
  );
};

export default ButtonsForFindToContentWithOrderNum;

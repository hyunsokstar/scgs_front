import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = ButtonProps & {
  button_text: string;
  due_date_option:
    | "undecided"
    | "until-yesterday"
    | "until-noon"
    | "until-evening"
    | "until-night"
    | "until-tomorrow"
    | "until-the-day-after-tomorrow"
    | "until-this-week"
    | "until-this-month"
    | undefined;
  due_date_option_for_filtering: string | undefined;
  set_due_date_option_for_filtering: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const ButtonForFilteringTaskForDueDate = ({
  button_text,
  due_date_option,
  due_date_option_for_filtering,
  set_due_date_option_for_filtering,
}: Props) => {
  const onClickHandler = () => {
    set_due_date_option_for_filtering(due_date_option);
  };

  return (
    <Button
      size="xs"
      variant="outline"
      border={"1px solid black"}
      bg={due_date_option === due_date_option_for_filtering ? "blue.300" : ""}
      _hover={{ bg: "blue.300" }}
      onClick={() => onClickHandler()}
    >
      {button_text}
    </Button>
  );
};

export default ButtonForFilteringTaskForDueDate;

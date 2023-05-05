import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = ButtonProps & {
  button_text: string;
  due_date_option:
    | "undecided"
    | "until-noon"
    | "until-evening"
    | "until-tomorrow"
    | "until-the-day-after-tomorrow"
    | "until-this-week"
    | "until-this-month";
  due_date_option_for_filtering: string;
  set_due_date_option_for_filtering: React.Dispatch<
    React.SetStateAction<string>
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
      size="sm"
      variant="outline"
      bg={
        due_date_option === due_date_option_for_filtering
          ? "blue.300"
          : ""
      }
      _hover={{ bg: "blue.300" }}
      onClick={() => onClickHandler()}
    >
      {button_text}
    </Button>
  );
};

export default ButtonForFilteringTaskForDueDate;

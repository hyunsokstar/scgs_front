import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ButtonForFilteringTaskForDueDate from "./ButtonForFilteringTaskForDueDate";

interface ButtonsForSelectOptionForDueDateForUncompletedTaskListProps {
  due_date_option_for_filtering: string | undefined;
  set_due_date_option_for_filtering: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

const ButtonsForSelectOptionForDueDateForUncompletedTaskList: React.FC<
  ButtonsForSelectOptionForDueDateForUncompletedTaskListProps
> = ({ due_date_option_for_filtering, set_due_date_option_for_filtering }) => {
  return (
    <>
      <Box display={"flex"} gap={2} mt={1}>
        <ButtonForFilteringTaskForDueDate
          button_text="Undetermined"
          due_date_option="undecided"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="Until Yesterday"
          due_date_option="until-yesterday"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="Until Noon"
          due_date_option="until-noon"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="until Evening"
          due_date_option="until-evening"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="until Night"
          due_date_option="until-night"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />
      </Box>

      <Box display={"flex"} gap={2} mt={1}>
        <ButtonForFilteringTaskForDueDate
          button_text="until Tomorrow"
          due_date_option="until-tomorrow"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="until Day After Tomorrow"
          due_date_option="until-the-day-after-tomorrow"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="Until This Week"
          due_date_option="until-this-week"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />

        <ButtonForFilteringTaskForDueDate
          button_text="Until This Month"
          due_date_option="until-this-month"
          due_date_option_for_filtering={due_date_option_for_filtering}
          set_due_date_option_for_filtering={set_due_date_option_for_filtering}
        />
      </Box>
    </>
  );
};

export default ButtonsForSelectOptionForDueDateForUncompletedTaskList;

import React from 'react';
import { useLocation } from "react-router-dom";
import { Box } from '@chakra-ui/react';

interface Props {}

const UncompltedTaskListWithImageSlideForCheckedPage = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkedRowPks = queryParams.get("checkedRowPks")?.split(",") || [];

  return (
    <Box>
      UncompltedTaskListWithImageSlideForCheckedPage
      <ul>
        {checkedRowPks.map((rowPk) => (
          <li key={rowPk}>{rowPk}</li>
        ))}
      </ul>
    </Box>
  );
};

export default UncompltedTaskListWithImageSlideForCheckedPage;

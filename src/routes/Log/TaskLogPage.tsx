// ui
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'

// data
import { useQuery } from "@tanstack/react-query";
import { apiForGetTaskLogList } from '../../apis/project_progress_api';


interface Props {
    
}

const TaskLogPage = (props: Props) => {
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);

    const {
        isLoading: loadingForTaskLog,
        data: dataForTaskLogs,
        refetch: refetchForTaskLogs,
      } = useQuery<any>(
        ["apiForGetTaskLogList", currentPageNum],
        apiForGetTaskLogList,
        {
          enabled: true,
        }
      );

    console.log("dataForTaskLogs : ", dataForTaskLogs);

    return (
        <Box>
            TaskLogPage
        </Box>
    )
}

export default TaskLogPage


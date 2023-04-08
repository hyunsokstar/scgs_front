import React, { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type_for_api_for_api_docu_list } from "../types/api_docu_type";
import { get_api_docu_list } from "../apis/api_docu_api";
import { Box } from "@chakra-ui/react";
import TableForDocuList from "../components/TableForDocuList";

type Props = {};

const ApiDocuPage = (props: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const {
    isLoading: loading_for_api_docu_list,
    data: data_for_api_docu_list,
    refetch: refetch_for_api_docu,
  } = useQuery<type_for_api_for_api_docu_list>(
    ["get_api_docu_list", currentPageNum],
    get_api_docu_list,
    {
      enabled: true,
    }
  );
  console.log("data_for_api_docu_list : ", data_for_api_docu_list);

  if (loading_for_api_docu_list || !data_for_api_docu_list) {
    return <Box>Loading for ApiDocu..</Box>;
  }

  return (
    <Box>
      <TableForDocuList
        data_for_api_docu_list={data_for_api_docu_list.api_docu_list}
      />
    </Box>
  );
};

export default ApiDocuPage;

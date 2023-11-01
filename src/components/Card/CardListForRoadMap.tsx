import {
  Grid,
  Box,
  Text,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { DataTypeForRoadMapList } from "../../types/study_note_type";
import PaginationComponent from "../PaginationComponent";
import CardForRoadMapList from "./CardForRoadMapList";

interface IProps {
  dataForRoadMap: DataTypeForRoadMapList;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const CardListForRoadMap = ({
  dataForRoadMap,
  pageNum,
  setPageNum,
}: IProps) => {


  if (!dataForRoadMap) {
    return <Box>...Loading</Box>;
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} height={"60%"}>
        <CardForRoadMapList listForRoadMap={dataForRoadMap.listForRoadMap} />
      </Grid>
      {dataForRoadMap.listForRoadMap ? (
        <Box maxW="100%" bg="blue.100" color="red.500" mt={2}>
          <PaginationComponent
            total_page_num={dataForRoadMap.totalCount}
            task_number_for_one_page={dataForRoadMap.perPage}
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default CardListForRoadMap;

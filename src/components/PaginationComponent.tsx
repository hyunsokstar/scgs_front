import { Flex, HStack, Spacer } from "@chakra-ui/react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Select from "rc-select";
import localeInfo from "../../src/locale/en_US";

type Props = {
  current_page_num?: number;
  total_page_num?: number | undefined;
  setCurrentPageNum?: any;
  task_number_for_one_page? : number;
};

function PaginationComponent({
  current_page_num,
  setCurrentPageNum,
  total_page_num,
  task_number_for_one_page
}: Props) {
  //   console.log(
  //     "current_page_num, , total_page_num : ",
  //     current_page_num,
  //     // setCurrentPageNum,
  //     total_page_num
  //   );

  return (
    <Flex height={10}>
      <Spacer />
      <HStack>
        <Pagination
          selectComponentClass={Select}
          current={current_page_num}
          total={total_page_num}
          defaultPageSize={task_number_for_one_page ? task_number_for_one_page : 5}
          onChange={setCurrentPageNum}
          locale={localeInfo}
          showQuickJumper
          // showSizeChanger
        />
      </HStack>
      <Spacer />
      {/* <Spacer /> */}
    </Flex>
  );
}

export default PaginationComponent;

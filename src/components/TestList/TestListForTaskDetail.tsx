import {
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  Checkbox,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

interface DataItemProps {
  id: number;
  isChecked: boolean;
  testDescription: string;
  checkerList: string;
  createdAt: string;
  modifiedAt: string;
}

const headerColumns: string[] = [
  "체크 박스",
  "test_description",
  "checker_list",
  "created_at",
  "modified_at",
];

const dataRows: DataItemProps[] = [
  {
    id: 1,
    isChecked: false,
    testDescription: "Lorem ipsum dolor sit amet",
    checkerList: "Lorem, ipsum, dolor",
    createdAt: "2022-03-01",
    modifiedAt: "2022-03-10",
  },
  {
    id: 2,
    isChecked: false,
    testDescription: "Consectetur adipiscing elit",
    checkerList: "Sed, do, eiusmod",
    createdAt: "2022-02-15",
    modifiedAt: "2022-03-05",
  },
  {
    id: 3,
    isChecked: true,
    testDescription: "Duis aute irure dolor in reprehenderit",
    checkerList: "Labore, et, dolore",
    createdAt: "2022-03-20",
    modifiedAt: "2022-03-25",
  },
  {
    id: 4,
    isChecked: false,
    testDescription: "Lorem ipsum dolor sit amet",
    checkerList: "Lorem, ipsum, dolor",
    createdAt: "2022-03-01",
    modifiedAt: "2022-03-10",
  },
  {
    id: 5,
    isChecked: false,
    testDescription: "Consectetur adipiscing elit",
    checkerList: "Sed, do, eiusmod",
    createdAt: "2022-02-15",
    modifiedAt: "2022-03-05",
  },
  {
    id: 6,
    isChecked: true,
    testDescription: "Duis aute irure dolor in reprehenderit",
    checkerList: "Labore, et, dolore",
    createdAt: "2022-03-20",
    modifiedAt: "2022-03-25",
  },
  {
    id: 7,
    isChecked: false,
    testDescription: "Lorem ipsum dolor sit amet",
    checkerList: "Lorem, ipsum, dolor",
    createdAt: "2022-03-01",
    modifiedAt: "2022-03-10",
  },
  {
    id: 8,
    isChecked: false,
    testDescription: "Consectetur adipiscing elit",
    checkerList: "Sed, do, eiusmod",
    createdAt: "2022-02-15",
    modifiedAt: "2022-03-05",
  },
  {
    id: 9,
    isChecked: true,
    testDescription: "Duis aute irure dolor in reprehenderit",
    checkerList: "Labore, et, dolore",
    createdAt: "2022-03-20",
    modifiedAt: "2022-03-25",
  },
  {
    id: 10,
    isChecked: false,
    testDescription: "Consectetur adipiscing elit",
    checkerList: "Sed, do, eiusmod",
    createdAt: "2022-02-15",
    modifiedAt: "2022-03-05",
  },
  {
    id: 11,
    isChecked: true,
    testDescription: "Duis aute irure dolor in reprehenderit",
    checkerList: "Labore, et, dolore",
    createdAt: "2022-03-20",
    modifiedAt: "2022-03-25",
  },
];

function CheckboxIcon({ isChecked }: { isChecked: boolean }) {
  return isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />;
}

function HeaderItem({ children }: { children: string }) {
  return (
    <Box
      as="span"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="sm"
      color="gray.500"
      pl={2}
    >
      {children}
    </Box>
  );
}

function DataItem({ testDescription, checkerList, modifiedAt }: DataItemProps) {
  return (
    <ListItem
      display="flex"
      alignItems="center"
      overflowX={"auto"}
      width={"1200px"}
      my={1}
    >
      <Flex border={"0px solid green"} width="35px">
        <Checkbox ml={2} />
      </Flex>
      <Box display={"flex"} justifyContent="space-between" gap="5">
        <Text border={"0px solid blue"} width="450px">
          {testDescription}
        </Text>
        {/* <Flex
          justifyContent={"space-between"}
          border="1px solid green"
          width="200px"
        >
          <Box>{checkerList}</Box>
          <IconButton icon={<AddIcon />} aria-label="Add checker" size="xs" />
        </Flex> */}
        <Box border="1px solid purple" width="150px">
          성공 여부
        </Box>
        <Box border="1px solid purple" width="30px" textAlign={"center"}>
          <DeleteIcon />
        </Box>
      </Box>
    </ListItem>
  );
}

function TestListForTaskDetail() {
  return (
    <List spacing={3} height="280px" overflowY="auto">
      {dataRows.map((dataItem) => (
        <DataItem
          key={dataItem.id}
          isChecked={dataItem.isChecked}
          testDescription={dataItem.testDescription}
          checkerList={dataItem.checkerList}
          createdAt={dataItem.createdAt}
          modifiedAt={dataItem.modifiedAt}
          id={0}
        />
      ))}
    </List>
  );
}

export default TestListForTaskDetail;

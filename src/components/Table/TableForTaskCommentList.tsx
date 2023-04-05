import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Avatar,
  HStack,
} from "@chakra-ui/react";

import { Button, ButtonGroup, Flex, Icon } from "@chakra-ui/react";
import { CheckIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { ITaskComment } from "../../types/project_progress/project_progress_type";

type Comment = {
  author: string;
  comment: string;
  created_at: string;
};

type IProps = {
  task_comments: ITaskComment[];
};

const TableForTaskCommentList = ({ task_comments }: IProps) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [comments, setComments] = useState(task_comments);
  console.log("task_comments : ", task_comments);

  useEffect(() => {}, []);

  const handleSelectRow = (rowIndex: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRows.delete(rowIndex);
    } else {
      newSelectedRows.add(rowIndex);
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <Box>
      <Box>
        <ButtonGroup
          variant="outline"
          size="md"
          borderRadius="full"
          width={"100%"}
        >
          <Flex
            width={"100%"}
            alignItems="center"
            justifyContent="space-between"
            my={2}
            pl={3}
          >
            <Button
              leftIcon={<Icon as={CheckIcon} boxSize={4} />}
              _hover={{ bg: "green.100" }}
            >
              All Check
            </Button>
            <HStack gap={2}>
              <Button
                leftIcon={<Icon as={AddIcon} boxSize={4} />}
                _hover={{ bg: "purple.100" }}
              >
                Create
              </Button>
              <Button
                leftIcon={<Icon as={DeleteIcon} boxSize={4} />}
                _hover={{ bg: "pink.100" }}
              >
                Delete
              </Button>
            </HStack>
          </Flex>
        </ButtonGroup>
      </Box>

      <Box height={"550px"} overflowY={"scroll"} p={5}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th width="50px">
                <Checkbox
                  isChecked={selectedRows.size === comments.length}
                  onChange={() => {
                    if (selectedRows.size === comments.length) {
                      setSelectedRows(new Set());
                    } else {
                      setSelectedRows(new Set(comments.map((_, i) => i)));
                    }
                  }}
                />
              </Th>
              <Th>writers</Th>
              <Th>comment</Th>
              <Th>created_at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment, i) => (
              <Tr
                key={i}
                backgroundColor={selectedRows.has(i) ? "blue.50" : undefined}
              >
                <Td width="50px">
                  <Checkbox
                    isChecked={selectedRows.has(i)}
                    onChange={() => handleSelectRow(i)}
                  />
                </Td>
                <Td>
                  <Avatar
                    size="sm"
                    src={comment.writer.profile_image}
                    //   alt="Profile Image"
                  />
                </Td>
                <Td>{comment.comment}</Td>
                <Td>{comment.created_at_formatted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableForTaskCommentList;

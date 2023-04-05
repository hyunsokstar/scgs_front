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
} from "@chakra-ui/react";
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

const comments_sample = [
  {
    author: "John Doe",
    comment: "This is a great comment!",
    created_at: "2022-04-01 09:00:00",
  },
  {
    author: "Jane Smith",
    comment: "I agree with John, great comment!",
    created_at: "2022-04-02 10:00:00",
  },
];

for (let i = 0; i < 8; i++) {
  comments_sample.push({
    author: faker.name.findName(),
    comment: faker.lorem.sentence(),
    created_at: faker.date.recent().toISOString(),
  });
}

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
  );
};

export default TableForTaskCommentList;

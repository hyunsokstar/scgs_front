import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MdDelete as DeleteIcon } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete as TrashIcon } from "react-icons/md";
import TextAreaForCopyTextUsingButton from "../TextArea/TextAreaForCopyTextUsingButton";
import ModalButtonForCreateRelatedShortcut from "../modal/ModalButtonForCreateRelatedShortcut";
import {
  apiForDeleteRelatedShortcutByPk,
  apiForDeleteRelatedShortcutForCheckedRow,
} from "../../apis/api_for_shortcut";

interface Shortcut {
  id: number;
  shortcut_content: string;
  description: string;
  created_at: string;
  shortcut: number;
}

interface ListForRelatedShortcutListProps {
  shortcutId: number;
  data: Shortcut[];
}

const ListForRelatedShortcutList = ({
  shortcutId,
  data,
}: ListForRelatedShortcutListProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (allChecked) {
      setSelectedRows(data.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  }, [allChecked, data]);

  const mutationForDeleteRelatedShortcutByPk = useMutation(
    (pk: number) => {
      return apiForDeleteRelatedShortcutByPk(pk);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["getRelatedShortCutList"]);
        toast({
          title: "delete related shortcut 성공!",
          status: "success",
        });
      },
    }
  );

  const handleDelete = (pk: number) => {
    mutationForDeleteRelatedShortcutByPk.mutate(pk);
    console.log("Delete button clicked : ", pk);
  };

  const handleAllCheck = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleRowCheck = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const mutationForDeleteCheckedRows = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteRelatedShortcutForCheckedRow(checkedRowPks);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setSelectedRows([]);
        queryClient.refetchQueries(["getRelatedShortCutList"]);

        toast({
          title: "Delete Related Shortcut For Checked Rows 성공!",
          status: "success",
        });
      },
    }
  );

  const buttonHandlerForDeleteChekcedRows = () => {
    console.log("selectedRows : ", selectedRows);

    if (selectedRows.length) {
      //   alert(selectedRows);
      mutationForDeleteCheckedRows.mutate(selectedRows);
    } else {
      alert("하나 이상의 row 를 선택 해주세요");
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outline"
          size="md"
          _hover={{ backgroundColor: "teal.100" }}
          onClick={buttonHandlerForDeleteChekcedRows}
        >
          <DeleteIcon />
          Delete for Checked Row
        </Button>

        <ModalButtonForCreateRelatedShortcut
          shortcutId={shortcutId}
          buttonText={"Create Related Shortcut"}
        />
      </Box>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                size="md"
                border={"1px solid gray"}
                id="allcheck"
                onChange={(e) => handleAllCheck(e.target.checked)}
                isChecked={allChecked}
              />
            </Th>
            <Th>Shortcut Content</Th>
            <Th>Description</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    value={item.id}
                    isChecked={selectedRows.includes(item.id)}
                    onChange={(e) => handleRowCheck(item.id, e.target.checked)}
                  />
                </Td>
                <Td>
                  <TextAreaForCopyTextUsingButton
                    text={item.shortcut_content}
                  />
                </Td>
                <Td>{item.description}</Td>
                <Td>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleDelete(item.id)}
                    _hover={{ bg: "red.100" }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3}>No data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ListForRelatedShortcutList;

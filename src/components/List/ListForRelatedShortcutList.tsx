import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Icon,
  Text,
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
import { AiOutlineInfoCircle } from "react-icons/ai";

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

  //   useEffect(() => {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       if (e.altKey && e.key >= "1" && e.key <= "9") {
  //         const index = parseInt(e.key, 10) - 1; // Convert to 0-based index
  //         if (index < data.length) {
  //           // Copy the shortcut content of the index-th row
  //           const shortcutContent = data[index].shortcut_content;
  //           //   alert("click check : " + shortcutContent);
  //           toast({
  //             title: `Copied: ${shortcutContent}`,
  //             status: "success",
  //             duration: 1000,
  //             position: "top",
  //             isClosable: true,
  //           });
  //           navigator.clipboard.writeText(shortcutContent);
  //         }
  //       }
  //     };

  //     window.addEventListener("keydown", handleKeyDown);

  //     // Cleanup function
  //     return () => {
  //       window.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, [data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key, 10) - 1; // Convert to 0-based index
        if (index < data.length) {
          // Copy the shortcut content of the index-th row
          const shortcutContent = data[index].shortcut_content;
          // Create a temporary textarea element
          const textarea = document.createElement("textarea");
          textarea.value = shortcutContent;
          document.body.appendChild(textarea);
          textarea.select();
          // Try to copy the text
          if (document.execCommand("copy")) {
            toast({
              title: `Copied: ${shortcutContent}`,
              status: "success",
              duration: 1000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Failed to copy",
              status: "error",
              duration: 1000,
              position: "top",
              isClosable: true,
            });
          }
          // Remove the textarea element
          document.body.removeChild(textarea);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data]);

  return (
    <Box>
      <Box
        mb={3} // Margin top
        p={2} // Padding
        borderRadius="md" // Rounded corners
        backgroundColor="blue.50" // Light blue background color
        color="blue.800" // Dark blue text color
        display="flex"
        alignItems="center"
      >
        <Icon as={AiOutlineInfoCircle} mr={2} />
        {/* <Text fontWeight="bold">Alt + 1~9 를 눌러 copy 가능</Text> */}
      </Box>

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
            <Th>shortcut</Th>
            <Th>Shortcut Content</Th>
            <Th>Description</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
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
                <Td>alt + {index + 1}</Td>
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

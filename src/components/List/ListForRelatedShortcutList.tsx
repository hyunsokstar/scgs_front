import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MdDelete as TrashIcon } from "react-icons/md";
import TextAreaForCopyTextUsingButton from "../TextArea/TextAreaForCopyTextUsingButton";
import ModalButtonForCreateRelatedShortcut from "../modal/ModalButtonForCreateRelatedShortcut";
import { apiForDeleteRelatedShortcutByPk } from "../../apis/api_for_shortcut";

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

// 1122
const ListForRelatedShortcutList = ({
  shortcutId,
  data,
}: ListForRelatedShortcutListProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // mutationForDeleteRelatedShortcutByPk
  const mutationForDeleteRelatedShortcutByPk = useMutation(
    (pk: number) => {
      return apiForDeleteRelatedShortcutByPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
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
    // Add your delete logic here
    mutationForDeleteRelatedShortcutByPk.mutate(pk);
    console.log("Delete button clicked : ", pk);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <ModalButtonForCreateRelatedShortcut
          shortcutId={shortcutId}
          buttonText={"Create Related Shortcut"}
        />
      </Box>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Shortcut Content</Th>
            <Th>Description</Th>
            {/* <Th>Created At</Th> */}
            <Th>delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <TextAreaForCopyTextUsingButton
                    text={item.shortcut_content}
                  />
                </Td>
                <Td>{item.description}</Td>
                {/* <Td>{item.created_at}</Td> */}
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
              <Td colSpan={3}>no data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ListForRelatedShortcutList;

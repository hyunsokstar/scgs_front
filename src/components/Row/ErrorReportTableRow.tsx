import React, { useState } from "react";
import {
  Tr,
  Td,
  Box,
  Text,
  IconButton,
  Avatar,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  apiForDeleteErrorReportByPk,
  apiForUpdateErrorReportForNote,
} from "../../apis/study_note_api";
import { useMutation } from "@tanstack/react-query";

const ErrorReportTableRow = ({
  item,
  index,
  editingIndex,
  updatedContent,
  handleEditClick,
  handleCancelClick,
  handleConfirmClick,
  buttonHandlerForDeleteErrorReportByPk,
  openModalForReportDetail,
  loginUser,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <Tr key={item.created_at_formatted}>
      <Td>
        {item.writer.profile_image ? (
          <Avatar
            size="sm"
            name={item.writer.username}
            src={item.writer.profile_image}
          />
        ) : (
          <Text>{item.writer.username}</Text>
        )}
      </Td>
      <Td>{item.page}</Td>
      <Td>
        {editingIndex === index ? (
          <Textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            autoFocus
          />
        ) : (
          <Box
            as="button"
            onClick={() => openModalForReportDetail(item.content)}
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Text>{item.content}</Text>
          </Box>
        )}
      </Td>
      <Td>{item.is_resolved ? "Yes" : "No"}</Td>
      <Td>
        {editingIndex === index ? (
          <Box display="flex" gap={2}>
            <IconButton
              variant="outline"
              border="1px solid black"
              _hover={{ bgColor: "blue.100" }}
              aria-label="Confirm"
              icon={<CheckIcon />}
              colorScheme="blue"
              onClick={() => handleConfirmClick(item.pk)}
            />
            <IconButton
              variant="outline"
              border="1px solid black"
              _hover={{ bgColor: "blue.100" }}
              aria-label="Cancel"
              icon={<CloseIcon />}
              colorScheme="red"
              onClick={handleCancelClick}
            />
          </Box>
        ) : (
          <Box>
            {loginUser.username === item.writer.username ? (
              <Box display={"flex"} gap={2}>
                <IconButton
                  variant="outline"
                  border="1px solid black"
                  _hover={{ bgColor: "blue.100" }}
                  aria-label="Edit"
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => handleEditClick(index, item.content)}
                />
                <IconButton
                  variant="outline"
                  border="1px solid black"
                  _hover={{ bgColor: "blue.100" }}
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() =>
                    buttonHandlerForDeleteErrorReportByPk(item.pk)
                  }
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        )}
      </Td>
    </Tr>
  );
};

export default ErrorReportTableRow;

import React, { useState } from "react";
import {
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
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";


const ErrorReportTableRow = ({
  item,
  index,
  editingIndex,
  updatedContent,
  setUpdatedContent,
  handleEditClick,
  handleCancelClick,
  handleConfirmClick,
  buttonHandlerForDeleteErrorReportByPk,
  openModalForReportDetail,
  loginUser,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    // <Box>
    //   <Text>{item.content}</Text>
    // </Box>
    <Accordion allowToggle>
      <AccordionItem>
        <Box
          p={2}
          mb={2}
        >
          <Box
            display="grid"
            gridTemplateColumns="10% 10% 60% 10% 10%"
            alignItems="center"
          >
            <Box>
              {item.writer.profile_image ? (
                <Avatar
                  size="sm"
                  name={item.writer.username}
                  src={item.writer.profile_image}
                />
              ) : (
                <Text>{item.writer.username}</Text>
              )}
            </Box>
            <Box>{item.page}</Box>
            <Box>
              {/* Adjust content column width */}
              {editingIndex === index ? (
                <Textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  autoFocus
                />
              ) : (
                <Box as="button">
                  <Text>{item.content}</Text>
                </Box>
              )}
            </Box>
            <Box>{item.is_resolved ? "Yes" : "No"}</Box>
            <Box>
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
                <Box display="flex" gap={2}>
                  {loginUser.username === item.writer.username && (
                    <>
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
                    </>
                  )}
                  <AccordionButton
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  >
                    <AccordionIcon />
                  </AccordionButton>
                </Box>
              )}
            </Box>
          </Box>
          <AccordionPanel>
            {/* 샘플 댓글 내용을 여기에 렌더링 */}
            {/* 여기에 샘플 댓글을 렌더링하는 코드를 추가하세요 */}
            댓글 test 11
          </AccordionPanel>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};

export default ErrorReportTableRow;

import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  Tbody,
  Tr,
  Td,
  Alert,
  AlertIcon,
  IconButton,
} from "@chakra-ui/react";
import { apiForGetSubTitleListForNote } from "../../apis/study_note_api";
import { useMutation } from "@tanstack/react-query";
import { ITypeForListForSubtitleListForNote } from "../../types/study_note_type";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ButtonForOpenUrlByNewTabForUrlText from "./ButtonForOpenUrlByNewTabForUrlText";
import YoutubeIconForSubtitleListForNote from "../Icon/YoutubeIconForSubtitleListForNote";

interface IProps {
  button_text: string;
  modal_title: string;
  study_note_pk: string | undefined;
  button_size: string;
}

// 1122
const ModalButtonForSubtiTitleListForNoteContent = ({
  button_text,
  modal_title,
  study_note_pk,
  button_size,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [dataForGetSubTitleListForNote, setDataForGetSubTitleListForNote] =
  useState<ITypeForListForSubtitleListForNote[]>([]);

  const {
    isLoading,
    data: dataForGetSubTitleListForNote,
    refetch: refetchForGetSubTitleListForNote,
  } = useQuery<any>(
    ["apiForGetSubTitleListForNote", study_note_pk],
    apiForGetSubTitleListForNote,
    {
      enabled: true,
    }
  );

  // 2244
  return (
    <Box>
      <Button
        variant={"outline"}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        onClick={onOpen}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              as="h2"
              fontSize="3xl"
              color="blue.500"
              fontFamily="'Playfair Display', sans-serif"
            >
              {modal_title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0616 */}
            {dataForGetSubTitleListForNote ? (
              <Table variant="simple">
                <Tbody>
                  {dataForGetSubTitleListForNote.map(
                    (item: any, index: number) => (
                      <Tr key={index}>
                        <Td>{item.page}</Td>
                        <Td>{item.title}</Td>
                        <Td>
                          <YoutubeIconForSubtitleListForNote
                            url_text={item.youtube_url}
                          />
                        </Td>
                        <Td>
                          {item.ref_url1}{" "}
                          <ButtonForOpenUrlByNewTabForUrlText
                            button_size={"xs"}
                            url={item.ref_url1}
                          />
                        </Td>
                        <Td>
                          {item.ref_url2}{" "}
                          <ButtonForOpenUrlByNewTabForUrlText
                            button_size={"xs"}
                            url={item.ref_url2}
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              to={`/study-note/${study_note_pk}/${item.page}`}
                              style={{ textDecoration: "underline" }}
                            >
                              <IconButton
                                variant={"outline"}
                                size={"sm"}
                                aria-label="Next page"
                                icon={<ArrowForwardIcon />}
                                _hover={{ borderColor: "blue" }}
                              />
                            </Link>
                          </Box>
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            ) : (
              <Alert status="warning">
                <AlertIcon />
                dataForGetSubTitleListForNote is not exist
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForSubtiTitleListForNoteContent;

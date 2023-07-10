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
  Alert,
  AlertIcon,
  IconButton,
} from "@chakra-ui/react";
import { apiForGetSubTitleListForNote } from "../../apis/study_note_api";
import { ITypeForListForSubtitleListForNote } from "../../types/study_note_type";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ButtonForOpenUrlByNewTabForUrlText from "./ButtonForOpenUrlByNewTabForUrlText";
import YoutubeIconForSubtitleListForNote from "../Icon/YoutubeIconForSubtitleListForNote";
import CharacterLimit from "../CharacterLimit";

interface IProps {
  button_text: string;
  modal_title: string;
  study_note_pk: string | undefined;
  button_size: string;
  button_width?: string;
  count_for_note_contents_for_subtitle?: any;
}

// 1122
const ModalButtonForSubtiTitleListForNoteContent = ({
  button_text,
  button_width,
  modal_title,
  study_note_pk,
  button_size,
  count_for_note_contents_for_subtitle,
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
        width={button_width}
      >
        {button_text}{" "}
        {count_for_note_contents_for_subtitle ? (
          <Box>({count_for_note_contents_for_subtitle})</Box>
        ) : (
          ""
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="7xl">
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
              <Box>
                {dataForGetSubTitleListForNote.map(
                  (item: any, index: number) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection={["column", "row"]} // 모바일 화면에서는 세로로, 그 외에는 가로로 나열됩니다.
                      alignItems="center"
                      justifyContent="space-between"
                      padding={2}
                      marginBottom={2}
                      borderWidth={1}
                      borderRadius="md"
                      borderColor="gray.200"
                    >
                      <Box flex={1}>
                        <Text fontWeight="bold">Page:</Text>
                        <Text>{item.page}</Text>
                      </Box>
                      <Box flex={1}>
                        <Text fontWeight="bold">Title:</Text>
                        <Text>{item.title}</Text>
                      </Box>
                      <Box flex={1} textAlign={"center"}>
                        <YoutubeIconForSubtitleListForNote
                          url_text={item.youtube_url}
                        />
                      </Box>
                      <Box flex={1}>
                        <Box display="flex" gap={2}>
                          <CharacterLimit text={item.ref_url1} maxLength={15} />
                          <ButtonForOpenUrlByNewTabForUrlText
                            button_size="xs"
                            url={item.ref_url1}
                          />
                        </Box>
                      </Box>
                      <Box flex={1}>
                        <Box display="flex" gap={2}>
                          <CharacterLimit text={item.ref_url2} maxLength={15} />
                          <ButtonForOpenUrlByNewTabForUrlText
                            button_size="xs"
                            url={item.ref_url2}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Link
                          to={`/study-note/${study_note_pk}/${item.page}`}
                          style={{ textDecoration: "underline" }}
                        >
                          <IconButton
                            variant="outline"
                            size="sm"
                            aria-label="Next page"
                            icon={<ArrowForwardIcon />}
                            _hover={{ borderColor: "blue" }}
                          />
                        </Link>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            ) : (
              <Alert status="warning">
                <AlertIcon />
                dataForGetSubTitleListForNote does not exist
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

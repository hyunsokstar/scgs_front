import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import ContainerForRoadMapContent from "../Container/ContainerForRoadMapContent";
import { useQuery } from "@tanstack/react-query";

interface ModalButtonForRoadMapDetailProps {
  button_text: string;
  roadMapId: number;
  roadMapTitle: string;
  roadMapSubTitle: string;
}

const ModalButtonForRoadMapDetail: React.FC<
  ModalButtonForRoadMapDetailProps
> = ({ roadMapId, button_text, roadMapTitle, roadMapSubTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <Button variant="outline" colorScheme="blue" onClick={onOpen} size="full">
        {button_text} ({roadMapId})
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <Flex
                flex="2"
                border="1px dashed black"
                m={2}
                textAlign={"center"}
              >
                {/* 왼쪽 1의 영역 - meta info for selected road map */}
                <Box mx={"auto"} mt={2}>
                  <img
                    src={
                      "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    }
                    alt={roadMapTitle}
                    style={{ height: "250px", width: "100%", objectFit: "cover" }}
                  />
                  <Text fontWeight="semibold" fontSize="lg">
                    {roadMapTitle}
                  </Text>
                  <Text color="gray.600">{roadMapSubTitle}</Text>
                </Box>
              </Flex>
              <Flex flex="4" border="1px dashed black" m={2}>
                <ContainerForRoadMapContent roadMapId={roadMapId} />
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRoadMapDetail;

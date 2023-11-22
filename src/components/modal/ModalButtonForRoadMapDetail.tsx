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
import useUser from "../../lib/useUser";

interface ModalButtonForRoadMapDetailProps {
  button_text: string;
  roadMapId: number;
  roadMapTitle: string;
  roadMapSubTitle: string;
  roadMapWriterName: string;
}

const ModalButtonForRoadMapDetail: React.FC<
  ModalButtonForRoadMapDetailProps
> = ({ roadMapId, button_text, roadMapTitle, roadMapSubTitle, roadMapWriterName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const { userLoading, isLoggedIn, loginUser } = useUser();

  return (
    <>

      {loginUser && loginUser.username == roadMapWriterName ? "my road map" : "i am not owner"}

      <Button variant="outline" colorScheme="blue" onClick={onOpen} size="md">
        {button_text} ({roadMapId})
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal For Roadmap Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <Flex
                flex="2"
                border="1px dashed black"
                m={2}
                textAlign={"center"}
              >
                <Box mx={"auto"} mt={0} border={"1px solid green"} width={"100%"} position={"relative"}>
                {/* 1117 */}
                  {loginUser && loginUser.username === roadMapWriterName && (
                    <Box position="absolute" top="0" right="0">
                      <Button m={1}>
                        수정
                      </Button>
                    </Box>
                  )}
                  <img
                    src={
                      "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    }
                    alt={roadMapTitle}
                    style={{ height: "250px", width: "100%", objectFit: "cover" }}
                  />
                  <Text>writer name: {roadMapWriterName}</Text>
                  <Text fontWeight="semibold" fontSize="lg">
                    {roadMapTitle}
                  </Text>
                  <Text color="gray.600">{roadMapSubTitle}</Text>

                </Box>
              </Flex>

              {/* register road map and card list for load map 이 여기에 포함 */}
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

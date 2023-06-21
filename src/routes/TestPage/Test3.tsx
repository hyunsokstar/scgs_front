import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}

const Test3 = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        _hover={{ border: "1px solid black", bgColor: "blue.100" }}
      >
        Open Drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody>
            test3 gogo
            <Box w={"1000px"} border={"1px solid blue"}>hi</Box>
            </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Test3;

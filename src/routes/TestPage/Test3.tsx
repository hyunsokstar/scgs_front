import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

interface MenuItemsProps {
  children: React.ReactNode;
}

const Header: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  const menuItems = [
    "메뉴1",
    "메뉴2",
    "메뉴3",
    "메뉴4",
    "메뉴5",
    "메뉴6",
    "메뉴7",
    "메뉴8",
    "메뉴9",
    "메뉴10",
    "메뉴11",
    "메뉴12",
    "메뉴13",
    "메뉴14",
    "메뉴15",
    "메뉴16",
    "메뉴17",
    "메뉴18",
  ];

  const firstRowItems = menuItems.slice(0, 9);
  const secondRowItems = menuItems.slice(9);

  return (
    <Box bg="gray.800" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">

        <Box
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full" }}
          flexDirection={"column"}
        >
          <Flex justifyContent={"space-between"}>
            {firstRowItems.map((item, index) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <MenuItems key={index}>{item}</MenuItems>
            ))}
          </Flex>
          <Flex justifyContent={"space-between"}>
            {secondRowItems.map((item, index) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <MenuItems key={index}>{item}</MenuItems>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const MenuItems: React.FC<MenuItemsProps> = ({ children }) => (
  <Box mt={{ base: 4, md: 0 }} mr={6}>
    {children}
  </Box>
);

export default Header;

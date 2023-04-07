import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const inputVariants = {
    hidden: { x: 0, opacity: 0 },
    visible: { x: -610, opacity: 1 },
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      position={"relative"}
      alignItems={"center"}
      border={"1px solid green"}
      py={2}
    >
      <Button size="sm" bg={"pink"} onClick={handleClick} ml={100}>
        Outline 버튼
      </Button>
      <Box position={"absolute"} right={"-500"}>
        <motion.div
          variants={inputVariants}
          animate={showInput ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <Input
            placeholder="애니메이션 입력"
            bg={"blue.100"}
            size="sm"
            width={"500px"}
            ml="2"
          />
        </motion.div>
      </Box>
    </Box>
  );
}

export default App;

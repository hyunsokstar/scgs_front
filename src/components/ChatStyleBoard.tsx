import { useState } from "react";
import { VStack, HStack, Text, Checkbox, Button } from "@chakra-ui/react";

interface Message {
  id: number;
  message: string;
  isUser: boolean;
}

function ListItem({
  message,
  isUser,
  onRemove,
}: Message & { onRemove: () => void }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  function handleRemoveClick() {
    onRemove();
  }

  return (
    <HStack justifyContent={isUser ? "flex-start" : "flex-end"} width="100%">
      {isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}
      <VStack
        p={3}
        borderRadius="lg"
        bg={isUser ? "green.100" : "gray.100"}
        alignSelf={isUser ? "flex-start" : "flex-end"}
        border="1px solid black"
        width="auto"
      >
        <Text fontSize="lg">{message}</Text>
        <Button size="sm" colorScheme="red" onClick={handleRemoveClick}>
          Remove
        </Button>
      </VStack>
      {!isUser && (
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      )}
    </HStack>
  );
}

function ChatStyleBoard() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, message: "Hello there!", isUser: true },
    { id: 2, message: "Hi! How are you?", isUser: true },
    { id: 3, message: "I'm doing well, thanks.", isUser: false },
    { id: 4, message: "That's good to hear.", isUser: true },
    { id: 5, message: "Can I help you with anything?", isUser: false },
  ]);

  function handleRemoveMessage(id: number) {
    setMessages(messages.filter((message) => message.id !== id));
  }

  return (
    <VStack
      p={4}
      bg="gray.50"
      borderRadius="lg"
      border="2px solid black"
      width="100%"
    >
      {messages.map((message) => (
        <ListItem
          key={message.id}
          message={message.message}
          isUser={message.isUser}
          onRemove={() => handleRemoveMessage(message.id)}
          id={0}
        />
      ))}
    </VStack>
  );
}

export default ChatStyleBoard;

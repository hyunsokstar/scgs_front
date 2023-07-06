import { Text } from "@chakra-ui/react";

type TextForCharacterLimitProps = {
  text: string;
};

const TextForCharacterLimit: React.FC<TextForCharacterLimitProps> = ({ text }) => {
  let displayedText = text;

  if (text.length > 10) {
    displayedText = text.slice(0, 10) + "...";
  }

  return <Text>{displayedText}</Text>;
};

export default TextForCharacterLimit;

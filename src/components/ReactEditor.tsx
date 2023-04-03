import { Box } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import TinyMCEEditor from "./RichEditor/TinyMCEEditor";
// import FloalaEditor from './RichEditor/FloalaEditor'

interface Props {}

function ReactEditor({}: Props): ReactElement {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <Box>
      {/* <FloalaEditor /> */}
      <TinyMCEEditor
        initialValue={content}
        onChange={handleContentChange}
        apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
      />
    </Box>
  );
}

export default ReactEditor;

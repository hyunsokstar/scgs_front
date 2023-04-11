import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

interface ExampleProps {
  selected: string[];
  setSelected: (selected: string[]) => void;
}

const Example = ({ selected, setSelected }: ExampleProps) => {
  // const [selected, setSelected] = useState(["papaya"]);

  const handleBeforeAdd = (tag: string): boolean => {
    if (selected.length >= 3) {
      alert("3개 이상은 등록할 수 없습니다");
      return false; // 길이가 3 이상이면 새로운 태그를 추가하지 않도록 false를 반환
    }
    return true; // 그렇지 않으면 새로운 태그를 추가할 수 있도록 true를 반환
  };

  // 수정하면 아예 중간 테이블에서 데이터를 삭제 해야 됨

  return (
    <Box mt={2}>
      {/* <h1>Add Fruits</h1> */}
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput
        beforeAddValidate={handleBeforeAdd}
        value={selected}
        onChange={setSelected}
        name="fruits"
        // placeHolder="enter fruits"
      />
      <em>press enter or comma to add new tag</em>
    </Box>
  );
};

export default Example;

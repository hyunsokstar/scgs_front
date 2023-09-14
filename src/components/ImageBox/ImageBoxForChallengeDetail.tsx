import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

const ImageBoxForChallengeDetail = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // 드롭된 파일
    // 파일을 업로드하거나 다른 작업 수행
    console.log("File dropped:", file);
    
    setIsDragging(false); // 드래그 상태 해제
  };

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true); // 드래그 상태로 설정
  };

  const handleDragLeave = () => {
    setIsDragging(false); // 드래그 상태 해제
  };

  return (
    <Box
      border={`2px dashed ${isDragging ? "red" : "lightgray"}`} // 점선 스타일 및 색상 설정
      borderStyle={isDragging ? "dashed" : "solid"} // 드래그 중일 때 점선 스타일, 그 외에는 실선 스타일
      w="90%"
      height="90%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      backgroundColor={isDragging ? "gray.200" : "transparent"} // 드래그 중일 때 배경색 변경
      cursor={isDragging ? "copy" : "pointer"} // 드래그 중일 때 커서 변경
    >
      {isDragging ? "Drop the image" : "Drag and drop an image"}
    </Box>
  );
};

export default ImageBoxForChallengeDetail;

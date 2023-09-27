import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Link,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { IChallengeRefRow } from "../../types/type_for_challenge";

interface IProps {
  challengeRefList: IChallengeRefRow[];
}

const ListForChallengeRef = ({ challengeRefList }: IProps) => {
  const [editingRow, setEditingRow] = useState(-1); // -1은 수정 중이 아님을 나타내는 값
  const [commentText, setCommentText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null); // input 요소에 대한 ref를 생성

  useEffect(() => {
    // 에디트 모드일 때 input에 자동 포커스
    if (editingRow !== -1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingRow]);

  const handleEditClick = (index: number) => {
    setEditingRow(index);
    setCommentText(challengeRefList[index].description); // 에디트 모드로 진입할 때 commentText를 해당 행의 description으로 초기화
  };

  const handleCancelClick = () => {
    setEditingRow(-1); // 수정 취소하고 행을 수정 중이 아님으로 설정
    setCommentText(""); // 수정 취소 시 commentText 초기화
  };

  const handleSaveClick = (index: number, updatedUrl: string) => {
    setEditingRow(-1); // 수정을 완료하고 행을 수정 중이 아님으로 설정
    // TODO: 수정한 내용을 저장하는 로직을 추가하세요.
  };

  const handleDeleteClick = (index: number) => {
    // TODO: 항목을 삭제하는 로직을 추가하세요.
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>URL</Th>
            <Th>Description</Th>
            <Th>수정/확인/취소/삭제</Th>
          </Tr>
        </Thead>
        <Tbody>
          {challengeRefList.length !== 0 ? (
            challengeRefList.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>
                  {editingRow === index ? (
                    <Input
                      ref={inputRef} // input 요소에 ref 추가
                      defaultValue={item.url}
                    />
                  ) : (
                    <Link href={item.url} isExternal>
                      {item.url}
                    </Link>
                  )}
                </Td>
                <Td>
                  {editingRow === index ? (
                    <Input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)} // input 값 변경 시 commentText 업데이트
                    />
                  ) : (
                    item.description
                  )}
                </Td>
                <Td>
                  {editingRow === index ? (
                    <>
                      <IconButton
                        aria-label="확인"
                        icon={<FaCheck />}
                        mr={2}
                        onClick={() =>
                          handleSaveClick(
                            index,
                            (
                              document.getElementById(
                                `url-input-${index}`
                              ) as HTMLInputElement
                            ).value
                          )
                        }
                        variant={"outline"}
                      />
                      <IconButton
                        aria-label="취소"
                        icon={<FaTimes />}
                        onClick={handleCancelClick}
                        variant={"outline"}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label="수정"
                        icon={<FaEdit />}
                        mr={2}
                        onClick={() => handleEditClick(index)}
                        variant={"outline"}
                      />
                      <IconButton
                        aria-label="삭제"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteClick(index)}
                        variant={"outline"}
                      />
                    </>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              no challenge ref data
            </Box>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ListForChallengeRef;

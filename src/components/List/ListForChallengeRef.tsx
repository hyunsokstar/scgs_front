import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { IChallengeRefRow } from "../../types/type_for_challenge";
import {
  apiForDeleteChallengeRef,
  apiForUpdateChallengeRef,
} from "../../apis/challenge_api";

interface IProps {
  challengeRefList: IChallengeRefRow[];
}

// 1122
const ListForChallengeRef = ({ challengeRefList }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingRow, setEditingRow] = useState(-1); // -1은 수정 중이 아님을 나타내는 값
  const [urlText, setUrlText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null); // URL input 요소에 대한 ref를 생성
  const descriptionInputRef = useRef<HTMLInputElement | null>(null); // Description input 요소에 대한 ref를 생성

  useEffect(() => {
    // 에디트 모드일 때 URL input에 자동 포커스
    if (editingRow !== -1 && inputRef.current) {
      inputRef.current.focus();
    }
    // 에디트 모드일 때 Description input에 자동 포커스
    if (editingRow !== -1 && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
  }, [editingRow]);

  const handleEditClick = (index: number) => {
    setEditingRow(index);
    setUrlText(challengeRefList[index].url); // 에디트 모드로 진입할 때 commentText를 해당 행의 URL로 초기화
    setDescriptionText(challengeRefList[index].description); // 에디트 모드로 진입할 때 descriptionText를 해당 행의 description으로 초기화
  };

  const handleCancelClick = () => {
    setEditingRow(-1); // 수정 취소하고 행을 수정 중이 아님으로 설정
    setUrlText(""); // 수정 취소 시 commentText 초기화
    setDescriptionText(""); // 수정 취소 시 descriptionText 초기화
  };

  // mutationForUpdateChallengeRef
  const mutationForUpdateChallengeRef = useMutation(
    // apiForUpdateChallengeRef
    apiForUpdateChallengeRef,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // apiForGetChallengeRefsList
        queryClient.refetchQueries(["apiForGetChallengeRefsList"]);

        toast({
          status: "success",
          title: "check result update success",
          description: result.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const handleSaveClick = ({ index, challengeRefId }: any) => {
    setEditingRow(-1); // 수정을 완료하고 행을 수정 중이 아님으로 설정
    // TODO: 수정한 내용을 저장하는 로직을 추가하세요.
    mutationForUpdateChallengeRef.mutate({
      challengeRefId,
      urlText,
      descriptionText,
    });
  };

  const mutationForDeleteChallengeRef = useMutation(
    (challengeRefId: string | number) => {
      // return apiForDeleteCommentForChallenge(pk);
      return apiForDeleteChallengeRef(challengeRefId);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onError: (error) => {
        // Handle the error here
        console.error("Error deleting challengeRef:", error);
        toast({
          title: "Error deleting challengeRef",
          status: "error",
          description: "An error occurred while deleting the challengeRef.",
          duration: 1800,
          isClosable: true,
        });
      },
      onSuccess: (result) => {
        console.log("data : ", result);
        queryClient.refetchQueries(["apiForGetChallengeRefsList"]);
  
        toast({
          title: "Delete challengeRef success!",
          status: "success",
          description: result.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );
  

  const handleDeleteClick = (challengeRefId: any) => {
    // TODO: 항목을 삭제하는 로직을 추가하세요.
    mutationForDeleteChallengeRef.mutate(challengeRefId);
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
                      ref={inputRef} // URL input 요소에 ref 추가
                      defaultValue={item.url}
                      value={urlText}
                      onChange={(e) => setUrlText(e.target.value)}
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
                      ref={descriptionInputRef} // Description input 요소에 ref 추가
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)} // Description input 값 변경 시 descriptionText 업데이트
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
                          handleSaveClick({
                            index,
                            challengeRefId: item.id,
                          })
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
                        onClick={() => handleDeleteClick(item.id)}
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

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import {
  ITypeForChallengeRefData,
  IChallengeRefRow,
} from "../../types/type_for_challenge";
import { apiForGetChallengeRefsList } from "../../apis/challenge_api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface IProps {
  buttonLabel: string;
  challengeId: any;
}

// 1122
const ModalButtonForChallengeRefList: React.FC<IProps> = ({
  buttonLabel,
  challengeId,
}) => {
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(-1); // -1은 수정 중이 아님을 나타내는 값

  const {
    isLoading: isLoadingForGetChallengeRef,
    data: dataForChallengeRef,
    refetch: refetchForGetChallengeRef,
  } = useQuery<ITypeForChallengeRefData>(
    ["apiForGetChallengeRefsList", challengeId],
    apiForGetChallengeRefsList,
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  const handleEditClick = (index: number) => {
    setEditingRow(index);
    // mutationForUpdateUrlForChallengeRef
  };

  const handleCancelClick = () => {
    setEditingRow(-1); // 수정 취소하고 행을 수정 중이 아님으로 설정
  };

  const handleSaveClick = (index: number, updatedUrl: string) => {
    setEditingRow(-1); // 수정을 완료하고 행을 수정 중이 아님으로 설정
    // TODO: 수정한 내용을 저장하는 로직을 추가하세요.
  };

  const handleDeleteClick = (index: number) => {
    // TODO: 항목을 삭제하는 로직을 추가하세요.
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        borderColor="blue"
        _hover={{ bgColor: "blue.100" }}
        onClick={onOpen}
      >
        {buttonLabel} id: {challengeId}
      </Button>
      <Modal isOpen={isOpen} size="5xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ChallengeRefList</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Index</Th>
                  <Th>URL</Th>
                  <Th>Description</Th>
                  <Th>수정/확인/취소/삭제</Th>{" "}
                  {/* 수정, 확인, 취소, 삭제 버튼 열 추가 */}
                </Tr>
              </Thead>
              <Tbody>
                {dataForChallengeRef &&
                  dataForChallengeRef.challenge_refs.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td>
                        {editingRow === index ? (
                          <Input defaultValue={item.url} /> // 수정 중인 행은 Input으로 표시
                        ) : (
                          <Link href={item.url} isExternal>
                            {item.url}
                          </Link>
                        )}
                      </Td>
                      <Td>{item.description}</Td>
                      <Td>
                        {editingRow === index ? ( // 수정 중일 때는 확인/취소 아이콘을 표시
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
                              onClick={() => handleEditClick(index)} // 수정 버튼을 누르면 해당 행을 수정 중으로 설정
                              variant={"outline"}
                            />
                            <IconButton
                              aria-label="삭제"
                              icon={<FaTrash />}
                              onClick={() => handleDeleteClick(index)} // 삭제 버튼을 누르면 해당 항목을 삭제variant={"outline"}
                              variant={"outline"}
                            />
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForChallengeRefList;

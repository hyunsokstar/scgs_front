import React, { useState, useEffect } from "react";
import {
  Text,
  Avatar,
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
  IconButton,
  Switch,
  useToast,
  useRadio,
} from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { CoWriter } from "../../types/study_note_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateCoWriterIsTaskingForNote } from "../../apis/study_note_api";
import { useNavigate } from "react-router-dom";


interface IProps {
  studyNotePk: any;
  currentPage: any;
  coWritersInfoData: CoWriter[];
  setAuthorityForWritingNoteContents: (value: boolean) => void;
}

const ModalButtonForUpdateCoworkerInfo = ({
  studyNotePk,
  currentPage,
  setAuthorityForWritingNoteContents,
  coWritersInfoData,
}: IProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [coWritersInfo, setCoWritersInfo] = useState(coWritersInfoData); // 상태 추가

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setIsUpdateMode(false);
  };

  const activateUpdateMode = () => {
    setIsUpdateMode(true);
  };

  // mutationForUpdateIsTaskingForCowriter
  const mutationForUpdateTaskImportanceForChecked = useMutation(
    apiForUpdateCoWriterIsTaskingForNote,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);

        toast({
          status: "success",
          title: "Update For IsTasking success",
          description: result.message,
        });

        setCoWritersInfo(result.cowriters_data); // 상태 업데이트
        // alert(result.authority_for_writing_note_contents)
        console.log("authority_for_writing_note_contents : ", result.authority_for_writing_note_contents);
        
        setAuthorityForWritingNoteContents(result.authority_for_writing_note_contents)
        // navigate(`/study-note/${studyNotePk}/${currentPage}`);

        // queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        // queryClient.invalidateQueries(["getUncompletedTaskList"]);
        onClose();

      },
      //   onSettled: () => {
      //     queryClient.refetchQueries([
      //       "getTaskListForUpdateImportanceForChecked",
      //     ]);
      //     queryClient.refetchQueries(["getUncompletedTaskList"]);
      //   },
    }
  );

  const handleSwitchChange = (user: CoWriter) => {
    user.is_tasking = !user.is_tasking;

    // 여기서 API 요청을 보내는 로직을 추가할 수 있습니다.
    // API 요청을 성공적으로 처리하면 서버에서 반환한 데이터를 사용하여
    // 새로운 상태를 설정하는 것이 좋습니다.
    // const updatedCoWritersInfo = coWritersInfo.map((u) =>
    //   u.id === user.id ? user : u
    // );

    mutationForUpdateTaskImportanceForChecked.mutate({
      coWriterId: user.id,
      studyNotePk: studyNotePk,
    });

    //  mutationForUpdateIsTaskingForNote
    // setCoWritersInfo(updatedCoWritersInfo); // 상태 업데이트
  };

  return (
    <>
      <IconButton
        variant={"outline"}
        size="sm"
        icon={<EditIcon />}
        colorScheme="teal"
        aria-label="업데이트 버튼"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ModalButtonForUpdateCoworkerInfo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {coWritersInfo.length > 0 ? (
              <Table variant="simple" size={"sm"}>
                <Thead>
                  <Tr>
                    <Th>Profile</Th>
                    <Th>is_tasking</Th>
                    <Th>Current Page</Th>
                    <Th>Task Description</Th>
                    <Th>Update</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {coWritersInfo.map((user) => (
                    <Tr key={user.id} textAlign={"center"}>
                      <Td>
                        {/* <Avatar
                          name={user.username}
                          src={user.profile_image || ""}
                          size="sm"
                        /> */}
                        {user.username}
                      </Td>
                      <Td>
                        <Switch
                          isChecked={user.is_tasking}
                          onChange={() => handleSwitchChange(user)}
                        />
                      </Td>
                      <Td>{user.current_page}</Td>
                      <Td>{user.task_description}</Td>
                      <Td>
                        {isUpdateMode ? (
                          <>
                            <IconButton
                              variant={"outline"}
                              size="sm"
                              icon={<CheckIcon />}
                              colorScheme="teal"
                              aria-label="확인 버튼"
                              onClick={() => {
                                // 업데이트를 처리하는 로직을 여기에 추가
                                // 업데이트가 완료되면 setIsUpdateMode(false)로 업데이트 모드를 비활성화합니다.
                              }}
                            />
                            <IconButton
                              variant={"outline"}
                              size="sm"
                              icon={<CloseIcon />}
                              colorScheme="teal"
                              aria-label="취소 버튼"
                              onClick={() => {
                                setIsUpdateMode(false);
                              }}
                            />
                          </>
                        ) : (
                          <IconButton
                            variant={"outline"}
                            size="sm"
                            icon={<EditIcon />}
                            colorScheme="teal"
                            aria-label="업데이트 버튼"
                            onClick={activateUpdateMode}
                          />
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>no cowriters</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForUpdateCoworkerInfo;

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Icon, // Chakra UI의 Icon 컴포넌트 추가
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa"; // 삭제 아이콘을 사용하기 위해 react-icons 라이브러리의 FaTrash 아이콘을 가져옴
import { ITypeForClassRoomRowForStudyNote } from "../../types/study_note_type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiForDeleteClassRegistrationForNote,
  apiForRegisterClassRoomForStudyNote,
} from "../../apis/study_note_api";

interface TableComponentProps {
  dataForGetClassRoomList: ITypeForClassRoomRowForStudyNote[] | undefined;
  study_note_pk: any;
}

const TableForClassRoomListForStudyNote: React.FC<TableComponentProps> = ({
  dataForGetClassRoomList,
  study_note_pk,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutationForRegisterClassRoomForStudyNote = useMutation(
    apiForRegisterClassRoomForStudyNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data: ", data);

        toast({
          title: "Classroom registration success!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        queryClient.refetchQueries(["apiForGetClassRoomList"]);

        // 이후에 필요한 성공 처리 로직을 추가하세요.
        // 예: 페이지 리디렉션 또는 기타 작업
      },
      onError: (error: any) => {
        console.log("error : ", error.response.data);

        console.log("error type: ", error.response.data.message_type);
        console.log("error message", error.response.data.message);

        const errorMessage = error.response.data.message; // Adjust the error message field based on your API response structure
        if (error.response.data.message_type === "warnning") {
          toast({
            title: "recored is already exists",
            description: errorMessage,
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error registering classroom",
            description: errorMessage,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }

        // 이후에 필요한 에러 처리 로직을 추가하세요.
        // 예: 에러 메시지 표시 또는 기타 작업
      },
    }
  );

  const buttonHandlerForRegisterClassRoomForStudyNote = () => {
    const current_page = 1;
    mutationForRegisterClassRoomForStudyNote.mutate({
      study_note_pk,
      current_page,
    });
  };

  const mutationForDeleteClassRegistrationForNote = useMutation(
    (classRoomId: string | number) => {
      // return deleteOneCommentForTaskByPkApi(pk);
      return apiForDeleteClassRegistrationForNote(classRoomId);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetQnABoardList"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  // 삭제 핸들러 함수
  const handleDelete = (classRoomId: string) => {
    // alert(classRoomId)
    mutationForDeleteClassRegistrationForNote.mutate(classRoomId);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button>All Check</Button>
        <Button onClick={buttonHandlerForRegisterClassRoomForStudyNote}>
          ClassRoom Register
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Current Page</Th>
            <Th>Writer</Th>
            <Th>Is Approved</Th>
            <Th>Created At</Th>
            <Th>Actions</Th> {/* 삭제 아이콘을 표시할 열 추가 */}
          </Tr>
        </Thead>
        <Tbody>
          {dataForGetClassRoomList &&
            dataForGetClassRoomList.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.current_page}</Td>
                <Td>{row.writer.username}</Td>
                <Td>{row.is_approved ? "Yes" : "No"}</Td>
                <Td>{row.created_at_formatted}</Td>
                <Td>
                  {/* 삭제 아이콘 추가 및 핸들러 함수 연결 */}
                  <Icon
                    as={FaTrash}
                    cursor="pointer"
                    color="red.500"
                    onClick={() => handleDelete(row.id)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForClassRoomListForStudyNote;

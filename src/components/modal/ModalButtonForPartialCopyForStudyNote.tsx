import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Divider,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { FaArrowCircleLeft } from "react-icons/fa";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForGetMyNoteInfoAndTargetNoteInfoForToPartialCopy,
  apiForSelectedNoteInfoAndPageNumberList,
} from "../../apis/study_note_api";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  IMyNoteRowTypeForPartialCopy,
  IResponseDataTypeForMyNoteInfoAndTargetNoteInforToPartialCopy,
  responseDataTypeForSelectedMyNoteInfoForPartialCopy,
} from "../../types/study_note_type";
import PaginationComponent from "../PaginationComponent";

interface IProps {
  buttonText: string;
  studyNotePk: any;
}

const ModalButtonForPartialCopyForStudyNote: React.FC<IProps> = ({
  buttonText,
  studyNotePk,
}) => {
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [pageNum, setPageNum] = useState(1);

  const [myNoteList, setmyNoteList] = useState<IMyNoteRowTypeForPartialCopy[]>(
    []
  );

  const [
    selectedMyNoteInfoForPartialCopy,
    setSelectedMyNoteInfoForPartialCopy,
  ] = useState<responseDataTypeForSelectedMyNoteInfoForPartialCopy>({
    title_for_my_selected_note: "",
    page_numbers_for_selected_my_note: [],
  });

  // 1125
  const [
    checkedPageNumbersForDestination,
    setCheckedPageNumbersForDestination,
  ] = useState<number[]>([]);

  const [checkedPageNumbersToCopy, setCheckedNumbersToCopy] = useState<
    number[]
  >([]);

  const { data: dataForMyNoteAndSelectedNoteForPartialCopy, isLoading } =
    useQuery<IResponseDataTypeForMyNoteInfoAndTargetNoteInforToPartialCopy>(
      ["myNoteInfo", pageNum, studyNotePk], // 이 쿼리의 고유한 키
      apiForGetMyNoteInfoAndTargetNoteInfoForToPartialCopy, // API 함수
      {
        enabled: false, // 초기에는 비활성 상태로 설정
      }
    );

  console.log(
    "dataForMyNoteAndSelectedNoteForPartialCopy : ",
    dataForMyNoteAndSelectedNoteForPartialCopy
  );

  // useMutation 훅을 이용한 API 요청
  const mutationForGetSelectedNoteInfoAndPageNumberList = useMutation(
    apiForSelectedNoteInfoAndPageNumberList,
    {
      onSuccess: (
        data: responseDataTypeForSelectedMyNoteInfoForPartialCopy
      ) => {
        // 성공적으로 데이터를 가져왔을 때 수행할 작업
        // 예: 가져온 데이터를 queryClient에 업데이트하거나 다른 작업 수행
        console.log("data for selected my note: ", data);
        setSelectedMyNoteInfoForPartialCopy(data);
      },
      onError: (error) => {
        // 오류가 발생했을 때 처리할 작업
        console.error(error);
        // 예: 사용자에게 오류를 보여주거나 다른 오류 처리
      },
    }
  );

  const handleOpen = () => {
    if (isLoggedIn) {
      setIsOpen(true);
      queryClient.prefetchQuery(
        ["myNoteInfo", pageNum, studyNotePk],
        apiForGetMyNoteInfoAndTargetNoteInfoForToPartialCopy
      );
    } else {
      console.log("로그인 해주세요");
      alert("로그인 해주세요 !");
      return;
    }
  };

  const selectMyNote = (myNoteId: any) => {
    // alert(myNoteId);
    setmyNoteList([]);
    mutationForGetSelectedNoteInfoAndPageNumberList.mutate({ myNoteId });
  };

  const handleBackButtonClick = useCallback(() => {
    setSelectedMyNoteInfoForPartialCopy({
      title_for_my_selected_note: "",
      page_numbers_for_selected_my_note: [],
    });
    setCheckedPageNumbersForDestination([]);
    setCheckedNumbersToCopy([]);
    queryClient.invalidateQueries(["myNoteInfo", pageNum, studyNotePk]);
  }, [selectedMyNoteInfoForPartialCopy]);

  useEffect(() => {
    if (dataForMyNoteAndSelectedNoteForPartialCopy) {
      setmyNoteList(dataForMyNoteAndSelectedNoteForPartialCopy.my_note_list);
    }
  }, [
    dataForMyNoteAndSelectedNoteForPartialCopy,
    isOpen,
    handleBackButtonClick,
  ]);

  const handleDestinationNumberClick = (pageNum: any) => {
    const isSelected = checkedPageNumbersForDestination.includes(pageNum);

    if (checkedPageNumbersForDestination.length > 0) {
      const maxSelectedNumber = Math.max(...checkedPageNumbersForDestination);
      if (pageNum > maxSelectedNumber + 1) {
        // 추가하려는 번호가 연속되지 않은 경우 알람 표시
        alert("연속된 번호를 선택하세요!");
        return;
      }
    }

    if (isSelected) {
      setCheckedPageNumbersForDestination((prevIds) =>
        prevIds.filter((id) => id !== pageNum)
      );
    } else {
      setCheckedPageNumbersForDestination((prevIds) => [...prevIds, pageNum]);
    }
  };

  // handleCopyTargetNumberClick;
  const handleCopyTargetNumberClick = (pageNum: any) => {
    // 이미 선택된 번호인지 확인합니다.
    const isSelected = checkedPageNumbersToCopy.includes(pageNum);

    if (checkedPageNumbersToCopy.length > 0) {
      const maxSelectedNumber = Math.max(...checkedPageNumbersToCopy);
      if (pageNum > maxSelectedNumber + 1) {
        // 추가하려는 번호가 연속되지 않은 경우 알람 표시
        alert("연속된 번호를 선택하세요!");
        return;
      }
    }

    // 이미 선택된 번호라면 선택 해제를 위해 배열에서 제거합니다.
    if (isSelected) {
      setCheckedNumbersToCopy((prevIds) =>
        prevIds.filter((id) => id !== pageNum)
      );
    } else {
      // 선택되지 않은 번호라면 해당 번호를 추가합니다.
      setCheckedNumbersToCopy((prevIds) => [...prevIds, pageNum]);
    }
  };

  // 2244
  return (
    <>
      <Button
        variant="outline"
        border="1px solid black"
        size="sm"
        onClick={handleOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="7xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              {/* Left Side for my note*/}
              <Box style={{ width: "50%" }}>
                my note data:
                <br />
                {myNoteList.length > 0 &&
                selectedMyNoteInfoForPartialCopy.title_for_my_selected_note ===
                  "" ? (
                  <Table size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>체크</Th>
                        <Th>제목</Th>
                        <Th>설명</Th>
                        <Th>선택</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {myNoteList &&
                        myNoteList.map((row: any) => (
                          <Tr key={row.id}>
                            <Td>
                              <Checkbox />
                            </Td>
                            <Td>{row.title}</Td>
                            <Td>{row.description}</Td>
                            <Td>
                              <Button onClick={() => selectMyNote(row.id)}>
                                선택
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                ) : (
                  "no data"
                )}
                {dataForMyNoteAndSelectedNoteForPartialCopy &&
                selectedMyNoteInfoForPartialCopy.title_for_my_selected_note ===
                  "" ? (
                  <PaginationComponent
                    current_page_num={pageNum}
                    total_page_num={
                      dataForMyNoteAndSelectedNoteForPartialCopy.totalCount
                    }
                    task_number_for_one_page={
                      dataForMyNoteAndSelectedNoteForPartialCopy.perPage
                    }
                    setCurrentPageNum={setPageNum}
                  />
                ) : (
                  ""
                )}
                {selectedMyNoteInfoForPartialCopy.title_for_my_selected_note !==
                "" ? (
                  <>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      note title:{" "}
                      {
                        selectedMyNoteInfoForPartialCopy.title_for_my_selected_note
                      }
                      <Button
                        variant={"outline"}
                        mr={1}
                        mb={2}
                        onClick={handleBackButtonClick}
                      >
                        back
                      </Button>
                    </Box>
                    {/* 1125 노트 페이지 선택 */}
                    pageNumbers for destination:
                    {checkedPageNumbersForDestination.length} 개
                    {/* {checkedPageNumbersForDestination.map((pageNum) => {
                      return <span>{pageNum}</span>;
                    })} */}
                    <Box
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(10, 1fr)",
                      }}
                    >
                      {Array.from({ length: 100 }, (_, index) => {
                        const pageNum = index + 1;
                        const isSelected =
                          selectedMyNoteInfoForPartialCopy.page_numbers_for_selected_my_note.includes(
                            pageNum
                          );

                        const isChecked =
                          checkedPageNumbersForDestination.includes(pageNum);

                        return (
                          <Button
                            key={pageNum}
                            style={{
                              border: isSelected
                                ? "3px solid lightgreen"
                                : "none",
                              margin: "2px",
                              backgroundColor: isChecked ? "yellow" : "initial", // 선택된 번호의 배경색을 변경합니다.
                            }}
                            onClick={() =>
                              handleDestinationNumberClick(pageNum)
                            } // 번호를 클릭할 때 해당 번호를 전달합니다.
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Box>
              <Divider orientation="vertical" border={"1px solid black"} />

              <Box
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                flexDirection={"column"}
                gap={2}
              >
                {checkedPageNumbersForDestination.length ===
                  checkedPageNumbersToCopy.length &&
                checkedPageNumbersForDestination.length !== 0 ? (
                  <>
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "120px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100px",
                          justifyContent: "space-between",
                        }}
                      >
                        <FaArrowCircleLeft />
                        <Text>Replace</Text>
                      </span>
                    </Button>

                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "120px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100px",
                          justifyContent: "space-between",
                        }}
                      >
                        <FaArrowCircleLeft />
                        <Text>Copy !!</Text>
                      </span>
                    </Button>
                  </>
                ) : (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "120px",
                      justifyContent: "space-between",
                    }}
                  >
                    select page !!
                  </Box>
                )}
              </Box>

              {/* Right Side */}
              <Box style={{ width: "50%" }}>
                <Box>
                  <Text>
                    target note title:
                    {
                      dataForMyNoteAndSelectedNoteForPartialCopy?.target_note_title
                    }
                  </Text>
                </Box>
                {/* 1125 hyun */}
                {/* checkedPageNumbersToCopy */}
                pageNumbers to copy:
                {checkedPageNumbersToCopy.length} 개
                {/* {checkedPageNumbersToCopy.map((pageNum) => {
                      return <span>{pageNum}</span>;
                    })} */}
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(10, 1fr)",
                  }}
                >
                  {Array.from({ length: 100 }, (_, index) => {
                    const pageNum = index + 1;
                    const isSelected =
                      dataForMyNoteAndSelectedNoteForPartialCopy?.target_note_page_numbers.includes(
                        pageNum
                      );

                    const isChecked =
                      checkedPageNumbersToCopy.includes(pageNum);

                    return (
                      <Button
                        key={pageNum}
                        style={{
                          border: isSelected ? "3px solid purple" : "none",
                          margin: "2px",
                          backgroundColor: isChecked ? "lightblue" : "initial", // 선택된 번호의 배경색을 변경합니다.
                        }}
                        onClick={() => handleCopyTargetNumberClick(pageNum)} // 번호를 클릭할 때 해당 번호를 전달합니다.
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForPartialCopyForStudyNote;

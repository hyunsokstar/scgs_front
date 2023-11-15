import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Select,
  IconButton,
  Spacer,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  apiForGetStudyNoteList,
  apiForSearchStudyNoteListBySearchWords,
} from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import { TypeForNote, DataTyprForNoteList } from "../types/study_note_type";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalButtonForMyBookMarkList from "../components/modal/ModalButtonForMyBookMarkList";
import ModalButtonForMyLikeNoteList from "../components/modal/ModalButtonForMyLikeNoteList";

// 1122
const StudyNotePage = () => {
  const toast = useToast();
  const [pageNum, setPageNum] = useState(1);
  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");
  const [first_category, set_first_category] = useState("");
  const [second_category, set_second_category] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [studyNoteList, setStudyNoteList] = useState<TypeForNote[]>([]);

  const firstCategoryOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ];

  const secondCategoryOptions = [
    { value: "tutorial", label: "Tutorial" },
    { value: "framework", label: "Framework" },
    { value: "library", label: "Library" },
    { value: "boiler-plate", label: "Boiler Plate" },
    { value: "sample-code", label: "Sample Code" },
    { value: "code-review", label: "Code Review" },
    { value: "programming-language", label: "Programming Language" },
    { value: "challenge", label: "Challenge" },
  ];

  const handleSelectedNoteWriter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedNoteWriter(event.target.value);
  };

  const handleFirstCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    set_first_category(event.target.value);
  };

  const handleSecondCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    set_second_category(event.target.value);
  };

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const {
    isLoading: studyNoteLoading,
    data: dataForStudyNote,
    refetch: studyNoteListRefatch,
  } = useQuery<DataTyprForNoteList>(
    [
      "apiForgetStudyNoteList",
      pageNum,
      selectedNoteWriter,
      first_category,
      second_category,
    ],
    apiForGetStudyNoteList,
    {
      enabled: true,
    }
  );

  console.log("dataForStudyNote : ", dataForStudyNote);

  const buttonHandlerForRefreshFilterOption = () => {
    setSelectedNoteWriter("");
    set_first_category("");
    set_second_category("");
  };

  // mutationForSearchStudyNoteListBySearchWords
  const mutationForSearchStudyNoteListBySearchWords = useMutation(
    apiForSearchStudyNoteListBySearchWords,
    {
      onSuccess: (result: any) => {
        console.log("result for search: ", result);
        setStudyNoteList(result.data);

        toast({
          status: "success",
          title: "search search note list !!",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleSearch = () => {
    // alert("검색 버튼 클릭");
    mutationForSearchStudyNoteListBySearchWords.mutate({
      searchWords,
    });
  };

  useEffect(() => {
    if (dataForStudyNote) {
      setStudyNoteList(dataForStudyNote.noteList);
    }
  }, [dataForStudyNote]);

  if (studyNoteLoading || !dataForStudyNote) {
    return <div>Loading study notes...</div>;
  }

  return (
    <Box>
      <Text align={"center"} fontSize={"5xl"}>
        {/* Tech Note !! */}
        <InputGroup my={3}>
          <Input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchWords}
            onChange={(e) => setSearchWords(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // 엔터 키를 누르면 검색 함수를 호출합니다.
              }
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              colorScheme="blue"
              h="1.75rem"
              size="sm"
              onClick={handleSearch}
            >
              검색
            </Button>
          </InputRightElement>
        </InputGroup>
      </Text>

      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        border={"0px solid green"}
        mx={"2px"}
        mb={2}
        gap={2}
      >
        <Box>
          {dataForStudyNote ? (
            <Select
              placeholder="Select a User"
              size={"sm"}
              onChange={handleSelectedNoteWriter}
            >
              {dataForStudyNote.note_writers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </Select>
          ) : (
            "no users"
          )}
        </Box>

        <Box>
          <Select
            placeholder="Select a first category"
            size={"sm"}
            onChange={handleFirstCategoryChange}
          >
            {firstCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Select
            placeholder="Select a second category"
            size={"sm"}
            onChange={handleSecondCategoryChange}
          >
            {secondCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        <IconButton
          variant="outline"
          onClick={buttonHandlerForRefreshFilterOption}
          size="sm"
          _hover={{ bgColor: "orange.200" }}
          icon={<FaSync size={14} />}
          aria-label="Refresh"
          px={2}
        />

        <ModalButtonForMyBookMarkList />
        <ModalButtonForMyLikeNoteList />

        <Spacer />
        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
          <Box>
            {isLoggedIn ? (
              <Link to={`/study-note/table-mode-for-update-page`}>
                <Button
                  variant="outline"
                  size={"sm"}
                  width={"100%"}
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.100" }}
                  // ml={2}
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  Copy Mode
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <ModalButtonForAddStudyNote
              button_size={"sm"}
              button_text={"add note"}
            />
          </Box>
        </Box>
        {/* </Box> */}
      </Box>

      <Box border={"0px solid purple"}>
        <Box
          display="grid"
          gridTemplateColumns={{
            lg: "repeat(2, 1fr)", // default value for all breakpoints
            md: "repeat(1, 1fr)", // for medium-sized screens and up
            sm: "repeat(1, 1fr)", // for small screens and up
          }}
          border={"0px solid blue"}
          gap={5}
          width={"100%"}
        >
          {studyNoteList
            ? studyNoteList.map((note: TypeForNote) => (
                <CardForStudyNote
                  pk={note.pk}
                  key={note.title}
                  title={note.title}
                  description={note.description}
                  writer={note.writer}
                  note_cowriters={note.note_cowriters}
                  count_for_note_contents={note.count_for_note_contents}
                  total_count_for_comments={note.total_count_for_comments}
                  total_count_for_qna_board={note.total_count_for_qna_board}
                  total_count_for_faq_list={note.total_count_for_faq_list}
                  total_count_for_subtitle={note.total_count_for_subtitle}
                  total_count_for_class_list={note.total_count_for_class_list}
                  total_count_for_suggestion_list = {note.total_count_for_suggestion_list}
                  total_count_for_error_report_list = {note.total_count_for_error_report_list}
                  first_category={note.first_category}
                  second_category={note.second_category}
                  studyNoteListRefatch={studyNoteListRefatch}
                  is_bookmark_for_note = {note.is_bookmark_for_note}
                  is_like_for_note = {note.is_like_for_note}
                />
              ))
            : ""}
        </Box>
      </Box>

      <Box mt={5}>
        {dataForStudyNote.noteList ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={dataForStudyNote?.totalPageCount}
            task_number_for_one_page={dataForStudyNote?.note_count_per_page}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StudyNotePage;

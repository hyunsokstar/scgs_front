import React, { useState } from "react";
import { Box, Flex, Text, Button, Select, IconButton } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useQuery, useMutation } from "@tanstack/react-query";

import { apiForGetStudyNoteList } from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import { TypeForNote, TypeForNoteList } from "../types/study_note_type";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const StudyNotePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");
  const [first_category, set_first_category] = useState("");
  const [second_category, set_second_category] = useState("");
  // first_category , second_category

  // 2222
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
    data: studyNoteData,
    refetch: studyNoteListRefatch,
  } = useQuery<TypeForNoteList>(
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

  console.log("studyNoteData : ", studyNoteData);

  const buttonHandlerForRefreshFilterOption = () => {
    setSelectedNoteWriter("");
    set_first_category("");
    set_second_category("");
  };

  if (studyNoteLoading || !studyNoteData) {
    return <div>Loading study notes...</div>;
  }

  return (
    <Box>
      <Text align={"center"} fontSize={"5xl"}>
        Tech Note !!
      </Text>

      <Box
        display={"flex"}
        alignItems={"center"}
        border={"0px solid green"}
        mx={"30px"}
        mb={2}
        gap={2}
      >
        {studyNoteData ? (
          <Select
            placeholder="Select a User"
            size={"sm"}
            onChange={handleSelectedNoteWriter}
          >
            {studyNoteData.note_writers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </Select>
        ) : (
          "no users"
        )}

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

        <IconButton
          variant="outline"
          onClick={buttonHandlerForRefreshFilterOption}
          size="sm"
          _hover={{ bgColor: "orange.200" }}
          icon={<FaSync size={14} />}
          aria-label="Refresh"
          px={2}
        />

        <ModalButtonForAddStudyNote button_text={"add study note"} />
        {isLoggedIn ? (
          <Link to={`/study-note/table-mode-for-update-page`}>
            <Button
              variant="outline"
              size={"md"}
              colorScheme="yellow"
              _hover={{ bg: "yellow.100" }}
              // ml={2}
              style={{
                backgroundColor: "transparent",
                marginRight: "10px",
              }}
            >
              Table Mode For Note Copy
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>

      <Box border={"0px solid purple"} px={""}>
        <Flex
          wrap="wrap"
          justifyContent={"flex-start"}
          gap={5}
          border={"0px solid black"}
          width={"95%"}
          mx={"auto"}
        >
          {studyNoteData.noteList.map((note: TypeForNote) => (
            <CardForStudyNote
              pk={note.pk}
              key={note.title}
              title={note.title}
              description={note.description}
              writer={note.writer}
              note_cowriters={note.note_cowriters}
              count_for_note_contents={note.count_for_note_contents}
              count_for_note_comments={note.count_for_note_comments}
              first_category={note.first_category}
              second_category={note.second_category}
              studyNoteListRefatch={studyNoteListRefatch}
            />
          ))}
        </Flex>
      </Box>

      <Box mt={5}>
        {studyNoteData.noteList ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={studyNoteData?.totalPageCount}
            task_number_for_one_page={studyNoteData?.note_count_per_page}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StudyNotePage;

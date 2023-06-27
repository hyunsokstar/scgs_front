import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Select,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { apiForGetStudyNoteList } from "../apis/study_note_api";
import CardForStudyNote from "../components/Card/CardForStudyNote";
import ModalButtonForAddStudyNote from "../components/modal/ModalButtonForAddStudyNote";
import { TypeForNote, TypeForNoteList } from "../types/study_note_type";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const StudyNotePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedNoteWriter, setSelectedNoteWriter] = useState("");
  const [first_category, set_first_category] = useState("");
  const [second_category, set_second_category] = useState("");

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

  const note_buttons_direction = useBreakpointValue({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
  });

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
        flexWrap={"wrap"}
        alignItems={"center"}
        border={"0px solid green"}
        mx={"2px"}
        mb={2}
        gap={2}
      >
        <Box>
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
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={2}
          flexDirection={note_buttons_direction}
        >
          <Box>
            <ModalButtonForAddStudyNote
              button_size={"sm"}
              button_text={"add study note"}
            />
          </Box>
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
                  Table Mode For Note Copy
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>

      <Box border={"0px solid purple"}>
        <Box
          display="grid"
          gridTemplateColumns={{
            lg: "repeat(2, 1fr)", // default value for all breakpoints
            md: "repeat(1, 1fr)", // for medium-sized screens and up
            sm: "repeat(1, 1fr)", // for small screens and up
          }}
          // width={"100%"}
          border={"0px solid blue"}
          gap={5}
          // px={2}
          width={"100%"}
          // mx={"auto"}
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
              count_for_qna_boards={note.count_for_qna_boards}
              count_for_note_contents_for_subtitle={
                note.count_for_note_contents_for_subtitle
              }
              count_for_class_list={note.count_for_class_list}
              first_category={note.first_category}
              second_category={note.second_category}
              studyNoteListRefatch={studyNoteListRefatch}
            />
          ))}
        </Box>
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

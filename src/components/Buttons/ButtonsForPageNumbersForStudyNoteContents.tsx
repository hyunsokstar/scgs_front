import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Input,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  selectButton,
  deselectButton,
  moveToBeforPage,
  moveToNextPage,
  cancle_for_all_selected_pages,
} from "../../reducers/studyNoteSlice";
import ButtonForEditorMode from "../Button/ButtonForEditorMode";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFordeleteStudyNoteContentsForSelectedPages,
  apiForMinusOnePageForSelectedPagesForStudyNoteContents,
  apiForPlusOnePageForSelectedPagesForStudyNoteContents,
} from "../../apis/study_note_api";
import { type_for_parameter_for_delete_pages_for_study_note } from "../../types/study_note_type";
import ToggleButtonForUpdate from "../Button/ToggleButtonForUpdate";
import { apiForUpdateEditModeForStudyNoteContent } from "../../apis/user_api";

interface ButtonsForPageNumbersForStudyNoteContentsProps {
  currentPage: number;
  exist_page_numbers: number[];
  selectedButtonsData: number[];
  study_note_pk: string | undefined;
}

// 1122
const ButtonsForPageNumbersForStudyNoteContents: React.FC<
  ButtonsForPageNumbersForStudyNoteContentsProps
> = ({
  currentPage,
  selectedButtonsData,
  exist_page_numbers,
  study_note_pk,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [editModeForStudyNoteContent, setEditModeForStudyNoteContent] =
    useState(false);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  console.log("loginUser : ", loginUser);

  const [pagesData, setpagesData] = useState(
    Array.from({ length: 50 }, (_, i) => i + 1)
  );

  const [editMode, setEditMode] = useState<boolean | undefined>();

  useEffect(() => {
    if (loginUser.is_edit_mode_for_study_note_contents) {
      setEditMode(true);
    }
  }, []);

  const clickHandlerForPageButton = (buttonNumber: number) => {
    dispatch(selectButton({ buttonNumber, editMode }));
  };

  const handlerForApply = () => {
    console.log("handlerForApply : ", selectedButtonsData);

    if (editMode) {
      exist_page_numbers.map((number) => {
        dispatch(selectButton({ buttonNumber: number, editMode }));
      });
    } else {
      dispatch(deselectButton());
      alert("여기");
    }
  };

  const pageMoveButtonHandler = (direction: string) => {
    if (direction === "left") {
      dispatch(moveToBeforPage(currentPage - 1));
    }

    if (direction === "right") {
      dispatch(moveToNextPage(currentPage + 1));
    }
  };

  const mutationForDeleteSelectedPages = useMutation(
    ({
      study_note_pk,
      selectedButtonsData,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiFordeleteStudyNoteContentsForSelectedPages({
        study_note_pk,
        selectedButtonsData,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "delete api docu 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteSelectedPagesHandler = () => {
    // study_note_pk
    mutationForDeleteSelectedPages.mutate({
      study_note_pk,
      selectedButtonsData,
    });
  };

  const cancleAllSeletedPage = () => {
    dispatch(cancle_for_all_selected_pages());
    toast({
      title: "page select 모두 취소",
      status: "success",
      position: "top",
    });
  };

  const mutationForPlusOnePageForSelectedPages = useMutation(
    ({
      study_note_pk,
      selectedButtonsData,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiForPlusOnePageForSelectedPagesForStudyNoteContents({
        study_note_pk,
        selectedButtonsData,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        toast({
          title: "선택된 페이지들 +1 success !",
          status: "success",
          // description: data.message,
        });
      },
    }
  );

  const plusOnePageForSelectedPageds = () => {
    console.log("plusOnePageForSelectedPageds check");

    if (selectedButtonsData.length === 0) {
      alert("페이지를 하나라도 선택 해주세요");
      return;
    }

    mutationForPlusOnePageForSelectedPages.mutate({
      study_note_pk,
      selectedButtonsData,
    });
  };

  const mutationForMinusOnePageForSelectedPages = useMutation(
    ({
      study_note_pk,
      selectedButtonsData,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiForMinusOnePageForSelectedPagesForStudyNoteContents({
        study_note_pk,
        selectedButtonsData,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        toast({
          title: "선택된 페이지들 -1 success !",
          status: "success",
          // description: data.message,
        });
      },
    }
  );

  const minusOnePageForSelectedPageds = () => {
    console.log("plusOnePageForSelectedPageds check");

    if (selectedButtonsData.length === 0) {
      alert("페이지를 하나라도 선택 해주세요");
      return;
    }

    mutationForMinusOnePageForSelectedPages.mutate({
      study_note_pk,
      selectedButtonsData,
    });
  };

  // loginUser.pk

  const mutationForUpdateEditModeForStudyNoteForContent = useMutation(
    apiForUpdateEditModeForStudyNoteContent,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // queryClient.refetchQueries(["getOneProjectTask"]);

        toast({
          status: "success",
          title: "UpdateEditMode Success !",
          description: result.message,
        });
      },
    }
  );

  const onChangeHandlerForEditModeForStudyNoteContent = (option: boolean) => {
    setEditModeForStudyNoteContent(option);
    const userPk = loginUser?.pk;

    mutationForUpdateEditModeForStudyNoteForContent.mutate(userPk);
    console.log("option : ", option);
  };

  // 2244
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={1}
      width={"100%"}
      border={"1px solid green"}
    >
      <Box display={"flex"} width={"100%"} pt={1} px={1} gap={1}>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          variant="outline"
          colorScheme="teal"
          size="sm"
          mr={0}
          _hover={{ bg: "teal.100", color: "white" }}
          onClick={() => pageMoveButtonHandler("left")}
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          variant="outline"
          colorScheme="teal"
          size="sm"
          _hover={{ bg: "teal.100", color: "white" }}
          onClick={() => pageMoveButtonHandler("right")}
        />
        <Spacer />
        {/* <Button
          onClick={() => handlerForApply()}
          variant="outline"
          size="sm"
          colorScheme="teal"
          borderWidth="2px"
          borderColor="teal.300"
          _hover={{ bg: "teal.100", color: "white" }}
        >
          Check For Not Empty
        </Button> */}
        {/* {exist_page_numbers} */}
        {/* <ButtonForEditorMode
          button_text={editMode ? "On" : "Off"}
          editMode={editMode}
          setEditMode={setEditMode}
        /> */}
        {/* {loginUser.username} */}
        {/* {loginUser.username && (
          <ToggleButtonForUpdate
            currentState={loginUser.is_edit_mode_for_study_note_contents}
            onChangeHandler={onChangeHandlerForEditModeForStudyNoteContent}
          />
        )} */}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        border={"1px solid black"}
        width={"100%"}
        px={2}
        py={1}
      >
        {!isLoggedIn ? "로그인 필요" : ""}
        {editMode ? (
          <Box display={"flex"} justifyContent={"space-between"} p={2}>
            <Button
              onClick={() => handlerForApply()}
              variant="outline"
              size="sm"
              colorScheme="teal"
              borderWidth="2px"
              borderColor="teal.300"
              _hover={{ bg: "teal.100", color: "white" }}
            >
              Check For Not Empty
            </Button>

            {/* <ButtonForEditorMode
              button_text={editMode ? "On" : "Off"}
              editMode={editMode}
              setEditMode={setEditMode}
            /> */}
          </Box>
        ) : (
          ""
        )}

        <Box>
          {loginUser.username && (
            <ToggleButtonForUpdate
              currentState={loginUser.is_edit_mode_for_study_note_contents}
              onChangeHandler={onChangeHandlerForEditModeForStudyNoteContent}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </Box>
      </Box>

      {editMode ? (
        <Box
          display="flex"
          justifyContent="space-between"
          border={"1px solid blue"}
          mt={0}
          w={"100%"}
          p={1}
          gap={1}
        >
          <Button
            variant="outline"
            size="sm"
            colorScheme="purple"
            borderColor="purple.500"
            _hover={{ bg: "purple.50", borderColor: "purple.300" }}
            onClick={() => minusOnePageForSelectedPageds()}
          >
            -1
          </Button>
          <Button
            variant="outline"
            size="sm"
            colorScheme="purple"
            borderColor="purple.500"
            _hover={{ bg: "purple.50", borderColor: "purple.300" }}
            onClick={() => plusOnePageForSelectedPageds()}
          >
            +1
          </Button>
          <Spacer />
          <Button
            variant="outline"
            size="sm"
            colorScheme="red"
            borderColor="red.500"
            _hover={{ bg: "red.50", borderColor: "red.300" }}
            onClick={() => cancleAllSeletedPage()}
          >
            Cancle
          </Button>

          {/* 삭제 버튼 delete button */}
          <Button
            variant="outline"
            size="sm"
            colorScheme="red"
            borderColor="red.500"
            _hover={{ bg: "red.50", borderColor: "red.300" }}
            onClick={() => deleteSelectedPagesHandler()}
          >
            <FaTrashAlt />
          </Button>
        </Box>
      ) : (
        ""
      )}

      <Box px={"auto"} border={"0px solid green"} mx={"auto"} width={"86%"}>
        {pagesData.map((page) => {
          console.log("currentPage, page", typeof currentPage, typeof page);
          return (
            <Button
              key={page}
              width={"10px"}
              height={"30px"}
              variant="outline"
              borderColor={currentPage == page ? "red" : "blue"}
              onClick={() => clickHandlerForPageButton(page)}
              style={{
                width: "25px",
                height: "25px",
                margin: "5px",
                backgroundColor: selectedButtonsData?.includes(page)
                  ? "rgba(46, 204, 113, 1)"
                  : "white",
              }}
              borderRadius="0"
            >
              {page}
            </Button>
          );
        })}
      </Box>
      {/* 페이지 넘버 출력 end */}
    </Box>
  );
};

export default ButtonsForPageNumbersForStudyNoteContents;

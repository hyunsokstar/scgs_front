import {
  Box,
  Button,
  Spacer,
  IconButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  selectButton,
  moveToBeforPage,
  moveToNextPage,
  cancle_for_all_selected_pages,
  setPageNumbersToMove,
  go_to_specific_page,
} from "../../reducers/studyNoteSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFordeleteStudyNoteContentsForSelectedPages,
  apiForMinusOnePageForSelectedPagesForStudyNoteContents,
  apiForPlusOnePageForSelectedPagesForStudyNoteContents,
  apiForUpdateNoteContentsPageForSelected,
} from "../../apis/study_note_api";
import { type_for_parameter_for_delete_pages_for_study_note } from "../../types/study_note_type";
import ToggleButtonForUpdate from "../Button/ToggleButtonForUpdate";
import { apiForUpdateEditModeForStudyNoteContent } from "../../apis/user_api";
import InputsForSettingOptionForPageUpdate from "../Input/InputsForSettingOptionForPageUpdate";
import { Link, useNavigate } from "react-router-dom";

interface ButtonsForPageNumbersForStudyNoteContentsProps {
  currentPage: number;
  exist_page_numbers: number[];
  pageNumbersToEdit: number[];
  pageNumbersToMove: number[];
  study_note_pk: string | undefined;
  is_authority_for_note: boolean | undefined;
}

const ButtonsForPageNumbersForStudyNoteContents: React.FC<
  ButtonsForPageNumbersForStudyNoteContentsProps
> = ({
  study_note_pk, // 노트 content pk 아니고 노트 주제 pk를 말함
  currentPage,
  pageNumbersToEdit,
  pageNumbersToMove,
  exist_page_numbers,
  is_authority_for_note,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const toast = useToast();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [pagesData, setpagesData] = useState(
    Array.from({ length: 100 }, (_, i) => i + 1)
  );

  const [editMode, setEditMode] = useState<boolean | undefined>();

  useEffect(() => {
    if (loginUser.is_edit_mode_for_study_note_contents) {
      setEditMode(true);
    }
  }, []);

  // fix 0614
  const clickHandlerForPageButton = (event: any, buttonNumber: number) => {
    if (event.shiftKey) {
      console.log("shift click for setPageNumbersToMove");
      dispatch(setPageNumbersToMove({ buttonNumber, editMode }));
    } else {
      if (editMode) {
        dispatch(selectButton({ buttonNumber, editMode }));
      } else {
        navigate(`/study-note/${study_note_pk}/${buttonNumber}`);
      }

      console.log("just click");
    }
  };

  const handlerForApply = () => {
    console.log("pageNumbersToEdit : ", pageNumbersToEdit);

    exist_page_numbers.map((number) => {
      dispatch(selectButton({ buttonNumber: number, editMode }));
    });
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
      pageNumbersToEdit,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiFordeleteStudyNoteContentsForSelectedPages({
        study_note_pk,
        pageNumbersToEdit,
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
      pageNumbersToEdit,
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
      pageNumbersToEdit,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiForPlusOnePageForSelectedPagesForStudyNoteContents({
        study_note_pk,
        pageNumbersToEdit,
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

  // 0528
  const plusOnePageForSelectedPageds = () => {
    console.log("plusOnePageForSelectedPageds check");

    if (pageNumbersToEdit.length === 0) {
      alert("페이지를 하나라도 선택 해주세요");
      return;
    }

    mutationForPlusOnePageForSelectedPages.mutate({
      study_note_pk,
      pageNumbersToEdit,
    });
  };

  const mutationForMinusOnePageForSelectedPages = useMutation(
    ({
      study_note_pk,
      pageNumbersToEdit,
    }: type_for_parameter_for_delete_pages_for_study_note) => {
      return apiForMinusOnePageForSelectedPagesForStudyNoteContents({
        study_note_pk,
        pageNumbersToEdit,
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

    if (pageNumbersToEdit.length === 0) {
      alert("페이지를 하나라도 선택 해주세요");
      return;
    }

    mutationForMinusOnePageForSelectedPages.mutate({
      study_note_pk,
      pageNumbersToEdit,
    });
  };

  // loginUser.pk

  const mutationForUpdateEditModeForStudyNoteForContent = useMutation(
    apiForUpdateEditModeForStudyNoteContent,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        dispatch(cancle_for_all_selected_pages());
        toast({
          status: "success",
          title: "UpdateEditMode Success !",
          description: result.message,
        });
      },
    }
  );

  const onChangeHandlerForEditModeForStudyNoteContent = (
    option: boolean | undefined
  ) => {
    // setEditModeForStudyNoteContent(option);
    const userPk = loginUser?.pk;

    mutationForUpdateEditModeForStudyNoteForContent.mutate(userPk);
    // dispatch(deselectButton());
    console.log("option : ", option);
  };

  const getColor = (
    pageNumbersToEdit: number[],
    pageNumbersToMove: number[],
    page: number
  ) => {
    if (pageNumbersToEdit?.includes(page)) {
      return "rgba(46, 204, 113, 1)"; // 초록색
    } else if (pageNumbersToMove?.includes(page)) {
      return "orange"; // 주황색
    } else {
      return "white"; // 기본 배경색
    }
  };

  const mutationForUpdateNoteContentsPageForSelected = useMutation(
    ({
      direction,
      study_note_pk,
      pageNumbersToEdit,
      pageNumbersToMove,
    }: any) => {
      return apiForUpdateNoteContentsPageForSelected({
        direction,
        study_note_pk,
        pageNumbersToEdit,
        pageNumbersToMove,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        if (data.direction === "forward") {
          dispatch(go_to_specific_page(pageNumbersToMove[0]));
        } else if (data.direction === "backward") {
          dispatch(go_to_specific_page(pageNumbersToEdit[0]));
        }

        toast({
          title: "선택된 페이지들 +1 success !",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const buttonHandlerForUpdateNoteContentsPageForSelected = (
    direction: string
  ) => {
    console.log(
      "buttonHandlerForUpdateNoteContentsPageForSelected 실행 확인",
      direction
    );

    if (pageNumbersToEdit.length === 0) {
      alert("페이지를 하나라도 선택 해주세요");
      return;
    }

    mutationForUpdateNoteContentsPageForSelected.mutate({
      direction,
      study_note_pk,
      pageNumbersToEdit,
      pageNumbersToMove,
    });
  };

  // 2244
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      // gap={1}
      width={"100%"}
      border={"1px solid black"}
    >
      <Box
        display={"flex"}
        width={"100%"}
        pt={1}
        px={1}
        gap={1}
        // border={"5px solid blue"}
      >
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

        {loginUser.username || is_authority_for_note ? (
          <Box>
            <ToggleButtonForUpdate
              currentState={loginUser.is_edit_mode_for_study_note_contents}
              onChangeHandler={onChangeHandlerForEditModeForStudyNoteContent}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </Box>
        ) : (
          ""
        )}

        <Link
          to={`/study-note/${study_note_pk}/${currentPage}/slide`}
          style={{ textDecoration: "underline" }}
        >
          <Button
            variant={"outline"}
            border={"1px solid black"}
            _hover={{ bgColor: "pink.100" }}
            size={"sm"}
          >
            by slide
          </Button>
        </Link>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        px={2}
        // py={1}
        // border={"5px solid green"}
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
          </Box>
        ) : (
          ""
        )}
      </Box>

      {editMode ? (
        <Box
          display="flex"
          justifyContent="space-between"
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

      {!editMode ? <Box ml={2}>page numbers : </Box> : ""}

      {!pageNumbersToMove.length && pageNumbersToEdit.length !== 0 && (
        <Button
          variant="outline"
          size={"sm"}
          colorScheme="yellow"
          _hover={{ bg: "yellow.100" }}
          onClick={() =>
            buttonHandlerForUpdateNoteContentsPageForSelected("add_whitespace")
          }
          style={{
            backgroundColor: "transparent",
            marginRight: "10px",
          }}
        >
          add_whitespaces
        </Button>
      )}

      <Box display={"flex"} flexDirection={"column"} ml={3}>
        <Box>
          {pageNumbersToEdit.length === pageNumbersToMove.length &&
            pageNumbersToEdit.length != 0 && (
              <Box display={"flex"} justifyContent={"space-around"}>
                {/* 이동 버튼 */}
                <Button
                  variant="outline"
                  size={"sm"}
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.100" }}
                  onClick={() =>
                    buttonHandlerForUpdateNoteContentsPageForSelected("forward")
                  }
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  L To R
                </Button>
                <Button
                  variant="outline"
                  size={"sm"}
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.100" }}
                  onClick={() =>
                    buttonHandlerForUpdateNoteContentsPageForSelected(
                      "backward"
                    )
                  }
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  R To L
                </Button>

                <Button
                  variant="outline"
                  size={"sm"}
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.100" }}
                  onClick={() =>
                    buttonHandlerForUpdateNoteContentsPageForSelected("switch")
                  }
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  Switch
                </Button>

                <Button
                  variant="outline"
                  size={"sm"}
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.100" }}
                  onClick={() =>
                    buttonHandlerForUpdateNoteContentsPageForSelected("insert")
                  }
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  Insert
                </Button>
              </Box>
            )}
        </Box>
      </Box>
      <Box px={"auto"} width={"100%"} border={"0px solid green"}>
        <Box width={"90%"} mx={"auto"} border={"0px solid red"}>
          {pagesData.map((page) => {
            console.log("currentPage, page", typeof currentPage, typeof page);
            return (
              // 고칠것 pageNumbersToEdit 에 포함 되어 있으면 PageNumbersToMove에는 안됨
              // pageNumbersToEdit중에 제일 큰거보다  PageNumbersToMove이 더 커야 함
              // pageNumbersToEdit 의 개수와 PageNumbersToMove 의 개수가 일치하면 대량 이동 버튼 활성화
              <Button
                key={page}
                width={"10px"}
                height={"30px"}
                variant="outline"
                borderColor={currentPage == page ? "red" : "blue"}
                onClick={(e) => clickHandlerForPageButton(e, page)}
                style={{
                  width: "25px",
                  height: "25px",
                  margin: "3px",
                  backgroundColor: getColor(
                    pageNumbersToEdit,
                    pageNumbersToMove,
                    page
                  ),
                }}
                borderRadius="0"
              >
                {page}
              </Button>
            );
          })}
        </Box>
      </Box>
      {/* 페이지 넘버 출력 end */}
      <Divider />
      <Box width={"100%"}>
        {editMode ? <InputsForSettingOptionForPageUpdate /> : ""}
      </Box>
    </Box>
  );
};

export default ButtonsForPageNumbersForStudyNoteContents;

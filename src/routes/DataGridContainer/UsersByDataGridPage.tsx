import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteMultiUserListForCheck,
  getUsersList,
  saveMultiUserUsingDataGrid,
  signUp,
} from "../../apis/user_api";
import {
  Box,
  Button,
  ButtonSpinner,
  Checkbox,
  Flex,
  HStack,
  Img,
  useToast,
} from "@chakra-ui/react";

import DataGrid from "react-data-grid";
import { faker } from "@faker-js/faker";
import styles from "./grid.module.css";
import button_styles from "./button.module.css";
import TextEditor from "../../components/Editor/textEditor";
import { IUserRow } from "../../types/user/user_types";
import SelectBoxEditor from "../../components/Editor/SelectBox";

// 1122

interface Props {}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const checkboxFormatter = ({ row, column, onRowChange, onClose }: any) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(e) => {
        // console.log("check box event 실행", e.target.checked);
        // console.log("row : ", row);
        const checked = e.target.checked;
        // console.log("checked : ", checked);

        onRowChange({ ...row, selected: checked });
      }}
    />
  );
};

// 컬럼 설정
// 2244
const columns = [
  {
    key: "checkbox",
    name: "",
    width: 20,
    resizable: false,
    sortable: false,
    formatter: checkboxFormatter,
  },
  { key: "name", name: "Name", editor: TextEditor, editable: true },
  { key: "username", name: "Username", editor: TextEditor, editable: true },
  { key: "email", name: "Email", editor: TextEditor, editable: true },
  {
    key: "profile_image",
    name: "profile_image",
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    formatter: ({ row }: { row: any }) => {
      return (
        <>
          <Img
            src={
              row.profile_image
                ? row.profile_image
                : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
            }
            width={"50px"}
            height={"50px"}
          />
        </>
      );
    },
  },
  { key: "admin_level", name: "Admin Level", editor: TextEditor },
  {
    key: "position",
    name: "Position",
    editor: SelectBoxEditor,
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    formatter: ({ row, column }: any) => {
      // console.log("row[column.key] : ", row[column.key]);
      return (
        <div>
          {row[column.key].position_name === ""
            ? ""
            : row[column.key] === 1
            ? "frontend"
            : "backend"}
        </div>
      );
    },
  },
];

const position_names = ["사원", "대리", "과장", "부장", "사장", "회장"];

// 타입 설정, type setting
// interface Row {
//   pk: number;
//   name: string;
//   username: string;
//   email: string;
//   profileImages?: [
//     {
//       pk: number;
//       file: string;
//     }
//   ];
//   admin_level: number;
//   position: string;

//   selected?: boolean;
//   is_new_row?: boolean;
//   profile_image?: string;
// }

// 1122
function UsersByDataGridPage({}: Props): ReactElement {
  const toast = useToast();

  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set()
  );

  const {
    isLoading,
    data: usersListData,
    error,
  } = useQuery<IUserRow[]>(["users_list2"], getUsersList);
  const [gridRows, setGridRows] = useState<IUserRow[]>();
  const queryClient = useQueryClient();

  const saveMultiUsersMutation = useMutation(saveMultiUserUsingDataGrid, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      toast({
        title: "유저 데이터 저장 성공!",
        status: "success",
      });

      const rows_for_update = gridRows?.map((row) => {
        return {
          ...row,
          selected: false,
          is_new_row: false,
        };
      });

      setGridRows(rows_for_update);
      queryClient.refetchQueries(["users_list2"]);
    },
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    onError: (error: any) => {
      if (error) {
        console.log("회원 가입 에러 : ", error.response.data.error);
        const signUpErrorMessage = error.response.data.detail;
        toast({
          title: `에러 발생: ${signUpErrorMessage}`,
          status: "error",
        });
        // setSignUpErrorExists(signUpErrorMessage)
      }
    },
  });

  // user save
  const handleSaveRow = () => {
    let data_for_save: IUserRow[];

    if (gridRows) {
      data_for_save = gridRows?.filter((row) => {
        if (row.selected) {
          return row;
        } else {
          console.log("new row 는 아닙니다.");
        }
      });
      // const name = "hi"
      // const username = "hi"
      // const password = "hi"
      // const email = "hi"

      // todo data_for_save 를 서버로 보내서 저장
      // saveMultiUsersMutation
      saveMultiUsersMutation.mutate(data_for_save);

      console.log(
        `data for save : ${data_for_save} 길이 ${data_for_save.length}`
      );
    }
  };

  const handleAddRow = () => {
    // console.log("행 추가 클릭 : ", gridRows);
    if (gridRows !== undefined) {
      const newRow = {
        pk: gridRows.length + 1,
        name: "",
        username: "",
        email: "",
        admin_level: 1,
        position: {
          position_name: "",
        },
        selected: true,
        is_new_row: true,
      };
      setGridRows([newRow, ...gridRows]);
    }
  };

  useEffect(() => {
    let rowData;

    if (usersListData) {
      rowData = usersListData?.map((row) => {
        if (row.profileImages) {
        }

        return {
          pk: row.pk,
          name: row.name,
          username: row.username,
          email: row.email,
          profile_image: row.profileImages?.length
            ? row.profileImages[0].file
            : "",
          admin_level: Math.floor(Math.random() * 5) + 1,
          position: row.position?.pk,
          selected: row.selected,
        };
      });
    }

    setGridRows(rowData);
  }, [usersListData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  // console.log("usersListData => ", usersListData);

  const rowKeyGetter = (row: IUserRow) => {
    return row.pk;
  };

  const rowChangeHandler = (rows: IUserRow[]) => {
    // console.log("changed rows : ", rows);
    setGridRows(rows);
  };

  const deleteMutationForCheck = useMutation(
    (ids_to_delete: number[]) => {
      return deleteMultiUserListForCheck(ids_to_delete);
    },
    {
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "delete for checkbox 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteButtonForCheckHandler = () => {
    const check_ids = gridRows?.filter((row) => {
      if (row.selected) {
        return row.pk;
      }
    });
    console.log("check_ids: ", check_ids);
  };

  if (gridRows) {
    return (
      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          p={2}
          // gap={2}
          mb={2}
          border={"1px solid black"}
        >
          <Box>
            총 {!isLoading && usersListData ? usersListData.length : "loading"}{" "}
            명
          </Box>
          <Box display={"flex"} justifyContent={"space-betwwen"} gap={2}>
            <Button
              size="md"
              onClick={handleAddRow}
              fontWeight="bold"
              colorScheme="blue"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
              행추가
            </Button>

            <Button
              size="md"
              onClick={handleSaveRow}
              fontWeight="bold"
              colorScheme="green"
              _hover={{ bg: "green.600" }}
              _active={{ bg: "green.700" }}
            >
              저장
            </Button>
            <Button
              size="md"
              fontWeight="bold"
              colorScheme="red"
              _hover={{ bg: "red.600" }}
              _active={{ bg: "red.700" }}
              onClick={deleteButtonForCheckHandler}
            >
              삭제
            </Button>
          </Box>
        </Flex>

        <Box>
          <DataGrid
            columns={columns}
            rows={gridRows}
            rowKeyGetter={rowKeyGetter}
            rowHeight={50}
            onRowsChange={rowChangeHandler}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            className="fill-grid"
            rowClass={(row: IUserRow) => {
              // console.log("row check: ", row);
              if (row.is_new_row) {
                return styles.new_row;
              }

              if (row.selected) {
                // console.log("check selected true");

                return styles.selected;
              } else {
                return "";
              }
            }}
          />
        </Box>
      </Box>
    );
  } else {
    return <Box>데이터가 없습니다.</Box>;
  }
}

export default UsersByDataGridPage;

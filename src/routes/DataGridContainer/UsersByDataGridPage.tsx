import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { ReactElement, useEffect, useState } from "react";
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
import ModalForUserProfileImageUpdate from "../../components/modal/ModalForUserProfileImageUpdate";
import useUser from "../../lib/useUser";

interface Props {}

const profileImageDoubleClickHandler = () => {};

const checkboxFormatter = ({ row, column, onRowChange, onClose }: any) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(e) => {
        const checked = e.target.checked;
        onRowChange({ ...row, selected: checked });
      }}
    />
  );
};

const checkboxFormatter2 = ({ row, column, onRowChange, onClose }: any) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(e) => {
        // const checked = e.target.checked;
        // onRowChange({ ...row, selected: checked });
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
    headerRenderer: ({ column }: any) => (
      <input
        type="checkbox"
        checked={column.allCheckBoxSelected}
        onClick={column.allCheckHandler}
        // column={column}
        // isCellSelected={() => false}
      />
    ),
  },
  { key: "name", name: "Name", editor: TextEditor, editable: true },
  { key: "username", name: "Username", editor: TextEditor, editable: true },
  { key: "email", name: "Email", editor: TextEditor, editable: true },
  {
    key: "profile_image",
    name: "profile_image",
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    formatter: ({ row, column }: any) => {
      // console.log("row : ", row);

      // console.log("column : ", column);

      return (
        <HStack>
          <Img
            src={
              row.profile_image
                ? row.profile_image
                : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
            }
            width={"50px"}
            height={"50px"}
            onDoubleClick={profileImageDoubleClickHandler}
          />
          {column.user && row.username === column.user.username ? (
            <ModalForUserProfileImageUpdate
              // userPk={row.pk}
              // profile_image={row.profile_image}
              loginUser={column.user}
            />
          ) : (
            ""
          )}
        </HStack>
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
      return (
        <Box>
          {row[column.key].position_name === ""
            ? ""
            : row[column.key] === 1
            ? "frontend"
            : "backend"}
        </Box>
      );
    },
  },
];

const position_names = ["사원", "대리", "과장", "부장", "사장", "회장"];

// 1122
function UsersByDataGridPage({}: Props): ReactElement {
  const { userLoading, isLoggedIn, user } = useUser();
  const [allCheckBoxSelected, setAllCheckBoxSelected] = useState(false);

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

      saveMultiUsersMutation.mutate(data_for_save);

      console.log(
        `data for save : ${data_for_save} 길이 ${data_for_save.length}`
      );
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

  const deleteMutationForCheck = useMutation(
    (ids_to_delete: number[]) => {
      return deleteMultiUserListForCheck(ids_to_delete);
    },
    {
      onSuccess: (data) => {
        setAllCheckBoxSelected(false);
        console.log("data : ", data);
        queryClient.refetchQueries(["users_list2"]);

        toast({
          title: "delete for checkbox 성공!",
          status: "success",
        });
      },
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      onError: (error: any) => {
        console.log("error : ", error);

        if (error) {
          const ErrorMessage = error.response.data.detail;
          toast({
            title: `에러 발생: ${ErrorMessage}`,
            status: "error",
          });
        }
      },
    }
  );

  const deleteButtonForCheckHandler = () => {
    let filtered_rows;
    let filtered_ids;
    if (gridRows) {
      filtered_rows = gridRows.filter((row) => {
        if (row.selected) {
          return row;
        }
      });
      filtered_ids = filtered_rows.map((row) => {
        return row.pk;
      });
      console.log("filtered_ids : ", filtered_ids);
      const response = deleteMutationForCheck.mutate(filtered_ids);
    }

    console.log("삭제 버튼 클릭");
  };

  const allCheckHandler = () => {
    console.log("hi");

    const new_grid_rows = gridRows?.map((row) => {
      const isAllSelected = gridRows
        .map((row) => {
          if (row.selected === true) {
            return row.selected;
          } else {
            return false;
          }
        })
        .includes(false);

      if (!isAllSelected) {
        return {
          ...row,
          selected: false,
        };
      } else {
        return {
          ...row,
          selected: true,
        };
      }
    });
    setGridRows(new_grid_rows);
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

  const english_names = [
    "Abigail",
    "Alexander",
    "Amelia",
    "Andrew",
    "Annabelle",
    "Anthony",
    "Arabella",
    "Asher",
    "Ava",
    "Benjamin",
    "Brielle",
    "Caleb",
    "Camila",
    "Caroline",
    "Carter",
    "Charlotte",
    "Chloe",
    "Christopher",
    "Claire",
    "Daniel",
    "David",
    "Eleanor",
    "Elijah",
    "Elizabeth",
    "Ellie",
    "Emily",
    "Emma",
    "Ethan",
    "Evelyn",
    "Finn",
    "Gabriel",
    "Grace",
    "Hannah",
    "Harper",
    "Hazel",
    "Isaac",
    "Isabella",
    "Jackson",
    "Jacob",
    "James",
    "Jasmine",
    "John",
    "Jonathan",
    "Joseph",
    "Julia",
    "Julian",
    "Katherine",
    "Landon",
    "Lauren",
    "Leah",
    "Leo",
    "Liam",
    "Lila",
    "Lillian",
    "Lily",
    "Lincoln",
    "Logan",
    "Lucas",
    "Lucy",
    "Luke",
    "Madeline",
    "Maeve",
    "Mason",
    "Matthew",
    "Maya",
    "Mia",
    "Michael",
    "Mila",
    "Natalie",
    "Nathan",
    "Nicholas",
    "Noah",
    "Oliver",
    "Olivia",
    "Owen",
    "Penelope",
    "Peter",
    "Peyton",
    "Rebecca",
    "Riley",
    "Ryan",
    "Samantha",
    "Samuel",
    "Sara",
    "Sarah",
    "Sofia",
    "Moly",
    "Melanie",
    "Maya",
  ];

  const createRandomUserRowHandler = () => {
    if (faker && gridRows !== undefined) {
      const newRow = {
        pk: gridRows.length + 1,
        name: `name_${
          english_names[Math.floor(Math.random() * english_names.length)]
        }`,
        username: `user_${
          english_names[Math.floor(Math.random() * english_names.length)]
        }_${Math.floor(Math.random() * 100) + 1}`,
        email: `${`my_${
          english_names[Math.floor(Math.random() * english_names.length)]
        }`}@daum.net`,
        admin_level: 1,
        position: 1,
        selected: true,
        is_new_row: true,
      };
      setGridRows([newRow, ...gridRows]);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const rowKeyGetter = (row: IUserRow) => {
    return row.pk;
  };

  const rowChangeHandler = (rows: IUserRow[]) => {
    // console.log("changed rows : ", rows);
    setGridRows(rows);
  };

  // 2244 tsx
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
              onClick={createRandomUserRowHandler}
              fontWeight="bold"
              colorScheme="purple"
              _hover={{ bg: "purple.600" }}
              _active={{ bg: "purple.700" }}
            >
              랜덤 행추가
            </Button>

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
            // columns={columns}
            columns={columns.map((col) => ({
              ...col,
              isLoggedIn,
              user,
              allCheckHandler,
              allCheckBoxSelected,
            }))}
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
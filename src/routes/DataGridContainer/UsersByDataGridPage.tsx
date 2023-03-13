import React, { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query"; 
import { getUsersList } from "../../apis/user_api";
import { Box, Img } from "@chakra-ui/react";

import DataGrid from "react-data-grid";
import { faker } from "@faker-js/faker";

interface Props {}

const columns = [
  { key: "name", name: "Name" },
  { key: "username", name: "Username" },
  { key: "email", name: "Email" },
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
            // alt={"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
            width={"50px"}
            height={"50px"}
          />
        </>
      );
    },
  },
  { key: "admin_level", name: "Admin Level" },
  { key: "position", name: "Position" },
];

const position_names = ["사원", "대리", "과장", "부장", "사장", "회장"];

// function createRows(): Row[] {
//   const now = Date.now();
//   // rome-ignore lint/suspicious/noExplicitAny: <explanation>
//   const rows: any[] = [];

//   for (let i = 0; i < 5; i++) {
//     rows.push({
//       pk: 1,
//       name: faker.name.fullName(),
//       username: faker.internet.userName(),
//       email: faker.internet.exampleEmail(),
//       profile_image: faker.internet.avatar(),
//       admin_level: Math.floor(Math.random() * 5) + 1,
//       position: position_names[Math.floor(Math.random() * 5) + 1],
//       // position: "developer",
//     });
//   }

//   return rows;
// }

interface Row {
  pk: number;
  name: string;
  username: string;
  email: string;
  profileImages?: [
    {
      pk: number;
      file: string;
    }
  ];
  admin_level: number;
  position: string;
}

function UsersByDataGridPage({}: Props): ReactElement {
  const {
    isLoading,
    data: usersListData,
    error,
  } = useQuery<Row[]>(["users_list"], getUsersList);
  const [gridRows, setGridRows] = useState<Row[]>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  // console.log("usersListData => ", usersListData);

  const rowKeyGetter = (row: Row) => {
    return row.pk;
  };

  const rowData = usersListData?.map((row) => {
    if (row.profileImages) {
    }
    console.log("row.profile_images : ", row);

    return {
      pk: row.pk,
      name: row.name,
      username: row.username,
      email: row.email,
      profile_image: row.profileImages?.length ? row.profileImages[0].file : "",
      admin_level: Math.floor(Math.random() * 5) + 1,
      position: position_names[Math.floor(Math.random() * 5) + 1],
    };
  });

  if (rowData) {
    return (
      <Box>
        <Box>
          {!isLoading && usersListData ? usersListData.length : "loading"}
        </Box>
        <Box>
          <DataGrid
            columns={columns}
            rows={rowData}
            rowKeyGetter={rowKeyGetter}
            rowHeight={50}
          />
        </Box>
      </Box>
    );
  } else {
    return <Box>데이터가 없습니다.</Box>;
  }
}

export default UsersByDataGridPage;
import React, { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // 리액트 쿼리
import { getUsersList } from "../../apis/user_api"; // 유저 데이터 임포트
import { IUsersForUserList } from "../../types"; // 유저 리스트 타입 설정
import { Box, Img } from "@chakra-ui/react";

import DataGrid from "react-data-grid";
import { faker } from "@faker-js/faker";

interface Props {}

const sampleImages = [
  "https://gayou.co.kr/data/file/sliders/2039101916_6c8NQ0w3_5eabde665c90a580b6224d30a23add663761a16b.png",
  "https://gayou.co.kr/data/file/sliders/2039101916_YvEBqTJy_9634dda2f61879adafdc800f2716da8a46e0b451.png",
  "https://gayou.co.kr/data/file/sliders/2039101916_euIvNYoS_8bcdf096698f9856e7a9776a7445082ca71c157c.png",
  "https://gayou.co.kr/data/file/sliders/2039121330_Pr4uL7Uq_3d0679f38a9c703a694835458b14bca4f989931f.png",
  "https://gayou.co.kr/data/file/sliders/2039101916_6c8NQ0w3_5eabde665c90a580b6224d30a23add663761a16b.png",
  "https://gayou.co.kr/data/file/sliders/2039101916_roxNGWZk_47809c070c777a21f3648c9c72527dee9d483043.png",
];

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

const columns = [
  { key: "name", name: "Name" },
  { key: "username", name: "Username" },
  { key: "email", name: "Email" },
  {
    key: "profile_image",
    name: "profile_image",
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    formatter: ({ row }: { row: any }) => {

      // console.log("row : ", row);
      

      return (
        <>
          {/* {row.profile_image} */}
          <Img
            src={row.profile_image ? row.profile_image : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
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

function createRows(): Row[] {
  const now = Date.now();
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const rows: any[] = [];

  for (let i = 0; i < 5; i++) {
    rows.push({
      pk: 1,
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.exampleEmail(),
      profile_image: faker.internet.avatar(),
      admin_level: Math.floor(Math.random() * 5) + 1,
      position: position_names[Math.floor(Math.random() * 5) + 1],
      // position: "developer",
    });
  }

  return rows;
}

function UsersByDataGridPage({}: Props): ReactElement {
  const {
    isLoading,
    data: usersListData,
    error,
  } = useQuery<Row[]>(["users_list"], getUsersList);

  const [gridRows, setGridRows] = useState<Row[]>(createRows);

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
    console.log(
      "row.profile_images : ",
      row
    );

    return {
      pk: row.pk,
      name: row.name,
      username: row.username,
      email: faker.internet.exampleEmail(),
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

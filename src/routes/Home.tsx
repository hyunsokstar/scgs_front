import { Box, useBreakpointValue } from "@chakra-ui/react";
import SampleCard from "../components/TestCard/SampleCard";

const image_array = [
  {
    image_url:
      "https://www.salesforce.com/content/dam/web/ja_jp/www/images/hub/business/img-task-management.jpg",
  },
  {
    image_url:
      "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4kvJ/image/csIWEXQANORlEolYeoN13xOVoAM.jpg",
  },
  {
    image_url:
      "https://kanbanize.com/wp-content/uploads/website-images/kanban-resources/Kanban_board-elements.png",
  },
  {
    image_url:
      "https://img.freepik.com/premium-photo/wooden-blocks-with-figures-on-a-blue-surface-hierarchical-organizational-structure-of-management-gender-balance-effective-management-model-in-the-organization_116441-17272.jpg",
  },

  {
    image_url:
      "https://www.sisajournal.com/news/photo/first/201608/img_156337_1.jpg",
  },
  {
    image_url:
      "https://st.depositphotos.com/1002709/1915/i/950/depositphotos_19159199-stock-photo-business-graph-analyzing.jpg",
  },
];

export default function Home() {
  const column_option_for_responsive = useBreakpointValue({
    // base: "12fr",
    xl: "repeat(4, 1fr)",
    lg: "repeat(4, 1fr)",
    md: "repeat(2, 1fr)",
    base: "repeat(1, 1fr)", // 추가
  });

  return (
    <Box border={"0px solid blue"} px={"auto"}>
      <Box
        width={"100%"}
        display={"grid"}
        gridTemplateColumns={column_option_for_responsive}
        justifyItems="center"  // 그리드 아이템을 수평으로 중앙 정렬
        alignItems="center"   // 그리드 아이템을 수직으로 중앙 정렬
        gap={2}
        mx={"auto"}
        px={2}
        // border={"5px solid red"}
      >

        <SampleCard
          imageSrc={image_array[0].image_url}
          title={"My Task"}
          description={"My Task"}
          linkTo={"/my_task"}
        />

        <SampleCard
          imageSrc={image_array[1].image_url}
          title={"Team Status"}
          description={"Team Status"}
          linkTo="/team-status"
        />

        {/*
        <SampleCard
          imageSrc={image_array[2].image_url}
          title={"칸반 보드"}
          description={"칸반 보드"}
          linkTo="/task-status"
        /> */}

        {/* <SampleCard
          imageSrc={image_array[3].image_url}
          title={"팀 관리"}
          description={"팀 관리"}
          linkTo="/data-grid/users"
        /> */}

        {/* <SampleCard
          imageSrc={image_array[4].image_url}
          title={"Wanted"}
          description={"Wanted"}
          linkTo="/wanted"
        />

        <SampleCard
          imageSrc={image_array[5].image_url}
          title={"업무 통계"}
          description={"업무 통계"}
          linkTo="/task-statics"
        /> */}
      </Box>
    </Box>
  );
}

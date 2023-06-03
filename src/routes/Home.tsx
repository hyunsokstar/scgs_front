import { Box, Container, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CompletedAndPlannedList from "../components/CompletedAndPlannedList";
import ProjectProgressList from "../components/CompletedProjectTaskList";
import Counter from "../components/Counter";
import SampleCard from "../components/TestCard/SampleCard";
import TestCard from "../components/TestCard/TestCard";
import TutorialList from "../components/TutorialList";

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
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        gap={5}
        border={"1px solid red"}
        pl={"6%"}
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

        <SampleCard
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
        />
       
      </Box>
    </Box>
  );
}

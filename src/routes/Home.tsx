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
      "https://shesgotsystems.com/wp-content/uploads/2012/02/PTMrPid635Xo9l_wjCGGb2JsscsyXuPYOqUDT3R976U.jpg",
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
      "https://i.namu.wiki/i/HMBQxN5-ERYkWQymdJLqbH_p8QOVhJHvLA_RBeNMLhntmQpk_DnKGhBPI6HhJfu2Kj1_doR3ZQgF1ME8fyGqaEyb41JIwzuZd8KnMqLVXNDkx_5HBBoq98Y1tlvv2V2k8tYHhIRrpuFW6Zd9ZI-u7Q.webp",
  },
];

export default function Home() {
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
        gap={3}
        border={"1px solid red"}
      >
        <SampleCard
          imageSrc={image_array[0].image_url}
          title={"My Task"}
          description={"My Task"}
          linkTo={"/my_task"}
        />

        <SampleCard
          imageSrc={image_array[1].image_url}
          title={"Project Task"}
          description={"Project Task"}
          linkTo="/project_admin"
        />

        <SampleCard
          imageSrc={image_array[2].image_url}
          title={"칸반 보드"}
          description={"칸반 보드"}
          linkTo="/task-status"
        />

        <SampleCard
          imageSrc={image_array[3].image_url}
          title={"팀 관리"}
          description={"팀 관리"}
          linkTo="/data-grid/users"
        />

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

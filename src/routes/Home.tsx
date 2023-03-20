import { Box, Container, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CompletedAndPlannedList from "../components/CompletedAndPlannedList";
import ProjectProgressList from "../components/CompletedProjectTaskList";
import SampleCard from "../components/TestCard/SampleCard";
import TestCard from "../components/TestCard/TestCard";
import TutorialList from "../components/TutorialList";
import UserProfile from "../components/UserProfile";
// import PhotoUploadButton from "../components/PhotoUploadButton";
// import RoomsList from "../components/RoomsList";
// import UsersList from "../components/UsersList";

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
      "https://a0.muscache.com/im/pictures/8340b03d-6405-4a61-ac8a-fc9d9d445f0f.jpg?im_w=720",
  },
];

export default function Home() {
  return (
    <Flex>
      <SampleCard
        imageSrc={image_array[0].image_url}
        title={"My Task"}
        description={"My Task"}
      />
      <NavLink
        to="/project_admin"
        // onClick={() => handleItemClick("project_admin")}
      >
        <SampleCard
          imageSrc={image_array[1].image_url}
          title={"Project Task"}
          description={"Project Task"}
        />
      </NavLink>
      <SampleCard
        imageSrc={image_array[2].image_url}
        title={"project Status"}
        description={"project Status"}
      />
      <SampleCard
        imageSrc={image_array[3].image_url}
        title={"팀 관리"}
        description={"팀 관리"}
      />
    </Flex>
  );
}

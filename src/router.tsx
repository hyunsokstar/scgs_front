import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import BuildingManagement from "./routes/BuildingManagement";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadPhotos";
import EstimateRequire from "./routes/EstimateRequire";
import Estimates from "./routes/Estimates";
import EstimateDetail from "./routes/EstimateDetail";
import UserProfilePage from "./routes/UserProfilePage";
import UsersPage from "./routes/user/UsersPage";
import TutorialAdmin from "./routes/TutorialAdmin";
import BoilerPlates from "./routes/BoilerPlates";
import TutorialList from "./components/TutorialList";
import TestPageForGayou from "./routes/TestPageForGayou";
import ProjectAdminPage from "./routes/ProjectAdminPage";
import TestPage from "./routes/TestPage";
import TestDataGridPage from "./routes/GridPage/TestDataGridPage";
import UsersByDataGridPage from "./routes/DataGridContainer/UsersByDataGridPage";
import ProjectProgressDetail from "./routes/ProjectProgressDetail";
import MyTaskPage from "./routes/MyTaskPage";
import KakaoLoginPage from "./routes/KaKaoLoginPage";
import TaskStatusPage from "./routes/TaskStatus/TaskStatusPage";
import SiteManualPage from "./routes/SiteManualPage";
import QAPage from "./routes/QAPage";
import TechNote from "./routes/TechNote";
import MyTechNote from "./routes/MyTechNote";
import TechNoteContent from "./routes/TechNoteContent";
import ReactEditor from "./components/ReactEditor";
import TestModal from "./components/modal/TestModal";
import TechNoteContentPage from "./routes/TechNoteContentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "test-modal",
        element: <TestModal />,
      },
      {
        path: "my-tech-note",
        element: <MyTechNote />,
      },
      {
        path: "tech-note",
        element: <TechNote />,
      },
      {
        path: "tech-note/:notePk",
        element: <TechNoteContentPage />,
      },
      {
        path: "qa-page",
        element: <QAPage />,
      },
      {
        path: "site-manual",
        element: <SiteManualPage />,
      },
      {
        path: "qa-page",
        element: <QAPage />,
      },
      {
        path: "task-status",
        element: <TaskStatusPage />,
      },
      {
        path: "kaka-login",
        element: <KakaoLoginPage />,
      },
      { path: "my_task", element: <MyTaskPage /> },

      {
        path: "project_admin",
        element: <ProjectAdminPage />,
      },
      {
        path: "project_admin/:taskPk",
        element: <ProjectProgressDetail />,
      },
      {
        path: "data-grid/users",
        element: <UsersByDataGridPage />,
      },
      {
        path: "test-data-grid",
        element: <TestDataGridPage />,
      },
      {
        path: "project-admin",
        element: <ProjectAdminPage />,
      },
      {
        path: "test-component",
        element: <TestPage />,
      },
      {
        path: "gayou",
        element: <TestPageForGayou />,
      },
      {
        path: "tutorials",
        element: <TutorialList />,
      },
      {
        path: "framework_study",
        element: <BoilerPlates />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "users/:userPk",
        element: <UserProfilePage />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "/building_management",
        element: <BuildingManagement />,
      },
      {
        path: "/editor",
        element: <ReactEditor />,
      },
      {
        path: "rooms/:roomPk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "estimate_require",
        element: <EstimateRequire />,
      },
      {
        path: "estimates/",
        element: <Estimates />,
        children: [
          {
            path: ":estimatePk",
            element: <EstimateDetail />,
          },
        ],
      },
      // {
      //   path: "estimates/:estimatePk",
      //   element: <EstimateDetail />,
      // },
      {
        path: "tutorials",
        element: <TutorialAdmin />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import BuildingManagement from "./routes/BuildingManagement";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadRoom from "./routes/UploadRoom";
import ReactDraft from "./routes/ReactDraft";
import LexicalEditorPage from "./routes/LexicalEditorPage";
import TipTabPage from "./routes/TipTabPage";
import TinyMcePage from "./routes/TinyMcePage";
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
        path: "project_admin",
        element: <ProjectAdminPage />,
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
        path: "/test/react-draft",
        element: <ReactDraft />,
      },
      {
        path: "/test/lexical-editor",
        element: <LexicalEditorPage />,
      },
      {
        path: "/test/tiptap-editor",
        element: <TipTabPage />,
      },
      {
        path: "/test/tinymce-editor",
        element: <TinyMcePage />,
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
        path: "estimates",
        element: <Estimates />,
      },
      {
        path: "estimates/:estimatePk",
        element: <EstimateDetail />,
      },
      {
        path: "tutorials",
        element: <TutorialAdmin />,
      },
    ],
  },
]);

export default router;

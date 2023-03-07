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
import UserProfile from "./routes/UserProfile";
import UsersPage from "./routes/user/UsersPage";
import TutorialAdmin from "./routes/TutorialAdmin";
import BoilerPlates from "./routes/BoilerPlates";

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
                path: "tutorial_study",
                element: <Home />,
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
                element: <UserProfile />,
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

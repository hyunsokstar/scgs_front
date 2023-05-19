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
import TestPage from "./routes/TestPage/TestPage";
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
import ReactEditor from "./components/ReactEditor";
import TestModal from "./components/modal/TestModal";
import TechNoteContentPage from "./routes/TechNoteContentPage";
import ReactTablePage from "./routes/ReactTablePage";
import ChakraTablePage from "./routes/ChakraTablePage";
import TestBoardPage from "./routes/TestBoardPage";
import ApiDocuPage from "./routes/ApiDocuPage";
import ShortCutPage from "./routes/ShortCutPage";
import ShortCutPage2 from "./routes/ShortCutPage2";
import Test2 from "./routes/TestPage/Test2";
import Test3 from "./routes/TestPage/Test3";
import Test4 from "./routes/TestPage/Test4";
import Test5 from "./routes/TestPage/Test5";
import TaskStaticsPage from "./components/TaskStaticsPage";
import Test6 from "./routes/TestPage/Test6";
import Test7 from "./routes/TestPage/Test7";
import Test8 from "./routes/TestPage/Test8";
import WantedPage from "./routes/WantedPage";
import LongTermPlan from "./routes/LongTermPlan";
import LongTermPlanDetail from "./routes/LongTermPlanDetail";
import StudyNotePage from "./routes/StudyNotePage";
import StudyNoteDetail from "./routes/StudyNoteDetail";
import Test9 from "./routes/TestPage/Test9";
import Test10 from "./routes/TestPage/Test10";
import TeamStatusPage from "./routes/TaskInfosPerMember";
import ShortCutDetail from "./routes/ShortCutDetail";
import PersonalUserTaskStatusPage from "./routes/PersonalUserTaskStatusPage";
import Test31 from "./routes/TestPage/Test31";
import TeamManagementPage from "./routes/TeamManagementPage";
import MonthlyTaskCountChartPage from "./routes/MonthlyTaskCountChartPage";
import BarChartForDailyTaskCountForPersonalUserPage from "./routes/ChartPage/BarChartForDailyTaskCountForPersonalUserPage";
import TodayTaskStatusPage from "./routes/TodayTaskStatusPage";

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
        path: "api-docu",
        element: <ApiDocuPage />,
      },
      {
        path: "study-note",
        element: <StudyNotePage />,
      },
      {
        path: "study-note/:study_note_pk",
        element: <StudyNoteDetail />,
      },
      {
        path: "shortcut/:shortcut_pk",
        element: <ShortCutDetail />,
      },
      {
        path: "shortcut",
        element: <ShortCutPage />,
      },
      {
        path: "shortcut2",
        element: <ShortCutPage2 />,
      },
      {
        path: "test1",
        element: <TestPage />,
      },
      {
        path: "test2",
        element: <Test2 />,
      },
      {
        path: "test3",
        element: <Test3 />,
      },
      {
        path: "test31",
        element: <Test31 />,
      },
      {
        path: "test4",
        element: <Test4 />,
      },
      {
        path: "test5",
        element: <Test5 />,
      },
      {
        path: "test6",
        element: <Test6 />,
      },
      {
        path: "test7",
        element: <Test7 />,
      },
      {
        path: "test8",
        element: <Test8 />,
      },
      {
        path: "test9",
        element: <Test9 />,
      },
      {
        path: "test10",
        element: <Test10 />,
      },
      {
        path: "wanted",
        element: <WantedPage />,
      },
      {
        path: "test-board",
        element: <TestBoardPage />,
      },

      {
        path: "team-status",
        element: <TeamStatusPage />,
      },
      {
        path: "today-task-status",
        element: <TodayTaskStatusPage />,
      },

      {
        path: "team-management",
        element: <TeamManagementPage />,
      },

      {
        path: "team-status/:userPk",
        element: <PersonalUserTaskStatusPage />,
      },

      {
        path: "react-table",
        element: <ReactTablePage />,
      },
      {
        path: "chakra-table",
        element: <ChakraTablePage />,
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
        path: "tech-note/:note_content_fk",
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
        path: "task-statics",
        element: <TaskStaticsPage />,
      },
      {
        path: "task-statics-for-personal-user/:userPk",
        element: <BarChartForDailyTaskCountForPersonalUserPage/>,
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
      {
        path: "tutorials",
        element: <TutorialAdmin />,
      },
      {
        path: "long-term-plan",
        element: <LongTermPlan />,
      },
      {
        path: "long-term-plan/:planPk",
        element: <LongTermPlanDetail />,
      },
      {
        path:"monthly-task-count-chart-page/:userPk",
        element: <MonthlyTaskCountChartPage />
      }
    ],
  },
]);

export default router;

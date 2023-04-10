import { createBrowserRouter } from "react-router-dom";
import NotFound from "./routes/NotFound";
import ProjectAdminPage from "./routes/ProjectAdminPage";
import ProjectProgressDetail from "./routes/ProjectProgressDetail";
import TestPage from "./routes/TestPage/TestPage";

const router2 = createBrowserRouter([
  {
    path: "project-admin/",
    element: <ProjectAdminPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: "detail",
        element: <ProjectProgressDetail />,
      },
    ],
  },
]);

export default router2;

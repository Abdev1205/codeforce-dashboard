import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AppLayout from "./components/layout/AppLayout";
import Stats from "./pages/Stats";
import ContestPage from "./pages/ContestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <App />
      </AppLayout>
    ),
  },
  {
    path: "/contest/:id",
    element: (
      <AppLayout>
        <ContestPage />
      </AppLayout>
    ),
  },
  {
    path: "/stats",
    element: (
      <AppLayout>
        <Stats />
      </AppLayout>
    ),
  },
]);

export default router;

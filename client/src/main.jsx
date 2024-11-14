import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddPost,
  AddProject,
  AuthLayout,
  EditProject,
  Home,
  Login,
  Post,
  PostLayout,
  Profile,
  Project,
  Register,
  ViewPost,
  ViewProject,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "project",
        element: <Project />,
        children: [
          {
            path: ":projectId",
            element: <ViewProject />,
          },
          {
            path: ":projectId/edit",
            element: <EditProject />,
          },
          {
            path: "add",
            element: <AddProject />,
          },
        ],
      },
      {
        path: "discuss",
        element: <PostLayout />,
        children: [
          {
            path: "",
            element: <Post />,
          },
          {
            path: "add",
            element: <AddPost />,
          },
          {
            path: ":postId",
            element: <ViewPost />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);

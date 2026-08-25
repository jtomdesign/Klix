import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as sliderLoader } from "./pages/Home";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import Settings from "./pages/Settings";
import AppLayout from "./layouts/AppLayout";
import Bookmark from "./pages/Bookmark";
import Overview, { loader as loaderOverview } from "./pages/Overview";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Login, { action as loginAction } from "./pages/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home />, loader: sliderLoader },
        { path: "/movies", element: <Movies /> },
        {
          path: "/overview/:mediatype/:id",
          element: <Overview />,
          loader: loaderOverview,
        },
        { path: "/tvshows", element: <TvShows /> },
        { path: "/settings", element: <Settings /> },
        { path: "/bookmark", element: <Bookmark /> },
      ],
    },
    { path: "login", element: <Login />, action: loginAction },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

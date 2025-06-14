import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Dashboard from "../pages/Dashboard";
const InfiniteScrollPage = React.lazy(() => import("../pages/InfiniteScrollPage"));

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="infinite-scroll" element={<InfiniteScrollPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;

import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="h-full min-h-screen bg-gray-900 p-8">
      <Outlet />
    </div>
  );
};

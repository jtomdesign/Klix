import React from "react";
import Navbar from "../ui/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../ui/Loader";

const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;

  return (
    <div className="bg-blueTom-1000 flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

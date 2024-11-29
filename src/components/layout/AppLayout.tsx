import React from "react";
import AppNavbar from "../custom/nav/AppNavbar";
import ConfigProvider from "@/provider/ConfigProvider";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ConfigProvider>
      <div className=" w-full h-[100vh] flex flex-col font-openSans  ">
        <AppNavbar />
        <div className=" w-full h-[calc(100vh-4rem)] ">{children}</div>
      </div>
    </ConfigProvider>
  );
};

export default AppLayout;

import React from "react";
import Progress from "@/components/custom/loader/Progress";

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <>
      <Progress>{children}</Progress>
    </>
  );
};

export default ConfigProvider;

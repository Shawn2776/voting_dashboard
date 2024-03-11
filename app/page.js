import OrgCountChart from "@/components/OrgCountChart";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col w-full pt-10 pl-10 text-white">
      <div className="flex items-center justify-center w-full">
        <h1 className="justify-center text-2xl">Dashboard</h1>
      </div>
      <div className="flex justify-start w-1/2 pl-10 border">
        <h2 className="text-xl">Organization Count</h2>
        <OrgCountChart />
      </div>
    </div>
  );
};

export default DashboardPage;

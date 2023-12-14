import React from "react";
import { Typography } from "@src/components/common/Typography";
import Chart from "react-apexcharts";
import { series } from "./data";

const DashboardUserInfo = () => {
  return (
    <div className="d-flex flex-column bg-white rounded-3 p-1">
      <div className="d-flex justify-content-between align-items-center">
        <Typography size={18} className="fw-bold">
          Users
        </Typography>
        <Typography size={18} className="text-primary">
          +15
        </Typography>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Typography size={14} className="text-secondary">
          monthly
        </Typography>
        <Typography size={14} className="text-secondary">
          Today
        </Typography>
      </div>
      <div>
        <Chart
          series={series}
          height={100}
          options={{ chart: { type: "area" } }}
        />
      </div>
    </div>
  );
};

export default DashboardUserInfo;

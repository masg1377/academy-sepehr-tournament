import { Typography } from "@src/components/common/Typography";
import React from "react";

const DashboardStaticsInfo = () => {
  return (
    <div className="d-flex flex-column bg-white rounded-3 p-1">
      <div className="d-flex justify-content-between align-items-center">
        <Typography size={18} className="fw-bold">
          Statistics
        </Typography>
        <Typography size={14} className="text-secondary">
          Updated 1 month ago
        </Typography>
      </div>
    </div>
  );
};

export default DashboardStaticsInfo;

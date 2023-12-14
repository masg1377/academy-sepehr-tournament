import React, { FC } from "react";
import { ListTable } from "@src/components/common/ListTable";
import { columns, data } from "./data";

const ComplianceRequirments: FC = (): JSX.Element => {
  return (
    <ListTable
      columns={columns}
      data={data}
      headerTitle="Compliance Requirments"
      noReload
      noSearch
    />
  );
};

export { ComplianceRequirments };

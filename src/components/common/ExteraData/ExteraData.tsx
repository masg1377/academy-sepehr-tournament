import React, { FC, useEffect, useState } from "react";
import { ListTable } from "@src/components/common/ListTable";
import { columns, data } from "./data";

interface IExteraDataProp {
  isLoading: boolean;
  data: any;
}
const ExteraData: FC<IExteraDataProp> = ({ isLoading, data }): JSX.Element => {
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    if (data) {
      let list: any = [];
      Object.keys(data).map((item, index) => {
        list.push({ id: index + 1, key: item, description: data[item] });
      });
      setRows(list);
    }
  }, [data]);

  return (
    <ListTable
      columns={columns}
      data={rows}
      headerTitle="Extra data"
      noReload
      isLoading={isLoading}
      noSearch
    />
  );
};

export { ExteraData };

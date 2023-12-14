import React, { FC, useEffect, useState } from "react";
import { ListTable } from "@src/components/common/ListTable";
import { columns } from "./data";
import { useParams } from "react-router-dom";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { useGetPlatformCredential } from "@src/core/services/api/platform/platform.api";
import { AddCredentialModal } from "../../AddPlatform/AddCredentialModal/AddCredentialModal";

const listItems = [
  { value: 1, label: "IDX/RETS" },
  { value: 2, label: "IDX/RESO_WEB_API" },
  { value: 3, label: "IDX_PLUS/RETS" },
  { value: 4, label: "IDX_PLUS/RESO_WEB_API" },
  { value: 5, label: "VOW/RETS" },
  { value: 6, label: "VOW/RESO_WEB_API" },
  { value: 7, label: "IDX" },
  { value: 8, label: "IDX_PLUS" },
  { value: 9, label: "VOW" },
  { value: 10, label: "RETS" },
  { value: 11, label: "ALL/ALL" },
  { value: 12, label: "--/RESO_WEB_API" },
  { value: 13, label: "ALL Feed Type" },
  { value: 14, label: "ALL Connection Type" },
];

const PlatformCredential: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<TGetPlatformList>({
    entity: "platform_credential",
    data: {
      list_filter: {
        limit: 100,
        offset: 0,
        filters: [
          { field: "platform_id", operator: "=", value: id ? +id : "" },
        ],
      },
    },
  });

  const { platformCredential } = useSelector(
    (state: RootState) => state.refresh
  );

  const getList = useGetPlatformCredential();

  useEffect(() => {
    if (!isOpen) getList.mutate(filterList);
  }, [isOpen, platformCredential]);

  useEffect(() => {
    if (getList.isSuccess) {
      let result = getList.data.data.result;
      console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      console.log(result);
      setData(
        result
          ? result.map((item: any, index: number) => ({
              ...item,
              row_id: index + 1,
              feedTypeConnection:
                item &&
                listItems.find(
                  (i) => i.value === item.feed_type_connection_type_id
                )?.label,
            }))
          : []
      );
    }
  }, [getList.isSuccess]);

  return (
    <>
      {isOpen && (
        <AddCredentialModal
          isOpen={isOpen}
          onToggle={() => setIsOpen((old) => !old)}
        />
      )}
      <ListTable
        columns={columns}
        data={data}
        headerTitle="Platform Credential"
        noReload
        addBtnText="Add Credential"
        isLoading={getList.isLoading}
        noSearch
        onAddBtn={() => setIsOpen((old) => !old)}
      />
    </>
  );
};

export { PlatformCredential };

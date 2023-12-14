import { ListTable } from "@src/components/common/ListTable/ListTable";
import { useFormikContext } from "formik";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { AlertCircle } from "react-feather";

interface IListTableSelectFieldProp {
  name: string;
  headerChild?: JSX.Element | ReactNode;
  columns: any;
  rows: any;
  isLoading?: boolean;
}

const ListTableSelectField: FC<IListTableSelectFieldProp> = ({
  name,
  headerChild,
  columns,
  rows,
  isLoading,
}): JSX.Element => {
  const [data, setData] = useState([]);

  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (rows) setData(rows);
  }, [rows]);

  // console.log(data);

  useEffect(() => {
    const val = values[name] ? values[name] : [];

    //console.log("val", val);
    // setTimeout(() => {
    setData((old: any) =>
      old.map((o: any) => {
        if (
          val.some((v: any) =>
            v.isServer
              ? v.id === o.id && (!v.isRemove || v.isUpdate)
              : v.id === o.id
          )
        ) {
          // console.log("val", o);
          const cur = val.find((v: any) => v.id === o.id);
          return {
            ...o,
            toggleSelected: true,
            isServer: cur ? cur.isServer : undefined,
            isRemove: cur ? cur.isRemove : undefined,
          };
        } else return { ...o, toggleSelected: false };
      })
    );
    // }, 100);
  }, [values && values[name], isLoading]);

  const onDoubleClick = (value: any) => {
    //console.log(value);
    const updateRow: any = data.map((o: any) => {
      if (o.id !== value.id) {
        return o;
      }
      return {
        ...value,
        toggleSelected: !value.toggleSelected,
        isServer: value.isServer,
        isRemove: value.isServer ? !value.isRemove : undefined,
      };
    });
    if (!value.toggleSelected) {
      const val = values[name] ? values[name] : [];
      let updatedVal = [...val];
      if (value.isServer) {
        //console.log(value.isServer);
        updatedVal = updatedVal.map((v) =>
          v.id === value.id ? { ...v, isRemove: !v.isRemove } : { ...v }
        );
      } else updatedVal = [...val, value];
      setFieldValue(name, updatedVal);
    } else {
      const val = values[name] ? values[name] : [];
      const filtered = val.filter((o: any) =>
        o.isServer && o.id === value.id ? true : o.id !== value.id
      );
      //console.log(val, filtered);
      setFieldValue(
        name,
        filtered.map((o: any) =>
          o.isServer && o.id === value.id ? { ...o, isRemove: true } : { ...o }
        )
      );
    }

    // console.log("first2", updateRow);
    setData(updateRow);
  };

  return (
    <>
      {headerChild}
      <ListTable
        columns={columns}
        data={data}
        noHeader
        noSearch
        noReload
        noShadow
        isLoading={isLoading}
        noInfinite
        onDoubleClick={onDoubleClick}
        paginationCustomItem={
          <div className="d-flex align-items-center">
            <AlertCircle size={20} className="me-1" color="#3897f1" />
            <span className="fs-6" style={{ color: "#3897f1" }}>
              Please double click to add an item
            </span>
          </div>
        }
        customStyle={{
          rows: {
            style: {
              backgroundColor: "rgba(244, 243, 249, 0.6)",
              cursor: "pointer",
              borderBottomStyle: "none !important",
              height: "40px !important",
              minHeight: "0 !important",
            },
          },
          cells: { style: { height: "40px !important" } },
          headRow: { style: { backgroundColor: "#f2f2f2" } },
        }}
        // isLoading={true}
      />
    </>
  );
};

export { ListTableSelectField };

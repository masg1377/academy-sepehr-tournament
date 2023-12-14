import { CardActions } from "@src/components/common/card-actions";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { mlsTargetType, reportIntervalData } from "@src/core/data/mls.data";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { RootState } from "@src/redux/store";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { X } from "react-feather";
import { useSelector } from "react-redux";
import { StylesConfig } from "react-select";
import { Table } from "reactstrap";
import { FlatRateItemsModal } from "../FlatRateItemsModal/FlatRateItemsModal";
import { columns, data } from "./data";

const SelectCustomStyle: StylesConfig = {
  control: (prop) => ({
    ...prop,
    padding: 0,
    minHeight: 30,
  }),
  valueContainer: (prop) => ({
    ...prop,
    paddingTop: 0,
    marginTop: 0,
  }),
  indicatorsContainer: (prop) => ({ ...prop, height: 30 }),
};

interface IFlatRateItems {
  mlsAccessPaymentMethodId: number;
}

const FlatRateItems: FC<IFlatRateItems> = ({
  mlsAccessPaymentMethodId,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const getList = useGetMlsServer();

  const loadData = () => {
    getList.mutate(
      {
        entity: "mls_access_payment_method_flat_rate_item",
        data: {
          list_filter: {
            order_by: "creation_date DESC",
            limit: 100,
            offset: 0,
            filters: [
              {
                field: "mls_access_payment_method_id",
                operator: "=",
                value: mlsAccessPaymentMethodId,
              },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          console.log(res.data.result);
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            result &&
              setData(
                result.map((o: any, ind: number) => ({
                  ...o,
                  row_id: ind + 1,
                  setIsOpen: (row: any) => {
                    setIsOpen((old) => !old);
                    setSelectedItem(row);
                  },
                  setRefetch: setRefetch,
                }))
              );
          } else setData([]);
        },
      }
    );
  };

  useEffect(() => {
    if (!isOpen) loadData();
  }, [isOpen, refetch]);

  return (
    // <CardActions
    //   title="Flat Rate Items"
    //   actions={[]}
    //   noShadow
    //   endReload={(endLoading: any) => {}}
    //   noBottom
    // >
    <div>
      {isOpen && (
        <FlatRateItemsModal
          isOpen={isOpen}
          onToggle={() => {
            setIsOpen(false);
            setSelectedItem(null);
          }}
          mlsAccessPaymentMethodId={mlsAccessPaymentMethodId}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      <ListTable
        columns={columns}
        data={data}
        headerTitle="Flat Rate Items"
        addBtnText="Add Flat Rate"
        noSearch
        isLoading={getList.isLoading}
        onReload={loadData}
        onAddBtn={() => setIsOpen(true)}
      />
    </div>
    // </CardActions>
  );
};

export { FlatRateItems };

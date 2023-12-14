import { ListTable } from "@src/components/common/ListTable/ListTable";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { RootState } from "@src/redux/store";
import { useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StylesConfig } from "react-select";
import { RangeRateItemsModal } from "../RangeRateItemsModal/RangeRateItemsModal";
import { columns } from "./data";

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

const RangeRateItems: FC<IFlatRateItems> = ({
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
        entity: "mls_access_payment_method_range_rate_item",
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
  }, [refetch, isOpen]);

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
        <RangeRateItemsModal
          isOpen={isOpen}
          onToggle={() => {
            setSelectedItem(null);
            setIsOpen(false);
          }}
          mlsAccessPaymentMethodId={mlsAccessPaymentMethodId}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      <ListTable
        columns={columns}
        data={data}
        headerTitle="Range Rate Items"
        addBtnText="Add Range Rate"
        noSearch
        isLoading={getList.isLoading}
        onReload={loadData}
        onAddBtn={() => setIsOpen(true)}
      />
    </div>
    // </CardActions>
  );
};

export { RangeRateItems };

import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useFormikContext } from "formik";
import { FC, useState } from "react";
import { FlatRateItems } from "./FlatRateItems/FlatRateItems";
import { RangeRateItems } from "./RangeRateItems";

interface IFourthStepFormProp {
  // newMlsConfig: boolean;
  // setNewMlsConfig: (val: boolean) => void;
  mlsAccessId: number;
  setInitialValues: (val: any) => void;
  mlsAccessPaymentMethodId: number;
}

const FivethStepForm: FC<IFourthStepFormProp> = ({
  // newMlsConfig,
  // setNewMlsConfig,
  mlsAccessId,
  setInitialValues,
  mlsAccessPaymentMethodId,
}): JSX.Element => {
  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_access_payment_method",
    data: {
      list_filter: {
        limit: 10,
        offset: 0,
        filters: [
          {
            field: "mls_access_id",
            operator: "=",
            value: mlsAccessId ? +mlsAccessId : "",
          },
        ],
      },
    },
  });
  const { values, setFieldValue } = useFormikContext<any>();
  const { mlsConfig } = values;

  // const getList = useGetMlsList();

  // useEffect(() => {
  //   if (mlsAccessId) getList.mutate(filterList);
  // }, [mlsAccessId]);

  // useEffect(() => {
  //   if (getList.isSuccess) {
  //     let data = getList.data.data;
  //     console.log(data);
  //     if (data.is_success) {
  //       let result = getList.data.data.result;
  //       setMlsAccessPaymentMethodId(result.id);
  //       setInitialValues((old: any) => ({
  //         ...old,
  //         dataUrl: result.data_url,
  //         setupFee: result.setup_fee ? result.setup_fee.toString() : "",
  //         reactivationFee: result.reactivation_fee
  //           ? result.reactivation_fee.toString()
  //           : "",
  //         lambdaArn: result.lambda_arn,
  //         paymentURL: result.payment_url,
  //         paymentPassword: result.payment_password,
  //         paymentUserName: result.payment_username,
  //         isAutoBilling: result.is_auto_billing,
  //         // paymentDetails:old.payment_details,
  //       }));
  //     }
  //   }
  // }, [getList.isSuccess]);

  return (
    <div>
      <span className="d-block fs-5 text-black fw-bold mb-1">
        Add Payment Method Items
      </span>

      <FlatRateItems mlsAccessPaymentMethodId={mlsAccessPaymentMethodId} />

      <RangeRateItems mlsAccessPaymentMethodId={mlsAccessPaymentMethodId} />
    </div>
  );
};
export { FivethStepForm };

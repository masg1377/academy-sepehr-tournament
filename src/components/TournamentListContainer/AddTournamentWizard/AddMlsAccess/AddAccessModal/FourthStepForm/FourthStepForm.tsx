import React, { FC, useEffect, useRef, useState } from "react";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { useGetPlatform } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { useFormikContext } from "formik";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { mlsAuthType, mlsRequestMethodType } from "@src/core/data/mls.data";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { RippleButton } from "@src/components/common/ripple-button";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";

interface IFourthStepFormProp {
  // newMlsConfig: boolean;
  // setNewMlsConfig: (val: boolean) => void;
  mlsAccessId: number;
  setInitialValues: (val: any) => void;
  setMlsAccessPaymentMethodId: any;
}

const FourthStepForm: FC<IFourthStepFormProp> = ({
  // newMlsConfig,
  // setNewMlsConfig,
  mlsAccessId,
  setInitialValues,
  setMlsAccessPaymentMethodId,
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

  const getList = useGetMlsList();

  useEffect(() => {
    if (mlsAccessId) getList.mutate(filterList);
  }, [mlsAccessId]);

  useEffect(() => {
    if (getList.isSuccess) {
      let data = getList.data.data;
      console.log(data);
      if (data.is_success) {
        let result = getList.data.data.result;
        setMlsAccessPaymentMethodId(result.id);
        setInitialValues((old: any) => ({
          ...old,
          dataUrl: result.data_url,
          setupFee: result.setup_fee ? result.setup_fee.toString() : "",
          reactivationFee: result.reactivation_fee
            ? result.reactivation_fee.toString()
            : "",
          lambdaArn: result.lambda_arn,
          paymentURL: result.payment_url,
          paymentPassword: result.payment_password,
          paymentUserName: result.payment_username,
          isAutoBilling: result.is_auto_billing,
          // paymentDetails:old.payment_details,
        }));
      }
    }
  }, [getList.isSuccess]);

  return (
    <div>
      <span className="d-block fs-8 text-black fw-bold mb-1">
        Add Payment Method
      </span>
      <InputText
        name="dataUrl"
        placeholder="Please enter ..."
        label={"Data URL"}
        id="dataUrl"
        wrapperClassName="mb-1"
      />
      <InputText
        name="setupFee"
        placeholder="Please enter ..."
        label={"Setup Fee"}
        id="setupFee"
        wrapperClassName="mb-1"
      />
      <div className="pb-1 border-bottom mb-1">
        <InputText
          name="reactivationFee"
          placeholder="Please enter ..."
          label={"Reactivation Fee"}
          id="reactivationFee"
          wrapperClassName="mb-1"
        />
      </div>
      <InputText
        name="lambdaArn"
        placeholder="Please enter ..."
        label={"Lambda Arn"}
        id="dataUrl"
        wrapperClassName="mb-1"
      />
      <InputText
        name="paymentURL"
        placeholder="Please enter ..."
        label={"Payment URL"}
        id="paymentURL"
        wrapperClassName="mb-1"
      />
      <InputText
        name="paymentUserName"
        placeholder="Please enter ..."
        label={"User Name"}
        id="paymentUserName"
        wrapperClassName="mb-1"
      />
      <div className="pb-1 border-bottom mb-1">
        <InputText
          name="paymentPassword"
          placeholder="Please enter ..."
          label={"Password"}
          id="paymentPassword"
          wrapperClassName="mb-1"
          type="password"
        />
      </div>

      <InputText
        name="paymentDetails"
        placeholder="Please enter ..."
        label={"Payment Details"}
        id="paymentDetails"
        wrapperClassName="mb-1"
      />
      <CheckBox
        name="isAutoBilling"
        label="Is Auto Billing"
        id={"isAutoBilling"}
      />
    </div>
  );
};
export { FourthStepForm };

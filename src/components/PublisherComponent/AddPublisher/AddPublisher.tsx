import React, { FC, useEffect, useRef, useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { FormWrapper as Wrapper } from "./FormWrapper/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import {
  useCreateDiscount,
  useEditDiscount,
} from "@src/core/services/api/discount/discount.api";
import {
  TCreateDiscount,
  TEditDiscount,
} from "@src/core/services/api/discount/type";
import { addDiscountValidation } from "@src/core/validations/discount.validation";
import { FormikProps } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import {
  currencyData,
  durationDiscountData,
  durationNumDiscountData,
} from "@src/core/data/discount.data";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";

const AddPublisher: FC = (): JSX.Element => {
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    status: true,
    currency: null,
    percentOff: "",
    duration: null,
    maxRedemptions: "",
    expiryDate: "",
    coveredPackages: null,
    covered_BTT_Items: null,
    description: "",
    amount_off: "",
    isGlobal: false,
    permanent: false,
    location: null,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const getDetail = useGetListOfEntity();
  // const getPackagesItems = useGetListOfEntity();

  // const bttRef = useRef<any>();

  // const packageRef = useRef<any>();

  const onSubmit = (values: any) => {
    // console.log(values);
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      // validationSchema={addDiscountValidation}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }: FormikProps<any>) => (
        <>
          <Wrapper
            title={id ? "Edit publisher" : "Add publisher"}
            isLoading={false}
          >
            {getDetail.isLoading ? (
              <LoadingData wrapperStyle="my-1 py-5" />
            ) : (
              <>
                <RowWrappers sm={6} md={4}>
                  <SelectOption
                    name="user"
                    options={[]}
                    placeholder="Select..."
                    label="Select User"
                    // wrapperClassName="mb-1"
                  />
                  <InputText
                    name="name"
                    placeholder="Publisher Name"
                    label={"Name"}
                    id="name"
                    // wrapperClassName="mb-1"
                  />
                </RowWrappers>

                <LogoUploader
                  label="Publisher logo"
                  name="publisher_logo"
                  buttonLabel="+ file upload"
                />

                <RowWrappers sm={6} md={4}>
                  <LocationField
                    name="location"
                    placeholder="Please search"
                    isOutline
                    isMulti
                    label="Location"
                  />
                </RowWrappers>

                <RowWrappers sm={12} md={8}>
                  <InputText
                    name="description"
                    placeholder="Please enter..."
                    type="textarea"
                    label="Description"
                  />
                </RowWrappers>
              </>
            )}
          </Wrapper>
        </>
      )}
    </FormWrapper>
  );
};

export { AddPublisher };

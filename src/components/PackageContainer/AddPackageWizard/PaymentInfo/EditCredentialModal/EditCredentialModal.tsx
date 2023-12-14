import React, { FC, useState, useEffect } from "react";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { FormikProps } from "formik";
import { InputText } from "@src/components/common/form/common/InputText";
import { Nav, Row, Col } from "reactstrap";
import { ChildForm } from "@src/components/common/ChildForm/ChildForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { Divider } from "@src/components/common/divider/Divider";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import {
  useCreatePackagePaymentInfo,
  useEditPackagePaymentInfo,
} from "@src/core/services/api/package/package.api";
import { capitalizeFirstLetter } from "@src/core/utils/Utils";
import { handleModalSit, handlePaymentId } from "@src/redux/packageModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { addPayModalStep5Validation } from "@src/core/validations/package.validation";

interface IEditCredentialModalProp {
  isOpen: boolean;
  onToggle: () => void;
  onAddData?: (data: any) => void;
  data?: any;
  editCellData?: any;
  setEditCellData?: any;
  setList?: any;
  editMode?: boolean;
  allPayment?: any;
  allAddPayment?: any;
  reloader?: any;
  editListLoaderHandler?: any;
}
const EditCredentialModal: FC<IEditCredentialModalProp> = ({
  isOpen,
  onToggle,
  onAddData,
  data,
  editCellData,
  setEditCellData,
  setList,
  editMode,
  allPayment,
  allAddPayment,
  reloader,
  editListLoaderHandler,
}): JSX.Element => {
  //console.log("data", allAddPayment);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentId, modalSit }: any = useSelector(
    (state: RootState) => state.paymentEditModal
  );

  const [initialValues, setInitialValues] = useState({
    nickname: "",
    unitAmount: null,
    paymentType: { value: 2, label: "recurring" },
    nterval: null,
    intervalCount: null,
    usageType: null,
    billingSchema: null,
    tiresMods: null,
    taxBehavior: null,
    trialPeriodDays: null,
    recurring_aggregate_usage: null,
    //paymentMethod: null,
  });
  const [professionOption, setProfessionOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [filterListProfession, setFilterListProfession] =
    useState<TGetEntities>({
      entity: "payment_method",
      data: {
        list_filter: {
          limit: 100000,
          offset: 0,
          order_by: "creation_date",
          filters: [{ field: "type", operator: "=", value: 2 }],
        },
      },
    });

  const getPayment = useGetListOfEntity();
  const editPayment = useEditPackagePaymentInfo();

  useEffect(() => {
    //console.log("data");

    setInitialValues((old: any) => ({
      ...old,
      nickname: data?.nickname ? data?.nickname : "",
      unitAmount: data?.unit_amount ? data?.unit_amount : "",
      paymentType: { value: 2, label: "recurring" },
      nterval: data?.recurring_interval && {
        value: data?.recurring_interval,
        label: capitalizeFirstLetter(data?.recurring_interval),
      },
      intervalCount: data?.recurring_interval_count
        ? data?.recurring_interval_count
        : "",
      usageType: data?.recurring_usage_type && {
        value: data?.recurring_usage_type,
        label: capitalizeFirstLetter(data?.recurring_usage_type),
      },
      billingSchema: editMode
        ? data?.billing_schema
          ? data?.billing_schema === "per_unit"
            ? { value: "per_unit", label: "Per Unit" }
            : { value: "tiered", label: "Tiered" }
          : null
        : data?.billing_scheme
        ? data?.billing_scheme === "per_unit"
          ? { value: "per_unit", label: "Per Unit" }
          : { value: "tiered", label: "Tiered" }
        : null,
      tiresMods: data?.tires_mode
        ? {
            value: data?.tires_mode,
            label: capitalizeFirstLetter(data?.tires_mode),
          }
        : null,
      taxBehavior: data?.tax_behavior
        ? {
            value: data?.tax_behavior,
            label: capitalizeFirstLetter(data?.tax_behavior),
          }
        : null,
      trialPeriodDays: data?.trial_period_days ? data?.trial_period_days : null,
      recurring_aggregate_usage:
        data?.recurring_aggregate_usage &&
        data?.recurring_aggregate_usage === "sum"
          ? { value: "sum", label: "Sum" }
          : data?.recurring_aggregate_usage === "last_during_period"
          ? {
              value: "last_during_period",
              label: "Last during period",
            }
          : data?.recurring_aggregate_usage === "last_ever"
          ? { value: "last_ever", label: "Last Ever" }
          : data?.recurring_aggregate_usage === "max"
          ? { value: "max", label: "Max" }
          : null,
    }));
  }, [data]);

  useEffect(() => {
    getPayment.mutate(filterListProfession);
  }, []);

  useEffect(() => {
    if (getPayment.isSuccess) {
      let result = getPayment.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      result = result.filter((o: any) => o.recurring_interval);
      if (result)
        setProfessionOption(
          result.map((i: any) => ({
            ...i,
            value: i.id,
            label: i.nickname ? i.nickname : "-",
          }))
        );
      else setProfessionOption([]);
    }
  }, [getPayment.isSuccess]);

  const onPaymentMethodChange = (opt: any) => {
    setInitialValues((old: any) => ({
      ...old,
      // nickname: opt.nickname,
      billingSchema: opt.billing_schema
        ? {
            value: opt.billing_schema,
            label: capitalizeFirstLetter(opt.billing_schema),
          }
        : null,
      intervalCount: opt.recurring_interval_count
        ? opt.recurring_interval_count
        : "",
      nterval: opt.recurring_interval
        ? {
            value: opt.recurring_interval,
            label: capitalizeFirstLetter(opt.recurring_interval),
          }
        : null,
      taxBehavior: opt.tax_behavior
        ? {
            value: opt.tax_behavior,
            label: capitalizeFirstLetter(opt.tax_behavior),
          }
        : null,
      recurring_aggregate_usage: opt.recurring_aggregate_usage
        ? {
            value: opt.recurring_aggregate_usage,
            label: capitalizeFirstLetter(opt.recurring_aggregate_usage),
          }
        : null,
      tiresMods: opt.tires_mode
        ? {
            value: opt.tires_mode,
            label: capitalizeFirstLetter(opt.tires_mode),
          }
        : null,
      trialPeriodDays: opt.trial_period_days ? opt.trial_period_days : "",
      unitAmount: opt.unit_amount ? opt.unit_amount : opt.unit_amount_decimal,
      usageType: opt.recurring_usage_type && {
        value: opt.recurring_usage_type,
        label: capitalizeFirstLetter(opt.recurring_usage_type),
      },
    }));
  };

  const onSubmit = (values: any, { resetForm }: any) => {
    const updateObj: any = {
      id: paymentId,
      active: true,
      billing_schema: values.billingSchema ? values.billingSchema.value : "",
      currency: "usd",
      item_id: [id ? +id : 0],
      item_type: "package",
      type: values.paymentType && values.paymentType.value,
      nickname: values.nickname,
      recurring_aggregate_usage:
        values.recurring_aggregate_usage &&
        values.recurring_aggregate_usage.value,
      recurring_interval: values.nterval && values.nterval.value,
      recurring_interval_count: values.intervalCount ? values.intervalCount : 1,
      recurring_usage_type: values.usageType && values.usageType.value,
      tax_behavior: values.taxBehavior && values.taxBehavior.value,
      tires_mode:
        //values.tiresMods && values.tiresMods.value,
        values.billingSchema && values.billingSchema.value === "tiered"
          ? values.tiresMods && values.tiresMods.value
          : null,
      trial_period_days:
        values.trialPeriodDays === "" || values.trialPeriodDays === null
          ? 0
          : values.trialPeriodDays,
      unit_amount:
        values.unitAmount && values.unitAmount % 1 === 0
          ? values.unitAmount
          : null,
      unit_amount_decimal:
        values.unitAmount && values.unitAmount % 1 !== 0
          ? values.unitAmount
          : null,
      zipcode_id: null,
    };

    if (!editMode) {
      editPayment.mutate(updateObj, {
        onSuccess: (res) => {
          //console.log(res.data);
          if (res.data.is_success) {
            //editListLoaderHandler(true);
            dispatch(handlePaymentId(null));
            dispatch(handleModalSit(false));
            //reloader();
            onToggle();

            let currentPeyments = allAddPayment.filter(
              (item: any) => item.id !== paymentId
            );
            let finalCurrent = [updateObj, ...currentPeyments];
            setList(
              finalCurrent.map((i: any, ind: number) => ({
                ...i,
                row_id: ind + 1,
                //edit_flag: editMode,
              }))
            );
          }
        },
      });
    } else if (editMode) {
      editPayment.mutate(updateObj, {
        onSuccess: (res) => {
          //console.log(res.data);
          if (res.data.is_success) {
            editListLoaderHandler(true);
            dispatch(handlePaymentId(null));
            dispatch(handleModalSit(false));
            // let currentPeyments = allPayment.filter(
            //   (item: any) => item.id !== paymentId
            // );
            //let finalCurrent = [updateObj, ...currentPeyments];
            // setList(
            //   finalCurrent.map((i: any, ind: number) => ({
            //     ...i,
            //     row_id: ind + 1,
            //     edit_flag: editMode,
            //   }))
            // );
            reloader();
            onToggle();
          }
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addPayModalStep5Validation}
    >
      {({
        values,
        handleSubmit,
        resetForm,
        setFieldValue,
      }: FormikProps<any>) => (
        <Modal
          size="md"
          isOpen={isOpen}
          onToggle={() => {
            setInitialValues({
              nickname: "",
              unitAmount: null,
              paymentType: { value: 2, label: "recurring" },
              nterval: null,
              intervalCount: null,
              usageType: null,
              billingSchema: null,
              tiresMods: null,
              taxBehavior: null,
              trialPeriodDays: null,
              recurring_aggregate_usage: null,
              //paymentMethod: null,
            });
            onToggle();
          }}
          unmountOnClose
          modalTitle="Edit Credential"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: (
              <>
                <SelectOption
                  name="paymentMethod"
                  placeholder="Please select"
                  label={"Payment Method"}
                  id="paymentType"
                  options={professionOption}
                  // isMulti
                  isLoading={getPayment.isLoading}
                  onChange={(opt) => {
                    // setIsSetted(false);
                    setFieldValue("paymentMethod", opt);
                    setInitialValues((old) => ({ ...old, paymentMethod: opt }));
                    setTimeout(() => {
                      onPaymentMethodChange(opt);
                    }, 50);
                  }}
                  wrapperClassName="mb-1 "
                  // onInputChange={()=>}
                />
                <Row>
                  <Col sm={"6"}>
                    <InputText
                      name="nickname"
                      placeholder="Please enter Name ..."
                      label={"Nickname"}
                      id="nickname"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm="6">
                    <InputText
                      type="number"
                      name="unitAmount"
                      placeholder="Please enter Unit Amount ..."
                      label={"Unit Amount"}
                      id="unitAmount"
                      wrapperClassName="mb-1"
                      // noColor
                    />
                  </Col>
                </Row>
                <SelectOption
                  name="paymentType"
                  placeholder="select ..."
                  label={"Payment Type"}
                  id="paymentType"
                  disabled
                  options={[
                    { value: 1, label: "One_time" },
                    { value: 2, label: "Recurring" },
                  ]}
                  // isMulti
                  //   isLoading={getPayment.isLoading}
                  wrapperClassName="mb-1 "
                  // customStyle={SelectCustomStyle}
                  // onInputChange={()=>}
                />
                <Row>
                  <Col sm="6">
                    <SelectOption
                      name="nterval"
                      placeholder="select ..."
                      label={"Interval"}
                      id="nterval"
                      options={[
                        { value: "month", label: "Month" },
                        { value: "year", label: "Year" },
                        { value: "week", label: "Week" },
                        { value: "day", label: "Day" },
                      ]}
                      wrapperClassName="mb-1 "
                    />
                  </Col>
                  <Col sm="6">
                    <InputText
                      type="number"
                      name="intervalCount"
                      placeholder="enter ..."
                      label={"Interval Count"}
                      id="intervalCount"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                </Row>
                <SelectOption
                  name="usageType"
                  placeholder="select ..."
                  label={"Usage Type"}
                  id="usageType"
                  options={[
                    { value: "metered", label: "Metered" },
                    { value: "licensed", label: "Licensed" },
                  ]}
                  // isMulti
                  // isLoading={getPayment.isLoading}
                  wrapperClassName="mb-1 "
                />
                {values["usageType"] &&
                  values["usageType"].value === "metered" && (
                    <SelectOption
                      name="recurring_aggregate_usage"
                      placeholder="select ..."
                      label={"Recurring Aggregate Usage"}
                      id="recurring_aggregate_usage"
                      options={[
                        { value: "sum", label: "Sum" },
                        {
                          value: "last_during_period",
                          label: "Last during period",
                        },
                        { value: "last_ever", label: "Last Ever" },
                        { value: "max", label: "Max" },
                      ]}
                      wrapperClassName="mb-1"
                    />
                  )}
                <Divider wrapperClassName="my-2" />
                <SelectOption
                  name="billingSchema"
                  placeholder="select ..."
                  label={"Billing Schema"}
                  id="billingSchema"
                  options={[
                    { value: "per_unit", label: "Per Unit" },
                    { value: "tiered", label: "Tiered" },
                  ]}
                  // isMulti
                  //   isLoading={getPayment.isLoading}
                  wrapperClassName="mb-1 "
                />
                <Row>
                  {values["billingSchema"]?.value === "tiered" && (
                    <Col sm="6">
                      <SelectOption
                        name="tiresMods"
                        placeholder="select ..."
                        label={"Tires Mods"}
                        id="tiresMods"
                        options={[
                          { value: "graduated", label: "Graduated" },
                          { value: "volume", label: "Volume" },
                        ]}
                        // isMulti
                        //   isLoading={getPayment.isLoading}
                        wrapperClassName="mb-1 "
                      />
                    </Col>
                  )}

                  <Col
                    sm={values["billingSchema"]?.value === "tiered" ? 6 : 12}
                  >
                    <SelectOption
                      name="taxBehavior"
                      placeholder="select ..."
                      label={"Tax Behavior"}
                      id="taxBehavior"
                      options={[
                        { value: "inclusive", label: "Inclusive" },
                        { value: "exclusive", label: "Exclusive" },
                        { value: "unspecified", label: "Unspecified" },
                      ]}
                      // isMulti
                      //   isLoading={getPayment.isLoading}
                      wrapperClassName="mb-1 "
                    />
                  </Col>
                </Row>
                <InputText
                  type="number"
                  name="trialPeriodDays"
                  placeholder="enter ..."
                  label={"Trial Period Days"}
                  id="trialPeriodDays"
                  wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <SubmitButton
                type="submit"
                color="primary"
                outline
                className="btn-next w-25"
                onClick={handleSubmit}
                isLoading={editPayment.isLoading}
              >
                <span className={"align-middle d-sm-inline-block"}>Save</span>
              </SubmitButton>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { EditCredentialModal };

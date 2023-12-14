import { Divider, ETextPosition } from "@src/components/common/divider/Divider";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { handlePaymentType } from "@src/redux/package";
import { handleModalSit, handlePaymentId } from "@src/redux/packageModal";
import { RootState } from "@src/redux/store";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StylesConfig } from "react-select";
import { Col, Row } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { AddCredential } from "./AddCredential/AddCredential";
import { AddCredentialModal } from "./AddCredentialModal/AddCredentialModal";
import { columns, data } from "./data";
import { EditCredentialModal } from "./EditCredentialModal/EditCredentialModal";

interface IUserProfessionProp {
  stepper: any;
  setIndexStep: any;
  setInitialValues: any;
  indexStep?: number;
  isLoading: boolean;
  schema: any;
  paymentData?: any;
  editMode?: boolean;
  isLoadingData?: boolean;
  reloader?: any;
  setPaymenttypeOne?: any;
}

const PaymentInfo: FC<IUserProfessionProp> = ({
  stepper,
  setIndexStep,
  setInitialValues,
  indexStep,
  isLoading,
  schema,
  paymentData,
  editMode,
  isLoadingData,
  reloader,
  setPaymenttypeOne,
}): JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [mlsPaymentsList, setMlsPaymentsList] = useState<any>([]);
  const [addEditFlag, setAddEditFlag] = useState<boolean>(false);

  const [recurringPayment, setRecurringPayment] = useState<any>([]);

  const [packageDetails, setPackageDetails] = useState<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editListFlagLoading, setEditListFlagLoading] =
    useState<boolean>(false);

  const getPayment = useGetListOfEntity();
  const getDetail = useGetListOfEntity();

  const { paymentType }: any = useSelector((state: RootState) => state.package);

  const { paymentId, modalSit }: any = useSelector(
    (state: RootState) => state.paymentEditModal
  );

  const typeSelected = paymentType.some((o: any) => o.id == id);

  const { values, setFieldValue } = useFormikContext<any>();

  // useEffect(() => {
  //   if (values["paymentType"] && values["paymentType"].value !== 1)
  //     getPayment.mutate(filterListProfession);
  // }, [values["paymentType"]]);

  useEffect(() => {
    if (id) {
      getDetail.mutate(
        { entity: "packages", data: { id: id ? +id : 0 } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data?.result.payment_methods;
              if (result) {
                setPackageDetails(result.payment_methods);
                setMlsPaymentsList(
                  result
                    ? result.map((i: any, ind: number) => ({
                        ...i,
                        row_id: ind + 1,
                      }))
                    : []
                );
              }
            }
          },
        }
      );
    }
  }, [id]);

  useEffect(() => {
    if (!isLoadingData && editListFlagLoading) {
      setTimeout(() => {
        setEditListFlagLoading(false);
      }, 1000);
    }
  }, [isLoadingData]);

  useEffect(() => {
    if (paymentData && editMode) {
      setRecurringPayment(
        paymentData.map((i: any, ind: number) => ({
          ...i,
          row_id: ind + 1,
          edit_flag: editMode,
        }))
      );
    } else {
    }
  }, [paymentData, editMode]);

  useEffect(() => {
    const idNum = id ? +id : 0;
    const currentState = paymentType.find((o: any) => o.id === idNum);
    if (
      currentState &&
      // paymentType.hasOwnProperty("id") &&
      currentState.id === idNum
    ) {
      setInitialValues((old: any) => ({
        ...old,
        paymentType: { value: currentState.value, label: "" },
      }));
    }
  }, [paymentType]);

  const SelectCustomStyle: StylesConfig = {
    control: (prop) => ({
      ...prop,
      fontSize: 14,
    }),
    valueContainer: (prop) => ({
      ...prop,
      fontSize: 14,
    }),
    indicatorsContainer: (prop) => ({ ...prop, fontSize: 14 }),
    placeholder: (prop) => ({ ...prop, fontSize: 14 }),
  };

  const onPaymentTypeChange = (opt: any) => {
    if (opt?.value === 1) {
      setPaymenttypeOne(true);
    } else {
      setPaymenttypeOne(false);
    }
    setFieldValue("paymentType", opt);
    if (opt) {
      //dispatch(handlePaymentType({ id: id ? +id : 0, value: opt.value }));
    } else dispatch(handlePaymentType(null));
  };

  const handleDisbaleSelect = (typeSelected: any) => {
    if (!editMode && !values["paymentType"]) {
      return false;
    } else if (!editMode && values["paymentType"]) {
      return true;
    } else if (editMode && !paymentData && !values["paymentType"]) {
      return false;
    } else if (editMode && paymentData) {
      return true;
    } else if (editMode && !paymentData && values["paymentType"]) {
      return true;
    } else {
      return typeSelected;
    }
  };

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={6}
      stepName="Payment Info"
      // setIndexStep={setIndexStep}
      hasPrev
      btnNextText="Finish"
      isLoading={isLoading}
      schema={schema}
    >
      {/* {isLoadingData || getPayment.isLoading ? ( */}
      {!editListFlagLoading && (isLoadingData || getPayment.isLoading) ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4}>
            <div>
              <span className="fs-7 mb-1 d-block mt-1 text-secondary">
                Please select from the list or Add New
              </span>
              <SelectOption
                name="paymentType"
                placeholder="Please select"
                label={"Payment Type"}
                id="paymentType"
                options={[
                  { value: 1, label: "One_time" },
                  { value: 2, label: "Recurring" },
                ]}
                // isMulti
                onChange={onPaymentTypeChange}
                // isLoading={getPayment.isLoading}
                wrapperClassName="mb-3 "
                disabled={handleDisbaleSelect(typeSelected)}
                // onInputChange={()=>}
              />
            </div>
          </RowWrappers>
          {isOpen && (
            <AddCredentialModal
              reloader={reloader}
              editListLoaderHandler={setEditListFlagLoading}
              editMode={editMode}
              isOpen={isOpen}
              allPayment={recurringPayment}
              setList={!editMode ? setMlsPaymentsList : setRecurringPayment}
              //setList={setMlsPaymentsList}
              onToggle={() => setIsOpen((old) => !old)}
              // onAddData={(d) => {})}
              // data={data}
              // editCellData={}
              // setEditCellData={setEditCellData}
            />
          )}

          {modalSit && (
            <EditCredentialModal
              reloader={reloader}
              editListLoaderHandler={setEditListFlagLoading}
              isOpen={modalSit}
              editMode={editMode}
              onToggle={() => {
                dispatch(handlePaymentId(null));
                dispatch(handleModalSit(false));
              }}
              allPayment={recurringPayment}
              allAddPayment={mlsPaymentsList}
              data={
                editMode
                  ? paymentData
                    ? paymentData?.find((item: any) => item.id === paymentId)
                    : []
                  : mlsPaymentsList
                  ? mlsPaymentsList?.find((item: any) => item.id === paymentId)
                  : []
              }
              setList={editMode ? setRecurringPayment : setMlsPaymentsList}
            />
          )}

          {values["paymentType"] ? (
            values["paymentType"].value === 1 ? (
              <AddCredential editMode={editMode} paymentData={paymentData} />
            ) : (
              <>
                <ListTable
                  noSearch
                  noReload
                  columns={columns}
                  isLoading={
                    getPayment.isLoading || isLoadingData || getDetail.isLoading
                      ? true
                      : false
                  }
                  data={!editMode ? mlsPaymentsList : recurringPayment}
                  headerTitle="Payment Info"
                  //addBtnText={!editMode ? "Add Payment" : ""}
                  addBtnText={
                    editMode
                      ? recurringPayment.length < 4
                        ? "Add payment"
                        : ""
                      : mlsPaymentsList.length < 4
                      ? "Add payment"
                      : ""
                  }
                  onAddBtn={() => {
                    setIsOpen(true);
                  }}
                />
              </>
            )
          ) : (
            <></>
          )}
        </>
      )}
    </FormStepsWrapper>
  );
};

export { PaymentInfo };

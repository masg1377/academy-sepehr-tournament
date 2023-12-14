import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { X } from "react-feather";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";

interface IUserProfessionProp {
  stepper: any;
  setIndexStep: any;
  indexStep?: number;
  schema: any;
  isLoading?: any;
  onSubmit?: (val: any, isSave: boolean) => void;
  submitLoading?: boolean;
}

const BTTInformation: FC<IUserProfessionProp> = ({
  stepper,
  setIndexStep,
  indexStep,
  schema,
  isLoading,
  onSubmit,
  submitLoading,
}): JSX.Element => {
  const { id } = useParams();

  const [bttOption, setBttOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [filterListBTT, setFilterListBTT] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: {
      list_filter: {
        limit: 100,
        offset: 0,
        order_by: "creation_date",
        filters: [],
      },
    },
  });

  const getBTTItems = useGetListOfEntity();

  useEffect(() => {
    if (indexStep === 3) getBTTItems.mutate(filterListBTT);
  }, [indexStep]);

  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (getBTTItems.isSuccess) {
      let result = getBTTItems.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setBttOption(
          result.map((i: any) => ({ value: i.id, label: i.name, count: 1 }))
        );
    }
  }, [getBTTItems.isSuccess]);

  const onBttChange = (val: any) => {
    setFieldValue("bttItems", val);
  };

  const onRemoveBtt = (val: number) => {
    const res = values["bttItems"];

    setFieldValue(
      "bttItems",
      res.filter((i: any, ind: number) => ind !== val)
    );
  };
  const onBttInput = (val: string, index: number) => {
    // console.log(val);
    const res = values["bttItems"];

    setFieldValue(
      "bttItems",
      res.map((i: any, ind: number) =>
        ind === index ? { ...i, count: val ? val : 0 } : i
      )
    );
  };

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={4}
      onSave={onSubmit}
      stepName="BTT informations"
      // setIndexStep={setIndexStep}
      hasPrev
      schema={schema}
      isLoading={submitLoading || isLoading}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4} rowClassName="pb-2 border-bottom">
            <div>
              <SwitchBox
                name="hasBttItems"
                wrapperClassName="mt-2 mb-1"
                color="success"
                //defaultChecked={true}
                labelClassName="text-black"
                // onChange={(val) => setHasBTT(val)}
                onChange={(e) => {
                  setFieldValue("hasBttItems", e);
                  if (!e) {
                    setFieldValue("bttItems", []);
                  }
                }}
              >
                This package has BTT item
              </SwitchBox>
              {values["hasBttItems"] ? (
                <div>
                  <SelectOption
                    name="bttItems"
                    placeholder="Please select"
                    label={"BTT items"}
                    id="bttItems"
                    isLoading={getBTTItems.isLoading}
                    options={bttOption}
                    isMulti
                    onChange={onBttChange}
                    wrapperClassName="mb-1"
                    noErrorMessage
                  />

                  {values["bttItems"] && values["bttItems"].length > 0 && (
                    <Col className="rounded shadow p-1">
                      {values["bttItems"].map((item: any, index: number) => (
                        <div
                          className={
                            "d-flex justify-content-between align-items-center " +
                            (values["bttItems"].length - 1 === index
                              ? ""
                              : " mb-1 border-bottom pb-1")
                          }
                          key={index}
                        >
                          <span className="fs-6 text-black">{item.label}</span>

                          <div className="d-flex align-items-center">
                            <span className="fs-6 fw-bolder text-black me-1">
                              Count
                            </span>
                            <InputText
                              name="taxCode"
                              placeholder="Count..."
                              id="taxCode"
                              wrapperClassName="me-1"
                              bsSize="sm"
                              type="number"
                              size={15}
                              value={item.count ? item.count : 0}
                              // noErrorMessage
                              // customError="True error"
                              onChange={(val) =>
                                onBttInput(val.target.value, index)
                              }
                            />
                            <X
                              size={18}
                              className="cursor-pointer"
                              onClick={() => onRemoveBtt(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </Col>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </RowWrappers>

          <RowWrappers sm={6} md={4} rowClassName="pb-2 pb-5 mb-5">
            <div className="mb-5">
              <SwitchBox
                name="hasPreRegBtt"
                wrapperClassName="mt-2 mb-1"
                color="success"
                // defaultChecked={hasPreRegBtt}
                labelClassName="text-black"
                // onChange={(val) => setHasPreRegBtt(val)}
                onChange={(e) => {
                  setFieldValue("hasPreRegBtt", e);
                  if (!e) {
                    setFieldValue("preRegBttItems", []);
                  }
                }}
              >
                This package has Pre Req BTT item
              </SwitchBox>
              {values["hasPreRegBtt"] ? (
                <SelectOption
                  name="preRegBttItems"
                  placeholder="Please select"
                  label={"Pre Req BTT items"}
                  id="preRegBttItems"
                  isLoading={getBTTItems.isLoading}
                  options={bttOption}
                  isMulti
                  wrapperClassName="mb-1"
                />
              ) : (
                <></>
              )}
            </div>
          </RowWrappers>
        </>
      )}
    </FormStepsWrapper>
  );
};

export { BTTInformation };

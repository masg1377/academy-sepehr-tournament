import { Modal } from "@src/components/common/Modal/Modal";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { Divider } from "@src/components/common/divider/Divider";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { useCreateUsagePlan } from "@src/core/services/api/usage-plan/usage-plan.api";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col } from "reactstrap";

const AddUsagePlanComponent = () => {
  const [packageOptions, setPackageOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    packageName: null,
    gatewayId: "",
    usagePlanId: "",
    baseFee: "",
    quotaLimit: "",
    callFee: "",
  });
  const [packageInput, setPackageInput] = useState<string>("");

  const { id } = useParams();

  const getPackages = useGetListOfEntity();
  const addUsagePlan = useCreateUsagePlan();

  const packRef = useRef<NodeJS.Timeout>();
  const getPacks = (name?: string, isFirst?: boolean) => {
    clearTimeout(packRef.current);
    if (packageInput && !name && !isFirst) return;
    setPackageInput(name || "");
    if (name !== packageInput) {
      const timeOut = setTimeout(() => {
        getPackages.mutate(
          {
            entity: "packages",
            data: {
              select_fields: ["id", "name"],
              list_filter: {
                limit: 40,
                offset: 0,
                ...(name
                  ? {
                      filters: [
                        { field: "name", operator: "like", value: name },
                      ],
                    }
                  : {}),
              },
            },
          },
          {
            onSuccess: (res) => {
              if (res.data.is_success) {
                let result = res.data.result;
                if (result && !Array.isArray(result)) result = [result];

                if (result)
                  setPackageOptions(
                    result?.map((item: any) => ({
                      value: item?.id,
                      label: item?.name,
                    }))
                  );
              }
            },
          }
        );
      }, 500);
      packRef.current = timeOut;
    }
  };

  useEffect(() => {
    getPacks(undefined, true);
  }, []);

  const onSubmit = (values: any) => {
    console.log("values", values);
    const obj = {
      name: values.name,
      package_id: Number(values.packageName.value),
      api_gateway_id: values.gatewayId,
      gateway_usage_plan_id: values.usagePlanId,
      quota_limit: Number(values.quotaLimit),
      base_fee: Number(values.baseFee),
      extra_call_fee: Number(values.callFee),
      details:{test:"test"}
    };
    if (id) {
    } else {
      (async () => {
        const result = await addUsagePlan.mutateAsync({ usage_plans: [obj] });
        if (result.data.is_success) {
          console.log("added");
        } else {
          console.log("failed");
        }
      })();
    }
  };

  return (
    <div className="bg-white d-flex flex-column justify-content-between align-items-start rounded-1 px-2 pb-1">
      <div className="d-flex flex-column justify-content-start align-items-between w-100">
        <div className="d-flex flex-row justify-content-start align-items-center py-1">
          <span className="ft-16 text-thunder">Usage plan details</span>
        </div>
        <Divider wrapperClassName="w-100 mb-2" />
        <FormWrapper
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
          className=""
        >
          {({ setFieldValue }) => (
            <>
              {/* Name */}
              <RowWrappers sm={12} md={6} xl={4}>
                <InputText
                  name="name"
                  label="Name"
                  placeholder="Please enter name"
                />
              </RowWrappers>
              {/* Package name _ API Gateway ID */}
              <RowWrappers sm={12} md={6} xl={4}>
                <SelectOption
                  name="packageName"
                  label="Package name"
                  placeholder="Please enter Package name"
                  options={packageOptions}
                  onInputChange={(val) => getPacks(val)}
                  isLoading={getPackages.isLoading}
                  isClearable
                  noFilter
                />
                <InputText
                  name="gatewayId"
                  label="API Gateway ID"
                  placeholder="Please enter API Gateway ID"
                />
              </RowWrappers>
              {/* Gateway usage plan ID */}
              <RowWrappers sm={8} md={6} xl={4}>
                <InputText
                  name="usagePlanId"
                  label="Gateway usage plan ID"
                  placeholder="Please enter usage plan ID"
                />
              </RowWrappers>
              {/* Base Fee _ Quota Limit */}
              <RowWrappers sm={8} md={6} xl={4}>
                <InputText
                  noColor
                  name="baseFee"
                  label="Base Fee"
                  placeholder="$145"
                />

                <InputText
                  noColor
                  name="quotaLimit"
                  label="Quota Limit"
                  placeholder="20,000"
                />
              </RowWrappers>
              {/* Name */}
              <RowWrappers sm={12} md={6} xl={4}>
                <InputText
                  noColor
                  name="callFee"
                  label="Extra Call fee"
                  placeholder="$0.000002"
                />
              </RowWrappers>
              {/* <RowWrappers sm={12} md={6} xl={4}>
                <SelectOption
                  name="resources"
                  placeholder="Please search resources"
                  label={"Resources"}
                  id="resources"
                  options={[{ label: "adfd", value: "1" }]}
                  onChange={(e1, e2) => {
                    if (e2?.action === "create-option") {
                      setSelectInputChangeData(e2);
                      setModalStatus(true);
                    } else {
                      setFieldValue("resources", e1);
                    }
                  }}
                  isMulti
                  isOutline
                  isClearable
                  creative
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                />
              </RowWrappers> */}
              <SubmitButton className="mt-2">Save</SubmitButton>
              {/* <FormWrapper initialValues={{}} onSubmit={modalSubmitHandler}>
                {({ submitForm }) => (
                  <Modal
                    isOpen={modalStatus}
                    onToggle={() => setModalStatus((prev) => !prev)}
                    modalTitle="Add Resource"
                  >
                    {{
                      main: (
                        <>
                          <InputText
                            name="Name"
                            label="Name"
                            placeholder="Please write name ..."
                          />
                          <InputText
                            name="Resource"
                            label="Resource"
                            placeholder="Please Select"
                            wrapperClassName="mt-1"
                          />
                          <div className="w-100 d-flex gap-2 mt-2">
                            <SubmitButton
                              onClick={() => setModalStatus((prev) => !prev)}
                              type="button"
                              outline
                              className="flex-1"
                            >
                              Cancel
                            </SubmitButton>
                            <SubmitButton
                              type="button"
                              onClick={submitForm}
                              className="flex-1"
                            >
                              Save
                            </SubmitButton>
                          </div>
                        </>
                      ),
                    }}
                  </Modal>
                )}
              </FormWrapper> */}
            </>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export { AddUsagePlanComponent };

import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { ListTableSelectField } from "@src/components/common/form/Fields/ListTableSelectField/ListTableSelectField";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { TBttTypes } from "@src/core/data/btt.data";
import { useEditBtt } from "@src/core/services/api/btt/btt.api";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { FormikProps, useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import { useParams } from "react-router-dom";
import { Label } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { columns } from "./column";
import toast from "react-hot-toast";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

interface IPreRequirementProp {
  stepper: any;
  // schema: any;
  activeStep: number;
  bttDetail: any;
  isLoading?: boolean;
  refetch: () => void;
}

const PreRequirement: FC<IPreRequirementProp> = ({
  stepper,
  // schema,
  activeStep,
  bttDetail,
  isLoading,
  refetch,
}): JSX.Element => {
  const { id } = useParams();
  const [bttOptions, setBttOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({ preRequirementBtt: [] });
  const [listFilter, setListFilter] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: { list_filter: { limit: 10000, offset: 0 } },
  });

  console.log(activeStep);
  const getBtt = useGetListOfEntity();
  const editBtt = useEditBtt();

  useEffect(() => {
    if (bttDetail && bttDetail.pre_required_btts) {
      const preReq = [...bttDetail.pre_required_btts];
      const preReqSelected: any = preReq.map((o, ind) => ({
        id: o.id,
        row_id: ind + 1,
        name: o.name,
        value: o.id,
        label: o.name,
        type: TBttTypes.find((i) => i.id === o.type)?.label,
        isServer: true,
        isRemove: false,
        btt_type_items_requirements_bridge_id:
          o.btt_type_items_requirements_bridge_id,
        // location: o.location
        //   ? Array.isArray(o.locations)
        //     ? o.locations[0].name
        //     : o.locations.name
        //   : "Global",
      }));

      setInitialValues({ preRequirementBtt: preReqSelected });
    }
  }, [bttDetail]);

  useEffect(() => {
    if (activeStep === 2)
      getBtt.mutate(listFilter, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            console.log(result);
            setBttOptions(
              result.map((o: any, ind: number) => ({
                id: o.id,
                row_id: ind + 1,
                name: o.name,
                value: o.id,
                label: o.name,
                type: TBttTypes.find((i) => i.id === o.type)?.label,
                location: o.location
                  ? Array.isArray(o.locations)
                    ? o.locations[0].name
                    : o.locations.name
                  : "Global",
              }))
            );
          }
        },
      });
  }, [activeStep]);

  const onSubmit = (values: any, isSave?: boolean) => {
    // console.log(values);

    if (
      !values.preRequirementBtt ||
      (values.preRequirementBtt && values.preRequirementBtt.length === 0)
    ) {
      return stepper.next();
    }

    let bttObj: any = {};

    // if (values.preRequirementBtt)
    //   bttObj["add"] = values.preRequirementBtt.map((i: any) => i.id);
    // else if (false) values["remove"] = [];

    const newPreBtt = values.preRequirementBtt
      ? values.preRequirementBtt
          .filter((o: any) => !o.isRemove && !o.isServer)
          .map((p: any) => p.id)
      : [];
    const removePreBtt = values.preRequirementBtt
      ? values.preRequirementBtt
          .filter((o: any) => o.isRemove)
          .map((p: any) => p.btt_type_items_requirements_bridge_id)
      : [];

    if (newPreBtt && newPreBtt.length > 0) bttObj["add"] = newPreBtt;
    if (removePreBtt && removePreBtt.length > 0)
      bttObj["remove"] = removePreBtt;

    console.log(bttObj, values.preRequirementBtt);
    // return;
    if (
      (bttObj["add"] && bttObj["add"].length === 0) ||
      (bttObj["remove"] && bttObj["remove"] === 0) ||
      (!bttObj["remove"] && !bttObj["add"])
    )
      return stepper.next();

    editBtt.mutate(
      {
        id: id ? +id : 0,
        pre_required: bttObj,
      },
      {
        onSuccess: (response) => {
          if (response.data.is_success) {
            // console.log(response.data.result);
            if (!isSave) stepper.next();
            else {
              refetch();
              toast.success("Successfully saved!");
            }
          } else toast.error(response.data.error || "Failed to save!");
        },
        onError: () => {
          toast.error("Occurred while saving! Please try again later");
        },
      }
    );
  };

  const onSearchFilter = (values: any) => {
    const val = values["listOfPermission"];
    const type = values["type"];
    // console.log(val);

    const filter: any = {
      entity: "btt_type_items",
      data: {
        list_filter: {
          limit: 10000,
          offset: 0,
          filters: [{ field: "name", operator: "like", value: val ? val : "" }],
        },
      },
    };

    if (type) {
      filter.data.list_filter.filters.push("and");
      filter.data.list_filter.filters.push({
        field: "type",
        operator: "=",
        value: type ? type.id : "",
      });
    }

    getBtt.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (result)
            setBttOptions(
              result.map((o: any, ind: number) => ({
                id: o.id,
                row_id: ind + 1,
                name: o.name,
                value: o.id,
                label: o.name,
                type: TBttTypes.find((i) => i.id === o.type)?.label,
                location: o.location
                  ? Array.isArray(o.locations)
                    ? o.locations[0].name
                    : o.locations.name
                  : "Global",
              }))
            );
        }
      },
    });
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }: FormikProps<any>) => (
        <FormStepsWrapper
          stepName="Pre-requirement BTT"
          stepNum={2}
          stepper={stepper}
          hasPrev
          onSave={() => onSubmit(values, true)}
          isLoading={editBtt.isLoading}
          // schema={schema}
        >
          {{
            body: isLoading ? (
              <LoadingData />
            ) : (
              <>
                <RowWrappers sm={12} md={12}>
                  <SelectOption
                    name="preRequirementBtt"
                    placeholder="Please choose from list ..."
                    label={"Pre-requirement BTT"}
                    id="preRequirementBtt"
                    options={[]}
                    value={
                      values["preRequirementBtt"]
                        ? values["preRequirementBtt"].filter((f: any) =>
                            f.isServer ? !f.isRemove : true
                          )
                        : null
                    }
                    // value=]}
                    onChange={(val, action) => {
                      if (action.action === "remove-value") {
                        const removeVal = { ...action.removedValue };
                        let cur = [...values["preRequirementBtt"]];
                        cur = cur.filter((f) => f.id !== removeVal.id);
                        console.log("action", cur, values["preRequirementBtt"]);
                        if (removeVal && removeVal.isServer) {
                          setFieldValue("preRequirementBtt", [
                            ...cur,
                            { ...removeVal, isRemove: true },
                          ]);
                        } else setFieldValue("preRequirementBtt", [...val]);
                      } else setFieldValue("preRequirementBtt", [...val]);
                    }}
                    isMulti
                    isOutline2
                    wrapperClassName="mb-1"
                    myComponents={{
                      DropdownIndicator: () => <></>,
                      MenuList: () => <></>,
                      Menu: () => <></>,
                      ClearIndicator: () => <></>,
                    }}
                  />
                </RowWrappers>

                <RowWrappers sm={12} md={12}>
                  <ListTableSelectField
                    name="preRequirementBtt"
                    columns={columns}
                    rows={bttOptions}
                    isLoading={getBtt.isLoading}
                    headerChild={
                      <>
                        <Label>List of BTTs</Label>
                        <div className="d-md-flex  justify-content-between ">
                          <InputText
                            name="listOfPermission"
                            placeholder="Name ..."
                            id="listOfPermission"
                            noColor
                            wrapperClassName="mb-1 me-1 flex-fill"
                          />
                          <SelectOption
                            name="type"
                            placeholder="Type ..."
                            id="type"
                            options={TBttTypes}
                            isClearable
                            noColor
                            wrapperClassName="mb-1 me-1 flex-fill"
                          />

                          {/* <SelectOption
                            name="location"
                            placeholder="Location ..."
                            id="location"
                            options={[]}
                            noColor
                            wrapperClassName="mb-1 me-1 flex-fill"
                          />

                          <SelectOption
                            name="hashtag"
                            placeholder="Hashtag ..."
                            id="hashtag"
                            options={[]}
                            noColor
                            wrapperClassName="mb-1 me-1 flex-fill"
                          /> */}

                          <RippleButton
                            style={{ minWidth: 130, height: "fit-content" }}
                            color="primary"
                            type="button"
                            onClick={() => onSearchFilter(values)}
                          >
                            <Search size={16} /> Search
                          </RippleButton>
                        </div>
                      </>
                    }
                  />
                </RowWrappers>
              </>
            ),
          }}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export { PreRequirement };

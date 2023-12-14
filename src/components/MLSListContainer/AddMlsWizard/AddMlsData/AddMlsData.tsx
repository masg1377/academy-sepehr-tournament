import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import {
  useAddMlsServer,
  useEditMlsServer,
  useGetMlsList,
} from "@src/core/services/api/mls/mls.api";
import {
  TAddMlsServer,
  TEditMlsServer,
  TGetMlsList,
} from "@src/core/services/api/mls/type";
import {
  addMlsServerButtonValidation,
  addMlsServerValidation,
} from "@src/core/validations/mls.validation";
import { FormikProps } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { MainMlsForm } from "./MainMlsForm";

interface IAddMlsDataProp {
  stepper: any;
  type?: string;
}

const AddMlsData: FC<IAddMlsDataProp> = ({ stepper }): JSX.Element => {
  const { id } = useParams();
  //group
  const [groupOption, setGroupOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [groupInput, setGroupInput] = useState("");
  const [filterListGroup, setFilterListGroup] = useState<TGetEntities>({
    entity: "groups",
    data: {
      select_fields: ["id", "name", "group_name_id"],
      list_filter: {
        limit: 40,
        offset: 0,
      },
    },
  });
  const [initialValues, setInitialValues] = useState({
    mlsName: "",
    mlsShortName: "",
    mlsGroup: null,
    status: false,
    report_status: true,
    contract_type: null,
    reportInterval: "",
    reportDayOfMmonth: "",
    image: "",
    country: null,
    website: null,
    contact_number: "",
    contact_ticket: "",
    contact_email: "",
    // contact_person1: "",
    // contact_person2: "",
    address: null,
    // complience: [{ "order-0": "", "provider-0": "", "type-0": "" }],
  });

  const getDetail = useGetMlsList();

  useEffect(() => {
    if (id) {
      getDetail.mutate(
        { entity: "mls_server", data: { id: id ? +id : 0 } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              console.log(result);
              setInitialValues((old: any) => ({
                ...old,
                // image: result.image,
                mlsName: result.name,
                mlsShortName: result.short_name,
                report_status: result.report_required,
                mlsGroup: result.group_id
                  ? { value: result.group_id, label: "" }
                  : null,
                status: result.status,
                reportInterval: result.report_interval
                  ? {
                      value: result.report_interval,
                      label: result.report_interval,
                    }
                  : null,
                contract_type: result.contract_type
                  ? {
                      value: result.contract_type.toLowerCase(),
                      label: result.contract_type,
                    }
                  : null,
                reportDayOfMmonth: result.report_day_of_month,
                country: result.country_id
                  ? { value: result.country_id, label: "" }
                  : null,
                address: result.address ? result.address : null,
                website: result?.website,
                contact_email: result?.contact_email,
                contact_number: result?.contact_details?.contact_number,
                contact_ticket: result?.contact_details?.contact_ticket,
                contact_person1: result?.contact_details?.contact_person1,
                contact_person2: result?.contact_details?.contact_person2,
              }));
            }
          },
        }
      );
    }
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [shortNameExist, setShortNameExist] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_server",
    data: {
      list_filter: {
        limit: 10,
        offset: 0,
        filters: [],
      },
    },
  });

  const addMlsServer = useAddMlsServer();
  const editMls = useEditMlsServer();
  const getGroupsItems = useGetListOfEntity();

  const navigate = useNavigate();

  useEffect(() => {
    getGroupsItems.mutate(filterListGroup);
  }, []);

  const mlsExist = useGetMlsList();
  const mlsShortNameExist = useGetMlsList();
  // useEffect(() => {
  //   mlsExist.mutate(filterList);
  // }, []);

  useEffect(() => {
    if (getGroupsItems.isSuccess) {
      let result = getGroupsItems.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setGroupOption(
          result.map((i: any) => ({
            value: i.id,
            label: i.name ? i.name : i.group_name_id ? i.group_name_id : i.id,
          }))
        );
    }
  }, [getGroupsItems.isSuccess]);

  const groupRef = useRef<any>();

  const onGroupInput = (val: string) => {
    clearTimeout(groupRef.current);
    setGroupInput(val);
    if (groupInput !== val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...filterListGroup };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "name", operator: "like", value: val },
        ];
        setFilterListGroup(obj);
        getGroupsItems.mutate(obj);
      }, 500);
      groupRef.current = timeOut;
    }
  };

  const onSumbit = (value: any, isSave?: boolean) => {
    let contactDetail: { [key: string]: string } = {};

    if (value.contact_number)
      contactDetail["contact_number"] = value.contact_number;
    if (value.contact_ticket)
      contactDetail["contact_ticket"] = value.contact_ticket;

    if (value.contact_person1)
      contactDetail["contact_person1"] = value.contact_person1;
    if (value.contact_person2)
      contactDetail["contact_person2"] = value.contact_person2;

    if (id) {
      let obj: TEditMlsServer = {
        entity: "mls_server",
        data: {
          id: id ? +id : 0,
          name: value.mlsName,
          short_name: value.mlsShortName,
          status: value.status,
          image: value.image,
          contract_type: value.contract_type ? value.contract_type.value : "",
          report_day_of_month: value.report_status
            ? value.reportDayOfMmonth
              ? +value.reportDayOfMmonth
              : undefined
            : undefined,
          report_interval: value.report_status
            ? value.reportInterval
              ? value.reportInterval.value
              : ""
            : undefined,
          report_required: value.report_status,
          country_id: value.country ? value.country.value : 0,
          address: value.address ? value.address : "",
          contact_email: value.contact_email ? value.contact_email : "",
          website: value.website ? value.website : "",
          contact_details:
            contactDetail && Object.keys(contactDetail).length > 0
              ? contactDetail
              : undefined,
          group_id: value.mlsGroup ? value.mlsGroup.value : undefined,
        },
      };

      editMls.mutate(obj, {
        onSuccess: (val) => {
          if (val.data.is_success) {
            if (!isSave || typeof isSave !== "boolean") stepper.next();
            else toast.success("Successfully saved!");
            // navigate("/mls-list/edit/" + val.data.result.id);
          } else
            toast.error(
              val.data.error || "Error occurred while saving! Please try again"
            );
        },
        onError: () => {
          toast.error("Error occurred while saving! Please try again");
        },
      });
    } else {
      const obj: TAddMlsServer = {
        entity: "mls_server",
        data: {
          name: value.mlsName,
          short_name: value.mlsShortName,
          status: value.status,
          image: value.image,
          // contract_type: value.contract_type ? value.contract_type.value : "",
          report_day_of_month: value.report_status
            ? value.reportDayOfMmonth
              ? +value.reportDayOfMmonth
              : 0
            : undefined,
          // report_interval: value.reportInterval
          //   ? value.reportInterval.value
          //   : "",
          report_required: value.report_status,
          country_id: value.country ? value.country.Country : 0,
          address: value.address ? value.address.Label : "",
          contact_email: value.contact_email ? value.contact_email : "",
          website: value.website ? value.website : "",
          contact_details:
            contactDetail && Object.keys(contactDetail).length > 0
              ? contactDetail
              : undefined,
          group_id: value.mlsGroup ? value.mlsGroup.value : undefined,
        },
      };

      if (value.contract_type)
        obj["data"]["contract_type"] = value.contract_type.value;

      if (value.reportInterval)
        obj["data"]["report_interval"] = value.reportInterval.value;

      // console.log(obj);
      addMlsServer.mutate(obj, {
        onSuccess: (val) => {
          // console.log(val.data.result);
          if (val.data.is_success) {
            if (!isSave || typeof isSave !== "boolean") stepper.next();
            else toast.success("Successfully saved!");
            navigate("/mls-list/add/" + val.data.result.id);
          } else {
            try {
              if (typeof val.data.error === "string")
                toast.error(
                  val.data.error ||
                    "Error occurred while saving! Please try again"
                );
            } catch (error) {
              toast.error("Error occurred while saving! Please try again");
            }
          }
        },
        onError: () => {
          toast.error("Error occurred while saving! Please try again");
        },
      });
    }
    // stepper.next();
  };

  const nameRef = useRef<any>();

  const onNameChange = (
    val: any,
    setFieldError: (field: string, message: string | undefined) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("mlsName", val.target.value);
    clearTimeout(nameRef.current);
    const timeOut = setTimeout(() => {
      if (val.target.value) {
        let filterObj = { ...filterList };
        //@ts-ignore
        filterObj.data["list_filter"].filters = [
          { field: "name", operator: "=", value: val.target.value },
        ];

        mlsExist.mutate(filterObj, {
          onSuccess: (res) => {
            console.log(res.data);
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              if (result && result.length > 0) {
                setNameExist(true);
                setFieldError("mlsName", "Mls name exist!");
              } else setNameExist(false);
            } else setNameExist(false);
          },
        });
      } else setNameExist(false);
    }, 500);
    nameRef.current = timeOut;
  };

  const shortNameRef = useRef<any>();

  const onShortNameChange = (
    val: any,
    setFieldError: (field: string, message: string | undefined) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("mlsShortName", val.target.value);
    clearTimeout(shortNameRef.current);
    const timeOut = setTimeout(() => {
      if (val.target.value) {
        let filterObj = { ...filterList };
        //@ts-ignore
        filterObj.data["list_filter"].filters = [
          { field: "short_name", operator: "=", value: val.target.value },
        ];

        mlsShortNameExist.mutate(filterObj, {
          onSuccess: (res) => {
            console.log(res.data);
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              if (result && result.length > 0) {
                setShortNameExist(true);
                setFieldError("mlsShortName", "Mls short name exist!");
              } else setShortNameExist(false);
            } else setShortNameExist(false);
          },
        });
      } else setShortNameExist(false);
    }, 500);
    shortNameRef.current = timeOut;
  };

  //* address = models.CharField(max_length=256, null=True)
  //   contact_email = models.CharField(max_length=256, null=True)
  //   website = models.CharField(max_length=256, null=True)
  //   contact_details = models.JSONField(null=True)

  return (
    <FormWrapper
      initialValues={initialValues}
      enableReinitialize
      validationSchema={addMlsServerValidation}
      onSubmit={onSumbit}
    >
      {({ setFieldError, setFieldValue, values }: FormikProps<any>) => (
        <FormStepsWrapper
          stepper={stepper}
          stepNum={1}
          stepName="Add MLS Data"
          onSave={() => onSumbit(values, true)}
          isLoading={addMlsServer.isLoading || editMls.isLoading}
          values={values}
          schema={addMlsServerButtonValidation}
        >
          {getDetail.isLoading ? (
            <LoadingData wrapperStyle="py-5 my-4" />
          ) : (
            <>
              <LogoUploader
                name="image"
                label="MLS Logo"
                id="image"
                mode="one"
                square
                fileFormat="png, jpg"
                fileSize="5 MB"
              />
              <RowWrappers>
                <InputText
                  name="mlsName"
                  placeholder="Please enter Name ..."
                  label={"MLS Name"}
                  id="mlsName"
                  onChange={(val) =>
                    onNameChange(val, setFieldError, setFieldValue)
                  }
                  customError={nameExist ? "Mls name exist!" : undefined}
                  // wrapperClassName="mb-1"
                />
                <InputText
                  name="mlsShortName"
                  placeholder="Please enter ..."
                  label={"MLS Short Name"}
                  id="mlsShortName"
                  onChange={(val) =>
                    onShortNameChange(val, setFieldError, setFieldValue)
                  }
                  customError={
                    shortNameExist ? "Mls short name exist!" : undefined
                  }
                  // wrapperClassName="mb-1"
                />
              </RowWrappers>
              <RowWrappers sm={6} md={4}>
                <SelectOption
                  name="mlsGroup"
                  placeholder="Please select"
                  label={"MLS Group"}
                  id="mlsGroup"
                  options={groupOption}
                  isLoading={getGroupsItems.isLoading}
                  noFilter
                  onInputChange={onGroupInput}
                  wrapperClassName="mb-1"
                />
              </RowWrappers>
              <SwitchBox name="status" color="success" defaultChecked>
                Active
              </SwitchBox>
              <MainMlsForm />
            </>
          )}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export { AddMlsData };

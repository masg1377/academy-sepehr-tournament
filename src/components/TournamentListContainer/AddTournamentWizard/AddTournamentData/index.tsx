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
import { MainMlsForm } from "./MainMlsForm/MainMlsForm";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { useAddTournament } from "@src/core/services/api/tournament";

interface IAddMlsDataProp {
  stepper: any;
  type?: string;
}

const AddTournamentData: FC<IAddMlsDataProp> = ({ stepper }): JSX.Element => {
  const { id } = useParams();
  //group

  const [initialValues, setInitialValues] = useState({
    tournamentName: "",
    describe: "",
    avgRange: 0,
    active: false,
    startDate: "",
    endDate: "",
    // complience: [{ "order-0": "", "provider-0": "", "type-0": "" }],
  });

  // const getDetail = useGetMlsList();

  // useEffect(() => {
  //   if (id) {
  //     getDetail.mutate(
  //       { entity: "mls_server", data: { id: id ? +id : 0 } },
  //       {
  //         onSuccess: (res) => {
  //           if (res.data.is_success) {
  //             const result = res.data.result;
  //             console.log(result);
  //             setInitialValues((old: any) => ({
  //               ...old,
  //               // image: result.image,
  //               mlsName: result.name,
  //               mlsShortName: result.short_name,
  //               report_status: result.report_required,
  //               mlsGroup: result.group_id
  //                 ? { value: result.group_id, label: "" }
  //                 : null,
  //               status: result.status,
  //               reportInterval: result.report_interval
  //                 ? {
  //                     value: result.report_interval,
  //                     label: result.report_interval,
  //                   }
  //                 : null,
  //               contract_type: result.contract_type
  //                 ? {
  //                     value: result.contract_type.toLowerCase(),
  //                     label: result.contract_type,
  //                   }
  //                 : null,
  //               reportDayOfMmonth: result.report_day_of_month,
  //               country: result.country_id
  //                 ? { value: result.country_id, label: "" }
  //                 : null,
  //               address: result.address ? result.address : null,
  //               website: result?.website,
  //               contact_email: result?.contact_email,
  //               contact_number: result?.contact_details?.contact_number,
  //               contact_ticket: result?.contact_details?.contact_ticket,
  //               contact_person1: result?.contact_details?.contact_person1,
  //               contact_person2: result?.contact_details?.contact_person2,
  //             }));
  //           }
  //         },
  //       }
  //     );
  //   }
  // }, []);

  const navigate = useNavigate();

  useEffect(() => {}, []);
  const addtournament = useAddTournament();
  const onSumbit = (value: any, isSave?: boolean) => {
    let contactDetail: { [key: string]: string } = {};
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

      // editMls.mutate(obj, {
      //   onSuccess: (val) => {
      //     if (val.data.is_success) {
      //       if (!isSave || typeof isSave !== "boolean") stepper.next();
      //       else toast.success("Successfully saved!");
      //       // navigate("/mls-list/edit/" + val.data.result.id);
      //     } else
      //       toast.error(
      //         val.data.error || "Error occurred while saving! Please try again"
      //       );
      //   },
      //   onError: () => {
      //     toast.error("Error occurred while saving! Please try again");
      //   },
      // });
    } else {
      console.log("value", value);
      // console.log(obj);
      addtournament.mutate(value, {
        onSuccess: (val) => {
          console.log(val.data);
          // if (val.data.is_success) {
          //   if (!isSave || typeof isSave !== "boolean") stepper.next();
          //   else toast.success("Successfully saved!");
          //   navigate("/mls-list/add/" + val.data.result.id);
          // } else {
          //   try {
          //     if (typeof val.data.error === "string")
          //       toast.error(
          //         val.data.error ||
          //           "Error occurred while saving! Please try again"
          //       );
          //   } catch (error) {
          //     toast.error("Error occurred while saving! Please try again");
          //   }
          // }
        },
        onError: () => {
          toast.error("Error occurred while saving! Please try again");
        },
      });
    }
    // stepper.next();
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      enableReinitialize
      // validationSchema={addMlsServerValidation}
      onSubmit={onSumbit}
    >
      {({ setFieldError, setFieldValue, values }: FormikProps<any>) => (
        <FormStepsWrapper
          stepper={stepper}
          stepNum={1}
          stepName="Add Tournament Data"
          onSave={() => onSumbit(values, true)}
          isLoading={false}
          values={values}
          schema={addMlsServerButtonValidation}
        >
          {false ? (
            <LoadingData wrapperStyle="py-5 my-4" />
          ) : (
            <>
              <RowWrappers>
                <InputText
                  name="tournamentName"
                  placeholder="Please enter Name ..."
                  label={"Tournament Name"}
                  id="tournamentName"

                  // wrapperClassName="mb-1"
                />
                <InputText
                  name="describe"
                  placeholder="Please enter ..."
                  label={"description"}
                  id="describe"
                  type="textarea"
                  // wrapperClassName="mb-1"
                />
              </RowWrappers>
              <RowWrappers sm={6} md={4}>
                <InputText
                  name="avgRange"
                  placeholder="Please enter ..."
                  label={"Avrage Tournament"}
                  id="avgRange"
                  type="number"
                  // wrapperClassName="mb-1"
                />
                <SwitchBox name="active" color="success" defaultChecked>
                  Active
                </SwitchBox>
              </RowWrappers>
              <RowWrappers sm={6} md={4}>
                <DatePicker
                  name="startDate"
                  label="start date"
                  id="startDate"
                  placeholder="Please select a date"
                  // disabled={values["permanent"]}
                  options={{ minDate: new Date() }}
                />
                <DatePicker
                  name="endDate"
                  label="end date"
                  id="endDate"
                  placeholder="Please select a date"
                  // disabled={values["permanent"]}
                  options={{ minDate: new Date() }}
                />
              </RowWrappers>
            </>
          )}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export { AddTournamentData };
